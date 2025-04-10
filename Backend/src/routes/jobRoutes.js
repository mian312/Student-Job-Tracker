import express from 'express';
import * as jobController from '../controllers/jobController.js';

const router = express.Router();

// POST /jobs - Create a new job application
router.post('/jobs', jobController.createJob);

// GET /jobs - Get all job applications for a user
router.get('/jobs', jobController.getJobs);

// GET /jobs/:id - Get a specific job application by ID (for the user)
router.get('/jobs/:id', jobController.getJobById);

// PUT /jobs/:id - Update a job application
router.put('/jobs/:id', jobController.updateJob);

// DELETE /jobs/:id - Delete a job application
router.delete('/jobs/:id', jobController.deleteJob);

// PATCH /jobs/:id/status - Update the status of a job application
router.patch('/jobs/:id/status', jobController.updateJobStatus);

export default router;
