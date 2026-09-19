import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Printer, 
  ArrowLeft, 
  Heart, 
  DollarSign, 
  AlertTriangle, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  Compass, 
  ShieldAlert, 
  CheckCircle2,
  ExternalLink,
  Home,
  BookOpen
} from 'lucide-react';
import { 
  CATS, 
  CAT_ICON, 
  DIAG, 
  OBJ, 
  PLAN, 
  DAY7, 
  IDEAS, 
  MSG_GROUPS, 
  CASOS_PRACTICOS,
  CLAVES_PSICOLOGIA_50,
  ERR_FLAGS, 
  ERR_GENERAL, 
  AVOID_PHRASES, 
  PILARES, 
  CHECK90, 
  CONFIG 
} from '../data';
import { DiagnosisScore, CategoryKey, DateIdea } from '../types';
import { openPayPalCheckout } from '../utils/payment';

interface GuideScreenProps {
  scoreData: DiagnosisScore;
  objective: string;
  dateStyle: string;
  planChecks: Record<number, boolean>;
  onTogglePlanCheck: (index: number) => void;
  relChecks: Record<number, boolean>;
  onToggleRelCheck: (index: number) => void;
  onBackToResult: () => void;
  onGoHome?: () => void;
  onShowToast: (message: string) => void;
}

type TabType = 'diag' | 'plan' | 'citas' | 'msg' | 'casos' | 'err' | 'rel';

