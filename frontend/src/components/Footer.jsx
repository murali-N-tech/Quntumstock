import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // A reusable link style to keep the code DRY
  const linkStyle = "text-gray-500 hover:text-blue-600 transition-colors duration-300";

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Column 1: Brand and Motto */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800 mb-2">QuantumFolio ✨</h3>
            <p className="text-gray-500 text-sm">
              Intelligent insights for the modern investor.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className={linkStyle}>Dashboard</Link></li>
              <li><Link to="/stocks" className={linkStyle}>Stocks</Link></li>
              <li><Link to="/crypto" className={linkStyle}>Crypto</Link></li>
              <li><Link to="/portfolio" className={linkStyle}>Portfolio Optimizer</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className={linkStyle}>About Us</Link></li>
              <li><Link to="/contact" className={linkStyle}>Contact</Link></li>
              <li><Link to="/privacy-policy" className={linkStyle}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className={linkStyle}>Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Social Media */}
          <div>
             <h4 className="font-semibold text-gray-700 mb-4 uppercase tracking-wider">Follow Us</h4>
             <div className="flex justify-center md:justify-start space-x-4">
                {/* For icons, you would typically use a library like 'react-icons'.
                  Example: import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
                  Then use <FaTwitter /> instead of the text.
                */}
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={linkStyle} aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"> {/* Simple X/Twitter Icon */}
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={linkStyle} aria-label="LinkedIn">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"> {/* Simple LinkedIn Icon */}
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-4.125 0 2.062 2.062 0 014.125 0zM7.142 9H3.555v11.452H7.142V9z"></path>
                  </svg>
                </a>
             </div>
          </div>

        </div>

        {/* Bottom Bar: Disclaimer and Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
           <p className="text-xs text-gray-500 mb-4 max-w-3xl mx-auto">
            <strong>Disclaimer:</strong> All information provided by QuantumFolio is for informational and educational purposes only. It does not constitute financial, investment, legal, or tax advice. Investing in financial markets involves risk, and you should consult with a qualified professional before making any financial decisions.
          </p>
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} QuantumFolio. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;