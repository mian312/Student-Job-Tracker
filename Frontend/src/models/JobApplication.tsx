export interface JobApplication {
  id?: string;
  _id?: string; // MongoDB's _id field
  userId: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  dateOfApplication: string;
  link?: string;
  statusChanges?: StatusChange[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface StatusChange {
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  timestamp: string;
}
