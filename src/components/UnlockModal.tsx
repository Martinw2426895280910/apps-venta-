import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { CONFIG } from '../data';

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

        <div className="mt-5 pt-4 border-t border-[#E8DEC9] text-center">
          <p className="text-xs text-[#7A626B] mb-2.5">
            ¿Aún no tienes tu código o no has pagado los {CONFIG.price}?
          </p>
          <a
            id="modal-whatsapp-contact-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold text-xs transition-colors border border-[#25D366]/30"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Solicitar código con el creador por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
