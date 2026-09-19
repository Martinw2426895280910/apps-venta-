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
      setError('Por favor escribe tu código de acceso privado.');
      return;
    }

    const success = onUnlock(code.trim());
    if (success) {
      setError('');
      onClose();
    } else {
      setError('Código incorrecto. Verifica el código entregado o solicítalo por WhatsApp.');
    }
  };

  // WhatsApp message for requesting code after PayPal payment
  const whatsappReceiptMsg = `Hola Alberto! Ya realicé el pago de ${CONFIG.price} por PayPal de la Guía Conquista 50+. Adjunto mi comprobante para que me envíes mi código de acceso personal.`;
  const whatsappReceiptUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(whatsappReceiptMsg)}`;

  // WhatsApp message for inquiring other payment methods
  const whatsappInquiryMsg = score !== null && score !== undefined
    ? `Hola Alberto! Hice el test y obtuve ${score}/100. Quiero adquirir la Guía Conquista 50+ (${CONFIG.price}). ¿Cuáles son los medios de pago?`
    : `Hola Alberto! Quiero adquirir la Guía Conquista 50+ (${CONFIG.price}). ¿Cuáles son los medios de pago disponibles?`;
  const whatsappInquiryUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(whatsappInquiryMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FFFDF9] border border-[#E2D3BA] rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#B8892F]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E1] border border-[#D9B25A] flex items-center justify-center text-[#6D1A36] shrink-0">
              <KeyRound className="w-5 h-5 text-[#B8892F]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#3D0F20]">
                Ingresar Código de Acceso
              </h3>
              <p className="text-xs text-[#7A626B]">
                Acceso exclusivo para compradores
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

        <p className="text-xs sm:text-sm text-[#543F47] mb-4 leading-relaxed bg-[#FAF2E6] border border-[#EADAC0] p-3 rounded-xl">
          Escribe aquí el código personal que recibiste tras confirmar tu compra para desbloquear de por vida la guía completa.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="modalCodeInput" className="block text-xs font-bold text-[#3D0F20] uppercase tracking-wider mb-1.5">
              Tu Código de Desbloqueo:
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
                placeholder="Escribe tu código personal aquí..."
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
            <span>Desbloquear Guía</span>
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#E8DEC9] space-y-2.5 text-center">
          {/* Option 1: Already paid by PayPal - Request code via WhatsApp */}
          <div className="bg-[#F4FAF6] border border-[#C6EAD4] p-3 rounded-xl text-left space-y-2">
            <div className="text-xs font-bold text-[#14532D]">
              ¿Ya pagaste por PayPal y necesitas tu código?
            </div>
            <a
              id="modal-whatsapp-receipt-btn"
              href={whatsappReceiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Enviar comprobante por WhatsApp y recibir código</span>
            </a>
          </div>

          {/* Option 2: Haven't bought yet */}
          <div className="pt-2">
            <p className="text-xs text-[#7A626B] mb-2">
              ¿Aún no has adquirido tu acceso ({CONFIG.price})?
            </p>

            <a
              id="modal-paypal-buy-btn"
              href={CONFIG.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openPayPalCheckout}
              className="animate-paypal-destello relative overflow-hidden flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FFC439] via-[#FFB700] to-[#E5A800] hover:brightness-105 text-[#002C6C] font-black text-sm shadow-md transition-all border-2 border-[#FFE885] cursor-pointer mb-2"
            >
              <div className="paypal-shimmer-sweep" />
              <svg className="w-5 h-5 shrink-0 relative z-10" viewBox="0 0 24 24" fill="none">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.784.784 0 0 1 .773-.654h6.58c3.082 0 5.438.742 6.452 2.036 1.047 1.336 1.08 3.197.098 5.534-.98 2.337-2.736 3.655-5.22 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.79 4.316a.641.641 0 0 1-.632.528l-3.69-.275z" fill="#003087" />
                <path d="M18.847 8.636c-.982 2.337-2.738 3.655-5.222 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.847 4.629a.641.641 0 0 1-.633.528H6.96l-.235 1.282a.641.641 0 0 0 .633.74h4.606a.784.784 0 0 0 .773-.654l.872-4.764c.094-.627.593-1.128 1.22-1.194l.21-.022c2.484-.261 4.24-1.579 5.222-3.916.982-2.337.949-4.198-.098-5.534a4.98 4.98 0 0 0-.316-.369z" fill="#0079C1" />
              </svg>
              <span className="relative z-10">Pagar {CONFIG.price} con PayPal</span>
            </a>

            <a
              id="modal-whatsapp-contact-btn"
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg text-[#5C152E] hover:bg-[#F2EAE0] font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>O consultar otros medios de pago por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
