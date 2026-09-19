import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { CONFIG } from '../data';
import { openPayPalCheckout } from '../utils/payment';

interface FloatingPaypalBarProps {
  unlocked: boolean;
}

export const FloatingPaypalBar: React.FC<FloatingPaypalBarProps> = ({ unlocked }) => {
  return (
    <aside aria-label="Comprar guía" className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A050E]/95 backdrop-blur-md border-t-2 border-[#D9B25A]/70 px-3 py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.5)] no-print">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2.5 text-left">
          <div className="w-9 h-9 rounded-full bg-[#3D0F20] flex items-center justify-center border border-[#ECC978]/60 shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#ECC978]" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white leading-tight">
              Guía Completa Conquista 50+
            </div>
            <div className="text-[11px] sm:text-xs text-[#ECC978]">
              {unlocked ? 'Guía desbloqueada • Acceso de por vida' : `Acceso completo de por vida • Pago único ${CONFIG.price}`}
            </div>
          </div>
        </div>

        <div className="flex-1 sm:flex-initial flex items-center justify-center sm:justify-end w-full sm:w-auto">
          <a
            id="floating-paypal-buy-btn"
            href={CONFIG.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openPayPalCheckout}
            className="animate-paypal-destello relative overflow-hidden flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFC439] via-[#FFB700] to-[#E5A800] hover:brightness-105 active:scale-[0.98] text-[#002C6C] font-black text-sm sm:text-base border-2 border-[#FFE885] shadow-xl transition-all cursor-pointer"
          >
            <div className="paypal-shimmer-sweep" />
            <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 relative z-10" viewBox="0 0 24 24" fill="none">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.784.784 0 0 1 .773-.654h6.58c3.082 0 5.438.742 6.452 2.036 1.047 1.336 1.08 3.197.098 5.534-.98 2.337-2.736 3.655-5.22 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.79 4.316a.641.641 0 0 1-.632.528l-3.69-.275z" fill="#003087" />
              <path d="M18.847 8.636c-.982 2.337-2.738 3.655-5.222 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.847 4.629a.641.641 0 0 1-.633.528H6.96l-.235 1.282a.641.641 0 0 0 .633.74h4.606a.784.784 0 0 0 .773-.654l.872-4.764c.094-.627.593-1.128 1.22-1.194l.21-.022c2.484-.261 4.24-1.579 5.222-3.916.982-2.337.949-4.198-.098-5.534a4.98 4.98 0 0 0-.316-.369z" fill="#0079C1" />
            </svg>
            <span className="uppercase tracking-tight relative z-10">PAGAR {CONFIG.price} CON PAYPAL</span>
            <ArrowRight className="w-4 h-4 text-[#002C6C] shrink-0 relative z-10" />
          </a>
        </div>
      </div>
    </aside>
  );
};
