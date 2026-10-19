// Insignia de tipo Pokémon con colores pasteles y alta legibilidad
// en ambos temas (claro y oscuro).
import { TYPE_ES } from '../data/typeChart';

const TYPE_STYLE = {
  normal:   { light: 'bg-[#9fa19f]/30 text-[#4b4d4b] border-[#9fa19f]/50',   dark: 'bg-[#9fa19f]/20 text-[#cbcccb] border-[#9fa19f]/30' },
  fire:     { light: 'bg-[#e62829]/25 text-[#9c1b1c] border-[#e62829]/45',    dark: 'bg-[#e62829]/15 text-[#ff8a80] border-[#e62829]/30' },
  water:    { light: 'bg-[#2980ef]/25 text-[#0d47a1] border-[#2980ef]/45',    dark: 'bg-[#2980ef]/15 text-[#82b1ff] border-[#2980ef]/30' },
  electric: { light: 'bg-[#fac000]/35 text-[#6b5200] border-[#fac000]/60',    dark: 'bg-[#fac000]/20 text-[#ffe57f] border-[#fac000]/40' },
  grass:    { light: 'bg-[#3fa129]/25 text-[#1b5e20] border-[#3fa129]/45',    dark: 'bg-[#3fa129]/15 text-[#b9f6ca] border-[#3fa129]/30' },
  ice:      { light: 'bg-[#3fd8ff]/30 text-[#006064] border-[#3fd8ff]/50',    dark: 'bg-[#3fd8ff]/20 text-[#84ffff] border-[#3fd8ff]/30' },
  fighting: { light: 'bg-[#ff8000]/25 text-[#8f3900] border-[#ff8000]/45',    dark: 'bg-[#ff8000]/15 text-[#ffab40] border-[#ff8000]/30' },
  poison:   { light: 'bg-[#9141cb]/25 text-[#4a148c] border-[#9141cb]/45',    dark: 'bg-[#9141cb]/15 text-[#ea80fc] border-[#9141cb]/30' },
  ground:   { light: 'bg-[#915121]/25 text-[#4e2c14] border-[#915121]/45',    dark: 'bg-[#915121]/15 text-[#d7ccc8] border-[#915121]/30' },
  flying:   { light: 'bg-[#81b9ef]/30 text-[#0d3c78] border-[#81b9ef]/50',    dark: 'bg-[#81b9ef]/20 text-[#b3e5fc] border-[#81b9ef]/30' },
  psychic:  { light: 'bg-[#ef4179]/25 text-[#880e4f] border-[#ef4179]/45',    dark: 'bg-[#ef4179]/15 text-[#ff80ab] border-[#ef4179]/30' },
  bug:      { light: 'bg-[#91a119]/30 text-[#33691e] border-[#91a119]/50',    dark: 'bg-[#91a119]/20 text-[#d4e157] border-[#91a119]/30' },
  rock:     { light: 'bg-[#afa981]/35 text-[#4e342e] border-[#afa981]/55',    dark: 'bg-[#afa981]/20 text-[#d7ccc8] border-[#afa981]/30' },
  ghost:    { light: 'bg-[#704170]/30 text-[#311b92] border-[#704170]/50',    dark: 'bg-[#704170]/20 text-[#e1bee7] border-[#704170]/30' },
  dragon:   { light: 'bg-[#5060e1]/25 text-[#1a237e] border-[#5060e1]/45',    dark: 'bg-[#5060e1]/15 text-[#c5cae9] border-[#5060e1]/30' },
  dark:     { light: 'bg-[#50413f]/30 text-[#2b1b19] border-[#50413f]/50',    dark: 'bg-[#50413f]/20 text-[#d7ccc8] border-[#50413f]/30' },
  steel:    { light: 'bg-[#60a1b8]/30 text-[#1c313a] border-[#60a1b8]/50',    dark: 'bg-[#60a1b8]/20 text-[#cfd8dc] border-[#60a1b8]/30' },
  fairy:    { light: 'bg-[#ef70ef]/25 text-[#880e4f] border-[#ef70ef]/45',    dark: 'bg-[#ef70ef]/15 text-[#f8bbd0] border-[#ef70ef]/30' }
};

const SIZES = {
  sm: 'px-2 py-0.5 text-[10px] rounded-md',
  md: 'px-2.5 py-1 text-xs rounded-lg',
  lg: 'px-3.5 py-2 text-sm rounded-xl'
};

export function TypeBadge({ type, size = 'sm', isDarkMode, className = '' }) {
  const key = String(type).toLowerCase();
  const style = TYPE_STYLE[key] || (isDarkMode ? 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30' : 'bg-zinc-500/25 text-zinc-700 border-zinc-500/45');
  const chosen = typeof style === 'string' ? style : (isDarkMode ? style.dark : style.light);
  return (
    <span className={`inline-block font-black uppercase tracking-wider border ${SIZES[size] || SIZES.sm} ${chosen} ${className}`}>
      {TYPE_ES[key] || key}
    </span>
  );
}

// Alias por compatibilidad con el resto del código
export const TYPE_COLORS = TYPE_STYLE;
