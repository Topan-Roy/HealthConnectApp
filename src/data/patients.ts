export interface MedicalHistoryItem {
  id: string;
  date: string;
  condition: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  doctor?: string;
  type?: string;
}

export interface PrescriptionItem {
  id: string;
  date: string;
  diagnosis: string;
  medicines: { name: string; dosage: string; duration: string }[];
  doctorName: string;
}

export interface ReportItem {
  id: string;
  title: string;
  date: string;
  category: string;
  status: string;
  fileSize: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  avatar: string;
  lastVisit: string;
  totalAppointments: number;
  bloodGroup: string;
  phone: string;
  allergies: string;
  medicalConditions: string;
  lastAppointment: {
    dateTime: string;
    type: string;
  };
  appointmentHistory: MedicalHistoryItem[];
  prescriptions: PrescriptionItem[];
  reports: ReportItem[];
}

export const PATIENTS_DATA: Patient[] = [
  {
    id: '1',
    name: 'Rahim Ahmed',
    age: 28,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    lastVisit: '30 Aug 2026',
    totalAppointments: 4,
    bloodGroup: 'B+',
    phone: '+880 1712-345678',
    allergies: 'None',
    medicalConditions: 'None',
    lastAppointment: {
      dateTime: '30 Aug 2026, 09:00 AM',
      type: 'Video Consultation',
    },
    appointmentHistory: [
      { id: 'h1', date: '30 Aug 2026', condition: 'Viral Fever', status: 'Completed', type: 'Video Consultation' },
      { id: 'h2', date: '10 Aug 2026', condition: 'Acidity', status: 'Completed', type: 'General Consultation' },
      { id: 'h3', date: '21 Jul 2026', condition: 'Hypertension', status: 'Completed', type: 'Follow-up' },
      { id: 'h4', date: '10 Jul 2026', condition: 'Hyperlipidemia', status: 'Completed', type: 'General Consultation' },
    ],
    prescriptions: [
      {
        id: 'p1',
        date: '30 Aug 2026',
        diagnosis: 'Viral Fever',
        doctorName: 'Dr. Sarah Ahmed',
        medicines: [
          { name: 'Paracetamol 500mg', dosage: '1 tablet 3 times a day', duration: '5 days' },
          { name: 'Cetirizine 10mg', dosage: '1 tablet at night', duration: '5 days' },
        ],
      },
      {
        id: 'p2',
        date: '10 Aug 2026',
        diagnosis: 'Acidity',
        doctorName: 'Dr. Sarah Ahmed',
        medicines: [
          { name: 'Omeprazole 20mg', dosage: '1 capsule before breakfast', duration: '14 days' },
          { name: 'Antacid Gel', dosage: '2 tsp after meals', duration: '7 days' },
        ],
      },
    ],
    reports: [
      { id: 'r1', title: 'Complete Blood Count (CBC)', date: '30 Aug 2026', category: 'Hematology', status: 'Normal', fileSize: '1.2 MB' },
      { id: 'r2', title: 'Lipid Profile Test', date: '10 Jul 2026', category: 'Biochemistry', status: 'Borderline', fileSize: '850 KB' },
    ],
  },
  {
    id: '2',
    name: 'Karim Hasan',
    age: 35,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    lastVisit: '20 Aug 2026',
    totalAppointments: 2,
    bloodGroup: 'O+',
    phone: '+880 1812-456789',
    allergies: 'Penicillin',
    medicalConditions: 'Gastritis',
    lastAppointment: {
      dateTime: '20 Aug 2026, 10:30 AM',
      type: 'Follow-up',
    },
    appointmentHistory: [
      { id: 'h2-1', date: '20 Aug 2026', condition: 'Gastritis Checkup', status: 'Completed', type: 'Follow-up' },
      { id: 'h2-2', date: '05 Aug 2026', condition: 'Acute Stomach Ache', status: 'Completed', type: 'General Consultation' },
    ],
    prescriptions: [
      {
        id: 'p2-1',
        date: '20 Aug 2026',
        diagnosis: 'Gastritis',
        doctorName: 'Dr. Sarah Ahmed',
        medicines: [
          { name: 'Esomeprazole 40mg', dosage: '1 tablet before meal', duration: '14 days' },
        ],
      },
    ],
    reports: [
      { id: 'r2-1', title: 'Endoscopy Report', date: '06 Aug 2026', category: 'Gastroenterology', status: 'Mild Inflammation', fileSize: '2.4 MB' },
    ],
  },
  {
    id: '3',
    name: 'Nadia Rahman',
    age: 24,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    lastVisit: '15 Aug 2026',
    totalAppointments: 6,
    bloodGroup: 'A+',
    phone: '+880 1912-789012',
    allergies: 'Pollen',
    medicalConditions: 'Asthma',
    lastAppointment: {
      dateTime: '15 Aug 2026, 12:00 PM',
      type: 'Video Consultation',
    },
    appointmentHistory: [
      { id: 'h3-1', date: '15 Aug 2026', condition: 'Asthma Follow-up', status: 'Completed', type: 'Video Consultation' },
      { id: 'h3-2', date: '01 Aug 2026', condition: 'Seasonal Allergy', status: 'Completed', type: 'Video Consultation' },
      { id: 'h3-3', date: '12 Jul 2026', condition: 'Breathing Difficulty', status: 'Completed', type: 'Emergency Consultation' },
    ],
    prescriptions: [
      {
        id: 'p3-1',
        date: '15 Aug 2026',
        diagnosis: 'Bronchial Asthma',
        doctorName: 'Dr. Sarah Ahmed',
        medicines: [
          { name: 'Salbutamol Inhaler 100mcg', dosage: '2 puffs as needed', duration: '30 days' },
          { name: 'Montelukast 10mg', dosage: '1 tablet at bedtime', duration: '30 days' },
        ],
      },
    ],
    reports: [
      { id: 'r3-1', title: 'Chest X-Ray (PA View)', date: '12 Jul 2026', category: 'Radiology', status: 'Normal', fileSize: '3.1 MB' },
      { id: 'r3-2', title: 'Spirometry Pulmonary Function', date: '13 Jul 2026', category: 'Pulmonology', status: 'Mild Obstruction', fileSize: '1.5 MB' },
    ],
  },
  {
    id: '4',
    name: 'Farhana Islam',
    age: 31,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    lastVisit: '10 Aug 2026',
    totalAppointments: 3,
    bloodGroup: 'AB+',
    phone: '+880 1612-345671',
    allergies: 'Dust',
    medicalConditions: 'Migraine',
    lastAppointment: {
      dateTime: '10 Aug 2026, 03:00 PM',
      type: 'General Consultation',
    },
    appointmentHistory: [
      { id: 'h4-1', date: '10 Aug 2026', condition: 'Migraine Episode', status: 'Completed', type: 'General Consultation' },
      { id: 'h4-2', date: '25 Jul 2026', condition: 'Tension Headache', status: 'Completed', type: 'General Consultation' },
      { id: 'h4-3', date: '02 Jun 2026', condition: 'Routine Physical', status: 'Completed', type: 'Checkup' },
    ],
    prescriptions: [
      {
        id: 'p4-1',
        date: '10 Aug 2026',
        diagnosis: 'Migraine without aura',
        doctorName: 'Dr. Sarah Ahmed',
        medicines: [
          { name: 'Naproxen 500mg', dosage: '1 tablet when pain starts', duration: 'As needed' },
          { name: 'Flunarizine 5mg', dosage: '1 tablet at night', duration: '20 days' },
        ],
      },
    ],
    reports: [
      { id: 'r4-1', title: 'Brain MRI Screening', date: '26 Jul 2026', category: 'Radiology', status: 'Normal', fileSize: '4.8 MB' },
    ],
  },
];
