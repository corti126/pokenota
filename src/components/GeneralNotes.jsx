import React from 'react';
import { NotebookPen } from 'lucide-react';

export function GeneralNotes({ notes, onChange, isDarkMode }) {
  return (
    <div className={`border rounded-2xl p-4 shadow-sm space-y-2 ${
      isDarkMode ? 'bg-[#21262d] border-[#30363d]' : 'bg-white border-[#d0d7de]'
    }`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
          isDarkMode ? 'text-[#c9d1d9]' : 'text-[#24292f]'
        }`}>
          <NotebookPen size={15} className="text-amber-500" />
          Notas Generales de la Batalla / Estrategia Global
        </h3>
        <span className={`text-[10px] ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>Anota turnos clave, leads rivales o recordatorios</span>
      </div>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej. El rival empieza con Garchomp. Cuidado con Terremoto en el turno 2..."
        rows={3}
        className={`w-full p-3 border rounded-xl text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/55 resize-y shadow-inner leading-relaxed ${
          isDarkMode ? 'bg-[#181b22] border-[#30363d] text-[#e6edf3]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
        }`}
      />
    </div>
  );
}
