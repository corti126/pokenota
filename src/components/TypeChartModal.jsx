import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

const TYPE_CHART = {
  Normal: { weak: ['Fighting'], resist: [], immune: ['Ghost'] },
  Fire: { weak: ['Water', 'Ground', 'Rock'], resist: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'], immune: [] },
  Water: { weak: ['Electric', 'Grass'], resist: ['Fire', 'Water', 'Ice', 'Steel'], immune: [] },
  Electric: { weak: ['Ground'], resist: ['Electric', 'Flying', 'Steel'], immune: [] },
  Grass: { weak: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'], resist: ['Water', 'Electric', 'Grass', 'Ground'], immune: [] },
  Ice: { weak: ['Fire', 'Fighting', 'Rock', 'Steel'], resist: ['Ice'], immune: [] },
  Fighting: { weak: ['Flying', 'Psychic', 'Fairy'], resist: ['Bug', 'Rock', 'Dark'], immune: [] },
  Poison: { weak: ['Ground', 'Psychic'], resist: ['Grass', 'Fighting', 'Poison', 'Bug', 'Fairy'], immune: [] },
  Ground: { weak: ['Water', 'Grass', 'Ice'], resist: ['Poison', 'Rock'], immune: ['Electric'] },
  Flying: { weak: ['Electric', 'Ice', 'Rock'], resist: ['Grass', 'Fighting', 'Bug'], immune: ['Ground'] },
  Psychic: { weak: ['Bug', 'Ghost', 'Dark'], resist: ['Fighting', 'Psychic'], immune: [] },
  Bug: { weak: ['Fire', 'Flying', 'Rock'], resist: ['Grass', 'Fighting', 'Ground'], immune: [] },
  Rock: { weak: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'], resist: ['Normal', 'Fire', 'Poison', 'Flying'], immune: [] },
  Ghost: { weak: ['Ghost', 'Dark'], resist: ['Poison', 'Bug'], immune: ['Normal', 'Fighting'] },
  Dragon: { weak: ['Ice', 'Dragon', 'Fairy'], resist: ['Fire', 'Water', 'Electric', 'Grass'], immune: [] },
  Dark: { weak: ['Fighting', 'Bug', 'Fairy'], resist: ['Ghost', 'Dark'], immune: ['Psychic'] },
  Steel: { weak: ['Fire', 'Fighting', 'Ground'], resist: ['Normal', 'Grass', 'Ice', 'Flying', 'Psychic', 'Bug', 'Rock', 'Dragon', 'Steel', 'Fairy'], immune: ['Poison'] },
  Fairy: { weak: ['Poison', 'Steel'], resist: ['Fighting', 'Bug', 'Dark'], immune: ['Dragon'] }
};

export function TypeChartModal({ onClose, isDarkMode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className={`border rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl space-y-4 animate-in zoom-in-95 ${
        isDarkMode ? 'bg-[#21262d] border-[#30363d] text-[#e6edf3]' : 'bg-white border-[#d0d7de] text-[#24292f]'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-700/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold">Tabla de Debilidades de Tipos</h3>
              <p className={`text-xs ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>Consulta rápida para combates y Randomlockes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              isDarkMode ? 'bg-[#30363d] border-[#484f58] text-[#c9d1d9] hover:bg-[#388bfd]/20' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f] hover:bg-[#eaeef2]'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content - Grid de Tipos */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(TYPE_CHART).map(([type, data]) => (
              <div 
                key={type}
                className={`p-3 rounded-2xl border transition-all ${
                  isDarkMode ? 'bg-[#181b22] border-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de]'
                }`}
              >
                <h4 className="text-xs font-black uppercase tracking-wider mb-2 text-amber-500">{type}</h4>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-start gap-1">
                    <span className="font-bold text-rose-500 shrink-0 w-16">Débil a:</span>
                    <span className={isDarkMode ? 'text-[#c9d1d9]' : 'text-[#24292f]'}>
                      {data.weak.length > 0 ? data.weak.join(', ') : 'Ninguno'}
                    </span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="font-bold text-emerald-500 shrink-0 w-16">Resiste a:</span>
                    <span className={isDarkMode ? 'text-[#c9d1d9]' : 'text-[#24292f]'}>
                      {data.resist.length > 0 ? data.resist.join(', ') : 'Ninguno'}
                    </span>
                  </div>
                  {data.immune.length > 0 && (
                    <div className="flex items-start gap-1">
                      <span className="font-bold text-indigo-400 shrink-0 w-16">Inmune a:</span>
                      <span className={isDarkMode ? 'text-[#c9d1d9]' : 'text-[#24292f]'}>
                        {data.immune.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-center text-[11px] text-zinc-500 border-t border-zinc-700/20">
          Referencia rápida orientada a competitivo moderno y generaciones principales.
        </div>

      </div>
    </div>
  );
}
