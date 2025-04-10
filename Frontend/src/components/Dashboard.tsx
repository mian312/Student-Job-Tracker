import React, { useState } from 'react';
import AddJobModal from './AddJobModal';
import JobTable from './JobTable';
import { useJobContext } from '../context/JobContext';
import { UserButton } from '@clerk/clerk-react';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { jobs } = useJobContext();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Calculate statistics
  const totalApplications = jobs.length;
  const interviewApplications = jobs.filter(job => job.status === 'Interview').length;
  const offerApplications = jobs.filter(job => job.status === 'Offer').length;
  const rejectedApplications = jobs.filter(job => job.status === 'Rejected').length;
  const activeApplications = totalApplications - rejectedApplications;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Job Application Tracker</h1>
              <div className="absolute top-10 sm:top right-4 z-10">
                <UserButton />
              </div>
              <p className="text-gray-600 mt-1 max-sm:hidden">Keep track of your job search progress</p>
            </div>
            <button
              onClick={openModal}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Job Application
            </button>
          </div>
        </header>

        {/* Dashboard Stats */}
        <div className="w-full px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {/* Total Applications Card */}
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-t-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Total Applications</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{totalApplications}</p>
                </div>
                <div className="bg-blue-100 p-1 md:p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Active Applications Card */}
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-t-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Active Applications</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{activeApplications}</p>
                </div>
                <div className="bg-green-100 p-1 md:p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Interviews Card */}
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-t-4 border-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Interviews</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{interviewApplications}</p>
                </div>
                <div className="bg-yellow-100 p-1 md:p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Offers Card */}
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-t-4 border-purple-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Offers</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{offerApplications}</p>
                </div>
                <div className="bg-purple-100 p-1 md:p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <JobTable />
        </div>
      </div>

      {isModalOpen && <AddJobModal onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;
