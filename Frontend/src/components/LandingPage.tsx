import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ListChecks, RefreshCw, Trash2, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Add Job Applications",
      image: "/img/add.jpg",
      description: "Easily log new job applications with key details: Company, Role, Status, Application Date, and Link.",
      icon: <Briefcase className="mb-2" />
    },
    {
      title: "List All Applications",
      image: "/img/list.jpg",
      description: "View all your applications in a clean layout with filtering options by status or date.",
      icon: <ListChecks className="mb-2" />
    },
    {
      title: "Update Status",
      image: "/img/update.jpg",
      description: "Quickly update application status as you progress through the hiring process.",
      icon: <RefreshCw className="mb-2" />
    },
    {
      title: "Delete Applications",
      image: "/img/delete.jpg",
      description: "Remove job entries that are no longer relevant to keep your tracking list clean.",
      icon: <Trash2 className="mb-2" />
    }
  ];

  // Auto-sliding functionality for features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [features.length]);


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Keep Track of Your Job Applications</h1>
              <p className="text-xl mb-8 text-blue-100">A simple, effective way for students to organize and monitor their job search process.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="bg-white text-indigo-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-center">
                  Start Tracking
                </Link>
                <Link to="/demo" className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-center">
                  View Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features - Updated with auto-sliding */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple Features, Powerful Results</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our student job tracker focuses on the essentials, giving you exactly what you need without any complexity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="items-center">
              <div className="bg-white p-4 rounded-lg shadow-xl w-full md:max-w-2xl mx-auto">
                {/* Improved image container with better responsive handling */}
                <div className="relative h-64 md:h-80">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-500 ease-in-out ${activeFeature === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="rounded-lg max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Info box with animated transition */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="relative min-h-32">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${activeFeature === index ? 'opacity-100 transform translate-y-0 z-10' : 'opacity-0 transform translate-y-4 z-0'
                          }`}
                      >
                        <h4 className="font-bold text-blue-800">{feature.title}</h4>
                        <p className="text-blue-700">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`h-2 rounded-full transition-all ${activeFeature === index ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Organize Your Job Search?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">Stop using spreadsheets and start tracking your applications with our simple, focused tool.</p>
          <Link to="/login" className="inline-flex items-center bg-white text-indigo-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg">
            Start Tracking Now
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-center m-2">Student Job Tracker</h3>
              <p className="text-gray-400">Simple job application tracking for students</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-400 hover:text-white">About</Link>
              <Link to="/" className="text-gray-400 hover:text-white">Contact</Link>
              <Link to="/" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link to="/" className="text-gray-400 hover:text-white">Terms</Link>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Student Job Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;