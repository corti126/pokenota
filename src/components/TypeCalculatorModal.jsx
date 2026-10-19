import React, { useMemo } from 'react';
import { TYPES, TYPE_ES, defensiveProfile, bucketize } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';

// Categorías de efectividad defensiva (sin "neutral" para ahorrar espacio:
// los tipos ausentes de la lista son neutrales x1)
const BUCKETS = [
  { key: 'x4',    label: 'Débil x4',      cls: 'border-[#bf616a] bg-[#bf616a]/20 text-[#bf616a]' },
  { key: 'x2',    label: 'Débil x2',      cls: 'border-[#d08770] bg-[#d08770]/20 text-[#d08770]' },
  { key: 'x05',   label: 'Resiste x0.5',  cls: 'border-[#a3be8c] bg-[#a3be8c]/25 text-[#4f7a3f] dark:text-[#a3be8c]' },
  { key: 'x025',  label: 'Resiste x0.25', cls: 'border-[#8fbcbb] bg-[#8fbcbb]/25 text-[#3a6b69] dark:text-[#8fbcbb]' },
  { key: 'x0',    label: 'Inmune x0',     cls: 'border-[#b48ead] bg-[#b48ead]/20 text-[#7d5a86] dark:text-[#b48ead]' }
];

// Contenido de la pestaña "Calculadora de Tipos" (sin cabecera ni overlay).
// La selección de tipos vive en el modal unificado para que al cambiar
// de pestaña y volver se mantenga.
export function TypeCalculatorContent({ isDarkMode, selected, setSelected }) {
  const toggleType = (type) => {
    setSelected((prev) => {
      if (prev.includes(type)) return prev.filter((t) => t !== type);
      if (prev.length < 2) return [...prev, type];
      // Si ya hay 2, se reemplaza el segundo
      return [prev[0], type];
    });
  };

  const buckets = useMemo(() => {
    if (selected.length === 0) return null;
    return bucketize(defensiveProfile(selected));
  }, [selected]);

  const subText = isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]';

  return (
    <div className="space-y-4">
      {/* Grid seleccionador de tipos */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {TYPES.map((t) => {
          const isSelected = selected.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggleType(t)}
              className={`flex items-center justify-center p-1.5 rounded-xl border transition-all ${
                isSelected
                  ? 'ring-2 ring-[#88c0d0] border-[#88c0d0] scale-[1.03] shadow-md'
                  : isDarkMode
                    ? 'border-[#3b4252] hover:border-[#88c0d0]/60'
                    : 'border-[#d8dee9] hover:border-[#88c0d0]'
              }`}
            >
              <TypeBadge type={t} size="sm" isDarkMode={isDarkMode} className="w-full text-center" />
            </button>
          );
        })}
      </div>

      {/* Tipos seleccionados */}
      <div className={`flex items-center gap-3 p-3 rounded-2xl border flex-wrap ${isDarkMode ? 'bg-[#1e222e] border-[#3b4252]' : 'bg-[#f7f9fb] border-[#d8dee9]'}`}>
        <span className={`text-xs font-bold uppercase tracking-wider ${subText}`}>Seleccionado:</span>
        {selected.length === 0 ? (
          <span className={`text-xs ${subText}`}>— Toca uno o dos tipos arriba —</span>
        ) : (
          <div className="flex items-center gap-2">
            {selected.map((t) => (
              <TypeBadge key={t} type={t} size="md" isDarkMode={isDarkMode} />
            ))}
            <button
              onClick={() => setSelected([])}
              className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                isDarkMode ? 'bg-[#282c37] border-[#3b4252] text-[#959da5] hover:text-[#bf616a]' : 'bg-[#e5e9f0]/60 border-[#d8dee9] text-[#4c566a] hover:text-[#bf616a]'
              }`}
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* Resultados por cubeta */}
      {buckets && (
        <div className="space-y-2">
          {BUCKETS.map((row) => {
            const items = buckets[row.key];
            return (
              <div key={row.key} className={`flex items-start gap-3 p-3 rounded-2xl border ${isDarkMode ? 'bg-[#1e222e]/60 border-[#3b4252]' : 'bg-[#f7f9fb] border-[#d8dee9]'}`}>
                <span className={`text-[11px] font-black uppercase tracking-wider w-28 shrink-0 pt-1 border rounded-lg px-2 py-1 text-center ${row.cls}`}>
                  {row.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.length === 0 ? (
                    <span className={`text-xs ${subText}`}>—</span>
                  ) : (
                    items.map((t) => (
                      <TypeBadge key={t} type={t} size="sm" isDarkMode={isDarkMode} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected.length > 0 && buckets && (
        <p className={`text-[10px] ${subText}`}>
          Perfil defensivo de {selected.map((t) => TYPE_ES[t]).join(' + ')}. Los tipos que no aparecen en la lista tienen efecto neutro (x1).
        </p>
      )}
    </div>
  );
}
