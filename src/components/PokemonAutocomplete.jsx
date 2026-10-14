import React, { useState } from 'react';
import { ALL_POKEMON_LIST } from '../data/pokemonList';
import { Check } from 'lucide-react';

export function PokemonAutocomplete({ value, onChange, placeholder = "Pokémon...", isDarkMode }) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = React.useRef(null);

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

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);

    if (val.trim().length > 0) {
      const filtered = ALL_POKEMON_LIST.filter(p => 
        p.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (pokemonName) => {
    const formatted = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    setQuery(formatted);
    onChange(formatted);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim().length > 0) {
              const filtered = ALL_POKEMON_LIST.filter(p => 
                p.toLowerCase().includes(query.toLowerCase())
              ).slice(0, 8);
              setSuggestions(filtered);
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className={`w-full px-2.5 py-1.5 border rounded-xl text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/55 font-medium shadow-inner ${
            isDarkMode ? 'bg-[#181b22] border-[#30363d] text-[#e6edf3]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
          }`}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className={`absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto border rounded-xl shadow-2xl divide-y ${
          isDarkMode ? 'bg-[#21262d] border-[#30363d] divide-[#30363d]' : 'bg-white border-[#d0d7de] divide-[#f6f8fa]'
        }`}>
          {suggestions.map((poke) => (
            <li
              key={poke}
              onClick={() => handleSelect(poke)}
              className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-between capitalize transition-colors ${
                isDarkMode ? 'text-[#c9d1d9] hover:bg-[#30363d]' : 'text-[#24292f] hover:bg-[#f6f8fa]'
              }`}
            >
              <span>{poke.replace('-', ' ')}</span>
              {query.toLowerCase() === poke.toLowerCase() && <Check size={13} className="text-amber-500" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
