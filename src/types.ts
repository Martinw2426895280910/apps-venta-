export type CategoryKey = 'presencia' | 'conversacion' | 'citas' | 'errores' | 'confianza';

export interface QuestionOption {
  t: string;
  s?: number; // Score (0 - 3)
  v?: string; // Value for personalization (e.g. 'seria', 'calma', 'tranquilo')
}

export interface Question {
  cat: CategoryKey | 'objetivo' | 'estilo';
  q: string;
  scored?: boolean;
  opts: QuestionOption[];
}

export interface CategoryResult {
  k: CategoryKey;
  pct: number;
}

export interface DiagnosisScore {
  score: number;
  cats: CategoryResult[];
  pct: Record<CategoryKey, number>;
}

export interface DateIdea {
  s: 'tranquilo' | 'cultural' | 'aire' | 'gastro';
  c: 1 | 2 | 3; // Budget level
  t: string;
  d: string;
  imageUrl: string;
  tag: string;
  detalleCaballero?: string; // Toque maestro / consejo exclusivo de caballero
  quePedir?: string; // Sugerencia de pedido o bebida
}

export interface MessageGroup {
  g: string;
  tone: string;
  porQueFunciona: string; // Explicación psicológica del tono
  items: string[];
  analisis?: {
    msg: string;
    explicacion: string;
    momento: string;
  }[];
}

export interface PlanDay {
  t: string;
  cat: CategoryKey | null;
  a: string;
  x: string;
  ejemploReal?: string; // Ejemplo práctico de la vida real
  guionSugerido?: string; // Qué decir o pensar con exactitud
}

export interface PracticalCase {
  id: string;
  title: string;
  icon: string;
  situation: string;
  errorComun: string;
  formaCaballero: string;
  dialogoExacto: string;
  porQueFunciona: string;
  reglaDeOro: string;
}

export interface AppConfig {
  price: string;
  paymentUrl: string;
  whatsapp: string;
  codes: string[];
}
