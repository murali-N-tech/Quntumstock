import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { changeLanguage } = useLanguage();
  const { t } = useTranslation();

  // This function applies specific styles to the active navigation link
  const navLinkClass = ({ isActive }) =>
    isActive 
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
      : 'text-gray-600 hover:text-blue-600 transition-colors';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          QuantumFolio ✨
        </Link>
        
        {/* Main Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/dashboard" className={navLinkClass}>{t('nav.dashboard')}</NavLink>
          <NavLink to="/stocks" className={navLinkClass}>{t('nav.stocks')}</NavLink>
          <NavLink to="/crypto" className={navLinkClass}>{t('nav.crypto')}</NavLink>
          <NavLink to="/forex" className={navLinkClass}>Forex</NavLink>
          <NavLink to="/trading" className={navLinkClass}>News</NavLink>
          <NavLink to="/portfolio" className={navLinkClass}>{t('nav.optimizer')}</NavLink>
        </div>

        {/* Language Selector and Auth Buttons */}
        <div className="flex items-center space-x-4">
          <select 
            onChange={(e) => changeLanguage(e.target.value)} 
            className="border rounded px-2 py-1 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="en"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="te">TE</option>
            <option value="ta">TA</option>
          </select>
          
          {isAuthenticated ? (
            <button 
              onClick={logout} 
              className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors"
            >
              {t('nav.logout')}
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                {t('nav.login')}
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;