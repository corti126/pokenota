import React from 'react';
import { NotebookPen } from 'lucide-react';

export function GeneralNotes({ notes, onChange, isDarkMode, readOnly = false }) {
  return (
    <div className={`border rounded-2xl p-4 shadow-sm space-y-2 ${
      isDarkMode ? 'bg-[#282c37] border-[#3b4252]' : 'bg-white border-[#d8dee9]'
    }`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
          isDarkMode ? 'text-[#d8dee9]' : 'text-[#2e3440]'
        }`}>
          <NotebookPen size={15} className="text-[#88c0d0]" />
          Notas Generales de la Batalla / Estrategia Global
        </h3>
        <span className={`text-[10px] ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>Anota turnos clave, leads rivales o recordatorios</span>
      </div>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej. El rival empieza con Garchomp. Cuidado con Terremoto en el turno 2..."
        rows={3}
        disabled={readOnly}
        className={`w-full p-3 border rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#88c0d0] resize-y shadow-inner leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed ${
          isDarkMode ? 'bg-[#1e222e] border-[#3b4252] text-[#d8dee9]' : 'bg-[#f7f9fb] border-[#d8dee9] text-[#2e3440]'
        }`}
      />
    </div>
  );
}
