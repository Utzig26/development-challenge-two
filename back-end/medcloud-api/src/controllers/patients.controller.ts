import { Request, Response, NextFunction} from 'express';

import { PatientsService } from '../services/patients.service';
import { CreatePatientDto } from '../dtos/createPatient.dto';

async function getPatient(req:Request, res:Response, next:NextFunction) {
  const patientId = req.params.id;
  try{
    const patient = await PatientsService.getPatient(patientId);

    if(!patient) {
      return res
        .json({
          message: 'Patient not found'
        })
        .status(404).end();
    }

    res
      .json({
        message: 'Patient retrieved successfully',
        patient: patient
      })
      .status(200);
  } catch (err) {
    next(err);
  }
}

async function getPatients(req:Request, res:Response, next:NextFunction) {
  try{
    const patients = await PatientsService.getPatients();
    
    if(!patients) {
      return res
        .json({
          message: 'Patients not found'
        })
        .status(404).end();
    }

    res
      .json({
        message: 'Patients retrieved successfully',
        amount: patients.length,
        patients: patients
      })
      .status(200);
  } catch (err) {
    next(err);
  }
}

async function createPatient(req:Request, res:Response, next:NextFunction) {
  const patientDTO: CreatePatientDto = req.body;
  try{
    const newPatient = await PatientsService.createPatient(patientDTO);
    res
      .json({ 
          message: 'Patient created successfully',
          patient: newPatient
        })
      .status(201);
  } catch (err) {
    next(err);
  }
}


export const PatientController = { getPatient, getPatients, createPatient };