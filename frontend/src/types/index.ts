export interface User {
  username: string;
  fullName: string;
  role: string;
  token: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  qualification: string;
  experienceYears: number;
  bio: string;
  available: boolean;
}

export interface Appointment {
  id: number;
  doctor: Doctor;
  appointmentDateTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  reason: string;
  notes: string;
  createdAt: string;
}
