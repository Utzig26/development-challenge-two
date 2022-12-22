import express from 'express';

import { PatientController } from "../controllers/patients.controller";
import { ValidadeDtoMiddleware } from '../middlewares/validateDto.middleware';
import { PatientDto } from '../dtos/patient.dto';
import { PartialPatientDto } from '../dtos/partialPatient.dto';

const router = express.Router({ mergeParams: true });

router.post('/', ValidadeDtoMiddleware(PatientDto));
router.post('/', PatientController.createPatient );

router.get('/', PatientController.getPatients);
router.get('/:id', PatientController.getPatient);

router.delete('/:id', PatientController.deletePatient);

router.patch('/:id', ValidadeDtoMiddleware(PartialPatientDto));
router.patch('/:id', PatientController.patchPatient);

router.put('/:id', ValidadeDtoMiddleware(PatientDto));
router.put('/:id', PatientController.putPatient);

export default router;
