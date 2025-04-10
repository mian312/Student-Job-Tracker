import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { JobApplication } from '../models/JobApplication';

interface AddJobModalProps {
  onClose: () => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ onClose }) => {
  const { addJob } = useJobContext();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<JobApplication['status']>('Applied');
  const [dateOfApplication, setDateOfApplication] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Add initial status change entry
      const initialStatusChange = {
        status: status,
        timestamp: new Date().toISOString(),
      };

      // Create the job object
      const newJob = {
        company,
        role,
        status,
        dateOfApplication,
        link,
        statusChanges: [initialStatusChange],
      };

      // Call the addJob function from context
      await addJob(newJob);
      
      // Close the modal on success
      onClose();
    } catch (error: any) {
      console.error("Error adding job:", error);
      setError(error.message || "Failed to add job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add New Job Application
            </h3>
            
            {error && (
              <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                  Company:
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="company" 
                  type="text" 
                  placeholder="Company" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role:
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="role" 
                  type="text" 
                  placeholder="Role" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Status:
                </label>
                <select 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="status" 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as JobApplication['status'])} 
                  required
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfApplication">
                  Date of Application:
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="dateOfApplication" 
                  type="date" 
                  value={dateOfApplication} 
                  onChange={(e) => setDateOfApplication(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
                  Link:
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="link" 
                  type="url" 
                  placeholder="Job Link (optional)" 
                  value={link} 
                  onChange={(e) => setLink(e.target.value)} 
                />
              </div>
              <div className="flex items-center justify-between">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Add Job'}
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="button" 
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;