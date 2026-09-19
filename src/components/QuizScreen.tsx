import React from 'react';
import { ChevronLeft, Check, Sparkles } from 'lucide-react';
import { QUESTIONS, CATS, CAT_ICON } from '../data';
import { CategoryKey } from '../types';

interface QuizScreenProps {
  currentIndex: number;
  answers: (number | null)[];
  onSelectOption: (optionIndex: number) => void;
  onBack: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  currentIndex,
  answers,
  onSelectOption,
  onBack
}) => {
  const currentQ = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;
  const progressPct = ((currentIndex + 1) / total) * 100;
  const currentAnswer = answers[currentIndex];

  const categoryLabel = currentQ.cat in CATS 
    ? CATS[currentQ.cat as CategoryKey] 
    : currentQ.cat === 'objetivo' 
      ? 'Objetivo de relación' 
      : 'Estilo de citas preferido';

  const categoryIcon = currentQ.cat in CAT_ICON 
    ? CAT_ICON[currentQ.cat as CategoryKey] 
    : '🎯';

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* Top Navigation & Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            id="quiz-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#6D1A36] hover:text-[#3D0F20] px-2.5 py-1.5 rounded-lg hover:bg-[#F2EAE0] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Atrás</span>
          </button>
          
          <span className="text-xs font-bold text-[#7A626B] uppercase tracking-wider bg-[#FAF0E1] px-3 py-1 rounded-full border border-[#E2D3BA]">
            Pregunta {currentIndex + 1} de {total}
          </span>
        </div>

        {/* Progress bar */}
        <div 
          className="h-2.5 w-full bg-[#EFE5D5] rounded-full overflow-hidden" 
          role="progressbar" 
          aria-valuenow={currentIndex + 1} 
          aria-valuemin={1} 
          aria-valuemax={total}
        >
          <div
            className="h-full bg-gradient-to-r from-[#B8892F] via-[#D9B25A] to-[#6D1A36] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#FFFDF9] border border-[#E2D3BA] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E1] text-[#6D1A36] text-xs font-semibold mb-4 border border-[#E2D3BA]">
          <span>{categoryIcon}</span>
          <span>{categoryLabel}</span>
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2A1A1F] leading-tight mb-6">
          {currentQ.q}
        </h2>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.opts.map((opt, i) => {
            const isSelected = currentAnswer === i;
            return (
              <button
                key={i}
                id={`quiz-option-${currentIndex}-${i}`}
                onClick={() => onSelectOption(i)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 cursor-pointer group ${
                  isSelected
                    ? 'border-[#6D1A36] bg-[#FAF0E1] text-[#2A1A1F] shadow-sm'
                    : 'border-[#E2D3BA] bg-white hover:border-[#D9B25A] hover:bg-[#FCFAF6] text-[#422C34]'
                }`}
              >
                <span className="text-sm sm:text-base font-medium leading-relaxed">
                  {opt.t}
                </span>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-[#6D1A36] text-white'
                      : 'border-2 border-[#D9B25A] text-transparent group-hover:border-[#6D1A36]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#F0E5D0] flex items-center justify-between text-xs text-[#7A626B]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B8892F]" />
            <span>Sé sincero: tu diagnóstico será más preciso</span>
          </span>
          <span className="font-semibold text-[#6D1A36]">
            {Math.round(progressPct)}% completado
          </span>
        </div>
      </div>
    </div>
  );
};
