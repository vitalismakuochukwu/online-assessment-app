import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Internal Component for My Courses View
const MyCoursesView = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const response = await fetch('https://online-assessment-backend-60ij.onrender.com/api/materials/student', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setMaterials(data);
        } else {
          setError('Failed to load materials');
        }
      } catch (err) {
        setError('Network error.');
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Materials...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Study Materials & Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((file) => (
          <div key={file._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start space-x-4">
            <div className="text-4xl">{file.fileType && file.fileType.includes('pdf') ? '📄' : '🎥'}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-800 truncate" title={file.title}>{file.title}</h4>
              <p className="text-sm text-gray-500 mb-2">{file.course}</p>
              <a href={`https://online-assessment-backend-60ij.onrender.com${file.filePath}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View / Download</a>
            </div>
          </div>
        ))}
        {materials.length === 0 && <p className="text-gray-500 col-span-full">No materials available.</p>}
      </div>
    </div>
  );
};

// Internal Component for Assignments View
const MyAssignmentsView = ({ assignments, loading, error }) => {
  if (loading) return <div className="p-8 text-center text-gray-500">Loading Assignments...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Assignments</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {assignments.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-800">{assignment.title}</h3>
                    <span className="text-sm font-medium text-red-600">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{assignment.course}</p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{assignment.description}</p>
                <div className="flex justify-end">
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-200 transition">
                    View & Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">You have no pending assignments.</p>
        )}
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [availableTests, setAvailableTests] = useState([]);
  const [myResults, setMyResults] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(true);
  const [assignmentsError, setAssignmentsError] = useState('');
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'courses' | 'assignments' etc.
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch('https://online-assessment-backend-60ij.onrender.com/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStudentName(data.fullName);
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();

    const fetchAvailableTests = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('https://online-assessment-backend-60ij.onrender.com/api/tests/available', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setAvailableTests(data);
          }
        } catch (error) {
          console.error('Failed to fetch available tests', error);
        }
      }
    };
    fetchAvailableTests();

    const fetchMyResults = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('https://online-assessment-backend-60ij.onrender.com/api/tests/my-results', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setMyResults(data);
          }
        } catch (error) {
          console.error('Failed to fetch my results', error);
        }
      }
    };
    fetchMyResults();

    const fetchAssignments = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          setAssignmentsLoading(true);
          const response = await fetch('https://online-assessment-backend-60ij.onrender.com/api/assignments/student', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok) setMyAssignments(data);
          else setAssignmentsError("Failed to load assignments.");
        } catch (error) {
          console.error('Failed to fetch assignments', error);
          setAssignmentsError("Network error loading assignments.");
        } finally {
          setAssignmentsLoading(false);
        }
      }
    };
    fetchAssignments();
  }, [navigate]);

  const student = {
    name: studentName || "Student",
    progress: 65, // Percentage
    recentActivity: "Yesterday you scored 90% in Algebra I!",
  };

  // Calculate pending tests (tests not yet taken)
  const pendingTests = availableTests.filter(test => !myResults.some(r => r.test === test._id));
  const pendingCount = pendingTests.length;

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 text-2xl font-bold text-blue-400 border-b border-gray-800 flex justify-between items-center">
          <span className="truncate">OnlineAssess</span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <button onClick={() => { setActiveView('dashboard'); setIsSidebarOpen(false); }} className={`flex items-center px-4 py-3 w-full text-left rounded-lg transition-colors ${activeView === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <span className="mr-3">🏠</span> Dashboard
          </button>
          <button onClick={() => { setActiveView('courses'); setIsSidebarOpen(false); }} className={`flex items-center px-4 py-3 w-full text-left rounded-lg transition-colors ${activeView === 'courses' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <span className="mr-3">📚</span> My Courses
          </button>
          <button onClick={() => { setActiveView('assignments'); setIsSidebarOpen(false); }} className={`flex items-center px-4 py-3 w-full text-left rounded-lg transition-colors ${activeView === 'assignments' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <span className="mr-3">📝</span> Assignments
          </button>
          <button onClick={() => { setActiveView('grades'); setIsSidebarOpen(false); }} className={`flex items-center px-4 py-3 w-full text-left rounded-lg transition-colors ${activeView === 'grades' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <span className="mr-3">📊</span> Grades
          </button>
          <button onClick={() => { setActiveView('schedule'); setIsSidebarOpen(false); }} className={`flex items-center px-4 py-3 w-full text-left rounded-lg transition-colors ${activeView === 'schedule' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <span className="mr-3">📅</span> Schedule
          </button>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-between items-center h-16 px-6">
            {/* Mobile menu button (visible on small screens) */}
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-500 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>

            {/* Right Side: Profile Dropdown */}
            <div className="flex items-center">
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500">Student</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border-2 border-blue-200">
                    {student.name.charAt(0)}
                  </div>
                  <svg className={`h-4 w-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{student.name}</p>
                    </div>
                    <Link to="/view-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                      My Profile
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                      Update Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                      Account Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="container mx-auto max-w-6xl">
            
            {activeView === 'dashboard' && (
            <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {student.name}! 👋
              </h1>
            </header>

            {/* 1. Pending Action Card (The "Watchdog") */}
            {pendingCount > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center animate-pulse-slow">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-red-700 flex items-center">
                    <span className="mr-2">⚠️</span> Action Required
                  </h3>
                  <p className="text-red-600 mt-1">
                    You have <span className="font-bold">{pendingCount}</span> pending exam(s) waiting for your attention.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    // Scroll to tests section or navigate to first pending test
                    const firstPending = pendingTests[0];
                    if(firstPending) navigate(`/take-test/${firstPending._id}`);
                  }}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-md whitespace-nowrap"
                >
                  Take Exam Now
                </button>
              </div>
            )}

            {/* 2. Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Enrolled Courses</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">4</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Tests Completed</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{myResults.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Average Score</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">--</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">📝</span>
                    Available Tests
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availableTests.length > 0 ? availableTests.map((test) => {
                      const isTaken = myResults.some(r => r.test === test._id);
                      
                      return (
                      <div key={test._id} className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group ${isTaken ? 'opacity-75' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{test.title}</h3>
                          {isTaken ? (
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">Completed</span>
                          ) : (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">New</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{test.category}</p>
                        <div className="flex items-center text-gray-500 text-sm mb-6">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          Time Limit: {test.duration} mins
                        </div>
                        
                        {isTaken ? (
                          <div className="flex space-x-3">
                            <button disabled className="flex-1 bg-gray-100 text-gray-400 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed border border-gray-200">
                              Taken
                            </button>
                            <button onClick={() => navigate(`/test-result/${test._id}`)} className="flex-1 bg-blue-50 text-blue-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-100 transition border border-blue-100">
                              View Score
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => navigate(`/take-test/${test._id}`)}
                            className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition active:scale-95 shadow-md shadow-blue-200"
                          >
                            Start Test
                          </button>
                        )}
                      </div>
                    )}) : (
                      <p className="text-gray-500 col-span-2">No tests available at the moment.</p>
                    )}
                  </div>
                </section>
              </div>

              <aside className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Your Progress</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Course Completion
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {student.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                      <div style={{ width: `${student.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 italic">"{student.recentActivity}"</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
            </>
            )}

            {activeView === 'courses' && <MyCoursesView />}
            
            {activeView === 'assignments' && <MyAssignmentsView assignments={myAssignments} loading={assignmentsLoading} error={assignmentsError} />}
            
            {activeView === 'grades' && <div className="p-8 text-center text-gray-500">Grades view is under development.</div>}
            
            {activeView === 'schedule' && <div className="p-8 text-center text-gray-500">Schedule view is under development.</div>}

          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;