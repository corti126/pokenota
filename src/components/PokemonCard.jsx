import React, { useState } from 'react';
import { PokemonAutocomplete } from './PokemonAutocomplete';
import { TypeBadge } from './TypeBadge';
import { Skull, Shield, Sparkles, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export function PokemonCard({ pokemon, index, onUpdate, isDarkMode, readOnly = false }) {
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

        const fetchedTypes = data.types ? data.types.map(t => {
          const name = t.type.name;
          return name.charAt(0).toUpperCase() + name.slice(1);
        }) : [];

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
    if (readOnly) return;
    onUpdate(index, { ...pokemon, [field]: value });
  };

  // Al seleccionar una mega, se autocompleta el objeto "Megapiedra"
  // (el usuario puede editarlo manualmente si quiere)
  const handleNameChange = (name) => {
    if (readOnly) return;
    const isMega = name.toLowerCase().includes('-mega');
    let item = pokemon.item;
    if (isMega && (item === '' || item === 'Megapiedra')) {
      item = 'Megapiedra';
    }
    onUpdate(index, { ...pokemon, name, item });
  };

  const handleMoveChange = (moveIndex, value) => {
    if (readOnly) return;
    const newMoves = [...pokemon.moves];
    newMoves[moveIndex] = value;
    onUpdate(index, { ...pokemon, moves: newMoves });
  };

  const cardClass = `border rounded-2xl transition-all shadow-sm overflow-hidden ${
    pokemon.fainted 
      ? isDarkMode 
        ? 'border-[#bf616a]/50 bg-[#bf616a]/10 opacity-70' 
        : 'border-[#bf616a]/50 bg-[#bf616a]/10 opacity-80'
      : isDarkMode ? 'bg-[#282c37] border-[#3b4252]' : 'bg-white border-[#d8dee9]'
  }`;

  const inputCls = `w-full px-3 py-1.5 border rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#88c0d0] disabled:opacity-60 disabled:cursor-not-allowed ${
    isDarkMode ? 'bg-[#1e222e] border-[#3b4252] text-[#d8dee9]' : 'bg-[#f7f9fb] border-[#d8dee9] text-[#2e3440]'
  }`;

  const labelCls = `block text-[10px] font-bold uppercase mb-1 flex items-center gap-1 ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`;

  return (
    <div className={cardClass}>
      
      {/* Cabecera de la tarjeta */}
      <div className="p-4 space-y-3">
        
        <div className="flex items-center gap-3">
          {/* Número */}
          <span className={`flex items-center justify-center w-7 h-7 rounded-xl font-mono text-xs font-bold shrink-0 shadow-inner ${
            isDarkMode ? 'bg-[#3b4252] text-[#d8dee9]' : 'bg-[#e5e9f0] text-[#4c566a] border border-[#d8dee9]'
          }`}>
            #{index + 1}
          </span>

          {/* Buscador Autocompletado */}
          <div className="flex-1">
            <PokemonAutocomplete
              value={pokemon.name}
              onChange={handleNameChange}
              placeholder={`Pokémon #${index + 1}...`}
              isDarkMode={isDarkMode}
              readOnly={readOnly}
            />
          </div>

          {/* Sprite Oficial */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-inner relative border ${
            isDarkMode ? 'bg-[#1e222e] border-[#3b4252]' : 'bg-[#f7f9fb] border-[#d8dee9]'
          }`}>
            {spriteUrl ? (
              <img
                src={spriteUrl}
                alt={pokemon.name}
                className={`w-9 h-9 object-contain ${pokemon.fainted ? 'grayscale brightness-50' : ''}`}
                onError={() => setSpriteUrl('')}
              />
            ) : (
              <span className={`text-xs ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>?</span>
            )}
          </div>
        </div>

        {/* Tipos del Pokémon */}
        {types.length > 0 && (
          <div className="flex items-center gap-1.5 px-0.5">
            {types.map((type) => (
              <TypeBadge key={type} type={type} size="sm" isDarkMode={isDarkMode} />
            ))}
          </div>
        )}

        {/* Habilidad, Objeto y Estado K.O. */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelCls}>
              <Sparkles size={11} className="text-[#ebcb8b]" /> Habilidad
            </label>
            <input
              type="text"
              value={pokemon.ability}
              onChange={(e) => handleChange('ability', e.target.value)}
              placeholder="Ej. Intimidación"
              disabled={readOnly}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>
              <Shield size={11} className="text-[#ebcb8b]" /> Objeto
            </label>
            <input
              type="text"
              value={pokemon.item}
              onChange={(e) => handleChange('item', e.target.value)}
              placeholder="Ej. Restos"
              disabled={readOnly}
              className={inputCls}
            />
          </div>
        </div>

        {/* Checkbox de K.O. rápido */}
        <div className="flex items-center justify-between pt-1">
          <label className={`flex items-center gap-2 select-none text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
            readOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
          } ${
            pokemon.fainted 
              ? 'bg-[#bf616a]/20 border-[#bf616a]/40 text-[#bf616a] shadow-sm' 
              : isDarkMode 
                ? 'bg-[#1e222e] border-[#3b4252] text-[#959da5] hover:text-[#d8dee9]' 
                : 'bg-[#f7f9fb] border-[#d8dee9] text-[#4c566a] hover:text-[#2e3440]'
          }`}>
            <input
              type="checkbox"
              checked={pokemon.fainted}
              onChange={(e) => handleChange('fainted', e.target.checked)}
              disabled={readOnly}
              className="sr-only"
            />
            <Skull size={15} />
            <span>{pokemon.fainted ? 'Derrotado (K.O.)' : 'Marcar K.O.'}</span>
          </label>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`text-xs px-2.5 py-1 rounded-xl border transition-all flex items-center gap-1 ${
              isDarkMode 
                ? 'bg-[#3b4252] border-[#4c566a] text-[#d8dee9] hover:bg-[#4c566a]' 
                : 'bg-[#e5e9f0]/60 border-[#d8dee9] text-[#2e3440] hover:bg-[#e5e9f0]'
            }`}
          >
            <span>{showDetails ? 'Ocultar Ataques' : 'Ver Ataques'}</span>
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

      </div>

      {/* Sección expandible de Ataques y Notas */}
      {showDetails && (
        <div className={`p-4 border-t space-y-3 ${isDarkMode ? 'bg-[#1e222e]/50 border-[#3b4252]' : 'bg-[#f7f9fb]/60 border-[#d8dee9]'}`}>
          
          <div>
            <span className={`block text-[10px] font-bold uppercase mb-1.5 ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>Movimientos / Ataques (4)</span>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  value={pokemon.moves[i] || ''}
                  onChange={(e) => handleMoveChange(i, e.target.value)}
                  placeholder={`Ataque ${i + 1}`}
                  disabled={readOnly}
                  className={`w-full px-2.5 py-1.5 border rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#88c0d0] disabled:opacity-60 disabled:cursor-not-allowed ${
                    isDarkMode ? 'bg-[#282c37] border-[#3b4252] text-[#d8dee9]' : 'bg-white border-[#d8dee9] text-[#2e3440]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <span className={`block text-[10px] font-bold uppercase mb-1.5 flex items-center gap-1 ${isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]'}`}>
              <FileText size={11} className="text-[#88c0d0]" /> Notas Individuales
            </span>
            <textarea
              value={pokemon.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Estrategia contra este Pokémon..."
              rows={2}
              disabled={readOnly}
              className={`w-full px-3 py-2 border rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#88c0d0] resize-none disabled:opacity-60 disabled:cursor-not-allowed ${
                isDarkMode ? 'bg-[#282c37] border-[#3b4252] text-[#d8dee9]' : 'bg-white border-[#d8dee9] text-[#2e3440]'
              }`}
            />
          </div>

        </div>
      )}

    </div>
  );
}
