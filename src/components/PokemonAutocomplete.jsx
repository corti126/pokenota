import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { usePokemonList, filterPokemonList } from '../data/usePokemonList';

export function PokemonAutocomplete({ value, onChange, placeholder = "Pokémon...", isDarkMode, readOnly = false }) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = React.useRef(null);

  // Lista completa de todos los Pokémon (formas, regionales, megas, paradojas...)
  const fullList = usePokemonList();

  React.useEffect(() => {
    setQuery(value || '');
  }, [value]);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateSuggestions = (val) => {
    if (val.trim().length > 0) {
      setSuggestions(filterPokemonList(fullList, val));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    updateSuggestions(val);
  };

  const handleSelect = (pokemonName) => {
    // Se conserva el nombre exacto de la API (con guiones) para que el sprite cargue
    const formatted = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    setQuery(formatted);
    onChange(formatted);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => !readOnly && updateSuggestions(query)}
          placeholder={placeholder}
          disabled={readOnly}
          className={`w-full px-2.5 py-1.5 border rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#88c0d0] font-medium shadow-inner disabled:opacity-60 disabled:cursor-not-allowed ${
            isDarkMode ? 'bg-[#1e222e] border-[#3b4252] text-[#d8dee9]' : 'bg-[#f7f9fb] border-[#d8dee9] text-[#2e3440]'
          }`}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className={`absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto border rounded-xl shadow-2xl divide-y ${
          isDarkMode ? 'bg-[#282c37] border-[#3b4252] divide-[#3b4252]' : 'bg-white border-[#d8dee9] divide-[#e5e9f0]'
        }`}>
          {suggestions.map((poke) => (
            <li
              key={poke}
              onClick={() => handleSelect(poke)}
              className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-between transition-colors ${
                isDarkMode ? 'text-[#d8dee9] hover:bg-[#3b4252]' : 'text-[#2e3440] hover:bg-[#e5e9f0]'
              }`}
            >
              <span className="capitalize">{poke.replace(/-/g, ' ')}</span>
              {query.toLowerCase() === poke.toLowerCase() && <Check size={13} className="text-[#88c0d0]" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
