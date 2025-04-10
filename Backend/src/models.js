import mongoose from 'mongoose';

// Status change schema (for tracking job status history)
const statusChangeSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Main job application schema
const jobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true // Add index for faster queries by userId
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied',
    required: true
  },
  dateOfApplication: {
    type: Date,
    required: true
  },
  link: {
    type: String
  },
  statusChanges: [statusChangeSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create the model
const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
