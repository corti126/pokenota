import React, { useState } from 'react';
import { PokemonCard } from './PokemonCard';
import { GeneralNotes } from './GeneralNotes';
import { Swords, RotateCcw, Save, ArrowLeft, Trophy, XCircle, Check, Sun, Moon, Sparkles } from 'lucide-react';

const INITIAL_POKEMON = { name: '', ability: '', item: '', moves: ['', '', '', ''], notes: '', fainted: false, sprite: '', types: [] };
const createEmptyTeam = () => Array(6).fill(null).map(() => ({ ...INITIAL_POKEMON }));

export function BattleTracker({ onBackToHome, history, saveBattle, isDarkMode, toggleTheme }) {
  const [rivalName, setRivalName] = useState('Entrenador Rival');
  const [battleResult, setBattleResult] = useState('win');
  const [generalNotes, setGeneralNotes] = useState('');
  const [team, setTeam] = useState(createEmptyTeam);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveNotification, setSaveNotification] = useState(false);

  const handleUpdatePokemon = (index, updatedPokemon) => {
    const newTeam = [...team];
    newTeam[index] = updatedPokemon;
    setTeam(newTeam);
  };

  const handleResetCombat = () => {
    if (window.confirm('¿Reiniciar estados de K.O. y notas manteniendo el equipo configurado?')) {
      setGeneralNotes('');
      setTeam(team.map(p => ({ ...p, fainted: false, notes: '' })));
    }
  };

  const confirmSaveBattle = () => {
    const battleData = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rivalName: rivalName || 'Entrenador Rival',
      result: battleResult,
      generalNotes,
      team
    };
    saveBattle(battleData);
    setShowSaveModal(false);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2500);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 pb-12 ${
      isDarkMode 
        ? 'bg-[#181b22] text-[#e6edf3]' 
        : 'bg-[#f4f6f8] text-[#1f2328]'
    }`}>
      
      {/* Barra superior */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-6 py-3.5 shadow-md transition-colors duration-200 ${
        isDarkMode ? 'border-[#30363d] bg-[#181b22]/90' : 'border-[#d0d7de] bg-white/90'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={onBackToHome}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border shadow-sm ${
                isDarkMode 
                  ? 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d]' 
                  : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f] hover:bg-[#eaeef2]'
              }`}
            >
              <ArrowLeft size={15} />
              <span>Volver</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Swords size={16} />
              </div>
              <span className="text-xs font-extrabold tracking-wider uppercase">Tracker en Combate</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
              isDarkMode ? 'bg-[#21262d] border-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de]'
            }`}>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>Rival:</span>
              <input
                type="text"
                value={rivalName}
                onChange={(e) => setRivalName(e.target.value)}
                placeholder="Nombre del rival"
                className="bg-transparent text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded px-1 w-36"
              />
            </div>

            <button
              onClick={handleResetCombat}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border shadow-sm ${
                isDarkMode 
                  ? 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d]' 
                  : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f] hover:bg-[#eaeef2]'
              }`}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setShowSaveModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save size={14} />
              <span>Guardar</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'bg-[#21262d] border-[#30363d] text-amber-400 hover:bg-[#30363d]' 
                  : 'bg-[#f6f8fa] border-[#d0d7de] text-amber-600 hover:bg-[#eaeef2]'
              }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

          </div>

        </div>
      </header>

      {/* Modal de Guardado */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 ${
            isDarkMode ? 'bg-[#21262d] border-[#30363d] text-[#e6edf3]' : 'bg-white border-[#d0d7de] text-[#24292f]'
          }`}>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Guardar Partida</h3>
              <p className={`text-xs ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>
                Selecciona el resultado del combate contra <strong>{rivalName || 'Rival'}</strong>:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBattleResult('win')}
                className={`py-3 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  battleResult === 'win'
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20'
                    : isDarkMode ? 'bg-[#30363d] border-[#484f58] text-[#c9d1d9]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
                }`}
              >
                <Trophy size={16} />
                <span>Victoria</span>
              </button>

              <button
                onClick={() => setBattleResult('loss')}
                className={`py-3 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  battleResult === 'loss'
                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/20'
                    : isDarkMode ? 'bg-[#30363d] border-[#484f58] text-[#c9d1d9]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
                }`}
              >
                <XCircle size={16} />
                <span>Derrota</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  isDarkMode ? 'bg-[#30363d] border-[#484f58] text-[#c9d1d9]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={confirmSaveBattle}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-xs font-bold shadow-md hover:from-amber-400 hover:to-orange-400 transition-all"
              >
                Confirmar y Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificación */}
      {saveNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2">
          <Check size={16} />
          <span>¡Partida guardada correctamente!</span>
        </div>
      )}

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 pt-6 space-y-6 w-full">
        
        <GeneralNotes notes={generalNotes} onChange={setGeneralNotes} isDarkMode={isDarkMode} />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-[#c9d1d9]' : 'text-[#24292f]'}`}>
              <Sparkles size={16} className="text-amber-500" />
              Equipo Rival ({team.filter(p => p.name).length}/6)
            </h2>
            <span className={`text-xs ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>Configura los 6 Pokémon</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((pokemon, index) => (
              <PokemonCard
                key={index}
                index={index}
                pokemon={pokemon}
                onUpdate={handleUpdatePokemon}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}
