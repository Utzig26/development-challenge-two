import { CreatePatientDto } from "../dtos/createPatient.dto";

import { PatientModel } from "../models/patient.model";
import { v4 as uuidv4 } from "uuid";


async function getPatient(patientId:string) {
  return await PatientModel.get(patientId);
}

async function getPatients() {
  return await PatientModel.scan().exec();
}

async function createPatient(patient:CreatePatientDto) {
  patient['id'] = uuidv4();
  return await PatientModel.create(patient);
}


export const PatientsService = { getPatient, getPatients, createPatient };