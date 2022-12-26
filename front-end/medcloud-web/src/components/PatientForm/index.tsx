import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { useFormik, getIn} from "formik"
import PatientSchema from "../../schemas/patient.schema"
import patientsService from "../../api/patients.service";
import { useAppDispatch } from "../../hooks";
import { useAppSelector } from "../../hooks";
const blankPatient:Patient = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  birthDate: (new Date(Date.now()).toISOString().split('T')[0]),
  address: {
    street: '',
    city: '',
    state: '',
    zip: ''
  }
}

const PatientForm = (props: {setOpen?:Function}) => {
  const {setOpen} = props;
  const patient = useAppSelector(state => state.patients.patient);
  console.log(blankPatient?.birthDate);
  const dispatch = useAppDispatch();
  const validation = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: PatientSchema,
    initialValues: patient? patient: blankPatient,
    onSubmit: (values) => {
      patient? 
        patientsService.update(dispatch, patient.id, values):
        patientsService.create(dispatch, values);
      setOpen?
        setOpen(false):
        null;
    },
  })
  
  return(
  <>
    <form onSubmit={validation.handleSubmit}>
      <Box display={"flex"} flexDirection={"column"}>
        <Box>
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            type="text"
            value={validation.values.firstName}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            error={
              validation.touched.firstName && 
              Boolean(validation.errors.firstName)
            }
            helperText={
              getIn(validation.touched, 'firstName') && 
              validation.errors.firstName
            }
            style={{ width: "200px", margin: "5px" }}
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            type="text"
            value={validation.values.lastName}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            error={
              validation.touched.lastName && 
              Boolean(validation.errors.lastName)
            }
            helperText={
              getIn(validation.touched, 'lastName') && 
              validation.errors.lastName
            }
            style={{ width: "200px", margin: "5px" }}
          />
        </Box>
        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          value={validation.values.email}
          onBlur={validation.handleBlur}
          onChange={validation.handleChange}
          error={
            validation.touched.email && 
            Boolean(validation.errors.email)
          }
          helperText={
            getIn(validation.touched, 'email') && 
            validation.errors.email
          }
          style={{ width: "200px", margin: "5px" }}
        />
      <TextField
        id="birthDate"
        label="Birth date"
        variant="outlined"
        type="date"
        value={validation.values.birthDate}
        onBlur={validation.handleBlur}
        onChange={validation.handleChange}
        error={
          validation.touched.birthDate && 
          Boolean(validation.errors.birthDate)
        }
        helperText={
          getIn(validation.touched, 'birthDate') && 
          validation.errors.birthDate
        }
        style={{ width: "200px", margin: "5px" }}
      />
      <Divider sx={{margin: "5px"}} />
      <Typography variant="h6" color="text.seccondary">Address</Typography>
      <TextField
        id="address.street"
        label="Street"
        variant="outlined"
        type="text"
        value={validation.values.address.street}
        onBlur={validation.handleBlur}
        onChange={validation.handleChange}
        error={Boolean(
          getIn(validation.touched, 'address.street') && 
          getIn(validation.errors, 'address.street')
        )}
        helperText={
          getIn(validation.touched, 'address.street') && 
          getIn(validation.errors, 'address.city')
        }
        style={{ width: "200px", margin: "5px" }}
      />
      <TextField
        id="address.city"
        label="City"
        variant="outlined"
        type="text"
        value={validation.values.address.city}
        onBlur={validation.handleBlur}
        onChange={validation.handleChange}
        error={Boolean(
          getIn(validation.touched, 'address.city') && 
          getIn(validation.errors, 'address.city')
        )}
        helperText={
          getIn(validation.touched, 'address.city')&& 
          getIn(validation.errors, 'address.city')
        }
        style={{ width: "200px", margin: "5px" }}
      />
      <TextField
        id="address.state"
        label="State"
        variant="outlined"
        type="text"
        value={validation.values.address.state}
        onBlur={validation.handleBlur}
        onChange={validation.handleChange}
        error={Boolean(
          getIn(validation.touched, 'address.state') && 
          getIn(validation.errors, 'address.state'))
        }
        helperText={
          getIn(validation.touched, 'address.state') && 
          getIn(validation.errors, 'address.state')
        }
        style={{ width: "200px", margin: "5px" }}
      />
      <TextField
        id="address.zip"
        label="Zip"
        variant="outlined"
        type="text"
        value={validation.values.address.zip}
        onBlur={validation.handleBlur}
        onChange={validation.handleChange}
        error={Boolean(
          getIn(validation.touched, 'address.zip') && 
          getIn(validation.errors, 'address.zip')
        )}
        helperText={
          getIn(validation.touched, 'address.zip') && 
          getIn(validation.errors, 'address.zip')
        }
        style={{ width: "200px", margin: "5px" }}
      />
      </Box>
      <Button type="submit" color="success">
        Save
      </Button>
    </form> 
  </>
 )
}

export default PatientForm;