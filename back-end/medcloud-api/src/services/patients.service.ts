import { CreatePatientDto } from "../dtos/createPatient.dto";

import { PatientModel } from "../models/patient.model";
import { v4 as uuidv4 } from "uuid";

async function createPatient(patient:CreatePatientDto) {
  patient['id'] = uuidv4();
  return await PatientModel.create(patient);
}

async function getPatient(patientId:string) {
  return await PatientModel.get(patientId);
}

export const PatientsService = { createPatient, getPatient };