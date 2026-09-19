import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { GuideScreen } from './components/GuideScreen';
import { UnlockModal } from './components/UnlockModal';
import { Toast } from './components/Toast';
import { QUESTIONS, CONFIG } from './data';
import { DiagnosisScore, CategoryKey } from './types';

const STORAGE_KEY = 'guia_conquista_50_v2';

type ScreenType = 'intro' | 'quiz' | 'result' | 'guide';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('intro');
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [planChecks, setPlanChecks] = useState<Record<number, boolean>>({});
  const [relChecks, setRelChecks] = useState<Record<number, boolean>>({});
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.answers) && parsed.answers.length === QUESTIONS.length) {
          setAnswers(parsed.answers);
        }
        if (typeof parsed.unlocked === 'boolean') {
          setUnlocked(parsed.unlocked);
        }
        if (parsed.planChecks) setPlanChecks(parsed.planChecks);
        if (parsed.relChecks) setRelChecks(parsed.relChecks);

        // If they already unlocked previously, take them to guide or result if they visit
        if (parsed.unlocked) {
          setScreen('guide');
        } else if (parsed.answers && parsed.answers.every((a: any) => a !== null)) {
          setScreen('result');
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save changes to localStorage
  const saveState = (
    newAnswers: (number | null)[], 
    newUnlocked: boolean, 
    newPlan: Record<number, boolean>, 
    newRel: Record<number, boolean>
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          answers: newAnswers,
          unlocked: newUnlocked,
          planChecks: newPlan,
          relChecks: newRel
        })
      );
    } catch {
      // Ignore storage errors
    }
  };

  const isQuizComplete = useMemo(() => {
    return answers.every((a) => a !== null);
  }, [answers]);

  // Compute detailed scores
  const scoreData: DiagnosisScore = useMemo(() => {
    const catsData: Record<CategoryKey, { s: number; m: number }> = {
      presencia: { s: 0, m: 0 },
      conversacion: { s: 0, m: 0 },
      citas: { s: 0, m: 0 },
      errores: { s: 0, m: 0 },
      confianza: { s: 0, m: 0 }
    };

    let totalScore = 0;
    let maxPossible = 0;

    QUESTIONS.forEach((q, idx) => {
      if (q.scored === false) return;
      const ansIdx = answers[idx];
      if (ansIdx === null || ansIdx === undefined) return;

      const scoreValue = q.opts[ansIdx]?.s ?? 0;
      const catKey = q.cat as CategoryKey;

      if (catsData[catKey]) {
        catsData[catKey].s += scoreValue;
        catsData[catKey].m += 3; // each scored question max is 3
        totalScore += scoreValue;
        maxPossible += 3;
      }
    });

    const categoryList = (Object.keys(catsData) as CategoryKey[]).map((k) => {
      const { s, m } = catsData[k];
      const pct = m > 0 ? Math.round((s / m) * 100) : 0;
      return { k, pct };
    });

    const pctMap: Record<CategoryKey, number> = {
      presencia: 0,
      conversacion: 0,
      citas: 0,
      errores: 0,
      confianza: 0
    };
    categoryList.forEach((c) => {
      pctMap[c.k] = c.pct;
    });

    // Sort with lowest percentage first for prioritization
    categoryList.sort((a, b) => a.pct - b.pct);

    const overallScore = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

    return {
      score: overallScore,
      cats: categoryList,
      pct: pctMap
    };
  }, [answers]);

  // Objective and Date Style preference
  const objective = useMemo(() => {
    const objQIndex = QUESTIONS.findIndex((q) => q.cat === 'objetivo');
    if (objQIndex !== -1 && answers[objQIndex] !== null) {
      return QUESTIONS[objQIndex].opts[answers[objQIndex]!]?.v || 'seria';
    }
    return 'seria';
  }, [answers]);

  const dateStyle = useMemo(() => {
    const styleQIndex = QUESTIONS.findIndex((q) => q.cat === 'estilo');
    if (styleQIndex !== -1 && answers[styleQIndex] !== null) {
      return QUESTIONS[styleQIndex].opts[answers[styleQIndex]!]?.v || 'tranquilo';
    }
    return 'tranquilo';
  }, [answers]);

  // Toast Helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Screen Actions
  const handleStartQuiz = () => {
    setQuizIndex(0);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...answers];
    nextAnswers[quizIndex] = optionIndex;
    setAnswers(nextAnswers);
    saveState(nextAnswers, unlocked, planChecks, relChecks);

    // Short delay for visual feedback
    setTimeout(() => {
      if (quizIndex < QUESTIONS.length - 1) {
        setQuizIndex(quizIndex + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setScreen('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 240);
  };

  const handleBackQuiz = () => {
    if (quizIndex === 0) {
      setScreen('intro');
    } else {
      setQuizIndex(quizIndex - 1);
    }
  };

  const handleUnlockCode = (enteredCode: string): boolean => {
    const clean = enteredCode.trim().toUpperCase();
    const isValid = CONFIG.codes.some((c) => c.toUpperCase() === clean);

    if (isValid) {
      setUnlocked(true);
      saveState(answers, true, planChecks, relChecks);
      showToast('¡Guía desbloqueada con éxito!');
      setScreen('guide');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }
    return false;
  };

  const handleRetakeQuiz = () => {
    const emptyAnswers = Array(QUESTIONS.length).fill(null);
    setAnswers(emptyAnswers);
    setQuizIndex(0);
    saveState(emptyAnswers, unlocked, planChecks, relChecks);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePlanCheck = (index: number) => {
    const updated = { ...planChecks, [index]: !planChecks[index] };
    setPlanChecks(updated);
    saveState(answers, unlocked, updated, relChecks);
  };

  const handleToggleRelCheck = (index: number) => {
    const updated = { ...relChecks, [index]: !relChecks[index] };
    setRelChecks(updated);
    saveState(answers, unlocked, planChecks, updated);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#24171D] flex flex-col font-sans selection:bg-[#6D1A36] selection:text-white">
      {/* Top App Header */}
      <Header
        unlocked={unlocked}
        onOpenUnlock={() => setIsUnlockModalOpen(true)}
        onResetTest={screen === 'quiz' ? () => setScreen('intro') : undefined}
        score={isQuizComplete ? scoreData.score : null}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {screen === 'intro' && (
          <IntroScreen
            onStartQuiz={handleStartQuiz}
            onOpenUnlock={() => setIsUnlockModalOpen(true)}
            hasPreviousResult={isQuizComplete}
            onViewResult={() => {
              setScreen(unlocked ? 'guide' : 'result');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            currentIndex={quizIndex}
            answers={answers}
            onSelectOption={handleSelectOption}
            onBack={handleBackQuiz}
          />
        )}

        {screen === 'result' && (
          <ResultScreen
            scoreData={scoreData}
            unlocked={unlocked}
            onUnlock={handleUnlockCode}
            onOpenGuide={() => {
              setScreen('guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRetake={handleRetakeQuiz}
          />
        )}

        {screen === 'guide' && (
          <GuideScreen
            scoreData={scoreData}
            objective={objective}
            dateStyle={dateStyle}
            planChecks={planChecks}
            onTogglePlanCheck={handleTogglePlanCheck}
            relChecks={relChecks}
            onToggleRelCheck={handleToggleRelCheck}
            onBackToResult={() => {
              setScreen('result');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Access Code Unlock Modal */}
      <UnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onUnlock={handleUnlockCode}
        score={isQuizComplete ? scoreData.score : null}
      />

      {/* Global Toast Alert */}
      <Toast message={toastMessage} />
    </div>
  );
}
