import React from 'react';
import { X, Server, Shield, CheckCircle, ExternalLink, Copy, Terminal, Zap } from 'lucide-react';
import { CONFIG } from '../data';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`Copiado al portapapeles: ${label}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6 text-[#2A1A1F]"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#7A626B] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E1] border border-[#D9B25A] text-[#6D1A36] text-xs font-bold uppercase tracking-wider mb-1">
            <Server className="w-3.5 h-3.5" />
            <span>Guía de Producción & Webhook</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
            Despliegue en Vercel & Configuración de PayPal
          </h2>
          <p className="text-xs sm:text-sm text-[#7A626B]">
            Instrucciones exactas para conectar el sistema de pago único de {CONFIG.price}, el webhook y la base de datos de compras.
          </p>
        </div>

        {/* STEP 1: ENV VARIABLES */}
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC9] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#3D0F20] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#6D1A36] text-white text-xs flex items-center justify-center font-bold">1</span>
              Variables de Entorno en Vercel
            </h3>
            <button
              onClick={() => copyToClipboard(
`PAYPAL_MODE=live
PAYPAL_CLIENT_ID=tu_client_id_aqui
PAYPAL_CLIENT_SECRET=tu_client_secret_aqui
PAYPAL_WEBHOOK_ID=tu_webhook_id_aqui`,
                'Variables de entorno'
              )}
              className="text-xs text-[#6D1A36] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar bloque</span>
            </button>
          </div>
          <p className="text-xs text-[#543F47] leading-relaxed">
            En el panel de tu proyecto en Vercel (<strong>Project Settings &gt; Environment Variables</strong>), agrega las siguientes variables de servidor (nunca expuestas al frontend):
          </p>
          <pre className="p-3 bg-[#2A1A1F] text-amber-200 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`PAYPAL_MODE=live               # o "sandbox" para pruebas
PAYPAL_CLIENT_ID=...          # Obtenido en PayPal Developer
PAYPAL_CLIENT_SECRET=...      # Obtenido en PayPal Developer
PAYPAL_WEBHOOK_ID=...         # Obtenido al registrar el Webhook en PayPal`}
          </pre>
        </div>

        {/* STEP 2: PAYPAL DEVELOPER SETUP */}
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC9] space-y-3">
          <h3 className="font-bold text-sm text-[#3D0F20] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#6D1A36] text-white text-xs flex items-center justify-center font-bold">2</span>
            Configurar Webhook en PayPal Developer
          </h3>
          <ol className="text-xs text-[#543F47] space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              Entra en <a href="https://developer.paypal.com" target="_blank" rel="noopener noreferrer" className="text-[#6D1A36] font-bold underline inline-flex items-center gap-0.5">developer.paypal.com <ExternalLink className="w-3 h-3" /></a> e inicia sesión con tu cuenta de negocios.
            </li>
            <li>
              Ve a <strong>Apps & Credentials</strong> y crea o selecciona tu aplicación en modo <strong>Live</strong>.
            </li>
            <li>
              Copia el <strong>Client ID</strong> y <strong>Secret</strong> y pégalos en las variables de entorno de tu servidor en Vercel.
            </li>
            <li>
              Baja a la sección <strong>Webhooks</strong> y haz clic en <strong>Add Webhook</strong>.
            </li>
            <li>
              En <strong>Webhook URL</strong>, introduce tu dominio de Vercel seguido de:
              <div className="mt-1 flex items-center gap-2">
                <code className="p-1.5 bg-white border border-[#D9B25A] text-[#6D1A36] rounded-md font-mono text-xs font-bold select-all">
                  https://tu-dominio.vercel.app/api/paypal/webhook
                </code>
                <button
                  onClick={() => copyToClipboard('https://tu-dominio.vercel.app/api/paypal/webhook', 'Webhook URL')}
                  className="p-1.5 rounded-md bg-[#FAF0E1] border border-[#D9B25A] text-[#6D1A36] hover:bg-[#F2E3CD] cursor-pointer"
                  title="Copiar URL"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
            <li>
              Marca las siguientes casillas de eventos obligatorios:
              <ul className="mt-1.5 ml-4 space-y-1 list-disc font-medium text-[#2A1A1F]">
                <li><code className="text-[#6D1A36] font-bold">Payment capture completed</code> (otorga acceso de por vida automáticamente)</li>
                <li><code className="text-[#6D1A36] font-bold">Checkout order approved</code> (registra la orden)</li>
                <li><code className="text-[#6D1A36] font-bold">Payment capture refunded</code> (revoca el acceso si hay reembolso)</li>
                <li><code className="text-[#6D1A36] font-bold">Payment capture reversed</code> (revoca el acceso ante reversión bancaria)</li>
                <li><code className="text-[#6D1A36] font-bold">Customer dispute created</code> (revoca el acceso temporalmente ante disputa)</li>
              </ul>
            </li>
            <li>
              Guarda y copia el <strong>Webhook ID</strong> generado para colocarlo en <code className="font-bold">PAYPAL_WEBHOOK_ID</code>.
            </li>
          </ol>
        </div>

        {/* STEP 3: RETURN URL */}
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC9] space-y-2.5">
          <h3 className="font-bold text-sm text-[#3D0F20] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#6D1A36] text-white text-xs flex items-center justify-center font-bold">3</span>
            Configurar URL de Retorno en PayPal
          </h3>
          <p className="text-xs text-[#543F47] leading-relaxed">
            En la configuración de tu botón de pago o link de PayPal (<a href={CONFIG.paymentUrl} target="_blank" rel="noopener noreferrer" className="text-[#6D1A36] font-bold underline">enlace actual</a>), configura la URL de retorno a:
          </p>
          <div className="flex items-center gap-2">
            <code className="p-2 bg-white border border-[#D9B25A] text-[#6D1A36] rounded-xl font-mono text-xs font-bold select-all flex-1">
              https://tu-dominio.vercel.app/?return=true
            </code>
            <button
              onClick={() => copyToClipboard('https://tu-dominio.vercel.app/?return=true', 'URL de Retorno')}
              className="p-2 rounded-xl bg-[#FAF0E1] border border-[#D9B25A] text-[#6D1A36] hover:bg-[#F2E3CD] cursor-pointer"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-[#7A626B]">
            Cuando el usuario finalice el pago, PayPal lo redirigirá a esta pantalla que muestra <em>"Verificando tu pago…"</em>, valida contra el servidor y le da acceso instantáneo.
          </p>
        </div>

        {/* STEP 4: VERCEL DEPLOY */}
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC9] space-y-3">
          <h3 className="font-bold text-sm text-[#3D0F20] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#6D1A36] text-white text-xs flex items-center justify-center font-bold">4</span>
            Comando de Despliegue en Vercel
          </h3>
          <p className="text-xs text-[#543F47] leading-relaxed">
            Si despliegas mediante el CLI de Vercel o GitHub:
          </p>
          <pre className="p-3 bg-[#2A1A1F] text-emerald-300 rounded-xl text-xs font-mono overflow-x-auto">
{`# 1. Instalar dependencias
npm install

# 2. Compilar frontend y servidor
npm run build

# 3. Desplegar con Vercel CLI
vercel --prod`}
          </pre>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-4 rounded-xl bg-[#6D1A36] hover:bg-[#521328] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
        >
          Entendido, Cerrar Guía
        </button>

      </div>
    </div>
  );
};
