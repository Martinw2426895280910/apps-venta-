import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  KeyRound, 
  MessageCircle, 
  RotateCcw, 
  ArrowRight, 
  AlertCircle, 
  Lightbulb,
  HeartHandshake,
  Home,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { CONFIG, CATS, CAT_ICON, TIP } from '../data';
import { DiagnosisScore, CategoryKey } from '../types';
import { openPayPalCheckout } from '../utils/payment';

interface ResultScreenProps {
  scoreData: DiagnosisScore;
  unlocked: boolean;
  onUnlock: (code: string) => boolean;
  onOpenGuide: () => void;
  onRetake: () => void;
  onGoHome?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  scoreData,
  unlocked,
  onUnlock,
  onOpenGuide,
  onRetake,
  onGoHome
}) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [displayScore, setDisplayScore] = useState(0);

  const { score, cats, pct } = scoreData;

  // Animate score counter up
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = score / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const getLevel = (s: number) => {
    if (s >= 70) {
      return {
        name: "Listo para conquistar",
        emoji: "🌹",
        color: "text-emerald-700",
        badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
        msg: "Tienes una base sólida: respeto, buena escucha y presencia. Con los ajustes de la guía completa estarás en una posición inmejorable."
      };
    }
    if (s >= 40) {
      return {
        name: "En camino",
        emoji: "🌷",
        color: "text-amber-700",
        badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
        msg: "Vas por buen camino. Aplicando cambios específicos en tus puntos más bajos lograrás conectar con mucha mayor facilidad y naturalidad."
      };
    }
    return {
      name: "Principiante con potencial",
      emoji: "🌱",
      color: "text-rose-700",
      badgeBg: "bg-rose-100 text-rose-900 border-rose-300",
      msg: "Todos empezamos en algún punto. La excelente noticia es que los hábitos de presencia y conversación que más valoran las mujeres de 50 se aprenden paso a paso."
    };
  };

  const levelInfo = getLevel(score);

  // Take top 3 recommendations (categories with lowest score, or sorted)
  const topTips = cats.slice(0, 3);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setCodeError('Escribe el código que recibiste por WhatsApp.');
      return;
    }
    const success = onUnlock(code.trim());
    if (success) {
      setCodeError('');
    } else {
      setCodeError('Código incorrecto. Verifica el mensaje recibido tras abonar.');
    }
  };

  const whatsappMsg = `Hola! Realicé el test de Conquista a una mujer de 50 y obtuve ${score}/100 (${levelInfo.name}). Quiero comprar mi código de acceso por ${CONFIG.price}. ¿Cuáles son los datos de pago?`;
  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  // Circular gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Top Navigation Back to Home */}
      {onGoHome && (
        <div className="flex items-center justify-between no-print">
          <button
            id="result-back-home-btn"
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6D1A36] hover:text-[#3D0F20] px-3 py-1.5 rounded-full hover:bg-[#F2EAE0] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Volver a la página principal</span>
          </button>
        </div>
      )}

      {/* Score Header Card */}
      <section className="bg-[#FFFDF9] border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 text-center shadow-md relative overflow-hidden">
        <div className="text-xs font-bold text-[#7A626B] uppercase tracking-widest mb-3">
          Tu Diagnóstico de Conquista
        </div>

        {/* Animated Circular Gauge */}
        <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-[#EFE5D5] fill-none"
              strokeWidth="9"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-[#B8892F] fill-none transition-all duration-1000 ease-out"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-bold text-5xl text-[#2A1A1F] leading-none">
              {displayScore}
            </span>
            <span className="text-xs text-[#7A626B] font-semibold mt-1">
              de 100 puntos
            </span>
          </div>
        </div>

        {/* Level badge */}
        <div className="mt-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-bold ${levelInfo.badgeBg}`}>
            <span>{levelInfo.emoji}</span>
            <span>{levelInfo.name}</span>
          </span>
        </div>

        <p className="text-sm sm:text-base text-[#543F47] max-w-lg mx-auto leading-relaxed">
          {levelInfo.msg}
        </p>

        {/* Category breakdown bars */}
        <div className="mt-6 pt-6 border-t border-[#F0E5D0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {(Object.keys(CATS) as CategoryKey[]).map((key) => {
            const val = pct[key] ?? 0;
            const isGood = val >= 67;
            return (
              <div key={key} className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E2D3BA]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#2A1A1F] flex items-center gap-1">
                    <span>{CAT_ICON[key]}</span>
                    <span>{CATS[key]}</span>
                  </span>
                  <span className={`font-bold ${isGood ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {val}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#E8DEC9] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isGood ? 'bg-emerald-600' : 'bg-[#B8892F]'
                    }`}
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Free 3 Tips Section */}
      <section className="bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FAF0E1] text-[#B8892F] flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2A1A1F]">
              Tus 3 consejos gratuitos para empezar hoy
            </h2>
            <p className="text-xs text-[#7A626B]">
              Acciones inmediatas basadas en tus áreas con mayor oportunidad de mejora
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {topTips.map((tipItem, idx) => (
            <article 
              key={idx}
              className="bg-[#FAF7F2] border-l-4 border-[#B8892F] rounded-r-2xl border-y border-r border-[#E2D3BA] p-4.5 transition-all hover:bg-[#F7F2E9]"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">{CAT_ICON[tipItem.k]}</span>
                <h3 className="font-bold text-sm text-[#2A1A1F]">
                  {CATS[tipItem.k]}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#543F47] leading-relaxed">
                {TIP[tipItem.k]}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Unlocked status OR Sales & Unlock Offer Box */}
      {unlocked ? (
        <section className="bg-[#FAF0E1] border-2 border-[#D9B25A] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-md">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[#3D0F20]">
            ¡Tu Guía Personalizada está Desbloqueada!
          </h2>
          <p className="text-sm text-[#665058] max-w-md mx-auto">
            Ya tienes acceso completo al plan de 7 días, ideas de citas con fotos, los 15 mensajes y el checklist de 90 días.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="result-open-guide-btn"
              onClick={onOpenGuide}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#6D1A36] hover:bg-[#852143] text-white font-bold text-base shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <span>Abrir Mi Guía Personalizada</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              id="result-unlocked-paypal-btn"
              href={CONFIG.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openPayPalCheckout}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-[#FFC439] hover:bg-[#FFB700] text-[#002C6C] font-extrabold text-xs sm:text-sm border border-[#FFE277] shadow-sm transition-all cursor-pointer"
            >
              <span>Enlace de Pago PayPal ({CONFIG.price})</span>
            </a>
          </div>
        </section>
      ) : (
        <section className="bg-gradient-to-br from-[#3D0F20] via-[#5C152E] to-[#200711] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#8F2449]/40 space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#ECC978]/20 border border-[#ECC978]/40 text-[#ECC978] text-xs font-bold uppercase tracking-wider">
              Material Completo Exclusivo
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Desbloquea tu Guía Personalizada Completa
            </h2>
            <p className="text-xs sm:text-sm text-[#F0E5D0]/90">
              Un manual interactivo a tu medida con base en tus {score} puntos para conquistar a la mujer que te interesa.
            </p>
          </div>

          {/* Checklist of benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#F4EBE0]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ECC978] shrink-0 mt-0.5" />
              <span>Diagnóstico profundo de fortalezas y debilidades</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ECC978] shrink-0 mt-0.5" />
              <span>Plan de 7 días interactivo con 1 acción diaria</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ECC978] shrink-0 mt-0.5" />
              <span>10 ideas de citas con fotos filtrables por costo</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ECC978] shrink-0 mt-0.5" />
              <span>15 mensajes de WhatsApp listos para copiar con 1 clic</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ECC978] shrink-0 mt-0.5" />
              <span>Errores críticos y frases que debes evitar</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ECC978] shrink-0 mt-0.5" />
              <span>Checklist de los primeros 90 días de relación sólida</span>
            </div>
          </div>

          {/* Locked Preview Box with Glass/Blur Effect */}
          <div className="relative rounded-2xl bg-black/25 border border-white/10 p-4 overflow-hidden">
            <div className="filter blur-[4px] select-none pointer-events-none opacity-60 text-xs space-y-2">
              <div className="font-bold text-[#ECC978]">Día 3: El mensaje de conexión sincera</div>
              <p>Hola [nombre], disfruté mucho nuestra conversación sobre tus viajes. Me quedé pensando en lo que mencionaste de tu amor por la literatura...</p>
              <div className="font-bold text-[#ECC978]">Idea de Cita: Café íntimo y conversación sin reloj</div>
              <p>Elegir una mesa en rincón con iluminación cálida. La clave es llegar 10 minutos antes...</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#200711]/90 border border-[#ECC978]/40 text-[#ECC978] text-xs font-bold shadow-md">
                <Lock className="w-3.5 h-3.5" />
                <span>Contenido bloqueado hasta ingresar tu código</span>
              </div>
            </div>
          </div>

          {/* Price & Primary Payment: PAYPAL BUTTON (BIG & PULSATING) */}
          <div className="pt-3 space-y-4 border-t border-white/15">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <div className="flex items-baseline justify-center sm:justify-start gap-2">
                  <span className="font-display font-bold text-4xl sm:text-5xl text-[#ECC978]">{CONFIG.price}</span>
                  <span className="text-xs text-[#F0E5D0]/80 font-medium">Pago único</span>
                </div>
                <p className="text-xs text-[#ECC978]">Acceso completo e ilimitado de por vida</p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-xs text-[#F4EBE0] border border-white/15">
                <ShieldCheck className="w-4 h-4 text-[#ECC978] shrink-0" />
                <span>Pago seguro garantizado</span>
              </div>
            </div>

            {/* BIG PULSATING PAYPAL BUTTON */}
            <div className="relative pt-1">
              <a
                id="paypal-primary-buy-btn"
                href={CONFIG.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openPayPalCheckout}
                className="animate-paypal-destello relative overflow-hidden flex flex-col items-center justify-center w-full py-4 sm:py-5 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-[#FFC439] via-[#FFB700] to-[#E5A800] hover:from-[#FFD05E] hover:to-[#FFB700] text-[#002C6C] font-black text-lg sm:text-xl shadow-2xl active:scale-[0.98] transition-all cursor-pointer border-2 border-[#FFE885] no-underline"
              >
                <div className="paypal-shimmer-sweep" />
                <div className="flex items-center justify-center gap-2.5 sm:gap-3 relative z-10">
                  {/* Official PayPal Monogram SVG */}
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.784.784 0 0 1 .773-.654h6.58c3.082 0 5.438.742 6.452 2.036 1.047 1.336 1.08 3.197.098 5.534-.98 2.337-2.736 3.655-5.22 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.79 4.316a.641.641 0 0 1-.632.528l-3.69-.275z" fill="#003087" />
                    <path d="M18.847 8.636c-.982 2.337-2.738 3.655-5.222 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.847 4.629a.641.641 0 0 1-.633.528H6.96l-.235 1.282a.641.641 0 0 0 .633.74h4.606a.784.784 0 0 0 .773-.654l.872-4.764c.094-.627.593-1.128 1.22-1.194l.21-.022c2.484-.261 4.24-1.579 5.222-3.916.982-2.337.949-4.198-.098-5.534a4.98 4.98 0 0 0-.316-.369z" fill="#0079C1" />
                  </svg>
                  <span className="tracking-tight uppercase">PAGAR CON PAYPAL ({CONFIG.price})</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#002C6C] shrink-0" />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-[#003087]/85 tracking-normal mt-1 relative z-10">
                  Tarjeta de Crédito, Débito o Saldo PayPal • Desbloqueo Inmediato
                </span>
              </a>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
              <p className="text-[11px] sm:text-xs text-[#ECC978]">
                ⚡ <strong>Acceso verificado:</strong> Tras completar tu pago seguro en PayPal, ingresa tu código de acceso privado para desbloquear tu guía inmediatamente. Si necesitas tu código, solicítalo por WhatsApp con tu comprobante.
              </p>
            </div>

            {/* Alternative payment method via WhatsApp */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
              <a
                id="result-buy-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#25D366] hover:text-[#42f085] text-xs sm:text-sm font-semibold border border-[#25D366]/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>¿Prefieres transferir o consultar por WhatsApp?</span>
              </a>
            </div>
          </div>

          {/* Access Code Input Box */}
          <div className="pt-4 border-t border-white/15 space-y-3">
            <label htmlFor="resultCodeInput" className="block text-xs font-bold text-[#ECC978] uppercase tracking-wider">
              ¿Ya compraste y tienes tu código? Escríbelo aquí:
            </label>
            <form onSubmit={handleUnlockSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                id="resultCodeInput"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (codeError) setCodeError('');
                }}
                placeholder="Escribe tu código de acceso aquí..."
                autoCapitalize="characters"
                autoComplete="off"
                className="flex-1 px-4 py-3 bg-white/10 border border-[#ECC978]/50 rounded-xl text-white placeholder:text-white/50 text-sm font-semibold tracking-wider uppercase focus:outline-none focus:border-[#ECC978]"
              />
              <button
                type="submit"
                id="result-unlock-code-btn"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ECC978] to-[#B8892F] hover:brightness-105 active:scale-98 text-[#2A1A1F] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <KeyRound className="w-4 h-4" />
                <span>Desbloquear</span>
              </button>
            </form>
            {codeError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-300 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{codeError}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Retake test action */}
      <div className="text-center pt-2">
        <button
          id="result-retake-btn"
          onClick={onRetake}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7A626B] hover:text-[#6D1A36] px-3 py-1.5 rounded-full hover:bg-[#FAF0E1] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Repetir el test interactivo</span>
        </button>
      </div>

    </div>
  );
};
