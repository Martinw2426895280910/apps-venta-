import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { CONFIG } from '../data';
import { openPayPalCheckout } from '../utils/payment';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (code: string) => boolean;
  score?: number | null;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({
  isOpen,
  onClose,
  onUnlock,
  score
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Por favor escribe tu código de acceso.');
      return;
    }

    const success = onUnlock(code.trim());
    if (success) {
      setError('');
      onClose();
    } else {
      setError('Código no válido. Revisa el código que recibiste por WhatsApp tras tu pago.');
    }
  };

  const whatsappMsg = score !== null && score !== undefined
    ? `Hola! Hice el test y obtuve ${score}/100. Quiero comprar mi código de acceso para la Guía Conquista 50+ (${CONFIG.price}). ¿Cómo realizo el pago?`
    : `Hola! Quiero comprar mi código de acceso para la Guía Conquista 50+ (${CONFIG.price}). ¿Cuáles son los medios de pago?`;

  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FFFDF9] border border-[#E2D3BA] rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#B8892F]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E1] border border-[#D9B25A] flex items-center justify-center text-[#6D1A36]">
              <KeyRound className="w-5 h-5 text-[#B8892F]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#3D0F20]">
                Ingresar Código de Acceso
              </h3>
              <p className="text-xs text-[#7A626B]">
                Desbloqueo inmediato de la guía completa
              </p>
            </div>
          </div>
          <button
            id="close-unlock-modal-btn"
            onClick={onClose}
            className="text-[#7A626B] hover:text-[#3D0F20] p-1.5 rounded-full hover:bg-[#F2EAE0] transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#543F47] mb-4 leading-relaxed">
          Si ya realizaste el pago por WhatsApp con el creador, escribe aquí el código que te envió para acceder a todo el material.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="modalCodeInput" className="block text-xs font-bold text-[#3D0F20] uppercase tracking-wider mb-1.5">
              Código entregado
            </label>
            <div className="relative">
              <input
                id="modalCodeInput"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError('');
                }}
                placeholder="EJ: CONQUISTA50"
                autoCapitalize="characters"
                autoComplete="off"
                className="w-full px-4 py-3 bg-[#FAF7F2] border-2 border-[#D9B25A] rounded-xl text-[#2A1A1F] font-semibold tracking-wider placeholder:text-[#A89890] placeholder:font-normal focus:outline-none focus:border-[#6D1A36] transition-all uppercase"
                autoFocus
              />
              <KeyRound className="w-5 h-5 text-[#B8892F] absolute right-3.5 top-3.5 pointer-events-none opacity-60" />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-700 font-medium mt-1.5 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            id="submit-unlock-btn"
            className="w-full py-3.5 px-5 bg-gradient-to-r from-[#B8892F] to-[#D9B25A] hover:brightness-105 active:scale-[0.99] text-[#2A1A1F] font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#2A1A1F]" />
            <span>Desbloquear Guía Ahora</span>
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#E8DEC9] space-y-2.5 text-center">
          <p className="text-xs text-[#7A626B]">
            ¿Aún no has adquirido tu acceso ({CONFIG.price})?
          </p>

          <a
            id="modal-paypal-buy-btn"
            href={CONFIG.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openPayPalCheckout}
            className="animate-paypal-pulse flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FFC439] to-[#FFB700] hover:brightness-105 text-[#002C6C] font-black text-sm shadow-md transition-all border border-[#FFE277] cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.784.784 0 0 1 .773-.654h6.58c3.082 0 5.438.742 6.452 2.036 1.047 1.336 1.08 3.197.098 5.534-.98 2.337-2.736 3.655-5.22 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.79 4.316a.641.641 0 0 1-.632.528l-3.69-.275z" fill="#003087" />
              <path d="M18.847 8.636c-.982 2.337-2.738 3.655-5.222 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.847 4.629a.641.641 0 0 1-.633.528H6.96l-.235 1.282a.641.641 0 0 0 .633.74h4.606a.784.784 0 0 0 .773-.654l.872-4.764c.094-.627.593-1.128 1.22-1.194l.21-.022c2.484-.261 4.24-1.579 5.222-3.916.982-2.337.949-4.198-.098-5.534a4.98 4.98 0 0 0-.316-.369z" fill="#0079C1" />
            </svg>
            <span>Pagar {CONFIG.price} con PayPal</span>
          </a>

          <a
            id="modal-whatsapp-contact-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold text-xs transition-colors border border-[#25D366]/30"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>O acordar por WhatsApp con el autor</span>
          </a>
        </div>
      </div>
    </div>
  );
};
