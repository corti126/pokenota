import React, { useState } from 'react';
import { Swords, Plus, Trophy, XCircle, Trash2, Clock, Play, Sparkles, Sun, Moon } from 'lucide-react';

export function HomeView({ onStartBattle, history, onLoadBattle, onDeleteBattle, isDarkMode, toggleTheme }) {
  const totalBattles = history.length;
  const wins = history.filter(h => h.result === 'win').length;
  const losses = totalBattles - wins;
  const winRate = totalBattles > 0 ? Math.round((wins / totalBattles) * 100) : 0;

  const [battleToDelete, setBattleToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setBattleToDelete(id);
  };

  const confirmDelete = () => {
    if (battleToDelete) {
      onDeleteBattle(battleToDelete);
      setBattleToDelete(null);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#181b22] text-[#e6edf3]' 
        : 'bg-[#f4f6f8] text-[#1f2328]'
    }`}>
      
      {/* Header */}
      <header className={`w-full border-b sticky top-0 z-40 backdrop-blur-md transition-colors duration-200 ${
        isDarkMode ? 'border-[#30363d] bg-[#181b22]/90' : 'border-[#d0d7de] bg-white/90'
      }`}>
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3.5">
            {/* Logo de la App */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 border border-amber-400/30 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Sparkles size={24} className="fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
                PokeNotas 
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                  isDarkMode 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  Pro
                </span>
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-[#8b949e]' : 'text-[#656d76]'}`}>Tracker para Randomlockes & Combates</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Estadísticas */}
            <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border text-xs shadow-sm transition-colors duration-200 ${
              isDarkMode ? 'bg-[#21262d] border-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de]'
            }`}>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span><strong>{wins}</strong> G</span>
              </div>
              <span className={isDarkMode ? 'text-[#30363d]' : 'text-[#d0d7de]'}>|</span>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span><strong>{losses}</strong> P</span>
              </div>
              <span className={isDarkMode ? 'text-[#30363d]' : 'text-[#d0d7de]'}>|</span>
              <div className="text-amber-500 font-bold">
                <span>{winRate}% WR</span>
              </div>
            </div>

            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              title="Cambiar tema claro / oscuro"
              className={`p-2.5 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-[#21262d] border-[#30363d] text-amber-400 hover:bg-[#30363d]' 
                  : 'bg-[#f6f8fa] border-[#d0d7de] text-amber-600 hover:bg-[#eaeef2]'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto px-6 py-8 flex-1 space-y-8 w-full">
        
        {/* Banner de Nueva Batalla */}
        <div className={`border rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#21262d] to-[#1f242c] border-[#30363d]' 
            : 'bg-gradient-to-r from-white to-[#f6f8fa] border-[#d0d7de]'
        }`}>
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-1.5 text-center sm:text-left z-10">
            <h2 className="text-xl font-extrabold flex items-center justify-center sm:justify-start gap-2">
              <Swords size={22} className="text-amber-500" />
              Nueva Batalla / Randomlocke
            </h2>
            <p className={`text-sm max-w-xl ${isDarkMode ? 'text-[#8b949e]' : 'text-[#656d76]'}`}>
              Prepara los 6 Pokémon del rival, registra sus ataques, habilidades, objetos y lleva el control en tiempo real.
            </p>
          </div>
          
          <button
            onClick={onStartBattle}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 text-sm z-10 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>Iniciar Tracker</span>
          </button>
        </div>

        {/* Sección de Historial */}
        <section className="space-y-4">
          <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-[#30363d]' : 'border-[#d0d7de]'}`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-[#c9d1d9]' : 'text-[#24292f]'}`}>
              <Clock size={16} className="text-amber-500" />
              Historial de Partidas Guardadas ({totalBattles})
            </h3>
          </div>

          {history.length === 0 ? (
            <div className={`border rounded-3xl p-16 text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-[#21262d]/50 border-[#30363d] text-[#8b949e]' : 'bg-white border-[#d0d7de] text-[#656d76]'
            }`}>
              <Swords size={48} className="mx-auto mb-3 opacity-30 text-amber-500" />
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
                        ? 'bg-[#21262d] border-[#30363d] hover:border-[#8b949e]' 
                        : 'bg-white border-[#d0d7de] hover:border-[#8c959f]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                        isWin 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                      }`}>
                        {isWin ? <Trophy size={22} /> : <XCircle size={22} />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className={`text-base font-bold transition-colors ${isDarkMode ? 'text-[#e6edf3] group-hover:text-amber-400' : 'text-[#24292f] group-hover:text-amber-600'}`}>
                            vs. {battle.rivalName || 'Entrenador Rival'}
                          </h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                            isWin 
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' 
                              : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                          }`}>
                            {isWin ? 'Victoria' : 'Derrota'}
                          </span>
                        </div>

                        <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>
                          <span>{battle.date}</span>
                          <span>•</span>
                          <span>{totalPokemon} Pokémon ({activeCount} vivos)</span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 ${isDarkMode ? 'border-[#30363d]' : 'border-[#d0d7de]'}`}>
                      <button
                        onClick={() => onLoadBattle(battle)}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 shadow-sm ${
                          isDarkMode 
                            ? 'bg-[#30363d] border-[#484f58] text-[#c9d1d9] hover:bg-[#388bfd]/20 hover:border-[#388bfd]' 
                            : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f] hover:bg-[#eaeef2]'
                        }`}
                      >
                        <Play size={14} className="text-amber-500" />
                        <span>Cargar / Ver</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(battle.id)}
                        title="Eliminar partida"
                        className={`p-2 rounded-xl border transition-all ${
                          isDarkMode 
                            ? 'bg-[#30363d] border-[#484f58] text-[#8b949e] hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30' 
                            : 'bg-[#f6f8fa] border-[#d0d7de] text-[#57606a] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`border rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 ${
            isDarkMode ? 'bg-[#21262d] border-[#30363d] text-[#e6edf3]' : 'bg-white border-[#d0d7de] text-[#24292f]'
          }`}>
            <h3 className="text-lg font-bold">¿Eliminar batalla?</h3>
            <p className={`text-xs ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>
              Esta acción eliminará el registro de la partida permanentemente de tu historial.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setBattleToDelete(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isDarkMode ? 'bg-[#30363d] border-[#484f58] text-[#c9d1d9]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`w-full py-6 text-center text-xs border-t transition-colors duration-200 ${
        isDarkMode ? 'border-[#30363d] text-[#8b949e]' : 'border-[#d0d7de] text-[#57606a]'
      }`}>
        PokeNotas Pro • Diseñado para Randomlockes
      </footer>

    </div>
  );
}
