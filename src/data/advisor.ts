/**
 * Scripted scenarios + a miniature rules engine that mirrors the real
 * backend at colsubsidio-seguros-api (weighted rules → score + reasons).
 */

export interface Scenario {
  id: string
  userMessage: string
  event: string
  eventIcon: 'family' | 'travel' | 'home'
  propensity: string
  confidence: number
  product: string
  reason: string
}

export const scenarios: Scenario[] = [
  {
    id: 'familia',
    userMessage: 'Tengo dos hijos.',
    event: 'Familia',
    eventIcon: 'family',
    propensity: 'Seguro Vida',
    confidence: 97,
    product: 'Seguro de Vida Colsubsidio',
    reason: 'Dos dependientes detectados',
  },
  {
    id: 'viajes',
    userMessage: 'Viajo cada mes por trabajo.',
    event: 'Movilidad frecuente',
    eventIcon: 'travel',
    propensity: 'Seguro Viajes',
    confidence: 94,
    product: 'Seguro de Viaje Colsubsidio',
    reason: 'Patrón de viajes mensual',
  },
  {
    id: 'hogar',
    userMessage: 'Acabo de comprar apartamento.',
    event: 'Patrimonio',
    eventIcon: 'home',
    propensity: 'Seguro Hogar',
    confidence: 92,
    product: 'Seguro de Hogar Colsubsidio',
    reason: 'Nuevo activo por proteger',
  },
]

/* ------------------------------------------------------------------ */
/* Demo modal: questions + weighted rules (same shape as the API)      */
/* ------------------------------------------------------------------ */

export interface DemoOption {
  label: string
  variable: string
  value: string
}

export interface DemoQuestion {
  id: string
  text: string
  options: DemoOption[]
}

export const demoQuestions: DemoQuestion[] = [
  {
    id: 'dependientes',
    text: '¿Tienes personas que dependan de tus ingresos?',
    options: [
      { label: 'Sí, mis hijos', variable: 'dependientes', value: 'hijos' },
      { label: 'Sí, otros familiares', variable: 'dependientes', value: 'familiares' },
      { label: 'Por ahora no', variable: 'dependientes', value: 'no' },
    ],
  },
  {
    id: 'viajes',
    text: '¿Con qué frecuencia viajas?',
    options: [
      { label: 'Casi cada mes', variable: 'viajes', value: 'frecuente' },
      { label: 'Algunas veces al año', variable: 'viajes', value: 'ocasional' },
      { label: 'Casi nunca', variable: 'viajes', value: 'nunca' },
    ],
  },
  {
    id: 'patrimonio',
    text: '¿Tienes vivienda propia o estás pagando una?',
    options: [
      { label: 'Sí, es mía', variable: 'patrimonio', value: 'propia' },
      { label: 'La estoy pagando', variable: 'patrimonio', value: 'pagando' },
      { label: 'Aún no', variable: 'patrimonio', value: 'no' },
    ],
  },
]

interface WeightedRule {
  variable: string
  value: string
  weight: number
  reason: string
}

interface DemoProduct {
  code: string
  name: string
  tagline: string
  rules: WeightedRule[]
}

const catalog: DemoProduct[] = [
  {
    code: 'VIDA',
    name: 'Seguro de Vida Colsubsidio',
    tagline: 'Protección para quienes dependen de ti',
    rules: [
      { variable: 'dependientes', value: 'hijos', weight: 3, reason: 'Tienes hijos como dependientes' },
      { variable: 'dependientes', value: 'familiares', weight: 2, reason: 'Otros familiares dependen de tus ingresos' },
      { variable: 'patrimonio', value: 'pagando', weight: 1, reason: 'Una deuda hipotecaria activa aumenta el riesgo financiero' },
    ],
  },
  {
    code: 'VIAJE',
    name: 'Seguro de Viaje Colsubsidio',
    tagline: 'Cobertura en cada trayecto',
    rules: [
      { variable: 'viajes', value: 'frecuente', weight: 3, reason: 'Viajas casi cada mes' },
      { variable: 'viajes', value: 'ocasional', weight: 1.5, reason: 'Viajas algunas veces al año' },
    ],
  },
  {
    code: 'HOGAR',
    name: 'Seguro de Hogar Colsubsidio',
    tagline: 'Tu patrimonio, protegido',
    rules: [
      { variable: 'patrimonio', value: 'propia', weight: 3, reason: 'Tienes vivienda propia' },
      { variable: 'patrimonio', value: 'pagando', weight: 2, reason: 'Estás pagando tu vivienda' },
    ],
  },
]

export interface DemoResult {
  product: DemoProduct
  score: number
  reasons: string[]
}

/** Mirrors app/modules/recommendations/engine.py */
export function recommend(answers: Record<string, string>): DemoResult {
  const results = catalog.map((product) => {
    let matched = 0
    let total = 0
    const reasons: string[] = []
    for (const rule of product.rules) {
      total += Math.abs(rule.weight)
      if (answers[rule.variable] === rule.value) {
        matched += rule.weight
        reasons.push(rule.reason)
      }
    }
    const score = total ? Math.round((matched / total) * 100) : 0
    return { product, score, reasons }
  })
  results.sort((a, b) => b.score - a.score)
  const top = results[0]
  return {
    product: top.product,
    score: Math.max(top.score, 62), // an advisor always commits to a recommendation
    reasons: top.reasons.length
      ? top.reasons
      : ['Perfil de protección general recomendado'],
  }
}
