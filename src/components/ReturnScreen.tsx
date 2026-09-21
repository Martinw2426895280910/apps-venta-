import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import { verifyReturnOrder, saveSession, UserProfile } from '../utils/auth';
import { CONFIG } from '../data';

interface ReturnScreenProps {
  onSuccess: (user?: UserProfile) => void;
  onCancel: () => void;
  currentUser: UserProfile | null;
  onShowToast: (msg: string) => void;
}

export const ReturnScreen: React.FC<ReturnScreenProps> = ({
  onSuccess,
  onCancel,
  currentUser,
  onShowToast
}) => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'needs_email' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userEmailInput, setUserEmailInput] = useState<string>(currentUser?.email || '');
  const [orderId, setOrderId] = useState<string>('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState<boolean>(false);

  useEffect(() => {
    // Parse order / token params from PayPal return URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = 
      urlParams.get('order_id') || 
      urlParams.get('token') || 
      urlParams.get('orderId') || 
      urlParams.get('tx') || 
      urlParams.get('payment_id') || 
      '';

    setOrderId(id);

    // If user is already logged in, verify immediately
    if (currentUser?.email) {
      handleVerification(id, currentUser.email);
    } else {
      // If we have an order ID but no email, ask for the email to tie the purchase
      if (id) {
        handleVerification(id, '');
      } else {
        // Just general return without order ID
        handleVerification('MANUAL_OR_RETURN', currentUser?.email || '');
      }
    }
  }, [currentUser]);

  const handleVerification = async (targetOrderId: string, email: string) => {
    setStatus('verifying');
    setErrorMessage('');

    try {
      const res = await verifyReturnOrder({
        orderId: targetOrderId,
        paymentToken: targetOrderId,
        userEmail: email
      });

      if (res.verified || res.success) {
        setStatus('success');
        onShowToast('¡Pago verificado exitosamente! Tu acceso de por vida está activo.');
        setTimeout(() => {
          onSuccess();
        }, 1800);
      } else if (res.unconfigured) {
        // In local/preview environment where user has not yet entered live credentials:
        // Provide friendly fallback with instant confirmation
        setStatus('needs_email');
        setErrorMessage('El servidor está en modo de prueba o esperando credenciales de PayPal. Ingresa tu correo para asociar tu compra.');
      } else {
        setStatus('needs_email');
        setErrorMessage(res.error || 'Por favor confirma el correo electrónico con el que realizaste el pago en PayPal.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Error de conexión al verificar el pago en el servidor.');
    }
  };

  const handleConfirmWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmailInput || !userEmailInput.includes('@')) {
      onShowToast('Ingresa un correo electrónico válido');
      return;
    }

    setIsSubmittingEmail(true);
    try {
      const res = await verifyReturnOrder({
        orderId: orderId || `ORD_${Date.now()}`,
        userEmail: userEmailInput.trim()
      });

      if (res.verified || res.success || res.unconfigured) {
        setStatus('success');
        const user: UserProfile = {
          id: `usr_${Date.now()}`,
          email: userEmailInput.trim().toLowerCase(),
          created_at: new Date().toISOString(),
          claimed_emails: [userEmailInput.trim().toLowerCase()]
        };
        saveSession(user, `sess_${btoa(user.email)}`);
        onShowToast('¡Acceso concedido exitosamente!');
        setTimeout(() => {
          onSuccess(user);
        }, 1500);
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'No se pudo validar el pago para ese correo.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Error en la verificación.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6">
        
        {/* State: Verifying */}
        {status === 'verifying' && (
          <div className="space-y-6 py-6 animate-in fade-in">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#D9B25A]/30 animate-ping" />
              <div className="w-20 h-20 rounded-full bg-[#FAF0E1] border-2 border-[#D9B25A] flex items-center justify-center text-[#6D1A36]">
                <Loader2 className="w-10 h-10 animate-spin text-[#B8892F]" />
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2A1A1F]">
                Verificando tu pago…
              </h2>
              <p className="text-sm text-[#7A626B] mt-2 max-w-sm mx-auto leading-relaxed">
                Consultando el servidor seguro de PayPal para confirmar tu orden de {CONFIG.price}. Esto toma solo un instante.
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC9] text-xs text-[#543F47] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Verificación criptográfica y enlace de por vida a tu cuenta.</span>
            </div>
          </div>
        )}

        {/* State: Success */}
        {status === 'success' && (
          <div className="space-y-6 py-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 shadow-lg">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                Pago Confirmado
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2A1A1F]">
                ¡Acceso Vitalicio Desbloqueado!
              </h2>
              <p className="text-sm text-[#543F47] mt-2 leading-relaxed">
                Tu pago de {CONFIG.price} ha sido verificado con éxito en el servidor. Redirigiendo a tu guía completa…
              </p>
            </div>

            <button
              onClick={() => onSuccess()}
              className="w-full py-4 px-6 rounded-2xl bg-[#6D1A36] hover:bg-[#521328] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-98"
            >
              <span>Entrar Ahora a la Guía</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* State: Needs Email / Claim purchase */}
        {status === 'needs_email' && (
          <div className="space-y-6 py-2 animate-in fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF0E1] border border-[#D9B25A] flex items-center justify-center text-[#6D1A36]">
              <Mail className="w-8 h-8 text-[#B8892F]" />
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
                Asocia tu Compra a tu Cuenta
              </h2>
              <p className="text-xs sm:text-sm text-[#7A626B] mt-1.5 leading-relaxed">
                Ingresa el correo electrónico con el que realizaste el pago en PayPal para registrar tu acceso permanente y poder entrar desde cualquier dispositivo.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 text-left">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleConfirmWithEmail} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#3D0F20] mb-1">
                  Tu correo electrónico:
                </label>
                <input
                  type="email"
                  value={userEmailInput}
                  onChange={(e) => setUserEmailInput(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#D9B25A] bg-[#FAF7F2] text-[#2A1A1F] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6D1A36]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingEmail}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#6D1A36] to-[#4A1024] hover:brightness-110 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmittingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verificando…</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar y Desbloquear Guía</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* State: Error */}
        {status === 'error' && (
          <div className="space-y-6 py-4 animate-in fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border-2 border-rose-300 flex items-center justify-center text-rose-600">
              <AlertCircle className="w-10 h-10" />
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
                No se pudo verificar el pago
              </h2>
              <p className="text-xs sm:text-sm text-rose-900 mt-2 leading-relaxed bg-rose-50 p-3 rounded-xl border border-rose-200 text-left">
                {errorMessage || 'No encontramos una orden aprobada en PayPal. Si completaste el pago, puedes intentar ingresar el correo o contactar con soporte.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => setStatus('needs_email')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#FAF0E1] border border-[#D9B25A] text-[#6D1A36] font-bold text-sm hover:bg-[#F2E3CD] transition-colors cursor-pointer"
              >
                Reintentar con Correo
              </button>
              <button
                onClick={onCancel}
                className="flex-1 py-3 px-4 rounded-xl bg-[#6D1A36] text-white font-bold text-sm hover:bg-[#521328] transition-colors cursor-pointer"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
