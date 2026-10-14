import React, { useState, useEffect } from 'react';
import { HomeView } from './components/HomeView';
import { BattleTracker } from './components/BattleTracker';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'tracker'
  
  // Tema Oscuro / Claro (Por defecto oscuro amigable GitHub Dark)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('pokenotas_theme');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pokenotas_theme', JSON.stringify(isDarkMode));
    } catch (e) {}
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('pokenotas_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading history from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pokenotas_history', JSON.stringify(history));
    } catch (e) {
      console.error('Error saving history to localStorage', e);
    }
  }, [history]);

  const handleSaveBattle = (battleData) => {
    setHistory((prev) => [battleData, ...prev]);
  };

  const handleDeleteBattle = (id) => {
    setHistory((prev) => prev.filter((b) => b.id !== id));
  };

  const handleLoadBattle = (battle) => {
    setCurrentView('tracker');
  };

  return (
    <div>
      {currentView === 'home' ? (
        <HomeView
          onStartBattle={() => setCurrentView('tracker')}
          history={history}
          onLoadBattle={handleLoadBattle}
          onDeleteBattle={handleDeleteBattle}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      ) : (
        <BattleTracker
          onBackToHome={() => setCurrentView('home')}
          history={history}
          saveBattle={handleSaveBattle}
          onDeleteBattle={handleDeleteBattle}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}
