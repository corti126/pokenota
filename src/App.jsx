import React, { useState, useEffect } from 'react';
import { HomeView } from './components/HomeView';
import { BattleTracker } from './components/BattleTracker';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'tracker'
  const [currentRivalName, setCurrentRivalName] = useState('Entrenador Rival');
  const [currentBattle, setCurrentBattle] = useState(null); // partida cargada desde el historial
  
  // Tema Oscuro / Claro (Por defecto oscuro amigable Nord Pastel)
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

  // Guarda la partida; si ya existe (misma id) la actualiza en lugar de duplicarla
  const handleSaveBattle = (battleData) => {
    setHistory((prev) => {
      const exists = prev.some((b) => b.id === battleData.id);
      if (exists) {
        return prev.map((b) => (b.id === battleData.id ? battleData : b));
      }
      return [battleData, ...prev];
    });
  };

  const handleDeleteBattle = (id) => {
    setHistory((prev) => prev.filter((b) => b.id !== id));
  };

  const handleStartBattle = (rivalName) => {
    setCurrentRivalName(rivalName || 'Entrenador Rival');
    setCurrentBattle(null); // batalla nueva
    setCurrentView('tracker');
  };

  const handleLoadBattle = (battle) => {
    setCurrentRivalName(battle.rivalName || 'Entrenador Rival');
    setCurrentBattle(battle); // cargar partida existente con todos sus datos
    setCurrentView('tracker');
  };

  return (
    <div>
      {currentView === 'home' ? (
        <HomeView
          onStartBattle={handleStartBattle}
          history={history}
          onLoadBattle={handleLoadBattle}
          onDeleteBattle={handleDeleteBattle}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      ) : (
        <BattleTracker
          initialRivalName={currentRivalName}
          initialBattle={currentBattle}
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
