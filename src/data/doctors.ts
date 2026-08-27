export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  hospital: string;
  languages: string;
  about: string;
  availableSlots: string[];
}

export const DOCTORS_DATA: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    specialty: 'Cardiologist',
    experience: '8 Years',
    rating: 4.8,
    reviews: 124,
    price: '800',
    image: 'https://i.pravatar.cc/150?img=47',
    hospital: 'Square Hospital, Dhaka',
    languages: 'English, Bengali',
    about: 'Experienced cardiologist with expertise in heart ECG, and prevention.',
    availableSlots: ['10:00 AM', '12:00 PM', '04:00 PM', '04:30 PM', '05:30 PM'],
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    experience: '10 Years',
    rating: 4.7,
    reviews: 98,
    price: '700',
    image: 'https://i.pravatar.cc/150?img=11',
    hospital: 'United Hospital, Dhaka',
    languages: 'English, Bengali',
    about: 'Senior neurologist specialized in stroke, epilepsy, and headache management.',
    availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '05:00 PM'],
  },
  {
    id: '3',
    name: 'Dr. Nabila Khan',
    specialty: 'Dermatologist',
    experience: '6 Years',
    rating: 4.6,
    reviews: 87,
    price: '800',
    image: 'https://i.pravatar.cc/150?img=5',
    hospital: 'Popular Medical, Dhaka',
    languages: 'English, Bengali',
    about: 'Skin specialist with focus on acne, eczema and cosmetic dermatology.',
    availableSlots: ['10:00 AM', '01:00 PM', '03:30 PM', '06:00 PM'],
  },
  {
    id: '4',
    name: 'Dr. Fahim Ahmed',
    specialty: 'Orthopedic',
    experience: '9 Years',
    rating: 4.5,
    reviews: 110,
    price: '700',
    image: 'https://i.pravatar.cc/150?img=8',
    hospital: 'Labaid Hospital, Dhaka',
    languages: 'English, Bengali',
    about: 'Orthopedic surgeon specializing in joint replacement and sports injuries.',
    availableSlots: ['08:30 AM', '11:30 AM', '03:00 PM', '05:30 PM'],
  },
];
