// ============================================================
// Datos de efectividades de tipos (oficiales, generaciones 1-9)
// ============================================================

export const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export const TYPE_ES = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
  grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
  ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
  rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro',
  steel: 'Acero', fairy: 'Hada'
};

// CHART[atacante] = { double: x2, half: x0.5, zero: x0 } contra defensores
const CHART = {
  normal:   { double: [], half: ['rock', 'steel'], zero: ['ghost'] },
  fire:     { double: ['grass', 'ice', 'bug', 'steel'], half: ['fire', 'water', 'rock', 'dragon'], zero: [] },
  water:    { double: ['fire', 'ground', 'rock'], half: ['water', 'grass', 'dragon'], zero: [] },
  electric: { double: ['water', 'flying'], half: ['electric', 'grass', 'dragon'], zero: ['ground'] },
  grass:    { double: ['water', 'ground', 'rock'], half: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'], zero: [] },
  ice:      { double: ['grass', 'ground', 'flying', 'dragon'], half: ['fire', 'water', 'ice', 'steel'], zero: [] },
  fighting: { double: ['normal', 'ice', 'rock', 'dark', 'steel'], half: ['poison', 'flying', 'psychic', 'bug', 'fairy'], zero: ['ghost'] },
  poison:   { double: ['grass', 'fairy'], half: ['poison', 'ground', 'rock', 'ghost'], zero: ['steel'] },
  ground:   { double: ['fire', 'electric', 'poison', 'rock', 'steel'], half: ['grass', 'bug'], zero: ['flying'] },
  flying:   { double: ['grass', 'fighting', 'bug'], half: ['electric', 'rock', 'steel'], zero: [] },
  psychic:  { double: ['fighting', 'poison'], half: ['psychic', 'steel'], zero: ['dark'] },
  bug:      { double: ['grass', 'psychic', 'dark'], half: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'], zero: [] },
  rock:     { double: ['fire', 'ice', 'flying', 'bug'], half: ['fighting', 'ground', 'steel'], zero: [] },
  ghost:    { double: ['psychic', 'ghost'], half: ['dark'], zero: ['normal'] },
  dragon:   { double: ['dragon'], half: ['steel'], zero: ['fairy'] },
  dark:     { double: ['psychic', 'ghost'], half: ['fighting', 'dark', 'fairy'], zero: [] },
  steel:    { double: ['ice', 'rock', 'fairy'], half: ['fire', 'water', 'electric', 'steel'], zero: [] },
  fairy:    { double: ['fighting', 'dragon', 'dark'], half: ['fire', 'poison', 'steel'], zero: [] }
};

/** Multiplicador de daño: ataque `atk` contra defensor `def` */
export function getAttackMultiplier(atk, def) {
  const entry = CHART[atk];
  if (!entry) return 1;
  if (entry.zero.includes(def)) return 0;
  if (entry.double.includes(def)) return 2;
  if (entry.half.includes(def)) return 0.5;
  return 1;
}

/** Perfil defensivo: multiplicador de cada tipo atacante contra la combinación */
export function defensiveProfile(defTypes) {
  const profile = {};
  for (const atk of TYPES) {
    let mult = 1;
    for (const def of defTypes) mult *= getAttackMultiplier(atk, def);
    profile[atk] = mult;
  }
  return profile;
}

/** Agrupa el perfil defensivo en cubetas de efectividad */
export function bucketize(profile) {
  const buckets = { x4: [], x2: [], neutral: [], x05: [], x025: [], x0: [] };
  for (const [type, mult] of Object.entries(profile)) {
    if (mult === 4) buckets.x4.push(type);
    else if (mult === 2) buckets.x2.push(type);
    else if (mult === 1) buckets.neutral.push(type);
    else if (mult === 0.5) buckets.x05.push(type);
    else if (mult === 0.25) buckets.x025.push(type);
    else if (mult === 0) buckets.x0.push(type);
    else if (mult > 1) buckets.x2.push(type); // >2 raros (x8 con 3 tipos, no aplica)
    else buckets.x05.push(type);
  }
  return buckets;
}
