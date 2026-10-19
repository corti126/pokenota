import React, { useState } from 'react';
import { PokemonCard } from './PokemonCard';
import { GeneralNotes } from './GeneralNotes';
import { TypeHelpModal } from './TypeHelpModal';
import { Swords, RotateCcw, Save, ArrowLeft, Trophy, XCircle, Check, Sun, Moon, Sparkles, HelpCircle, Pencil } from 'lucide-react';

const INITIAL_POKEMON = { name: '', ability: '', item: '', moves: ['', '', '', ''], notes: '', fainted: false, sprite: '', types: [] };
const createEmptyTeam = () => Array(6).fill(null).map(() => ({ ...INITIAL_POKEMON }));

export function BattleTracker({ initialRivalName, initialBattle, onBackToHome, history, saveBattle, isDarkMode, toggleTheme }) {
  // Carga inicial: partida guardada (Cargar/Ver) o nombre ingresado en el modal de inicio
  const [rivalName, setRivalName] = useState(
    initialBattle?.rivalName || initialRivalName || 'Entrenador Rival'
  );
  const [battleResult, setBattleResult] = useState(initialBattle?.result || 'win');
  const [generalNotes, setGeneralNotes] = useState(initialBattle?.generalNotes || '');
  const [team, setTeam] = useState(() => {
    if (initialBattle && Array.isArray(initialBattle.team) && initialBattle.team.length > 0) {
      // Rellena con huecos vacíos hasta completar los 6 espacios
      const loaded = initialBattle.team.slice(0, 6).map((p) => ({ ...INITIAL_POKEMON, ...p }));
      while (loaded.length < 6) loaded.push({ ...INITIAL_POKEMON });
      return loaded;
    }
    return createEmptyTeam();
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showTypeHelp, setShowTypeHelp] = useState(false);
  const [saveNotification, setSaveNotification] = useState(false);
  // Las partidas cargadas del historial empiezan en modo solo lectura;
  // el usuario debe pulsar "Editar" para modificarlas.
  const [readOnly, setReadOnly] = useState(Boolean(initialBattle));

  const handleUpdatePokemon = (index, updatedPokemon) => {
    const newTeam = [...team];
    newTeam[index] = updatedPokemon;
    setTeam(newTeam);
  };

  const confirmReset = () => {
    setGeneralNotes('');
    setTeam(team.map(p => ({ ...p, fainted: false, notes: '' })));
    setShowResetModal(false);
  };

  const confirmSaveBattle = () => {
    const battleData = {
      // Si se cargó una partida existente se conserva su id para actualizarla
      id: initialBattle?.id || Date.now().toString(),
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

  // Clases base compartidas (tema pastel)
  const btnSoft = isDarkMode
    ? 'bg-[#282c37] border-[#3b4252] text-[#d8dee9] hover:bg-[#3b4252]'
    : 'bg-[#e5e9f0]/60 border-[#d8dee9] text-[#2e3440] hover:bg-[#e5e9f0]';
  const panelCls = isDarkMode
    ? 'bg-[#282c37] border-[#3b4252] text-[#d8dee9]'
    : 'bg-white border-[#d8dee9] text-[#2e3440]';
  const subText = isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 pb-12 ${
      isDarkMode 
        ? 'bg-[#1e222e] text-[#d8dee9]' 
        : 'bg-[#f7f9fb] text-[#2e3440]'
    }`}>
      
      {/* Barra superior */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-6 py-3.5 shadow-md transition-colors duration-200 ${
        isDarkMode ? 'border-[#3b4252] bg-[#1e222e]/90' : 'border-[#e5e9f0] bg-white/90'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={onBackToHome}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border shadow-sm ${btnSoft}`}
            >
              <ArrowLeft size={15} />
              <span>Volver</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#88c0d0]/20 border border-[#88c0d0]/40 flex items-center justify-center text-[#88c0d0]">
                <Swords size={16} />
              </div>
              <span className="text-xs font-extrabold tracking-wider uppercase">Tracker en Combate</span>
              {initialBattle && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                  readOnly
                    ? 'bg-[#ebcb8b]/20 text-[#d08770] border-[#ebcb8b]/40'
                    : 'bg-[#a3be8c]/20 text-[#a3be8c] border-[#a3be8c]/40'
                }`}>
                  {readOnly ? 'Solo lectura' : 'Editando'}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            
            {/* Nombre del Rival (ya ingresado en el modal de inicio) */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
              isDarkMode ? 'bg-[#282c37] border-[#3b4252]' : 'bg-[#e5e9f0]/60 border-[#d8dee9]'
            }`}>
              <span className={`text-xs font-medium ${subText}`}>Rival:</span>
              <input
                type="text"
                value={rivalName}
                onChange={(e) => setRivalName(e.target.value)}
                placeholder="Nombre del rival"
                disabled={readOnly}
                className={`bg-transparent text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#88c0d0] rounded px-1 w-36 disabled:opacity-60 disabled:cursor-not-allowed ${
                  isDarkMode ? 'text-[#d8dee9]' : 'text-[#2e3440]'
                }`}
              />
            </div>

            {/* Ayuda de Tipos: abre el modal con pestañas (Tabla / Calculadora) */}
            <button
              onClick={() => setShowTypeHelp(true)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${btnSoft}`}
              title="Ayuda de Tipos: tabla y calculadora"
            >
              <HelpCircle size={15} className="text-[#ebcb8b]" />
              <span>Ayuda Tipos</span>
            </button>

            <button
              onClick={() => setShowResetModal(true)}
              disabled={readOnly}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${btnSoft}`}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            {readOnly ? (
              /* Al cargar una partida vieja: botón Editar que desbloquea la edición */
              <button
                onClick={() => setReadOnly(false)}
                className="px-5 py-2.5 bg-[#ebcb8b] hover:bg-[#d08770] text-[#2e3440] text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Pencil size={14} />
                <span>Editar</span>
              </button>
            ) : (
              <button
                onClick={() => setShowSaveModal(true)}
                className="px-5 py-2.5 bg-[#88c0d0] hover:bg-[#81a1c1] text-[#2e3440] text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Save size={14} />
                <span>Guardar</span>
              </button>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all ${btnSoft}`}
            >
              {isDarkMode ? <Sun size={16} className="text-[#ebcb8b]" /> : <Moon size={16} className="text-[#d08770]" />}
            </button>

          </div>

        </div>
      </header>

      {/* Modal unificado de Ayuda de Tipos (Tabla / Calculadora en pestañas) */}
      {showTypeHelp && (
        <TypeHelpModal onClose={() => setShowTypeHelp(false)} isDarkMode={isDarkMode} />
      )}

      {/* Modal de Confirmación de Reset (personalizado, sin window.confirm) */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`border rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 ${panelCls}`}>
            <h3 className="text-lg font-bold">¿Reiniciar combate?</h3>
            <p className={`text-xs ${subText}`}>
              Se reiniciarán los estados de K.O. y todas las notas, pero se mantendrá el equipo configurado.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${btnSoft}`}
              >
                Cancelar
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2 bg-[#ebcb8b] hover:bg-[#d08770] text-[#2e3440] rounded-xl text-xs font-bold shadow-md transition-all"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Guardado */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 ${panelCls}`}>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Guardar Partida</h3>
              <p className={`text-xs ${subText}`}>
                Selecciona el resultado del combate contra <strong>{rivalName || 'Rival'}</strong>:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBattleResult('win')}
                className={`py-3 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  battleResult === 'win'
                    ? 'bg-[#a3be8c] text-[#2e3440] border-[#a3be8c] shadow-lg shadow-[#a3be8c]/20'
                    : btnSoft
                }`}
              >
                <Trophy size={16} />
                <span>Victoria</span>
              </button>

              <button
                onClick={() => setBattleResult('loss')}
                className={`py-3 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  battleResult === 'loss'
                    ? 'bg-[#bf616a] text-white border-[#bf616a] shadow-lg shadow-[#bf616a]/20'
                    : btnSoft
                }`}
              >
                <XCircle size={16} />
                <span>Derrota</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${btnSoft}`}
              >
                Cancelar
              </button>
              <button
                onClick={confirmSaveBattle}
                className="px-5 py-2.5 bg-[#88c0d0] hover:bg-[#81a1c1] text-[#2e3440] rounded-xl text-xs font-bold shadow-md transition-all"
              >
                Confirmar y Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificación */}
      {saveNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#a3be8c] text-[#2e3440] px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2">
          <Check size={16} />
          <span>¡Partida guardada correctamente!</span>
        </div>
      )}

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 pt-6 space-y-6 w-full">
        
        <GeneralNotes notes={generalNotes} onChange={setGeneralNotes} isDarkMode={isDarkMode} readOnly={readOnly} />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-[#d8dee9]' : 'text-[#2e3440]'}`}>
              <Sparkles size={16} className="text-[#88c0d0]" />
              Equipo Rival ({team.filter(p => p.name).length}/6)
            </h2>
            <span className={`text-xs ${subText}`}>Configura los 6 Pokémon</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((pokemon, index) => (
              <PokemonCard
                key={index}
                index={index}
                pokemon={pokemon}
                onUpdate={handleUpdatePokemon}
                isDarkMode={isDarkMode}
                readOnly={readOnly}
              />
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}
