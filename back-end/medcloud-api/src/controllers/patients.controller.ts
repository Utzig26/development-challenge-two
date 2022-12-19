import { Request, Response } from 'express';

import { PatientsService } from '../services/patients.service';
import { CreatePatientDto } from '../dtos/createPatient.dto';

async function createPatient(req:Request, res:Response) {
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
    res
      .json({ message: err.message })
      .status(400);
  }
}

export const PatientController = { createPatient };