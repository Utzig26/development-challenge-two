import api from "./http-common";
import { isError, isLoading, setMessage, setPatients } from '../store/patient.slice';
class PatientDataService {
  async getAll(dispatch: Function, limit?: number, startAt?: string) {
    
    dispatch(isLoading(true)); 
    
    try {
      const {patients} = (await api.get('/patients', {params:{ limit: limit, startAt: startAt }})).data;
      dispatch(setPatients(patients));

    } catch (err) {
      dispatch(isError(true));
      (err instanceof Error)?
        dispatch(setMessage(err.message)):
        dispatch(setMessage('Unknown error'));

    } finally { dispatch(isLoading(false)); }
  }

  get(id: string) {
    return api.get(`/patients/${id}`);
  }

  create(data: Patient) {
    return api.post("/patients", data);
  }

  update(id: string, data: Patient) {
    return api.put(`/patients/${id}`, data);
  }

  delete(id: string) {
    return api.delete(`/patients/${id}`);
  }
}

export default new PatientDataService();
