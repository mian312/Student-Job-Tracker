import JobApplication from '../models.js';

// POST /jobs - Create a new job application
export const createJob = async (req, res) => {
  try {
    const { company, role, status, dateOfApplication, link } = req.body;
    const userId = req.user.userId; // Get user ID from authentication

    const newJob = new JobApplication({
      userId,
      company,
      role,
      status,
      dateOfApplication,
      link,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /jobs - Get all job applications for a user
export const getJobs = async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from authentication
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const jobs = await JobApplication.find({ userId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /jobs/:id - Get a specific job application by ID (for the user)
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const job = await JobApplication.findOne({ _id: id, userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /jobs/:id - Update a job application
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { company, role, status, dateOfApplication, link } = req.body;

    const updatedJob = await JobApplication.findOneAndUpdate(
      { _id: id, userId },
      { company, role, status, dateOfApplication, link },
      { new: true } // Returns the updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /jobs/:id - Delete a job application
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const deletedJob = await JobApplication.findOneAndDelete({ _id: id, userId });

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /jobs/:id/status - Update the status of a job application
export const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { status } = req.body;

    const job = await JobApplication.findOne({ _id: id, userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = status;
    job.statusChanges.push({ status: status, timestamp: new Date().toISOString() });
    const updatedJob = await job.save();

    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
