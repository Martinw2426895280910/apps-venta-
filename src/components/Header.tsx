import React from 'react';
import { KeyRound, MessageCircle, RotateCcw, HeartHandshake } from 'lucide-react';
import { CONFIG } from '../data';

interface HeaderProps {
  unlocked: boolean;
  onOpenUnlock: () => void;
  onResetTest?: () => void;
  score?: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  unlocked,
  onOpenUnlock,
  onResetTest,
  score
}) => {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    score !== null && score !== undefined
      ? `Hola! Realicé el test de Conquista a una mujer de 50 años (Puntaje: ${score}/100) y deseo comprar mi código de acceso por ${CONFIG.price}.`
      : `Hola! Quiero comprar mi código de acceso para la Guía Conquista 50+ por ${CONFIG.price}.`
  )}`;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E2D3BA] px-4 py-3 no-print">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6D1A36] to-[#3D0F20] flex items-center justify-center text-white shadow-sm">
            <HeartHandshake className="w-5 h-5 text-[#ECC978]" />
          </div>
          <div>
            <span className="font-display font-bold text-lg md:text-xl text-[#3D0F20] tracking-tight block leading-tight">
              Guía Conquista 50+
            </span>
            <span className="text-[11px] text-[#7A626B] font-medium tracking-wide uppercase">
              Caballerosidad & Conexión
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!unlocked ? (
            <button
              id="header-unlock-btn"
              onClick={onOpenUnlock}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0E1] hover:bg-[#F2E3CD] text-[#6D1A36] border border-[#D9B25A] text-xs md:text-sm font-semibold transition-all shadow-xs active:scale-95"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#B8892F]" />
              <span>Tengo código</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Desbloqueada
            </span>
          )}

          <a
            id="header-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs md:text-sm font-semibold transition-all shadow-xs active:scale-95"
            title="Hablar por WhatsApp con el vendedor"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {onResetTest && (
            <button
              id="header-reset-btn"
              onClick={onResetTest}
              className="p-1.5 rounded-full hover:bg-[#EFE6D7] text-[#7A626B] transition-colors"
              title="Reiniciar test"
              aria-label="Reiniciar test"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
