import express, { Router } from 'express';
import userModel from '../model/userModel';

const router = new Router();

router.route('/')
    .post( (req, res) => {
        let newUser = new userModel(req.body);
        console.log(req.body);
        newUser.save( (err, saved) => {
            if(err)
                res.status(400).json(err);
            res.status(200).json({ message: 'New User Added', result : saved });
        })
    });

router.route('/:id')
    .get( (req, res) => {
        userModel.findById(req.params.id, ( err, user ) => {
            if(err)
                res.status(400).json(err);
            res.status(200).json({result: user});
        });
    });

export default router;