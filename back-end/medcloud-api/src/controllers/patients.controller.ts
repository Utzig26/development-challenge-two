import { Request, Response, NextFunction} from 'express';

import { PatientsService } from '../services/patients.service';
import { PatientDto } from '../dtos/patient.dto';
import { PartialPatientDto } from '../dtos/partialPatient.dto';

// set default values for limit
const DEFAULT_LIMIT = 10;

// Find patient by id and return it or return 404
async function findPatient(patientId: string, res:Response) {
  const patient = await PatientsService.getPatient(patientId);
  if(!patient) 
    res
      .json({
        message: 'Patient not found'
      })
      .status(404).end();
  else
    return patient;
}

async function getPatient(req:Request, res:Response, next:NextFunction) {
  const patientId = req.params.id;
  try{
    const patient = await findPatient(patientId, res);
    res
      .json({
        message: 'Patient retrieved successfully',
        patient: patient
      })
      .status(200).end();
  } catch (err) {
    next(err);
  }
}

async function getPatients(req:Request, res:Response, next:NextFunction) {
  const limit:number = req.query.limit? parseInt(req.query.limit as string) : DEFAULT_LIMIT;
  const startAt:string|undefined = req.query.startAt? (req.query.startAt as string) : undefined;
  
  try{
    const patients = await PatientsService.getPatients(limit, startAt);
    res
      .json({
        message: 'Patients retrieved successfully',
        amount: patients.length,
        patients: patients,
        lastKey: patients.length < limit? null : patients[patients.length-1].id
      })
      .status(200).end();
  } catch (err) {
    next(err);
  }
}

async function createPatient(req:Request, res:Response, next:NextFunction) {
  const patientDTO: PatientDto = req.body;
  try{
    const newPatient = await PatientsService.createPatient(patientDTO);
    res
      .json({ 
          message: 'Patient created successfully',
          patient: newPatient
        })
      .status(201).end();
  } catch (err) {
    next(err);
  }
}

async function deletePatient(req:Request, res:Response, next:NextFunction) {
  const patientId = req.params.id;
  
  try{
    const patient = await findPatient(patientId, res);
    await PatientsService.deletePatient(patientId);
    res
      .json({
        message: 'Patient deleted successfully',
        patient: patient
      })
      .status(200).end();
  } catch (err) {
    next(err);
  }
}

async function patchPatient(req:Request, res:Response, next:NextFunction) {
  const patientId = req.params.id;
  const patientDTO:PartialPatientDto = req.body;
  try{
    await findPatient(patientId, res)
    const patchedPatient = await PatientsService.patchPatient(patientId, patientDTO);
    res
      .json({
        message: 'Patient patched successfully',
        patient: patchedPatient
      })
      .status(200).end();
  } catch (err) {
    next(err);
  }
}

async function putPatient(req:Request, res:Response, next:NextFunction) {
  const patientId = req.params.id;
  const patientDTO:PatientDto = req.body;
  try{
    await findPatient(patientId, res)
    const updatedPatient = await PatientsService.updatePatient(patientId, patientDTO);
    res
      .json({
        message: 'Patient updated successfully',
        patient: updatedPatient
      })
      .status(200).end();
  } catch (err) {
    next(err);
  }
}

export const PatientController = { getPatient, getPatients, createPatient, deletePatient, patchPatient, putPatient };