import express from 'express';
import { SignController } from '../controllers';

const signRoutes = express.Router();

signRoutes.post('/:id', SignController.initiateSigning);
signRoutes.get('/status/:id', SignController.checkStatus);

export default signRoutes;
