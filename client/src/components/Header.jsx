import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import nssLogo from '../assets/nss-logo.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setDropdownOpen(null); // Close all dropdowns when toggling menu
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index); // Toggle specific dropdown
  };

  const scrollToNotice = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('notice-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('notice-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const navItems = [
    { name: 'CSVTU', path: 'https://csvtu.ac.in/', external: true },
    {
      name: 'Organisation',
      dropdown: [
        { name: 'About Us', path: '/organisation/about-us' },
        { name: 'Aim and Objective', path: '/organisation/aim-objective' },
        { name: 'Administrative Structure', path: '/organisation/admin-structure' },
        { name: 'CSVTU NSS Units', path: '/organisation/nss-units' },
        { name: 'Programme Co-ordinator', path: '/organisation/coordinator' },
        { name: 'FAQ', path: '/organisation/faq' },
      ],
    },
    { 
      name: 'Notice', 
      action: () => {
        if (location.pathname === '/') {
          const el = document.getElementById('noticeboard');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
          }
        } else {
          navigate('/');
          setTimeout(() => {
            const el = document.getElementById('noticeboard');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        }
      }
    },
    { name: 'Awards', path: '/awards' },
    { name: 'Events', path: '/events' },
    {
      name: 'Gallery',path: '/gallery',
    },
    {
      name: 'Documents',
      dropdown: [
        { name: 'Monthly Reports', path: '/documents/monthly-reports' },
        { 
          name: 'NSS Manual', 
          path: 'https://drive.google.com/file/d/1RCcbuzaep39ObSB-TYwd4IB2OX5L5Dme/view?usp=sharing', // Replace with actual Google Drive file ID
          external: true 
        },
      ],
    },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <header className="p-4 bg-gray-800 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Clickable Logo + Title */}
        <Link to="./" className="flex items-center flex-shrink-0">
          <img src={nssLogo} alt="NSS CSVTU Logo" className="h-12" />
          <h1 className="ml-4 text-2xl font-bold text-white">NSS CSVTU</h1>
        </Link>
      </div>

        {/* Middle: Nav Menu (hidden on smaller screens) */}
        <nav className="hidden xl:flex space-x-6 items-center">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(idx)}
                    className="text-lg font-medium text-white hover:text-blue-400 px-2 py-1 inline-block"
                  >
                    {item.name}
                  </button>
                  {dropdownOpen === idx && (
                    <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded-md w-48 z-50 shadow-lg">
                      {item.dropdown.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          to={subItem.path}
                          onClick={() => setDropdownOpen(null)}
                          className="block px-4 py-2 text-white hover:text-blue-400 text-base transition-colors duration-200 hover:bg-gray-700 rounded"
                          target={subItem.external ? '_blank' : '_self'}
                          rel={subItem.external ? 'noopener noreferrer' : ''}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : item.action ? (
                <button
                  onClick={item.action}
                  className={`text-lg font-medium px-2 py-1 ${
                    item.name === 'Notice'
                      ? 'text-white hover:text-blue-400 rounded'
                      : 'text-white hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="text-lg font-medium text-white hover:text-blue-400 px-2 py-1"
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : ''}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Auth + Hamburger */}
        <div className="flex items-center space-x-4">
          {/* Auth (hidden on mobile when hamburger is visible) */}
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden xl:inline bg-white text-black px-4 py-2 rounded hover:bg-blue-600 hover:text-white text-lg transition duration-200"
            >
              Logout
            </button>
          ) : (
            // Removed Login button as per request
            null
          )}

          {/* Hamburger */}
          <button
            className="xl:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        className={`xl:hidden transition-all duration-300 bg-gray-800 ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex flex-col space-y-2 p-4">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(idx)}
                    className="block text-white font-medium text-base text-left w-full py-2 hover:text-blue-400"
                  >
                    {item.name}
                  </button>
                  {dropdownOpen === idx && (
                    <div className="ml-4 flex flex-col">
                      {item.dropdown.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          to={subItem.path}
                          className="block text-white text-sm hover:text-blue-400 py-1 px-2 transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                          target={subItem.external ? '_blank' : '_self'}
                          rel={subItem.external ? 'noopener noreferrer' : ''}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : item.action ? (
                <button
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className={`text-white text-base text-left py-2 hover:text-blue-400 ${
                    item.name === 'Notice' ? 'bg-black px-2 rounded' : ''
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white text-base py-2 block hover:text-blue-400"
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : ''}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Login/Logout */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="bg-white text-black px-4 py-2 rounded hover:bg-blue-600 hover:text-white text-lg mt-4"
            >
              Logout
            </button>
          ) : (
            // Removed Login button as per request
            null
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;