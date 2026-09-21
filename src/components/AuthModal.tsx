import React, { useState } from 'react';
import { X, Mail, KeyRound, ArrowRight, Loader2, CheckCircle2, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { requestMagicLink, verifyMagicCode, loginWithGoogle, claimPurchase, UserProfile } from '../utils/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile, hasAccess: boolean) => void;
  onShowToast: (msg: string) => void;
  defaultTab?: 'login' | 'claim';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onShowToast,
  defaultTab = 'login'
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'claim'>(defaultTab);
  const [emailInput, setEmailInput] = useState<string>('');
  const [codeInput, setCodeInput] = useState<string>('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [devCodePreview, setDevCodePreview] = useState<string | null>(null);

  // Claim purchase form
  const [paypalEmailInput, setPaypalEmailInput] = useState<string>('');
  const [orderIdInput, setOrderIdInput] = useState<string>('');
  const [claimLoading, setClaimLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRequestMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      onShowToast('Por favor ingresa un correo válido');
      return;
    }

    setIsLoading(true);
    const res = await requestMagicLink(emailInput.trim());
    setIsLoading(false);

    if (res.success) {
      setStep('verify');
      if (res.code) {
        setDevCodePreview(res.code);
        setCodeInput(res.code); // auto-fill for frictionless preview
      }
      onShowToast('Código de acceso generado. Ingrésalo para continuar.');
    } else {
      onShowToast(res.message || 'Error al generar código');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) {
      onShowToast('Ingresa el código de 6 dígitos');
      return;
    }

    setIsLoading(true);
    const res = await verifyMagicCode(codeInput.trim(), emailInput.trim());
    setIsLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user, Boolean(res.hasAccess));
      onShowToast(
        res.hasAccess 
          ? '¡Bienvenido! Tienes acceso vitalicio activo a la guía.' 
          : 'Sesión iniciada. Recuerda asociar o completar tu compra de PayPal.'
      );
      onClose();
    } else {
      onShowToast(res.error || 'Código incorrecto o vencido');
    }
  };

  const handleSimulateGoogleLogin = async () => {
    setIsLoading(true);
    const mockEmail = prompt('Ingresa tu cuenta de Google (correo):', emailInput || 'tu-correo@gmail.com');
    if (!mockEmail || !mockEmail.includes('@')) {
      setIsLoading(false);
      return;
    }

    const res = await loginWithGoogle(mockEmail.trim(), mockEmail.split('@')[0]);
    setIsLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user, Boolean(res.hasAccess));
      onShowToast(
        res.hasAccess 
          ? '¡Acceso verificado con Google! Tienes acceso completo.' 
          : 'Sesión iniciada con Google.'
      );
      onClose();
    } else {
      onShowToast(res.error || 'Error al iniciar con Google');
    }
  };

  const handleClaimPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    const userEmail = currentUser?.email || emailInput.trim();
    if (!userEmail) {
      onShowToast('Primero debes ingresar tu correo de cuenta para vincular la compra.');
      setActiveTab('login');
      return;
    }
    if (!paypalEmailInput || !paypalEmailInput.includes('@')) {
      onShowToast('Ingresa el correo con el que pagaste en PayPal');
      return;
    }

    setClaimLoading(true);
    const res = await claimPurchase({
      userEmail,
      paypalEmail: paypalEmailInput.trim(),
      orderId: orderIdInput.trim()
    });
    setClaimLoading(false);

    if (res.success) {
      onShowToast(res.message || '¡Compra vinculada exitosamente!');
      if (currentUser) {
        onLoginSuccess(currentUser, true);
      }
      onClose();
    } else {
      onShowToast(res.error || 'No se encontró una compra asociada a ese correo');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="auth-modal" 
        className="w-full max-w-md bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#7A626B] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-[#FAF0E1] border border-[#D9B25A] flex items-center justify-center mx-auto text-[#6D1A36]">
            <KeyRound className="w-6 h-6 text-[#B8892F]" />
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2A1A1F]">
            Acceso a tu Cuenta
          </h3>
          <p className="text-xs text-[#7A626B]">
            Inicia sesión para mantener tu acceso de por vida desde cualquier dispositivo.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-[#FAF7F2] p-1 border border-[#E8DEC9]">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-[#6D1A36] shadow-xs'
                : 'text-[#7A626B] hover:text-[#2A1A1F]'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setActiveTab('claim')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'claim'
                ? 'bg-white text-[#6D1A36] shadow-xs'
                : 'text-[#7A626B] hover:text-[#2A1A1F]'
            }`}
          >
            Reclamar Pago PayPal
          </button>
        </div>

        {/* TAB 1: LOGIN WITH MAGIC LINK OR GOOGLE */}
        {activeTab === 'login' && (
          <div className="space-y-4">
            {/* Google Login Button */}
            <button
              onClick={handleSimulateGoogleLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl border border-[#D9B25A] bg-white hover:bg-[#FAF7F2] text-[#2A1A1F] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-2xs transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continuar con Google</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E8DEC9]" />
              <span className="text-[11px] uppercase tracking-wider text-[#A08892] font-semibold">o con correo</span>
              <div className="flex-1 h-px bg-[#E8DEC9]" />
            </div>

            {step === 'request' ? (
              <form onSubmit={handleRequestMagicLink} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3D0F20] mb-1">
                    Tu correo electrónico:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7A626B] absolute left-3 top-3.5" />
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="nombre@ejemplo.com"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D9B25A] bg-[#FAF7F2] text-xs sm:text-sm text-[#2A1A1F] focus:outline-hidden focus:ring-2 focus:ring-[#6D1A36]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-[#6D1A36] hover:bg-[#521328] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Recibir Código de Acceso</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-3">
                <div className="p-2.5 bg-[#FAF0E1] border border-[#D9B25A] rounded-xl text-xs text-[#3D0F20]">
                  <span>Código enviado a <strong>{emailInput}</strong>.</span>
                  {devCodePreview && (
                    <div className="mt-1 font-mono font-bold text-[#6D1A36] text-xs">
                      Código generado: {devCodePreview}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D0F20] mb-1">
                    Código de 6 dígitos:
                  </label>
                  <input
                    type="text"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    placeholder="123456"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9B25A] bg-[#FAF7F2] text-center font-mono font-bold text-base tracking-widest text-[#2A1A1F] focus:outline-hidden focus:ring-2 focus:ring-[#6D1A36]"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('request')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC9] text-[#7A626B] font-semibold text-xs hover:bg-[#FAF0E1]"
                  >
                    Cambiar correo
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-2 py-2.5 px-4 rounded-xl bg-[#6D1A36] hover:bg-[#521328] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Verificar y Entrar</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: CLAIM PURCHASE BY PAYPAL EMAIL */}
        {activeTab === 'claim' && (
          <div className="space-y-4 text-left">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
              <strong className="block font-bold text-amber-950 mb-0.5">¿Pagaste con otro correo de PayPal?</strong>
              Si tu cuenta de PayPal usa un correo diferente al de esta sesión, vincúlalo aquí para otorgar acceso inmediato.
            </div>

            <form onSubmit={handleClaimPurchase} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3D0F20] mb-1">
                  Correo de tu cuenta de PayPal:
                </label>
                <input
                  type="email"
                  value={paypalEmailInput}
                  onChange={(e) => setPaypalEmailInput(e.target.value)}
                  placeholder="el-correo-de-paypal@ejemplo.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9B25A] bg-[#FAF7F2] text-xs sm:text-sm text-[#2A1A1F] focus:outline-hidden focus:ring-2 focus:ring-[#6D1A36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D0F20] mb-1">
                  ID de Transacción u Orden (opcional):
                </label>
                <input
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="Ej: 5TR98231LK..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DEC9] bg-[#FAF7F2] text-xs text-[#2A1A1F] focus:outline-hidden focus:ring-2 focus:ring-[#6D1A36]"
                />
              </div>

              <button
                type="submit"
                disabled={claimLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#6D1A36] to-[#4A1024] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {claimLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Vincular y Desbloquear Acceso</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <div className="pt-2 border-t border-[#F0E5D0] text-center">
          <p className="text-[11px] text-[#A08892] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Acceso permanente verificado por el servidor</span>
          </p>
        </div>

      </div>
    </div>
  );
};
