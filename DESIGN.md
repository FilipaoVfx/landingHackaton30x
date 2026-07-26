---
name: Guardian IA · Colsubsidio
description: Landing del asesor inteligente de seguros que entiende antes de recomendar.
---

<!-- SEED: established with the user before implementation; re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Guardian IA · Colsubsidio

## Overview

**Creative North Star: "La Sala del Asesor"** — la calma clínica de un despacho financiero premium donde la IA piensa en voz alta.

La página no describe un producto: lo demuestra. Cada sección es una ventana al asesor trabajando en vivo — escribiendo, pensando, consultando reglas, recomendando — construida con UI real, nunca con capturas. El mundo es el de Stripe/Linear/Vapi: blanco dominante, tipografía grande, movimiento coreografiado como máquina de estados. El rojo Colsubsidio es la voz de la acción humana y la marca; el azul eléctrico existe solo donde la IA está procesando. Nada decora: todo lo que se mueve está informando un estado.

**Key Characteristics:**
- Demostración sobre descripción: cada claim va acompañado de su simulación viva.
- Dos acentos con disciplina absoluta: rojo = marca/acción, azul = IA pensando.
- Espacio blanco generoso; densidad solo dentro de los "instrumentos" (chat, pipeline, waveform).
- Movimiento como máquina de estados (typing → thinking → tool-calling → recommendation), nunca como ornamento.

**Contrato de dirección (landing):**
- THESIS: la landing ES la demo; se rehúsa el scaffold SaaS de hero+grid de features+testimonios.
- OWN-WORLD: papel blanco, tintas casi negras, rojo Colsubsidio (#E4002B) para acción, azul IA (#2E6BFF) para cognición, mono para eventos de sistema.
- STORY: promesa → asesor trabajando → cómo funciona → conversación real → motor de razonamiento → voz + WhatsApp → por qué confiar → empezar.
- FIRST VIEWPORT: pantalla completa, 55/45; izquierda titular gigante + 2 CTAs; derecha LiveConversation animada en bucle (evento → propensión → confianza 97% → recomendación).
- FORM: mundo fijado por el brief (branding Colsubsidio × gramática premium de producto IA); dirección pineada por el usuario, sin torneo.

## Colors

Estrategia **Restrained**: campo neutro blanco/gris con dos acentos disciplinados.

### Primary
- **Rojo Colsubsidio** (#E4002B): acción principal, marca, momentos humanos de la conversación. [valor a confirmar en build]
- **Rojo Profundo** (#B80022): hover/pressed del primario. [a confirmar]

### Secondary
- **Azul IA** (#2E6BFF): exclusivo de estados cognitivos — "pensando", confianza, pipeline, waveform. [a confirmar]

### Neutral
- **Papel** (#FFFFFF): fondo dominante.
- **Nube** (#F7F8FA): superficies alternas y fondos de instrumento. [a confirmar]
- **Tinta** (#0D0F14): texto principal. [a confirmar]
- **Pizarra** (#5A6072): texto secundario. [a confirmar]
- **Línea Fina** (#E8EAEE): bordes hairline. [a confirmar]

**The Two Voices Rule.** Rojo y azul nunca compiten en la misma vista: el rojo convoca (CTAs, marca), el azul revela (IA procesando). Si un elemento no es acción ni cognición, es neutro.

## Typography

**Display/Body Font:** Sora (variable) — geométrica, moderna, con carácter técnico-humano.
**Mono Font:** JetBrains Mono — solo para eventos de sistema, datos y estados (`Analizando contexto…`, `confianza: 97%`).

### Hierarchy
- **Display** (700, clamp(2.75rem–5rem), lh 1.02, tracking -0.03em): titulares de sección. [a confirmar]
- **Title** (600, 1.5rem): encabezados de instrumento.
- **Body** (400–500, 1.0625–1.25rem, lh 1.6, ≤ 68ch): texto corrido.
- **Label** (500, 0.75rem, mono, tracking 0.08em, uppercase): estados del sistema y metadatos.

**The Mono Is Data Rule.** La mono nunca es decoración "técnica": solo viste datos reales del sistema (estados, scores, eventos).

## Layout

Mobile-first. Contenedor máx ~1200px. Una sola columna en móvil con instrumentos apilados; en desktop el Hero parte 55/45 y las secciones alternan densidad (un instrumento denso gana una sección tranquila). Ritmo vertical: más aire sobre un encabezado que debajo de él; secciones separadas por espacio, no por divisores pesados. Máximo 8 secciones.

## Elevation & Depth

Casi plano. La profundidad es tonal (Nube sobre Papel) más un único lenguaje de sombra suave con offset vertical para instrumentos flotantes (chat del Hero, tarjeta de recomendación, dashboard teaser). Prohibido el halo de color sin offset.

## Shapes

Radio generoso pero sobrio: tarjetas 16–20px, instrumentos 20–24px, pills completos para chips de estado y quick-replies. Burbujas de chat asimétricas (radio completo salvo una esquina) para distinguir hablante. Líneas de conector de 1–2px con punto animado.

## Do's and Don'ts

### Do:
- **Do** construir cada "captura" como UI viva con estados animados reales.
- **Do** reservar el azul exclusivamente para cognición de IA.
- **Do** usar la mono solo para datos del sistema.
- **Do** coreografiar un momento de movimiento por sección, no efectos dispersos.

### Don't:
- **Don't** usar gradientes de texto, glass decorativo ni banners saturados.
- **Don't** mostrar screenshots, imágenes de stock ni video.
- **Don't** usar "chatbot" en el copy ni tarjetas idénticas icono+título+texto como estructura.
- **Don't** inventar métricas de negocio (solo indicadores descriptivos).
