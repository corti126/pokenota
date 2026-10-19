import React, { useState } from 'react';
import { Swords, Plus, Trophy, XCircle, Trash2, Clock, Play, Sun, Moon } from 'lucide-react';

export function HomeView({ onStartBattle, history, onLoadBattle, onDeleteBattle, isDarkMode, toggleTheme }) {
  const totalBattles = history.length;
  const wins = history.filter(h => h.result === 'win').length;
  const losses = totalBattles - wins;
  const winRate = totalBattles > 0 ? Math.round((wins / totalBattles) * 100) : 0;

  const [battleToDelete, setBattleToDelete] = useState(null);
  const [showRivalModal, setShowRivalModal] = useState(false);
  const [rivalInput, setRivalInput] = useState('');

  const confirmDelete = () => {
    if (battleToDelete) {
      onDeleteBattle(battleToDelete);
      setBattleToDelete(null);
    }
  };

  const handleStartSubmit = (e) => {
    e.preventDefault();
    onStartBattle(rivalInput.trim() || 'Entrenador Rival');
    setShowRivalModal(false);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#1e222e] text-[#d8dee9]' 
        : 'bg-[#f7f9fb] text-[#2e3440]'
    }`}>
      
      {/* Header Pastel */}
      <header className={`w-full border-b sticky top-0 z-45 backdrop-blur-md transition-colors duration-200 ${
        isDarkMode ? 'border-[#3b4252] bg-[#1e222e]/90' : 'border-[#e5e9f0] bg-white/90'
      }`}>
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.png"
              alt="PokeNotas Logo"
              className="h-14 w-auto max-w-[140px] object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                PokeNotas
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>Tracker para Randomlockes & Combates</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Estadísticas en tonos pastel */}
            <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border text-xs shadow-sm transition-colors duration-200 ${
              isDarkMode ? 'bg-[#282c37] border-[#3b4252]' : 'bg-[#e5e9f0]/60 border-[#d8dee9]'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a3be8c]"></span>
                <span className="text-[#a3be8c]"><strong>{wins}</strong> G</span>
              </div>
              <span className={isDarkMode ? 'text-[#4c566a]' : 'text-[#d8dee9]'}>|</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#bf616a]"></span>
                <span className="text-[#bf616a]"><strong>{losses}</strong> P</span>
              </div>
              <span className={isDarkMode ? 'text-[#4c566a]' : 'text-[#d8dee9]'}>|</span>
              <div className="text-[#ebcb8b] font-bold">
                <span>{winRate}% WR</span>
              </div>
            </div>

            {/* Toggle Tema Pastel */}
            <button
              onClick={toggleTheme}
              title="Cambiar tema claro / oscuro"
              className={`p-2.5 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-[#282c37] border-[#3b4252] text-[#ebcb8b] hover:bg-[#3b4252]' 
                  : 'bg-white border-[#d8dee9] text-[#d08770] hover:bg-[#e5e9f0]'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto px-6 py-8 flex-1 space-y-8 w-full">
        
        {/* Banner de Nueva Batalla Pastel */}
        <div className={`border rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#282c37] to-[#1e222e] border-[#4c566a]/40' 
            : 'bg-gradient-to-r from-[#e5e9f0]/40 to-white border-[#d8dee9]'
        }`}>
          <div className="space-y-1.5 text-center sm:text-left z-10">
            <h2 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-2.5">
              <div className="p-2 bg-[#88c0d0]/20 text-[#88c0d0] rounded-xl border border-[#88c0d0]/30">
                <Swords size={20} />
              </div>
              Nueva Batalla / Randomlocke
            </h2>
            <p className={`text-sm max-w-xl ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>
              Prepara los 6 Pokémon del rival, registra sus ataques, habilidades, objetos y lleva el control en tiempo real.
            </p>
          </div>
          
          <button
            onClick={() => setShowRivalModal(true)}
            className="px-6 py-3.5 bg-[#88c0d0] hover:bg-[#81a1c1] text-[#2e3440] font-black rounded-2xl shadow-md transition-all flex items-center gap-2 shrink-0 text-sm z-10 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>Iniciar Tracker</span>
          </button>
        </div>

        {/* Modal para ingresar el nombre del Rival al iniciar */}
        {showRivalModal && (
          <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <form onSubmit={handleStartSubmit} className={`border rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 ${
              isDarkMode ? 'bg-[#282c37] border-[#3b4252] text-[#d8dee9]' : 'bg-white border-[#d8dee9] text-[#2e3440]'
            }`}>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Nombre del Rival</h3>
                <p className={`text-xs ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>
                  Ingresa el nombre del entrenador o líder contra el que vas a combatir:
                </p>
              </div>

              <input
                type="text"
                value={rivalInput}
                onChange={(e) => setRivalInput(e.target.value)}
                placeholder="Ej. Folagor, Líder Brock, Rival..."
                autoFocus
                className={`w-full px-3.5 py-2.5 border rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#88c0d0] font-medium shadow-inner ${
                  isDarkMode ? 'bg-[#1e222e] border-[#3b4252] text-[#e6edf3]' : 'bg-[#f7f9fb] border-[#d8dee9] text-[#2e3440]'
                }`}
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRivalModal(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isDarkMode ? 'bg-[#3b4252] border-[#4c566a] text-[#d8dee9]' : 'bg-[#e5e9f0] border-[#d8dee9] text-[#2e3440]'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#88c0d0] hover:bg-[#81a1c1] text-[#2e3440] rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Comenzar Combate
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sección de Historial */}
        <section className="space-y-4">
          <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-[#3b4252]' : 'border-[#e5e9f0]'}`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-[#d8dee9]' : 'text-[#2e3440]'}`}>
              <Clock size={16} className="text-[#88c0d0]" />
              Historial de Partidas Guardadas ({totalBattles})
            </h3>
          </div>

          {history.length === 0 ? (
            <div className={`border rounded-3xl p-16 text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-[#282c37]/50 border-[#3b4252] text-[#959da5]' : 'bg-white border-[#d8dee9] text-[#4c566a]'
            }`}>
              <Swords size={48} className="mx-auto mb-3 opacity-40 text-[#88c0d0]" />
              <p className="text-base font-medium">No hay batallas guardadas todavía.</p>
              <p className="text-xs mt-1 opacity-80">Inicia un combate y guárdalo para consultarlo aquí.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {history.map((battle) => {
                const isWin = battle.result === 'win';
                const totalPokemon = battle.team ? battle.team.filter(p => p.name).length : 0;
                const activeCount = battle.team ? battle.team.filter(p => !p.fainted && p.name).length : 0;

                return (
                  <div
                    key={battle.id}
                    className={`border rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-sm group ${
                      isDarkMode 
                        ? 'bg-[#282c37] border-[#3b4252] hover:border-[#88c0d0]/50' 
                        : 'bg-white border-[#d8dee9] hover:border-[#88c0d0]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                        isWin 
                          ? 'bg-[#a3be8c]/20 border-[#a3be8c]/40 text-[#a3be8c]' 
                          : 'bg-[#bf616a]/20 border-[#bf616a]/40 text-[#bf616a]'
                      }`}>
                        {isWin ? <Trophy size={22} /> : <XCircle size={22} />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className={`text-base font-bold transition-colors ${isDarkMode ? 'text-[#d8dee9] group-hover:text-[#88c0d0]' : 'text-[#2e3440] group-hover:text-[#5e81ac]'}`}>
                            vs. {battle.rivalName || 'Entrenador Rival'}
                          </h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                            isWin 
                              ? 'bg-[#a3be8c]/20 text-[#a3be8c] border-[#a3be8c]/40' 
                              : 'bg-[#bf616a]/20 text-[#bf616a] border-[#bf616a]/40'
                          }`}>
                            {isWin ? 'Victoria' : 'Derrota'}
                          </span>
                        </div>

                        <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>
                          <span>{battle.date}</span>
                          <span>•</span>
                          <span>{totalPokemon} Pokémon ({activeCount} vivos)</span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 ${isDarkMode ? 'border-[#3b4252]' : 'border-[#e5e9f0]'}`}>
                      <button
                        onClick={() => onLoadBattle(battle)}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 shadow-sm ${
                          isDarkMode 
                            ? 'bg-[#3b4252] border-[#4c566a] text-[#d8dee9] hover:bg-[#88c0d0]/20 hover:border-[#88c0d0]/40' 
                            : 'bg-[#e5e9f0]/50 border-[#d8dee9] text-[#2e3440] hover:bg-[#e5e9f0]'
                        }`}
                      >
                        <Play size={14} className="text-[#88c0d0]" />
                        <span>Cargar / Ver</span>
                      </button>
                      <button
                        onClick={() => setBattleToDelete(battle.id)}
                        title="Eliminar partida"
                        className={`p-2 rounded-xl border transition-all ${
                          isDarkMode 
                            ? 'bg-[#3b4252] border-[#4c566a] text-[#959da5] hover:bg-[#bf616a]/20 hover:text-[#bf616a] hover:border-[#bf616a]/40' 
                            : 'bg-[#e5e9f0]/50 border-[#d8dee9] text-[#4c566a] hover:bg-[#bf616a]/10 hover:text-[#bf616a] hover:border-[#bf616a]/30'
                        }`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* Modal Personalizado de Confirmación de Eliminación */}
      {battleToDelete && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`border rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 ${
            isDarkMode ? 'bg-[#282c37] border-[#3b4252] text-[#d8dee9]' : 'bg-white border-[#d8dee9] text-[#2e3440]'
          }`}>
            <h3 className="text-lg font-bold">¿Eliminar batalla?</h3>
            <p className={`text-xs ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>
              Esta acción eliminará el registro de la partida permanentemente de tu historial.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setBattleToDelete(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isDarkMode ? 'bg-[#3b4252] border-[#4c566a] text-[#d8dee9]' : 'bg-[#e5e9f0] border-[#d8dee9] text-[#2e3440]'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-[#bf616a] hover:bg-[#d08770] text-white rounded-xl text-xs font-bold shadow-md transition-all"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`w-full py-6 text-center text-xs border-t transition-colors duration-200 ${
        isDarkMode ? 'border-[#3b4252] text-[#959da5]' : 'border-[#e5e9f0] text-[#4c566a]'
      }`}>
        PokeNotas • Diseñado con colores pastel
      </footer>

    </div>
  );
}
