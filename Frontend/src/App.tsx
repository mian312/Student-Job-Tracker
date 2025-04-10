import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import './App.css';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

function App() {
  const { isSignedIn } = useUser();

  return (
    <AuthProvider>
      <JobProvider>
        <BrowserRouter>
          <div className="bg-gray-100 h-screen">
            <Routes>
              <Route path="/" element={isSignedIn ? <Dashboard /> : <LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
