import * as Dynamoose from 'dynamoose';
import { SchemaDefinition } from 'dynamoose/dist/Schema';

const PatientSchema:SchemaDefinition = {
  id: {
    type: String,
    hashKey: true,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  birthDate: {
    type: String,
    required: true,
  },

  address: {
    type: Object,
    required: true,
    schema: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
    },
  },
};

function getPatientsTableEnvVar() {
  if (!process.env.PATIENTS_TABLE) {
    throw new Error('PATIENTS_TABLE env var is not defined');
  }
    return process.env.PATIENTS_TABLE;
}

export const PatientModel = Dynamoose.model(
  getPatientsTableEnvVar(),
  PatientSchema
);
