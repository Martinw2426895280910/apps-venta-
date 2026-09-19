import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, KeyRound, MessageCircle, Clock, Award } from 'lucide-react';
import { CONFIG } from '../data';
import { openPayPalCheckout } from '../utils/payment';
import heroImg from '../assets/images/hero_conquista_50_1789796336873.jpg';
import coupleImg from '../assets/images/couple_romance_50_1789796350674.jpg';
import gentlemanImg from '../assets/images/mature_gentleman_style_1789796364777.jpg';

interface IntroScreenProps {
  onStartQuiz: () => void;
  onOpenUnlock: () => void;
  hasPreviousResult: boolean;
  onViewResult: () => void;
  unlocked?: boolean;
  onGoGuide?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onStartQuiz,
  onOpenUnlock,
  hasPreviousResult,
  onViewResult,
  unlocked,
  onGoGuide,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Hero Banner with High Quality Generated Photography */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3D0F20] via-[#5C152E] to-[#200711] text-[#FAF7F2] shadow-xl border border-[#7A2846]/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E1]/15 backdrop-blur-sm border border-[#ECC978]/30 text-[#ECC978] text-xs md:text-sm font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#ECC978]" />
              <span>Método exclusivo para caballeros maduros</span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-white mb-4">
              Conquista a una mujer de 50 con respeto, elegancia y verdad
            </h1>

            <p className="text-base sm:text-lg text-[#F4EBE0]/90 font-normal leading-relaxed mb-6 max-w-xl">
              A los 50 años, una mujer no busca poses ni frases de libreto. Busca tranquilidad, escucha real, presencia y un hombre seguro de sí mismo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* PRIMARY PROMINENT PAYPAL BUTTON IN HERO */}
              <a
                id="hero-paypal-direct-btn"
                href={CONFIG.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openPayPalCheckout}
                className="animate-paypal-pulse inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#FFC439] via-[#FFB700] to-[#E5A800] hover:brightness-105 active:scale-[0.98] text-[#002C6C] font-black text-base md:text-lg shadow-xl shadow-amber-900/30 transition-all border-2 border-[#FFE885] cursor-pointer"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.784.784 0 0 1 .773-.654h6.58c3.082 0 5.438.742 6.452 2.036 1.047 1.336 1.08 3.197.098 5.534-.98 2.337-2.736 3.655-5.22 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.79 4.316a.641.641 0 0 1-.632.528l-3.69-.275z" fill="#003087" />
                  <path d="M18.847 8.636c-.982 2.337-2.738 3.655-5.222 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.847 4.629a.641.641 0 0 1-.633.528H6.96l-.235 1.282a.641.641 0 0 0 .633.74h4.606a.784.784 0 0 0 .773-.654l.872-4.764c.094-.627.593-1.128 1.22-1.194l.21-.022c2.484-.261 4.24-1.579 5.222-3.916.982-2.337.949-4.198-.098-5.534a4.98 4.98 0 0 0-.316-.369z" fill="#0079C1" />
                </svg>
                <span className="uppercase">Comprar Guía con PayPal ({CONFIG.price})</span>
              </a>

              {unlocked && onGoGuide ? (
                <button
                  id="hero-go-guide-btn"
                  onClick={onGoGuide}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#ECC978] via-[#D9B25A] to-[#B8892F] hover:brightness-105 active:scale-[0.98] text-[#2A1A1F] font-bold text-base md:text-lg shadow-lg shadow-black/25 transition-all cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#2A1A1F]" />
                  <span>Ver mi Guía Desbloqueada</span>
                  <ArrowRight className="w-5 h-5 text-[#2A1A1F]" />
                </button>
              ) : (
                <button
                  id="hero-start-test-btn"
                  onClick={onStartQuiz}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/15 hover:bg-white/25 active:scale-[0.98] text-white border border-white/40 font-bold text-base shadow-md backdrop-blur-xs transition-all cursor-pointer"
                >
                  <span>Hacer Test Gratis (2 min)</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              )}

              {!unlocked && (
                <button
                  id="hero-enter-code-btn"
                  onClick={onOpenUnlock}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-black/30 hover:bg-black/40 active:scale-[0.98] text-[#F4EBE0] border border-white/20 text-xs sm:text-sm font-semibold backdrop-blur-xs transition-all cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-[#ECC978]" />
                  <span>Tengo código</span>
                </button>
              )}

              {unlocked && (
                <button
                  id="hero-start-test-retake-btn"
                  onClick={onStartQuiz}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white border border-white/30 text-sm md:text-base font-semibold backdrop-blur-xs transition-all cursor-pointer"
                >
                  <span>Repetir Test Diagnóstico</span>
                </button>
              )}
            </div>

            {hasPreviousResult && (
              <div className="mt-4">
                <button
                  id="hero-view-prev-result-btn"
                  onClick={onViewResult}
                  className="text-xs text-[#ECC978] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver mi resultado anterior guardado</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Quick Benefits Pills */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-7 pt-6 border-t border-white/15 text-xs text-[#EADCCE]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#ECC978]" />
                <span>Solo 10 preguntas</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#ECC978]" />
                <span>3 consejos gratis al instante</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ECC978]" />
                <span>100% privado y confidencial</span>
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden">
            <img
              src={heroImg}
              alt="Mujer elegante y atractiva de 50 años sonriendo en un café cálido"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center lg:rounded-r-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#200711] via-transparent lg:bg-gradient-to-r lg:from-[#3D0F20] lg:via-transparent opacity-80" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-black/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-white">
              <p className="text-xs font-serif italic text-[#ECC978]">
                "La seguridad madura no se pregona: se percibe en cómo miras y cómo escuchas."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct WhatsApp Purchase Box for Clients arriving from WhatsApp */}
      <section className="bg-[#FAF0E1] border-2 border-[#D9B25A]/60 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#B8892F] text-white text-[11px] font-bold tracking-wider uppercase mb-1">
              Atención directa por WhatsApp
            </span>
            <h3 className="font-display font-bold text-xl text-[#3D0F20]">
              ¿Compraste o quieres comprar el código de acceso?
            </h3>
            <p className="text-xs sm:text-sm text-[#665058] max-w-lg">
              El vendedor te entrega tu código exclusivo por WhatsApp tras abonar los <strong>{CONFIG.price}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
            <button
              id="intro-box-enter-code-btn"
              onClick={onOpenUnlock}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#6D1A36] hover:bg-[#852143] active:scale-98 text-white text-sm font-bold shadow-sm transition-all"
            >
              <KeyRound className="w-4 h-4 text-[#ECC978]" />
              <span>Ingresar Código</span>
            </button>
            <a
              id="intro-box-whatsapp-btn"
              href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
                `Hola! Quiero adquirir mi código de acceso para la Guía Conquista 50+ (${CONFIG.price}). ¿Cómo puedo pagar?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Visual Value Cards with Photography */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#3D0F20]">
            Qué aprenderás en esta guía interactiva
          </h2>
          <p className="text-sm text-[#665058]">
            Herramientas prácticas creadas específicamente para las expectativas, sensibilidades e inteligencia de una mujer de 50 años.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          
          {/* Card 1: Presencia */}
          <article className="bg-white border border-[#E2D3BA] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
            <div className="h-44 overflow-hidden relative">
              <img
                src={gentlemanImg}
                alt="Caballero maduro con estilo sobrio y pulcro"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#3D0F20]/80 backdrop-blur-xs text-[#ECC978] text-xs font-semibold">
                ✨ Presencia & Estilo
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-display font-bold text-lg text-[#2A1A1F] mb-1.5">
                  La elegancia que no necesita alardear
                </h3>
                <p className="text-xs text-[#665058] leading-relaxed">
                  Cómo elegir tu atuendo, aroma discreto, calzado y lenguaje corporal para comunicar solidez y respeto desde el primer segundo.
                </p>
              </div>
              <ul className="text-xs text-[#3D0F20] space-y-1.5 pt-2 border-t border-[#F0E5D0]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8892F] shrink-0" />
                  <span>Vestimenta favorecedora y cómoda</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8892F] shrink-0" />
                  <span>Aroma sobrio que deja huella sutil</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Card 2: Conversación y Escucha */}
          <article className="bg-white border border-[#E2D3BA] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
            <div className="h-44 overflow-hidden relative">
              <img
                src={coupleImg}
                alt="Pareja madura disfrutando de un café en terraza con risas genuinas"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#3D0F20]/80 backdrop-blur-xs text-[#ECC978] text-xs font-semibold">
                💬 Charla & Complicidad
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-display font-bold text-lg text-[#2A1A1F] mb-1.5">
                  La regla de oro de la escucha 70/30
                </h3>
                <p className="text-xs text-[#665058] leading-relaxed">
                  Las preguntas abiertas exactas que hacen que ella se sienta verdaderamente vista, escuchada y comprendida en sus vivencias.
                </p>
              </div>
              <ul className="text-xs text-[#3D0F20] space-y-1.5 pt-2 border-t border-[#F0E5D0]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8892F] shrink-0" />
                  <span>15 mensajes probados para WhatsApp</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8892F] shrink-0" />
                  <span>Cómo evitar monopolizar la plática</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Card 3: Citas Memorables */}
          <article className="bg-white border border-[#E2D3BA] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Cena íntima con luz tenue y vino de autor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#3D0F20]/80 backdrop-blur-xs text-[#ECC978] text-xs font-semibold">
                🍷 Citas sin Ruido
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-display font-bold text-lg text-[#2A1A1F] mb-1.5">
                  Planes pensados con atmósfera
                </h3>
                <p className="text-xs text-[#665058] leading-relaxed">
                  10 ideas adaptadas a su estilo (tranquilo, cultural, aire libre, gastronómico) y filtrables por tu presupuesto real.
                </p>
              </div>
              <ul className="text-xs text-[#3D0F20] space-y-1.5 pt-2 border-t border-[#F0E5D0]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8892F] shrink-0" />
                  <span>Cero improvisaciones incómodas</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8892F] shrink-0" />
                  <span>Lugares con baja contaminación acústica</span>
                </li>
              </ul>
            </div>
          </article>

        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="bg-gradient-to-r from-[#FAF0E1] to-[#FFF9F0] border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-xs">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#3D0F20]">
          ¿Listo para evaluar tu perfil de conquista?
        </h2>
        <p className="text-sm text-[#665058] max-w-md mx-auto">
          Responde con honestidad las 10 preguntas. Conocerás tu puntuación exacta de 0 a 100 y recibirás tus 3 mejores consejos gratuitos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <button
            id="bottom-start-quiz-btn"
            onClick={onStartQuiz}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-[#6D1A36] hover:bg-[#852143] text-white font-bold text-base shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <span>Iniciar Test Gratuito Ahora</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id="intro-bottom-paypal-btn"
            href={CONFIG.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openPayPalCheckout}
            className="animate-paypal-pulse inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded-full bg-gradient-to-r from-[#FFC439] to-[#FFB700] hover:brightness-105 text-[#002C6C] font-black text-sm shadow-md transition-all border border-[#FFE277] cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.784.784 0 0 1 .773-.654h6.58c3.082 0 5.438.742 6.452 2.036 1.047 1.336 1.08 3.197.098 5.534-.98 2.337-2.736 3.655-5.22 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.79 4.316a.641.641 0 0 1-.632.528l-3.69-.275z" fill="#003087" />
              <path d="M18.847 8.636c-.982 2.337-2.738 3.655-5.222 3.916l-.21.022c-.628.066-1.127.567-1.22 1.194l-.847 4.629a.641.641 0 0 1-.633.528H6.96l-.235 1.282a.641.641 0 0 0 .633.74h4.606a.784.784 0 0 0 .773-.654l.872-4.764c.094-.627.593-1.128 1.22-1.194l.21-.022c2.484-.261 4.24-1.579 5.222-3.916.982-2.337.949-4.198-.098-5.534a4.98 4.98 0 0 0-.316-.369z" fill="#0079C1" />
            </svg>
            <span>Comprar Guía con PayPal ({CONFIG.price})</span>
          </a>
        </div>
      </section>
    </div>
  );
};
