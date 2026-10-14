import React, { useState } from 'react';
import { PokemonAutocomplete } from './PokemonAutocomplete';
import { Skull, Shield, Sparkles, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const TYPE_COLORS = {
  normal: 'bg-zinc-500/20 text-zinc-600 dark:text-zinc-300 border border-zinc-500/30',
  fire: 'bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-500/30',
  water: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30',
  electric: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30',
  grass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30',
  ice: 'bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30',
  fighting: 'bg-red-500/20 text-red-600 dark:text-red-300 border border-red-500/30',
  poison: 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30',
  ground: 'bg-yellow-600/20 text-yellow-700 dark:text-yellow-300 border border-yellow-600/30',
  flying: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30',
  psychic: 'bg-pink-500/20 text-pink-600 dark:text-pink-300 border border-pink-500/30',
  bug: 'bg-lime-600/20 text-lime-700 dark:text-lime-300 border border-lime-600/30',
  rock: 'bg-amber-700/20 text-amber-800 dark:text-amber-300 border border-amber-700/30',
  ghost: 'bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-900/30',
  dragon: 'bg-violet-600/20 text-violet-700 dark:text-violet-300 border border-violet-600/30',
  dark: 'bg-zinc-700/20 text-zinc-700 dark:text-zinc-300 border border-zinc-700/30',
  steel: 'bg-slate-500/20 text-slate-700 dark:text-slate-300 border border-slate-500/30',
  fairy: 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30'
};

export function PokemonCard({ pokemon, index, onUpdate, isDarkMode }) {
  const [spriteUrl, setSpriteUrl] = useState(pokemon.sprite || '');
  const [types, setTypes] = useState(pokemon.types || []);
  const [loadingSprite, setLoadingSprite] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  React.useEffect(() => {
    let isMounted = true;
    const fetchPokemonData = async () => {
      if (!pokemon.name || pokemon.name.trim() === '') {
        if (isMounted) {
          setSpriteUrl('');
          setTypes([]);
        }
        return;
      }
      const formattedName = pokemon.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setLoadingSprite(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedName}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        
        const sprite = 
          data.sprites?.other?.['official-artwork']?.front_default ||
          data.sprites?.other?.showdown?.front_default ||
          data.sprites?.front_default || '';

        const fetchedTypes = data.types ? data.types.map(t => t.type.name) : [];

        if (isMounted) {
          setSpriteUrl(sprite);
          setTypes(fetchedTypes);
          onUpdate(index, { ...pokemon, sprite, types: fetchedTypes });
        }
      } catch (err) {
        if (isMounted) {
          setSpriteUrl(pokemon.sprite || '');
          setTypes(pokemon.types || []);
        }
      } finally {
        if (isMounted) setLoadingSprite(false);
      }
    };
    const timer = setTimeout(fetchPokemonData, 350);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [pokemon.name]);

  const handleChange = (field, value) => {
    onUpdate(index, { ...pokemon, [field]: value });
  };

  const handleMoveChange = (moveIndex, value) => {
    const newMoves = [...pokemon.moves];
    newMoves[moveIndex] = value;
    onUpdate(index, { ...pokemon, moves: newMoves });
  };

  const cardClass = `border rounded-2xl transition-all shadow-sm overflow-hidden ${
    pokemon.fainted 
      ? isDarkMode ? 'border-rose-900/50 bg-rose-950/10 opacity-70' : 'border-rose-300 bg-rose-50 opacity-80'
      : isDarkMode ? 'bg-[#21262d] border-[#30363d] hover:border-[#8b949e]' : 'bg-white border-[#d0d7de] hover:border-[#8c959f]'
  }`;

  return (
    <div className={cardClass}>
      
      {/* Cabecera de la tarjeta */}
      <div className="p-4 space-y-3">
        
        <div className="flex items-center gap-3">
          {/* Número */}
          <span className={`flex items-center justify-center w-7 h-7 rounded-xl font-mono text-xs font-bold shrink-0 shadow-inner ${
            isDarkMode ? 'bg-[#30363d] text-[#c9d1d9]' : 'bg-[#f6f8fa] text-[#57606a] border border-[#d0d7de]'
          }`}>
            #{index + 1}
          </span>

          {/* Buscador Autocompletado */}
          <div className="flex-1">
            <PokemonAutocomplete
              value={pokemon.name}
              onChange={(name) => handleChange('name', name)}
              placeholder={`Pokémon #${index + 1}...`}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Sprite Oficial */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-inner relative border ${
            isDarkMode ? 'bg-[#181b22] border-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de]'
          }`}>
            {spriteUrl ? (
              <img
                src={spriteUrl}
                alt={pokemon.name}
                className={`w-9 h-9 object-contain ${pokemon.fainted ? 'grayscale brightness-50' : ''}`}
                onError={() => setSpriteUrl('')}
              />
            ) : (
              <span className={`text-xs ${isDarkMode ? 'text-[#8b949e]' : 'text-[#656d76]'}`}>?</span>
            )}
          </div>
        </div>

        {/* Tipos del Pokémon */}
        {types.length > 0 && (
          <div className="flex items-center gap-1.5 px-0.5">
            {types.map((type) => (
              <span
                key={type}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${TYPE_COLORS[type] || 'bg-zinc-500/20 text-zinc-500'}`}
              >
                {type}
              </span>
            ))}
          </div>
        )}

        {/* Habilidad, Objeto y Estado K.O. */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={`block text-[10px] font-bold uppercase mb-1 flex items-center gap-1 ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>
              <Sparkles size={11} className="text-amber-500" /> Habilidad
            </label>
            <input
              type="text"
              value={pokemon.ability}
              onChange={(e) => handleChange('ability', e.target.value)}
              placeholder="Ej. Intimidación"
              className={`w-full px-3 py-1.5 border rounded-xl text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                isDarkMode ? 'bg-[#181b22] border-[#30363d] text-[#e6edf3]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
              }`}
            />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase mb-1 flex items-center gap-1 ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>
              <Shield size={11} className="text-amber-500" /> Objeto
            </label>
            <input
              type="text"
              value={pokemon.item}
              onChange={(e) => handleChange('item', e.target.value)}
              placeholder="Ej. Restos"
              className={`w-full px-3 py-1.5 border rounded-xl text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                isDarkMode ? 'bg-[#181b22] border-[#30363d] text-[#e6edf3]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
              }`}
            />
          </div>
        </div>

        {/* Checkbox de K.O. rápido */}
        <div className="flex items-center justify-between pt-1">
          <label className={`flex items-center gap-2 cursor-pointer select-none text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
            pokemon.fainted 
              ? 'bg-rose-500/10 border-rose-500/40 text-rose-500 shadow-sm' 
              : isDarkMode ? 'bg-[#181b22] border-[#30363d] text-[#8b949e] hover:text-[#e6edf3]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#57606a] hover:text-[#24292f]'
          }`}>
            <input
              type="checkbox"
              checked={pokemon.fainted}
              onChange={(e) => handleChange('fainted', e.target.checked)}
              className="sr-only"
            />
            <Skull size={15} />
            <span>{pokemon.fainted ? 'Derrotado (K.O.)' : 'Marcar K.O.'}</span>
          </label>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`text-xs px-2.5 py-1 rounded-xl border transition-all flex items-center gap-1 ${
              isDarkMode 
                ? 'bg-[#30363d] border-[#484f58] text-[#c9d1d9] hover:bg-[#388bfd]/20' 
                : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f] hover:bg-[#eaeef2]'
            }`}
          >
            <span>{showDetails ? 'Ocultar Ataques' : 'Ver Ataques'}</span>
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

      </div>

      {/* Sección expandible de Ataques y Notas */}
      {showDetails && (
        <div className={`p-4 border-t space-y-3 ${isDarkMode ? 'bg-[#181b22]/50 border-[#30363d]' : 'bg-[#f6f8fa]/50 border-[#d0d7de]'}`}>
          
          <div>
            <span className={`block text-[10px] font-bold uppercase mb-1.5 ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>Movimientos / Ataques (4)</span>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  value={pokemon.moves[i] || ''}
                  onChange={(e) => handleMoveChange(i, e.target.value)}
                  placeholder={`Ataque ${i + 1}`}
                  className={`w-full px-2.5 py-1.5 border rounded-xl text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                    isDarkMode ? 'bg-[#21262d] border-[#30363d] text-[#e6edf3]' : 'bg-white border-[#d0d7de] text-[#24292f]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <span className={`block text-[10px] font-bold uppercase mb-1.5 flex items-center gap-1 ${isDarkMode ? 'text-[#8b949e]' : 'text-[#57606a]'}`}>
              <FileText size={11} className="text-amber-500" /> Notas Individuales
            </span>
            <textarea
              value={pokemon.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Estrategia contra este Pokémon..."
              rows={2}
              className={`w-full px-3 py-2 border rounded-xl text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none ${
                isDarkMode ? 'bg-[#21262d] border-[#30363d] text-[#e6edf3]' : 'bg-white border-[#d0d7de] text-[#24292f]'
              }`}
            />
          </div>

        </div>
      )}

    </div>
  );
}
