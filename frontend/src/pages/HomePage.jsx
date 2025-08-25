import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('home.title')}</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">{t('home.subtitle')}</p>
      <Link
        to="/portfolio"
        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
      >
        {t('home.ctaButton')}
      </Link>
    </div>
  );
};

export default HomePage;