export const GuideScreen: React.FC<GuideScreenProps> = ({
  scoreData,
  objective,
  dateStyle,
  planChecks,
  onTogglePlanCheck,
  relChecks,
  onToggleRelCheck,
  onBackToResult,
  onGoHome,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('diag');
  const [budgetFilter, setBudgetFilter] = useState<1 | 2 | 3>(2);

  const { score, cats, pct } = scoreData;

  // Count completions
  const completedDays = Object.values(planChecks).filter(Boolean).length;
  const completedMilestones = Object.values(relChecks).filter(Boolean).length;

  // Filter ideas by budget and sort preferred style first
  const filteredIdeas = IDEAS.filter((idea) => idea.c <= budgetFilter);
  const preferredIdeas = filteredIdeas.filter((idea) => idea.s === dateStyle);
  const otherIdeas = filteredIdeas.filter((idea) => idea.s !== dateStyle);
  const displayIdeas = [...preferredIdeas, ...otherIdeas].slice(0, 10);

  // Copy individual message
  const handleCopyText = async (text: string, label = 'Mensaje') => {
    try {
      await navigator.clipboard.writeText(text);
      onShowToast(`${label} copiado al portapapeles`);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      onShowToast(`${label} copiado`);
    }
  };

  // Copy entire guide text
  const handleCopyFullGuide = () => {
    const lines: string[] = [];
    lines.push('GUÍA PERSONALIZADA: CONQUISTA A UNA MUJER DE 50 AÑOS');
    lines.push(`Puntaje obtenido: ${score}/100\n`);
    lines.push('== 1. DIAGNÓSTICO PERSONALIZADO ==');
    lines.push(OBJ[objective] || OBJ.claro);
    (Object.keys(CATS) as CategoryKey[]).forEach((k) => {
      const p = pct[k] ?? 0;
      lines.push(`• ${CATS[k]} (${p}%): ${p >= 67 ? DIAG[k].hi : DIAG[k].lo}`);
    });
    lines.push('\n== 2. PLAN DE ACCIÓN DE 7 DÍAS ==');
    PLAN.forEach((p, idx) => {
      const action = p.cat ? p.a : (DAY7[objective] || DAY7.claro);
      lines.push(`Día ${idx + 1} [${p.t}]: ${action}`);
      if (p.ejemploReal) {
        lines.push(`   * Ejemplo práctico: ${p.ejemploReal}`);
      }
      if (p.guionSugerido) {
        lines.push(`   * Guion sugerido: "${p.guionSugerido}"`);
      }
      if (p.cat && (pct[p.cat] ?? 0) < 67) {
        lines.push(`   * Consejo prioritario: ${p.x}`);
      }
    });
    lines.push('\n== 3. 10 IDEAS DE CITAS SELECCIONADAS ==');
    displayIdeas.forEach((idea, idx) => {
      lines.push(`${idx + 1}. ${idea.t} (Costo: ${'$'.repeat(idea.c)}) - ${idea.d}`);
      if (idea.detalleCaballero) lines.push(`   * Toque de caballero: ${idea.detalleCaballero}`);
      if (idea.quePedir) lines.push(`   * Qué pedir: ${idea.quePedir}`);
    });
    lines.push('\n== 4. MENSAJES PARA WHATSAPP CON ANÁLISIS ==');
    MSG_GROUPS.forEach((g) => {
      lines.push(`\n[${g.g}] (${g.tone})`);
      if (g.porQueFunciona) lines.push(`* Por qué funciona: ${g.porQueFunciona}`);
      g.items.forEach((msg) => lines.push(`• "${msg}"`));
    });
    lines.push('\n== 5. CASOS REALES Y SITUACIONES TÍPICAS ==');
    CASOS_PRACTICOS.forEach((c) => {
      lines.push(`\n[${c.title}]`);
      lines.push(`Situación: ${c.situation}`);
      lines.push(`Error común: ${c.errorComun}`);
      lines.push(`Actuación de caballero: ${c.formaCaballero}`);
      lines.push(`Diálogo exacto: ${c.dialogoExacto}`);
      lines.push(`Por qué funciona: ${c.porQueFunciona}`);
      lines.push(`Regla de oro: ${c.reglaDeOro}`);
    });
    lines.push('\n== 6. ERRORES CRÍTICOS A EVITAR ==');
    ERR_GENERAL.forEach((err) => lines.push(`• ${err.t}: ${err.d}`));
    lines.push(`Frases prohibidas: ${AVOID_PHRASES.join(' | ')}`);
    lines.push('\n== 7. PILARES PARA UNA RELACIÓN SÓLIDA ==');
    PILARES.forEach((pil) => lines.push(`• ${pil.t}: ${pil.d}`));
    lines.push('\nRecuerda: Conquistar es comenzar. Enamorar a una mujer madura es cuidar los detalles cada día con respeto y coherencia.');

    handleCopyText(lines.join('\n'), 'Guía completa');
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'diag', label: 'Diagnóstico', icon: <Compass className="w-4 h-4" /> },
    { id: 'plan', label: 'Plan 7 Días', icon: <Calendar className="w-4 h-4" /> },
    { id: 'citas', label: '10 Citas con Fotos', icon: <Heart className="w-4 h-4" /> },
    { id: 'msg', label: '15 Mensajes', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'casos', label: 'Casos Reales & Guiones', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'err', label: 'Errores & Frases', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'rel', label: 'Relación 90 Días', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      
      {/* Top Banner with Summary Chips */}
      <header className="bg-gradient-to-r from-[#3D0F20] to-[#5C152E] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#8F2449]/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#ECC978] text-[#2A1A1F] text-xs font-bold shadow-xs">
                {score} / 100 Puntos
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 text-[#ECC978] text-xs font-semibold border border-white/20">
                Guía Desbloqueada
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
              Tu Guía Personalizada de Conquista
            </h1>
            <p className="text-xs sm:text-sm text-[#F0E5D0]/80 mt-1 max-w-xl">
              Diseñada a medida de tus respuestas para conectar con profundidad, respeto y elegancia.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center flex-wrap no-print">
            {onGoHome && (
              <button
                id="guide-back-to-home-btn"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs sm:text-sm text-[#F4EBE0] border border-white/20 transition-colors cursor-pointer"
                title="Volver a la página principal"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Inicio</span>
              </button>
            )}

            <a
              id="guide-paypal-direct-btn"
              href={CONFIG.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openPayPalCheckout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FFC439] hover:bg-[#FFB700] text-xs sm:text-sm font-black text-[#002C6C] border border-[#FFE277] shadow-sm transition-all cursor-pointer"
              title="Enlace de Pago PayPal"
            >
              <span>PayPal {CONFIG.price}</span>
            </a>

            <button
              id="guide-back-to-result-btn"
              onClick={onBackToResult}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ECC978]/20 hover:bg-[#ECC978]/30 text-xs sm:text-sm text-[#ECC978] border border-[#ECC978]/40 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver mi resultado</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sticky Tab Navigation Bar */}
      <nav 
        className="sticky top-14 z-20 bg-[#FAF7F2]/95 backdrop-blur-md py-2.5 px-1 border-b border-[#E2D3BA] overflow-x-auto flex items-center gap-1.5 scrollbar-none no-print"
        aria-label="Pestañas de la guía"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#6D1A36] text-white shadow-sm'
                  : 'bg-white text-[#543F47] hover:bg-[#FAF0E1] border border-[#E2D3BA]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* TAB CONTENT: 1. Diagnóstico */}
      {activeTab === 'diag' && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
              Diagnóstico Estratégico
            </h2>
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E2D3BA] text-sm text-[#422C34] leading-relaxed">
              <strong className="text-[#6D1A36] font-semibold block mb-1">
                Tu objetivo seleccionado:
              </strong>
              {OBJ[objective] || OBJ.claro}
            </div>

            {/* Strengths and areas to improve summary chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                  Tus Fortalezas Clave
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(CATS) as CategoryKey[])
                    .filter((k) => (pct[k] ?? 0) >= 67)
                    .map((k) => (
                      <span key={k} className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-lg">
                        {CAT_ICON[k]} {CATS[k]}
                      </span>
                    ))}
                  {(Object.keys(CATS) as CategoryKey[]).every((k) => (pct[k] ?? 0) < 67) && (
                    <span className="text-xs text-emerald-800 italic">
                      Comenzando desde el inicio: todo el margen de mejora está de tu lado.
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-2">
                  Tus Prioridades de Enfoque
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(CATS) as CategoryKey[])
                    .filter((k) => (pct[k] ?? 0) < 67)
                    .map((k) => (
                      <span key={k} className="px-2.5 py-1 bg-white border border-amber-300 text-amber-800 text-xs font-semibold rounded-lg">
                        {CAT_ICON[k]} {CATS[k]}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Detailed Category Cards */}
            <div className="space-y-4 pt-3">
              {(Object.keys(CATS) as CategoryKey[]).map((key) => {
                const percentage = pct[key] ?? 0;
                const isStrong = percentage >= 67;
                return (
                  <article 
                    key={key} 
                    className="p-5 bg-[#FAF7F2] border border-[#E2D3BA] rounded-2xl space-y-2.5 hover:border-[#D9B25A] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{CAT_ICON[key]}</span>
                        <h3 className="font-bold text-base text-[#2A1A1F]">
                          {CATS[key]}
                        </h3>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isStrong 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {percentage}% • {isStrong ? 'Fortaleza' : 'A Pulir'}
                      </span>
                    </div>

                    <div className="h-2 w-full bg-[#E8DEC9] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isStrong ? 'bg-emerald-600' : 'bg-[#B8892F]'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <p className="text-xs sm:text-sm text-[#543F47] leading-relaxed">
                      {isStrong ? DIAG[key].hi : DIAG[key].lo}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: 2. Plan 7 Días */}
      {activeTab === 'plan' && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
                  Plan de Acción Paso a Paso (7 Días)
                </h2>
                <p className="text-xs sm:text-sm text-[#7A626B]">
                  Una sola acción concreta por día para construir atracción sin abrumarla ni forzar.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E1] border border-[#D9B25A] text-xs font-bold text-[#6D1A36]">
                <span>{completedDays} de 7 completados</span>
              </div>
            </div>

            <div className="space-y-3.5 pt-2">
              {PLAN.map((day, idx) => {
                const isChecked = !!planChecks[idx];
                const actionText = day.cat ? day.a : (DAY7[objective] || DAY7.claro);
                const isWeakCategory = day.cat && (pct[day.cat] ?? 0) < 67;

                return (
                  <div
                    key={idx}
                    id={`plan-day-${idx}`}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                      isChecked
                        ? 'bg-[#FAF0E1]/80 border-[#B8892F] shadow-xs'
                        : 'bg-[#FAF7F2] border-[#E2D3BA] hover:border-[#D9B25A]'
                    }`}
                  >
                    <button
                      id={`check-plan-${idx}`}
                      onClick={() => onTogglePlanCheck(idx)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#B8892F] border-[#B8892F] text-white shadow-xs'
                          : 'border-[#B8892F] bg-white hover:bg-[#FAF0E1] text-transparent'
                      }`}
                      aria-label={`Marcar día ${idx + 1} como completado`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#6D1A36] uppercase tracking-wider">
                          Día {idx + 1}
                        </span>
                        <h3 className={`font-bold text-base text-[#2A1A1F] ${isChecked ? 'line-through opacity-75' : ''}`}>
                          {day.t}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#543F47] leading-relaxed">
                        {actionText}
                      </p>

                      {day.ejemploReal && (
                        <div className="mt-2.5 p-3.5 bg-[#FAF0E1]/90 border border-[#D9B25A]/70 rounded-xl space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D1A36]">
                            <BookOpen className="w-3.5 h-3.5 text-[#B8892F]" />
                            <span>Ejemplo Explicativo Real:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#4A2D37] leading-relaxed italic">
                            "{day.ejemploReal}"
                          </p>
                        </div>
                      )}

                      {day.guionSugerido && (
                        <div className="mt-2 p-3 bg-white border border-[#E2D3BA] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                          <div className="text-xs text-[#543F47] leading-relaxed">
                            <strong className="text-[#3D0F20] font-semibold block sm:inline mr-1">💬 Guion sugerido:</strong>
                            <span className="font-medium text-[#2A1A1F]">"{day.guionSugerido}"</span>
                          </div>
                          <button
                            id={`copy-guion-${idx}`}
                            onClick={() => handleCopyText(day.guionSugerido!, 'Guion sugerido')}
                            className="self-end sm:self-center shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF7F2] hover:bg-[#FAF0E1] text-[11px] font-semibold text-[#6D1A36] border border-[#D9B25A] transition-colors cursor-pointer"
                          >
                            <Copy className="w-3 h-3 text-[#B8892F]" />
                            <span>Copiar</span>
                          </button>
                        </div>
                      )}

                      {isWeakCategory && (
                        <div className="mt-2 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                          <strong className="block text-amber-950 font-semibold mb-0.5">
                            💡 Consejo prioritario para tu perfil ({CATS[day.cat!]}):
                          </strong>
                          {day.x}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: 3. Ideas de Citas con Fotos Reales */}
      {activeTab === 'citas' && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
                10 Ideas de Citas con Atmósfera y Encanto
              </h2>
              <p className="text-xs sm:text-sm text-[#7A626B] mt-1">
                Ambientes elegidos para fomentar la charla relajada y la confidencia mutua.
              </p>
            </div>

            {/* Budget Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-[#F0E5D0] pb-4">
              <span className="text-xs font-bold text-[#6D1A36] uppercase tracking-wider mr-1">
                Filtrar por presupuesto:
              </span>
              {[
                { val: 1 as const, label: '$ Accesible / Económico' },
                { val: 2 as const, label: '$$ Medio / Restaurante' },
                { val: 3 as const, label: '$$$ Exclusivo / Especial' },
              ].map((b) => (
                <button
                  key={b.val}
                  id={`budget-btn-${b.val}`}
                  onClick={() => setBudgetFilter(b.val)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    budgetFilter === b.val
                      ? 'bg-[#6D1A36] text-white shadow-xs'
                      : 'bg-[#FAF7F2] border border-[#E2D3BA] text-[#543F47] hover:bg-[#FAF0E1]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Date Cards Grid with High Quality Real Unsplash Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {displayIdeas.map((idea, idx) => (
                <article
                  key={idx}
                  id={`idea-card-${idx}`}
                  className="bg-[#FAF7F2] border border-[#E2D3BA] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                >
                  <div className="h-44 w-full relative overflow-hidden bg-[#E8DEC9]">
                    <img
                      src={idea.imageUrl}
                      alt={idea.t}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[#ECC978] text-[11px] font-bold">
                      {idea.tag}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-[#B8892F] text-white text-xs font-bold shadow-xs">
                      {'$'.repeat(idea.c)}
                    </span>
                  </div>

                  <div className="p-4.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#2A1A1F] leading-tight mb-1">
                        {idea.t}
                      </h3>
                      <p className="text-xs text-[#543F47] leading-relaxed">
                        {idea.d}
                      </p>

                      {idea.detalleCaballero && (
                        <div className="mt-2.5 p-2.5 bg-[#FAF0E1] border border-[#E2D3BA] rounded-xl text-xs text-[#3D0F20] leading-relaxed">
                          <strong className="text-[#6D1A36] font-semibold block mb-0.5">🎩 Toque de caballero:</strong>
                          <span>{idea.detalleCaballero}</span>
                        </div>
                      )}

                      {idea.quePedir && (
                        <div className="mt-1.5 p-2 bg-white/90 border border-[#E8DEC9] rounded-xl text-xs text-[#543F47]">
                          <strong className="text-[#B8892F] font-semibold mr-1">🍷 Sugerencia:</strong>
                          <span>{idea.quePedir}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#E8DEC9] flex items-center justify-between text-[11px] text-[#7A626B]">
                      <span className="capitalize">
                        Estilo: {idea.s}
                      </span>
                      <button
                        id={`copy-idea-btn-${idx}`}
                        onClick={() => handleCopyText(`Idea de cita: ${idea.t}. ${idea.d}`, 'Plan de cita')}
                        className="text-[#6D1A36] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copiar idea</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: 4. 15 Mensajes WhatsApp */}
      {activeTab === 'msg' && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
                15 Mensajes Listos para Copiar a WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-[#7A626B] mt-1">
                Toca el botón "Copiar mensaje" de cualquiera de ellos y pégalo en tu chat. Adapta los [corchetes] con sus detalles reales.
              </p>
            </div>

            <div className="space-y-8">
              {MSG_GROUPS.map((group, gIdx) => (
                <div key={gIdx} className="space-y-3.5 bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E2D3BA]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#F0E5D0] pb-2.5">
                    <h3 className="font-display font-bold text-lg text-[#3D0F20]">
                      {group.g}
                    </h3>
                    <span className="text-xs text-[#7A626B] font-semibold italic">
                      Tono: {group.tone}
                    </span>
                  </div>

                  {group.porQueFunciona && (
                    <div className="p-3 rounded-xl bg-[#FAF0E1] border border-[#D9B25A]/60 text-xs text-[#4A2D37] leading-relaxed">
                      <strong className="text-[#6D1A36] font-bold block mb-0.5">🧠 Psicología detrás de este tono:</strong>
                      <span>{group.porQueFunciona}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3 pt-1">
                    {group.items.map((msgText, mIdx) => (
                      <div
                        key={mIdx}
                        id={`msg-card-${gIdx}-${mIdx}`}
                        className="p-4 rounded-xl bg-white border border-[#E2D3BA] hover:border-[#D9B25A] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <p className="text-xs sm:text-sm text-[#2A1A1F] leading-relaxed font-normal select-all">
                          "{msgText}"
                        </p>
                        <button
                          id={`copy-msg-btn-${gIdx}-${mIdx}`}
                          onClick={() => handleCopyText(msgText, 'Mensaje')}
                          className="self-end sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#FAF0E1] active:scale-95 text-[#6D1A36] border border-[#D9B25A] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#B8892F]" />
                          <span>Copiar</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {group.analisis && group.analisis.length > 0 && (
                    <div className="pt-2.5 border-t border-[#E8DEC9] space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D1A36] block">
                        🔍 Cuándo usar cada mensaje y por qué funciona:
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {group.analisis.map((item, aIdx) => (
                          <div key={aIdx} className="text-xs bg-white/90 p-2.5 rounded-lg border border-[#E8DEC9] text-[#4A2D37] space-y-0.5">
                            <div>
                              <strong className="text-[#6D1A36]">"{item.msg}"</strong>
                              <span className="text-[#7A626B] text-[11px] ml-1.5 font-medium">({item.momento})</span>
                            </div>
                            <p className="text-[#543F47] text-[11px] leading-relaxed">
                              {item.explicacion}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: Casos Reales y Guiones Prácticos */}
      {activeTab === 'casos' && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E1] border border-[#D9B25A] text-xs font-bold text-[#6D1A36] mb-2">
                <BookOpen className="w-3.5 h-3.5 text-[#B8892F]" />
                <span>Situaciones Reales con Diálogos Textuales</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2A1A1F]">
                Casos Prácticos y Guiones de Conversación
              </h2>
              <p className="text-xs sm:text-sm text-[#7A626B] mt-1">
                Aprende qué decir exactamente en los momentos más delicados: silencios, la cuenta, cancelaciones y el tema de los ex.
              </p>
            </div>

            {/* Practical Cases Cards */}
            <div className="space-y-6">
              {CASOS_PRACTICOS.map((caso, cIdx) => (
                <article
                  key={cIdx}
                  id={`caso-practico-${cIdx}`}
                  className="bg-[#FAF7F2] border border-[#E2D3BA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-[#D9B25A] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl sm:text-3xl p-2 bg-white rounded-xl border border-[#E8DEC9] shadow-2xs shrink-0">
                      {caso.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-lg text-[#2A1A1F]">
                        {caso.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#543F47] mt-0.5 leading-relaxed">
                        <strong className="text-[#3D0F20]">Situación:</strong> {caso.situation}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 bg-rose-50/80 border border-rose-200 rounded-xl text-xs text-rose-950 space-y-1">
                      <strong className="flex items-center gap-1 font-bold text-rose-800">
                        <span>❌ Lo que hace el 90% (Error):</span>
                      </strong>
                      <p className="leading-relaxed">{caso.errorComun}</p>
                    </div>

                    <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
                      <strong className="flex items-center gap-1 font-bold text-emerald-800">
                        <span>🎩 El enfoque del caballero 50+:</span>
                      </strong>
                      <p className="leading-relaxed">{caso.formaCaballero}</p>
                    </div>
                  </div>

                  {/* Diálogo exacto con botón copiar */}
                  <div className="p-4 bg-white rounded-xl border-2 border-[#D9B25A]/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#6D1A36] uppercase tracking-wider flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[#B8892F]" />
                        <span>Diálogo exacto que debes decir:</span>
                      </span>
                      <button
                        id={`copy-dialogo-${cIdx}`}
                        onClick={() => handleCopyText(caso.dialogoExacto, 'Diálogo exacto')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF7F2] hover:bg-[#FAF0E1] text-[11px] font-semibold text-[#6D1A36] border border-[#D9B25A] transition-colors cursor-pointer"
                      >
                        <Copy className="w-3 h-3 text-[#B8892F]" />
                        <span>Copiar frase</span>
                      </button>
                    </div>
                    <blockquote className="text-xs sm:text-sm text-[#2A1A1F] font-serif italic pl-3 border-l-2 border-[#6D1A36] leading-relaxed select-all">
                      "{caso.dialogoExacto}"
                    </blockquote>
                  </div>

                  <div className="space-y-1.5 pt-1 text-xs text-[#543F47] leading-relaxed">
                    <p>
                      <strong className="text-[#3D0F20]">🧠 Por qué funciona en ella:</strong> {caso.porQueFunciona}
                    </p>
                    <p className="p-2.5 bg-[#FAF0E1]/70 rounded-lg border border-[#E2D3BA] text-[#4A2D37]">
                      <strong className="text-[#B8892F]">⭐ Regla de oro:</strong> {caso.reglaDeOro}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Claves psicológicas de la mujer de 50 */}
            <div className="pt-6 border-t border-[#F0E5D0] space-y-4">
              <h3 className="font-display font-bold text-xl text-[#2A1A1F]">
                4 Claves Psicológicas para Comprender a una Mujer de 50
              </h3>
              <p className="text-xs sm:text-sm text-[#7A626B]">
                Comprender su momento vital es lo que te diferencia instantáneamente de los hombres inmaduros o necesitados:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CLAVES_PSICOLOGIA_50.map((clave, kIdx) => (
                  <div
                    key={kIdx}
                    className="p-4.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D3BA] space-y-2 hover:border-[#D9B25A] transition-colors"
                  >
                    <h4 className="font-bold text-sm text-[#6D1A36] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FAF0E1] text-[#6D1A36] border border-[#D9B25A] inline-flex items-center justify-center text-xs">
                        {kIdx + 1}
                      </span>
                      <span>{clave.titulo}</span>
                    </h4>
                    <p className="text-xs text-[#543F47] leading-relaxed">
                      {clave.concepto}
                    </p>
                    <div className="p-2 bg-white rounded-lg border border-[#E8DEC9] text-[11px] text-[#3D0F20]">
                      <strong className="text-[#B8892F]">Acción para ti:</strong> {clave.accionClave}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: 5. Errores Críticos & Frases Prohibidas */}
      {activeTab === 'err' && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
                Errores que Alejan Inmediatamente a una Mujer de 50
              </h2>
              <p className="text-xs sm:text-sm text-[#7A626B] mt-1">
                La experiencia de vida las hace sumamente intuitivas: detectan la inseguridad, la falta de modales y la mentira en minutos.
              </p>
            </div>

            {/* General critical errors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ERR_GENERAL.map((err, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                    <h3 className="font-bold text-sm text-rose-950">
                      {err.t}
                    </h3>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed pl-6">
                    {err.d}
                  </p>
                </div>
              ))}
            </div>

            {/* Forbidden phrases */}
            <div className="bg-[#3D0F20] text-white p-6 rounded-2xl border border-[#8F2449]/40 space-y-3">
              <div className="flex items-center gap-2 text-[#ECC978]">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-display font-bold text-lg text-white">
                  Frases que NUNCA debes pronunciar
                </h3>
              </div>
              <p className="text-xs text-[#F0E5D0]/80">
                Parecen inofensivas para muchos hombres, pero para una mujer madura suenan condescendientes, anticuadas o desesperadas:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {AVOID_PHRASES.map((phrase, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-xs text-[#ECC978] italic font-serif">
                    ❌ {phrase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: 6. De la Conquista a una Relación Sólida */}
      {activeTab === 'rel' && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-[#2A1A1F]">
                De la Conquista a una Relación Sólida
              </h2>
              <p className="text-xs sm:text-sm text-[#7A626B] mt-1">
                Conquistar es solo abrir la puerta. Mantener encendida la llama en la madurez requiere los 6 pilares de la solidez afectiva.
              </p>
            </div>

            {/* 6 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILARES.map((pil, idx) => (
                <div
                  key={idx}
                  className="p-4.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D3BA] space-y-1.5"
                >
                  <h3 className="font-display font-bold text-base text-[#3D0F20]">
                    {pil.t}
                  </h3>
                  <p className="text-xs text-[#543F47] leading-relaxed">
                    {pil.d}
                  </p>
                </div>
              ))}
            </div>

            {/* 90-Day Milestones Checklist */}
            <div className="p-6 bg-gradient-to-br from-[#FAF0E1] to-[#FFF8ED] rounded-2xl border border-[#D9B25A] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#3D0F20]">
                    Checklist de los Primeros 90 Días
                  </h3>
                  <p className="text-xs text-[#665058]">
                    Hitos saludables para evaluar si la relación avanza hacia algo genuino.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8892F] text-white text-xs font-bold self-start sm:self-center">
                  {completedMilestones} de {CHECK90.length} alcanzados
                </span>
              </div>

              <div className="space-y-2.5 pt-2">
                {CHECK90.map((milestone, idx) => {
                  const isChecked = !!relChecks[idx];
                  return (
                    <div
                      key={idx}
                      id={`milestone-${idx}`}
                      onClick={() => onToggleRelCheck(idx)}
                      className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                        isChecked
                          ? 'bg-white border-emerald-500 shadow-2xs'
                          : 'bg-white/70 border-[#E2D3BA] hover:border-[#D9B25A]'
                      }`}
                    >
                      <button
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-[#B8892F] bg-white text-transparent'
                        }`}
                        aria-label={milestone}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-emerald-950 font-semibold' : 'text-[#3D0F20]'}`}>
                        {milestone}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Global Actions Bar at the bottom */}
      <footer className="bg-white border border-[#E2D3BA] rounded-3xl p-6 shadow-sm space-y-4 text-center no-print">
        <h3 className="font-display font-bold text-xl text-[#3D0F20]">
          Exportar y Guardar Tu Guía
        </h3>
        <p className="text-xs text-[#7A626B] max-w-md mx-auto">
          Puedes copiar todo el contenido para leerlo en tus notas o imprimirlo para tenerlo siempre a mano.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="guide-copy-all-btn"
            onClick={handleCopyFullGuide}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#6D1A36] hover:bg-[#852143] active:scale-98 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>Copiar Guía Completa</span>
          </button>

          <button
            id="guide-print-btn"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#FAF0E1] active:scale-98 text-[#6D1A36] border border-[#D9B25A] font-bold text-sm shadow-2xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#B8892F]" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </footer>

    </div>
  );
};
