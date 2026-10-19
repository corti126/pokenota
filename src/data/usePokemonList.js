import { useState, useEffect } from 'react';
import { ALL_POKEMON_LIST } from './pokemonList';

const CACHE_KEY = 'pokenotas_pokemon_full_list';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 días

/**
 * Devuelve la lista completa de TODOS los Pokémon (formas, regionales,
 * megas, paradojas, etc.) consultándola una sola vez a la PokeAPI
 * y cacheándola en localStorage. Usa la lista local como fallback.
 */
export function usePokemonList() {
  const [list, setList] = useState(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.names) && parsed.names.length > 1000 && Date.now() - parsed.ts < CACHE_TTL) {
          return parsed.names;
        }
      }
    } catch (e) { /* ignorar */ }
    return null; // null = aún no cargada
  });

  useEffect(() => {
    if (list) return; // ya hay lista (cacheada)
    let cancelled = false;

    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20000')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('No OK'))))
      .then((data) => {
        const names = data.results.map((p) => p.name);
        if (!cancelled && names.length > 0) {
          setList(names);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), names }));
          } catch (e) { /* storage lleno, ignorar */ }
        }
      })
      .catch(() => {
        if (!cancelled) setList(ALL_POKEMON_LIST);
      });

    return () => { cancelled = true; };
  }, []);

  // Mientras carga o si falla, se usa la lista local
  return list || ALL_POKEMON_LIST;
}

/**
 * Filtra la lista priorizando coincidencias que empiezan con la query.
 */
export function filterPokemonList(list, query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const starts = [];
  const includes = [];
  for (const name of list) {
    const lower = name.toLowerCase();
    if (lower.startsWith(q)) {
      starts.push(name);
    } else if (lower.includes(q)) {
      includes.push(name);
    }
    if (starts.length >= 8) break;
  }
  const merged = [...starts, ...includes];
  return merged.slice(0, 8);
}
