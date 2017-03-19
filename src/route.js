import schoolRouter from './controller/schoolController';
import userRouter from './controller/userController';
import formRouter from './controller/formController';
import express, { Router } from 'express';

const router = new Router();

router.use('/schools', schoolRouter);
router.use('/users', userRouter);
router.use('/form', formRouter);

export default router;