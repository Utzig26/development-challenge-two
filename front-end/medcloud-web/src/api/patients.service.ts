import api from "./http-common";

class PatientDataService {
  async getAll() {
    return await api.get("/patients");
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