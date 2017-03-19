import express, { Router } from 'express';
import pdfFiller from 'pdffiller';
import * as Helper from '../helper';
import schoolModel from '../model/schoolModel';
import userModel from '../model/userModel';
import mapKey from '../../file/mapKey';
import path from 'path';
import fs from 'fs';
import cloudinary from 'cloudinary';
import config from '../cloudinary.config';
import multiparty from 'connect-multiparty';
import _ from 'lodash';

config(cloudinary);

const router = new Router();
const destPDF = path.resolve('file', './result.pdf');
const multipartyMiddleware = multiparty({ maxFilesSize: 1024 * 1024 * 1024 });

router.route('/')
    .get((req, res) => {
        let userID = req.query.user;
        let schoolID = req.query.school;
        userModel.findOne({ _id: req.query.user }, (err, user) => {
            let userObject = user;
            userObject.name = `${user.first_name} ${user.last_name}`;
            let dob = _.split(user.dob, '-', 3);
            userObject.day = dob[1];
            userObject.month = dob[0];
            userObject.year = dob[2];

            schoolModel.findOne({ _id: req.query.school }, (err, school) => {
                let mapData = mapKey[_.findIndex(mapKey, obj => {
                    return obj.school_name === school.TenTruong.replace(/ /g, "_").toLowerCase();
                })];

                mapData = _.omit(mapData, ['school_name']);
                let data = Helper.mapped2Json(mapData, userObject);
                
                let filePath = new Promise((resolve, reject) => {
                    pdfFiller.fillForm(school.BieuMau, destPDF, data, (err, result) => {
                        if (err) throw err;
                        console.log("In callback (we're done).");
                        resolve(destPDF);
                    });
                });

                filePath.then(filePath => {
                    let stream = cloudinary.uploader.upload_stream((result) => {
                        res.status(200).json({ data : result.url });

                    }, { public_id: `${userObject.name}`.replace(/ /g, "_").toLowerCase() });

                    let rs = fs.createReadStream(filePath).pipe(stream);
                });
            })
        });
    });

export default router;