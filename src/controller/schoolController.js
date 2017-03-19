import express, { Router } from 'express';
import multiparty from 'connect-multiparty';
import schoolModel from '../model/schoolModel';
import cloudinary from 'cloudinary';
import config from '../cloudinary.config';
import fs from 'fs';

config(cloudinary);


const router = new Router();
const multipartyMiddleware = multiparty({ maxFilesSize: 1024 * 1024 * 1024 });

router.route('/:id')
    .get((req, res) => {
        schoolModel.findById(req.params.id, (err, school) => {
            if (err) {
                res.status(404).json({ 'error': 'school not found' });
            } else {
                res.status(201).json(school);
            }
        })
    });

router.route('/')
    .get((req, res) => {
        schoolModel.find({}, (err, school) => {
            if (err) {
                res.status(404).json({'error' : 'School Not Found'});
            }
            res.status(200).json(school);
        })
    })
    .post(multipartyMiddleware, (req, res) => {
        let newSchool = new schoolModel(req.body);
        let form = req.files.form;

        let stream = cloudinary.uploader.upload_stream((result) => {

            newSchool.BieuMau = result.url;
            newSchool.save((err, saved) => {
                if (!err) {
                    res.status(200).json({ 'message': 'Saved School Sucessfully', 'result': saved });
                }
                else {
                    res.status(400).json({ 'error': err });                    
                }
            });
        }, { public_id: `${req.body.TenTruong.replace(/ /g, "_").toLowerCase()}` });

        let rs = fs.createReadStream(form.path).pipe(stream);
    });

router.route('/data-mapped')
    .get((req, res) => {
        res.json({}); 
    });

export default router;
