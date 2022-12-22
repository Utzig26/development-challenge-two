import express from 'express';

import { PatientController } from "../controllers/patients.controller.js";
import { ValidadeDtoMiddleware } from '../middlewares/validateDto.middleware.js';
import { PatientDto } from '../dtos/patient.dto.js';
import { PartialPatientDto } from '../dtos/partialPatient.dto.js';

const patientsRouter = express.Router({ mergeParams: true });

patientsRouter.post('/', ValidadeDtoMiddleware(PatientDto));
patientsRouter.post('/', PatientController.createPatient );

patientsRouter.get('/', PatientController.getPatients);
patientsRouter.get('/:id', PatientController.getPatient);

patientsRouter.delete('/:id', PatientController.deletePatient);

patientsRouter.patch('/:id', ValidadeDtoMiddleware(PartialPatientDto));
patientsRouter.patch('/:id', PatientController.patchPatient);

patientsRouter.put('/:id', ValidadeDtoMiddleware(PatientDto));
patientsRouter.put('/:id', PatientController.putPatient);

export{ patientsRouter };
