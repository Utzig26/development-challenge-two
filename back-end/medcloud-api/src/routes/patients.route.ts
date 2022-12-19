import express from 'express';

import { PatientController } from "../controllers/patients.controller";
import { ValidadeDtoMiddleware } from '../middlewares/validateDto.middleware';
import { CreatePatientDto } from '../dtos/createPatient.dto';

const router = express.Router({ mergeParams: true });

router.post('/', ValidadeDtoMiddleware(CreatePatientDto));
router.post('/', PatientController.createPatient );

router.get('/', PatientController.getPatients);
router.get('/:id', PatientController.getPatient);

export default router;
