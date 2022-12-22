import { PatientDto } from "../dtos/patient.dto";
import { v4 as uuidv4 } from "uuid";

import { PartialPatientDto } from "../dtos/partialPatient.dto.js";
import { PatientModel } from "../models/patient.model.js";


async function getPatient(patientId:string) {
  return await PatientModel.get(patientId);
}

async function getPatients(limit:number, startAt?:string) {
  if(!startAt) {
    return await PatientModel.scan().limit(limit).exec();
  }
  return await PatientModel.scan().startAt({id: startAt}).limit(limit).exec();
}

async function createPatient(patient:PatientDto) {
  patient['id'] = uuidv4();
  return await PatientModel.create(patient);
}

async function deletePatient(patientId:string) {
  return await PatientModel.delete(patientId);
}

async function updatePatient(patientId:string, patient:PatientDto) {
  return await PatientModel.update(patientId, patient);
}

async function patchPatient(patientId:string, patient:PartialPatientDto) {
  return await PatientModel.update(patientId, patient);
}

export const PatientsService = { 
  getPatient, 
  getPatients, 
  createPatient, 
  deletePatient, 
  updatePatient, 
  patchPatient
};