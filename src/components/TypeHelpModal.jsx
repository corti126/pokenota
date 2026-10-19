import React, { useState } from 'react';
import { X, ShieldAlert, Calculator } from 'lucide-react';
import { TypeChartContent } from './TypeChartModal';
import { TypeCalculatorContent } from './TypeCalculatorModal';

// Modal unificado de "Ayuda Tipos" con dos pestañas alternables:
//  - Tabla de Tipos (guía de debilidades)
//  - Calculadora (perfil defensivo de 1 o 2 tipos)
export function TypeHelpModal({ onClose, isDarkMode }) {
  const [activeTab, setActiveTab] = useState('chart'); // 'chart' | 'calculator'
  // La selección de la calculadora vive aquí para persistir al cambiar de pestaña
  const [selectedTypes, setSelectedTypes] = useState([]);

  const panelCls = isDarkMode
    ? 'bg-[#22272e] border-[#3b4252] text-[#d8dee9]'
    : 'bg-white border-[#d8dee9] text-[#2e3440]';
  const subText = isDarkMode ? 'text-[#959da5]' : 'text-[#4c566a]';

  const tabs = [
    { key: 'chart', label: 'Tabla de Tipos', icon: ShieldAlert },
    { key: 'calculator', label: 'Calculadora', icon: Calculator }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className={`border rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl space-y-4 animate-in zoom-in-95 ${panelCls}`}>

        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${isDarkMode ? 'border-[#3b4252]' : 'border-[#e5e9f0]'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#88c0d0]/20 text-[#88c0d0] rounded-2xl border border-[#88c0d0]/40">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold">Ayuda de Tipos</h3>
              <p className={`text-xs ${subText}`}>Tabla de debilidades y calculadora de efectividades</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              isDarkMode ? 'bg-[#282c37] border-[#3b4252] text-[#d8dee9] hover:bg-[#3b4252]' : 'bg-[#e5e9f0]/60 border-[#d8dee9] text-[#2e3440] hover:bg-[#e5e9f0]'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Pestañas alternables */}
        <div className={`flex gap-2 p-1 rounded-2xl border ${isDarkMode ? 'bg-[#1e222e] border-[#3b4252]' : 'bg-[#f7f9fb] border-[#d8dee9]'}`}>
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                  active
                    ? 'bg-[#88c0d0]/20 border-[#88c0d0]/50 text-[#5e81ac] dark:text-[#88c0d0] shadow-sm'
                    : `border-transparent ${subText} hover:text-[#5e81ac] dark:hover:text-[#88c0d0]`
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="overflow-y-auto flex-1 pr-1">
          {activeTab === 'chart' ? (
            <TypeChartContent isDarkMode={isDarkMode} />
          ) : (
            <TypeCalculatorContent
              isDarkMode={isDarkMode}
              selected={selectedTypes}
              setSelected={setSelectedTypes}
            />
          )}
        </div>

        {/* Footer */}
        <div className={`pt-2 text-center text-[11px] border-t ${isDarkMode ? 'border-[#3b4252] text-[#959da5]' : 'border-[#e5e9f0] text-[#4c566a]'}`}>
          Tipos oficiales de Pokémon • Efectividades generaciones 1-9
        </div>

      </div>
    </div>
  );
}
