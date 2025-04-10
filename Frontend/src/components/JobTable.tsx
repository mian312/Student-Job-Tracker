import React, { useState, useEffect } from 'react';
import { useJobContext } from '../context/JobContext';
import { JobApplication } from '../models/JobApplication';
import EditJobModal from './EditJobModal';

const JobTable: React.FC = () => {
  const { jobs, deleteJob, fetchJobs } = useJobContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<JobApplication | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<JobApplication[]>(jobs);

  // Handle filtering logic
  useEffect(() => {
    let result = [...jobs];
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(job => job.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter) {
      result = result.filter(job => {
        // Convert both dates to YYYY-MM-DD format for comparison
        const jobDate = new Date(job.dateOfApplication).toISOString().split('T')[0];
        return jobDate === dateFilter;
      });
    }
    
    setFilteredJobs(result);
  }, [jobs, statusFilter, dateFilter]);

  const handleEdit = (job: JobApplication) => {
    // Check if job has either id or _id
    if (!job.id && !job._id) {
      console.error("Cannot edit job without ID:", job);
      return;
    }
    
    // Create a copy of the job with id property if it doesn't exist
    const jobWithId = {
      ...job,
      id: job.id || job._id // Use existing id or _id
    };
    
    console.log("Opening edit modal for job:", jobWithId);
    setJobToEdit(jobWithId);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("Cannot delete job without ID");
      return;
    }
    
    await deleteJob(id);
    setConfirmDelete(null);
    await fetchJobs(); // Refresh the list after delete
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setJobToEdit(null);
  };

  const clearFilters = () => {
    setStatusFilter('All');
    setDateFilter('');
  };

  // Function to get badge color based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offer':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    // Fetch jobs when the component mounts
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <h2 className="mb-4 text-xl text-center font-semibold text-gray-800">Job Applications</h2>
          
          {/* Filters section */}
          <div className="flex max-sm:flex-col sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">
                Status:
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-36 py-1.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="dateFilter" className="text-sm font-medium text-gray-700">
                Date:
              </label>
              <input
                id="dateFilter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="block w-40 py-1.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            {(statusFilter !== 'All' || dateFilter) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {/* Filter summary - shows when filters are active */}
        {(statusFilter !== 'All' || dateFilter) && (
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>
              Showing
              {statusFilter !== 'All' ? ` ${statusFilter} applications` : ' all statuses'}
              {dateFilter ? ` from ${formatDate(dateFilter)}` : ''}
              {` (${filteredJobs.length} results)`}
            </span>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
              {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status History
              </th> */}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    {jobs.length === 0 ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium">No job applications yet</p>
                        <p className="text-sm mt-1">Add a job application to get started</p>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <p className="text-lg font-medium">No matching applications found</p>
                        <button 
                          onClick={clearFilters}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          Clear all filters
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job._id || job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{job.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {formatDate(job.dateOfApplication)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.link ? (
                      <a 
                        href={job.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  {/* <td className="px-6 py-4">
                    {job.statusChanges && job.statusChanges.length > 0 ? (
                      <div className="max-h-24 overflow-y-auto">
                        {[...job.statusChanges]
                          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                          .map((change, index) => (
                            <div key={index} className="text-xs text-gray-600 mb-1">
                              <span className={`inline-block w-16 px-1 py-0.5 rounded ${getStatusBadgeClass(change.status)}`}>
                                {change.status}
                              </span>
                              <span className="ml-2">
                                {new Date(change.timestamp).toLocaleString()}
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No status changes</span>
                    )}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className={`px-3 py-1.5 rounded text-xs font-medium focus:outline-none ${
                          job.status === 'Rejected' 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                        onClick={() => job.status !== 'Rejected' && handleEdit(job)}
                        disabled={job.status === 'Rejected'}
                      >
                        Edit
                      </button>
                      
                      {confirmDelete === (job._id || job.id) ? (
                        <div className="flex space-x-1">
                          <button
                            className="px-3 py-1.5 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 focus:outline-none"
                            onClick={() => job._id && handleDelete(job._id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded text-xs font-medium hover:bg-gray-200 focus:outline-none"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="px-3 py-1.5 bg-red-50 text-red-600 rounded text-xs font-medium hover:bg-red-100 focus:outline-none"
                          onClick={() => setConfirmDelete(job._id || job.id || '')}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {isEditModalOpen && jobToEdit && (
        <EditJobModal job={jobToEdit} onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default JobTable;
