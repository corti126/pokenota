import React from 'react';
import { TypeBadge } from './TypeBadge';

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

// Contenido de la pestaña "Tabla de Tipos" (sin cabecera ni overlay:
// se muestra dentro del modal unificado TypeHelpModal)
export function TypeChartContent({ isDarkMode }) {
  const subText = isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]';

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(TYPE_CHART).map(([type, data]) => (
          <div
            key={type}
            className={`p-3.5 rounded-2xl border transition-all shadow-sm ${
              isDarkMode ? 'bg-[#1e222e] border-[#3b4252]' : 'bg-[#f7f9fb] border-[#d8dee9]'
            }`}
          >
            <div className="mb-2">
              <TypeBadge type={type} size="md" isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-[#bf616a] shrink-0 w-16">Débil:</span>
                <span className={subText}>
                  {data.weak.length > 0 ? data.weak.join(', ') : 'Ninguno'}
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-[#5f8f4f] dark:text-[#a3be8c] shrink-0 w-16">Resiste:</span>
                <span className={subText}>
                  {data.resist.length > 0 ? data.resist.join(', ') : 'Ninguno'}
                </span>
              </div>
              {data.immune.length > 0 && (
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-[#5e81ac] shrink-0 w-16">Inmune:</span>
                  <span className={subText}>
                    {data.immune.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
