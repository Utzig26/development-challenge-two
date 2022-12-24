import  patientSerivce  from '../api/patients.service'
import { setError, setLoading, setMessage } from './patient.slice';

const getPatients = async (dispatch: Function) => {
    dispatch(setLoading(true));

    try {
      const patients = await patientSerivce.get('');
      console.log(patients);

    } catch (err) {
      dispatch(setError(true));
      err instanceof Error?
        dispatch(setMessage(err.message)):
        dispatch(setMessage('Unknown error'));

    } finally {
      dispatch(setLoading(false));
    
    }
}

export default getPatients;
