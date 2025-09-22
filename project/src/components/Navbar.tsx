import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('userRole'));
  const navigate = useNavigate();

  // Listen for changes in localStorage (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('userRole'));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setRole(null);
    navigate('/');
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2" onClick={() => handleLinkClick('/')}>
            <GraduationCap className="h-10 w-10 text-white hover:text-orange-100 transition-colors" />
            <span className="text-2xl font-bold hover:text-orange-100 transition-colors">Gates Institute</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`px-3 py-2 ${activeLink === '/' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/')}>Home</Link>
            <Link to="/about" className={`px-3 py-2 ${activeLink === '/about' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/about')}>About</Link>
            <Link to="/teachers" className={`px-3 py-2 ${activeLink === '/teachers' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/teachers')}>Teachers</Link>
            <Link to="/live-sessions" className={`px-3 py-2 ${activeLink === '/live-sessions' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/live-sessions')}>Live Sessions</Link>

            {token && role === 'STUDENT' && (
              <Link to="/student-dashboard" className={`px-3 py-2 ${activeLink === '/student-dashboard' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/student-dashboard')}>Student Dashboard</Link>
            )}
            {token && role === 'FACULTY' && (
              <Link to="/faculty-dashboard" className={`px-3 py-2 ${activeLink === '/faculty-dashboard' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/faculty-dashboard')}>Faculty Dashboard</Link>
            )}

            {!token ? (
              <>
                <Link to="/signin" className={`px-3 py-2 ${activeLink === '/signin' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/signin')}>Sign In</Link>
                <Link to="/signup" className="bg-white text-orange-500 px-6 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600">Sign Up</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="flex items-center px-3 py-2 hover:text-orange-100">
                <LogOut className="h-5 w-5 mr-1" /> Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-2 focus:outline-none">
              {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-orange-500 px-4 pb-4 flex flex-col space-y-4">
            <Link to="/" className={`py-2 ${activeLink === '/' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/')}>Home</Link>
            <Link to="/about" className={`py-2 ${activeLink === '/about' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/about')}>About</Link>
            <Link to="/teachers" className={`py-2 ${activeLink === '/teachers' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/teachers')}>Teachers</Link>
            <Link to="/live-sessions" className={`py-2 ${activeLink === '/live-sessions' ? 'text-orange-100' : 'hover:text-orange-100'}`} onClick={() => handleLinkClick('/live-sessions')}>Live Sessions</Link>

            {token && role === 'STUDENT' && <Link to="/student-dashboard" className="py-2" onClick={() => handleLinkClick('/student-dashboard')}>Student Dashboard</Link>}
            {token && role === 'FACULTY' && <Link to="/faculty-dashboard" className="py-2" onClick={() => handleLinkClick('/faculty-dashboard')}>Faculty Dashboard</Link>}

            {!token ? (
              <>
                <Link to="/signin" className="py-2" onClick={() => handleLinkClick('/signin')}>Sign In</Link>
                <Link to="/signup" className="py-2 bg-white text-orange-500 rounded-md text-center hover:bg-orange-100">Sign Up</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="flex items-center py-2 hover:text-orange-100">
                <LogOut className="h-5 w-5 mr-1" /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
