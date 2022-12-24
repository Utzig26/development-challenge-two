import api from "./http-common";
import { isError, isLoading, isSnackBar, setMessage, setPatients, filterPatients } from '../store/patient.slice';

function errorHandler(dispatch: Function, err: any) {
  dispatch(isError(true));
  (err instanceof Error)?
  dispatch(setMessage(err.message)):
  dispatch(setMessage('Unknown error'));

  dispatch(isSnackBar(true));
}

class PatientDataService {
  async getAll(dispatch: Function, limit?: number, startAt?: string) {
    dispatch(isLoading(true)); 
    
    try {
      const {patients} = (await api.get('/patients', {params:{ limit: limit, startAt: startAt }})).data;
      dispatch(setPatients(patients));
      dispatch(isError(false));
    } catch (err) {
      errorHandler(dispatch, err);
    } finally { 
      dispatch(isLoading(false)); 
    }
  }

  async get(dispatch: Function, id: string) {
    dispatch(isLoading(true));

    try {
      const {patient} = (await api.get(`/patients/${id}`)).data;
      dispatch(setPatients([patient]));
      dispatch(isError(false));
    } catch(err){ 
      errorHandler(dispatch, err); 
    } finally { 
      dispatch(isLoading(false)); 
    }
  }

  async create(dispatch: Function, data: Patient) {
    dispatch(isLoading(true)); 
    try{ 
      const {patient} = (await api.post('/patients', data)).data;
      dispatch(setPatients([patient]));
      dispatch(setMessage('Patient created successfully'));
      dispatch(isSnackBar(true));
      dispatch(isError(false));
    } catch(err){
      errorHandler(dispatch, err);
    } finally{
      dispatch(isLoading(false)); 
    }
  }

  async update(dispatch: Function, id: string, data: Patient) {
    try{
      const {patient} = (await api.put(`/patients/${id}`, data)).data;
      dispatch(setPatients([patient]));
      dispatch(setMessage('Patient updated successfully'));
      dispatch(isSnackBar(true));
      dispatch(isError(false));
    } catch(err){
      errorHandler(dispatch, err);
    } finally{
      dispatch(isLoading(false)); 
    }
  }

  async delete(dispatch: Function, id: string) {
    dispatch(isLoading(true)); 
    try{
      await api.delete(`/patients/${id}`);
      dispatch(setMessage('Patient deleted successfully'));
      dispatch(filterPatients(id));
      dispatch(isSnackBar(true));
      dispatch(isError(false));
    } catch(err){
      errorHandler(dispatch, err);
    } finally{ 
      dispatch(isLoading(false)); 
    }
  }
}

export default new PatientDataService();
