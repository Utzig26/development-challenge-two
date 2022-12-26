import * as Yup from 'yup';

const PatientSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required')
    .max(128, 'Name too long'),
  
    lastName: Yup.string()
    .required('Required')
    .max(128, 'Name too long'),
  
    email: Yup.string()
    .email('Invalid email')
    .max(256, 'Email too long')
    .required('Required'),

  birthDate: Yup.date()
    .required('Required'),

  address: Yup.object({
    street: Yup.string()
      .required('Required'),
    city: Yup.string()
      .required('Required'),
    state: Yup.string()
      .required('Required'),
    zip: Yup.string()
      .required('Required'),
  }),

});

export default PatientSchema;
