# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Jurado del Hackathon Reto 03 (Colsubsidio):** abre la landing sin instrucciones, la explora de forma autónoma (probablemente desde celular) y debe concluir en < 60 s que el producto es comercializable mañana mismo.
- **Usuario final (personaje de la experiencia):** persona que busca orientación sobre seguros y quiere sentir que un asesor realmente entiende su situación antes de ofrecerle algo.

## Product Purpose

Guardian IA es un **AI Financial Advisor** que descubre qué necesita proteger una persona **antes** de ofrecer un seguro. La landing no vende un seguro: vende la sensación de haber encontrado un asesor que entiende. En < 40 s el visitante debe comprender qué hace, por qué es diferente, cómo funciona, por qué confiar y qué sucede al iniciar.

## Positioning

No es un chatbot. No es una aseguradora. Es un asesor inteligente cuya diferencia verificable es: **comprende el contexto primero y explica cada recomendación** (score de confianza + razones legibles generadas por un motor de reglas real, no por azar).

## Operating Context

- Hackathon Reto 03 — Venta Inteligente de Seguros con IA (Colsubsidio).
- Backend real ya construido: `/root/colsubsidio-seguros-api` (FastAPI "Colsubsidio Protege API") con módulos de conversaciones (canales web/WhatsApp/voz), preguntas de perfilamiento, variables de usuario, reglas de recomendación ponderadas y productos. El motor devuelve `score` (0–100) y `reasons` por producto — la explicabilidad es un hecho del sistema, no una promesa.
- Los CTAs de la landing ("Hablar por WhatsApp", "Iniciar llamada IA") abren una **demo simulada dentro de la página** (autónoma, sin backend). Confirmado por el equipo.
- Proyecto de la landing: `/root/guardian-ia-landing` (carpeta independiente).

## Capabilities and Constraints

- Stack: React + Vite + TypeScript + Tailwind + shadcn/ui + Motion + Lucide.
- Máximo 8 secciones; sin scroll infinito; mobile-first; Lighthouse 95+.
- Sin videos ni imágenes pesadas: todo SVG, CSS y Canvas. Las "capturas" de conversación se construyen como UI viva.
- Estados del asesor que deben visualizarse: Loading, Typing, Thinking, Tool Calling, Recommendation, Completed.
- Copy en español. Prohibido "nuestro chatbot"; usar "Asesor Inteligente", "IA que comprende", "Protección personalizada", "Recomendaciones explicables".

## Brand Commitments

- Marca visible: **Guardian IA · Colsubsidio**.
- Branding Colsubsidio: rojo principal, blancos, grises muy claros, pequeños detalles azules para IA, mucho contraste.
- Personalidad: Stripe / Linear / Vapi / ElevenLabs / OpenAI / Mercury / Arc Browser. Mucho espacio blanco, tipografía grande, animaciones suaves, sin banners saturados.

## Evidence on Hand

- Backend funcional con motor de reglas real (`recommendations/engine.py`: score ponderado + razones por producto).
- Canales de conversación reales definidos: web, WhatsApp, voz, API.
- No hay testimonios, clientes ni métricas inventadas: los indicadores deben ser descriptivos (24/7, ~30 s de perfilamiento, 100% autónomo), nunca cifras de negocio fabricadas.

## Product Principles

1. **Mostrar, no explicar:** la IA se demuestra viva en cada sección; nada de screenshots.
2. **Entender antes de vender:** toda la narrativa refuerza que el contexto precede a la oferta.
3. **Explicabilidad = confianza:** cada recomendación muestra sus razones.
4. **Premium por restricción:** espacio blanco, tipografía grande, movimiento suave; cero saturación.
