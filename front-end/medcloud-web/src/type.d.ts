
interface Address{
    city: string;
    state: string;
    street: string;
    zip: string;
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  address: address;
  email: string;
}

interface PatientState {
  error: boolean;
  loading: boolean;
  snackBar: boolean;
  message: string;
  patients: Patient[];
  perPage: number;
}

