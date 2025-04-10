import React, { createContext, useState, useContext, useEffect } from 'react';
import { JobApplication } from '../models/JobApplication';
import { useAuth } from './AuthContext';

interface JobContextProps {
  jobs: JobApplication[];
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<JobApplication, 'id' | '_id' | 'userId'>) => Promise<void>;
  updateJob: (job: JobApplication) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateJobStatus: (id: string, status: JobApplication['status']) => Promise<void>;
  clearJobs: () => void;
  userId: string | null;
}

const API_URL = import.meta.env.VITE_API_URL;

const JobContext = createContext<JobContextProps | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  const fetchJobs = async (): Promise<void> => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/jobs?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      setJobs(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (job: Omit<JobApplication, 'id' | '_id' | 'userId'>): Promise<void> => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Create a properly formatted job object with userId
      const jobData = {
        ...job,
        userId, // Ensure userId from Clerk is included
        // Ensure statusChanges is properly formatted
        statusChanges: job.statusChanges || [{
          status: job.status,
          timestamp: new Date().toISOString()
        }]
      };
      
      console.log('Sending job data with userId:', JSON.stringify(jobData));
      
      // Send userId both in the URL query and request body to ensure it's received
      const response = await fetch(`${API_URL}/jobs?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        let errorMessage = `Failed to add job: ${response.status} ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) errorMessage += ` - ${errorData.message}`;
        } catch (e) {
          // If the error response isn't valid JSON, use the raw text
          if (errorText) errorMessage += ` - ${errorText}`;
        }
        throw new Error(errorMessage);
      }
      
      const newJob = await response.json();
      setJobs(prev => [...prev, newJob]);
    } catch (err: any) {
      console.error('Error adding job:', err);
      setError(err.message || 'An error occurred while adding job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (job: JobApplication): Promise<void> => {
    if (!userId) return;
    
    // Use either id or _id, whichever is available
    const jobId = job.id || job._id;
    
    if (!jobId) {
      setError('Cannot update job: Missing job ID');
      throw new Error('Cannot update job: Missing job ID');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Updating job with ID:', jobId);
      
      const response = await fetch(`${API_URL}/jobs/${jobId}?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...job,
          userId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update job');
      }
      
      const updatedJob = await response.json();
      
      // Update the jobs state with the updated job
      setJobs(prev => prev.map(j => (j.id === jobId || j._id === jobId) ? updatedJob : j));
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the job');
      console.error('Error updating job:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (id: string, status: JobApplication['status']): Promise<void> => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get the current job to access its current status
      const currentJob = jobs.find(job => job.id === id || job._id === id);
      if (!currentJob) {
        throw new Error('Job not found');
      }
      
      // Only add a status change if the status is actually changing
      if (currentJob.status !== status) {
        const newStatusChange = {
          status,
          timestamp: new Date().toISOString()
        };
        
        const response = await fetch(`${API_URL}/jobs/${id}/status?userId=${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            status, 
            userId,
            statusChanges: [...(currentJob.statusChanges || []), newStatusChange]
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update job status');
        }
        
        const updatedJob = await response.json();
        setJobs(prev => prev.map(job => (job.id === id || job._id === id) ? updatedJob : job));
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating job status');
      console.error('Error updating job status:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string): Promise<void> => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/jobs/${id}?userId=${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting job');
      console.error('Error deleting job:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearJobs = () => setJobs([]);

  // Fetch jobs when userId changes
  useEffect(() => {
    if (userId) {
      fetchJobs();
    } else {
      clearJobs();
    }
  }, [userId]);

  return (
    <JobContext.Provider value={{
      userId,
      jobs,
      loading,
      error,
      fetchJobs,
      addJob,
      updateJob,
      updateJobStatus,
      deleteJob,
      clearJobs
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
