---
title: "Tere: nueve meses de una agente de ventas por WhatsApp en producción"
description: "Nueve meses y medio de datos de producción de Tere, la agente de IA que construimos para Telas Real, una de las comercializadoras de telas más grandes de Colombia. Las decisiones de arquitectura que funcionaron, las que costaron, y por qué las consultas verificadas a la base de datos le ganan al conocimiento del modelo."
date: "2026-07-15"
pillar: "Agentic AI"
published: true
keywords:
  - agente de IA en producción
  - agente de IA WhatsApp
  - caso de estudio IA agéntica
  - herramientas verificadas
  - agente de ventas IA
  - remisión a humanos
  - IA en LATAM
  - arquitectura de IA conversacional
lang: "es"
translationSlug: "whatsapp-ai-agent-production-case-study"
---

![Tere, el avatar generado de la asesora textil de Telas Real en WhatsApp, sonriendo frente a estantes llenos de rollos de tela de colores](/writing/tere/tere-avatar.jpg)

Un martes a las 9:47 de la noche, una modista en Bucaramanga manda una nota de voz: quiere saber si el chifón que vio la semana pasada viene en verde esmeralda y cuántos metros necesita para seis vestidos. A esa hora no hay una sola tienda de telas abierta en Colombia. En menos de un minuto tiene la respuesta — los colores disponibles, el precio por metro, el cálculo para los seis vestidos — y a la mañana siguiente, una asesora de la tienda más cercana ya tiene su nombre, su proyecto y su cotización lista.

Quien le respondió se llama Tere — el retrato de arriba es su avatar generado. Tere ha atendido 27.482 conversaciones como esa en los últimos nueve meses y medio. Tere es una agente de IA que construimos en Skillful para Telas Real, una de las comercializadoras de telas más grandes de Colombia. Esto es lo que aprendimos operándola en producción.

## El negocio

Telas Real vende tela por metro — satines, chifones, jacquards, licras, sublimación personalizada — en 11 tiendas por toda Colombia y una tienda virtual. Sus clientes son modistas, diseñadores, confeccionistas y artesanos. Y en Colombia ese cliente no navega páginas web: escribe por WhatsApp. Manda la foto de una tela que vio en alguna parte, una nota de voz describiendo su proyecto, una pregunta de precio o de existencias.

El problema tenía una forma muy concreta. Las preguntas de producto son repetitivas pero exigen precisión: un precio mal dado o una composición equivocada cuesta una venta o genera una devolución. El volumen es alto y con picos. Y el 37,2% de los mensajes de clientes llegan fuera del horario de atención o los domingos, cuando no hay nadie para responder. Cada mensaje sin respuesta era un lead que quizás no volvía.

## Qué hace Tere

Tere atiende las dos líneas de WhatsApp del negocio. El cliente puede escribir, mandar nota de voz o mandar foto. Tere responde sobre tipos de tela, composición, colores, precios y disponibilidad; calcula cuánta tela necesita un proyecto y cuánto cuesta; indica cuál de las 11 tiendas queda más cerca y cuáles son las políticas; y cuando detecta intención real de compra, registra el lead — nombre, proyecto, cotización, tienda — en el CRM del equipo comercial y remite al cliente con una asesora humana. El cliente nunca llena un formulario y nunca nota el registro.

A las notas de voz responde con voz, en español colombiano. Lee las fotos que le mandan. Escribe mensajes cortos, al estilo WhatsApp, un punto a la vez, como escribe una persona.

![Mapa de capacidades de Tere (en inglés): conversación nativa por texto, voz y fotos; conocimiento verificado con consultas en vivo a la base de productos; operaciones de venta con cotizaciones y registro de leads en el CRM; y operación como producto con configuración versionada](/writing/tere/capability-map-EN.png)

Los números de producción, sacados de nuestra base de datos:

- 27.482 conversaciones con 26.490 clientes distintos desde el 30 de septiembre de 2025
- 91.266 mensajes de clientes, 102.850 respuestas
- 29.508 ejecuciones de herramientas contra la base de productos en vivo y el CRM
- 37,2% de los mensajes atendidos fuera de horario o en domingo
- 99,96% de las conversaciones completadas sin intervención humana
- 19.668 contactos registrados en el CRM

![Tarjeta de métricas de Tere: 27.482 conversaciones atendidas, 26.490 clientes distintos, 99,96% resueltas sin intervención humana, 37,2% atendidas fuera de horario, 29.508 consultas en vivo a la base de datos y 19.668 contactos registrados en el CRM](/writing/tere/metrics-card-ES.png)

## Las decisiones de arquitectura que importaron

**La verdad del producto vive en la base de datos, no en el modelo.** Tere no tiene conocimiento de producto en su prompt y no tiene embeddings del catálogo. Cada afirmación sobre precio, existencias, color o composición sale de una consulta en vivo a la base de datos en el momento de la pregunta. Es la decisión de diseño más importante del sistema. El inventario de telas cambia a diario; los prompts y los embeddings se desactualizan; un modelo que "se sabe" el catálogo tarde o temprano inventa un precio. Un modelo que solo puede consultarlo, no. Esas 29.508 llamadas a herramientas son la forma que toma una respuesta verificada a escala.

**Cuatro capas de contenido en vez de un mega-prompt.** El comportamiento de Tere está definido en cuatro capas versionadas por separado: una persona (quién es — voz, tono, formato, límites), unas reglas operativas (el playbook — qué herramienta usar en cada caso, cómo funciona el flujo comercial), un cuaderno de negocio (la verdad estática — cómo se cobra cada producto, cobertura de tiendas, políticas, qué NO vende la empresa) y un checklist de tarea por turno (el procedimiento: orientarse, consultar antes de afirmar, cotizar, remitir y registrar). Separarlas nos permite ajustar el playbook comercial sin tocar la personalidad, y auditar exactamente qué cambió entre versiones. Publicamos 28 revisiones de configuración en cinco meses, contra una compuerta de regresión. La agente se opera como un producto, no se escribe una vez y se abandona.

![Diagrama de arquitectura de Tere (en inglés): los mensajes de WhatsApp — texto, voz e imagen — pasan por la capa de canales hacia el runtime del agente con sus cuatro capas de comportamiento versionadas y un ciclo ReAct con herramientas conectadas a la base de productos en vivo y al CRM](/writing/tere/architecture-EN.png)

**Un modelo pequeño con reglas estrictas le gana a un modelo grande con reglas vagas.** Tere corre sobre gpt-4.1-mini con un ciclo ReAct — sin modelo de razonamiento, sin presupuesto de chain-of-thought. La latencia y el costo se mantienen bajos, y la precisión viene de las herramientas y de las reglas, no del tamaño del modelo. Cuando la respuesta tiene que ser exacta, el diseño hace que la produzca la base de datos.

**La remisión a humanos es parte del diseño, no un modo de falla.** Tere no negocia precios, no recibe pagos y no improvisa con reclamos. Esos caminos van a personas, a propósito. Una asesora puede pausarla en cualquier conversación y tomar el control — pasó en 157 conversaciones, el 0,6% del total. El objetivo nunca fue quitar al equipo comercial. El objetivo es que cada comprador serio les llegue calificado, con los datos ya capturados.

![Árbol de decisión de Tere: las preguntas de producto las resuelve sola, cuando detecta intención de compra califica y remite al equipo comercial con el lead registrado, y la negociación de precios, los pagos y los reclamos pasan a asesores humanos por diseño](/writing/tere/decision-tree-ES.png)

## Lo que costó

Sección honesta, porque aquí es donde vive la ingeniería de verdad.

*Sonar humano en WhatsApp es un problema de formato antes que de inteligencia.* Párrafos largos, listas con viñetas, negrita de markdown: todo eso grita "bot". Tere escribe mensajes cortos con la negrita de asterisco simple de WhatsApp, una idea por mensaje, máximo una pregunta de seguimiento. Eso salió de iterar con conversaciones reales de clientes, no de ingenio en el prompt.

*Las notas de voz no son opcionales en Colombia.* Una parte grande de los clientes se comunica principalmente por audio. Transcripción de entrada y una voz colombiana natural de salida cambiaron cómo los clientes tratan el canal.

*Un cambio de prompt es un despliegue a producción.* Al principio, una edición inocente de una regla podía mover el comportamiento en un flujo que no tenía nada que ver. Configuraciones versionadas con compuerta de regresión y evaluación al aplicar es lo que volvió segura la iteración.

*Las lecciones de plataforma se transfieren.* Aprendimos, por ejemplo, que clonar la plantilla de un agente no copia sus herramientas conectadas — el tipo de detalle que te cuesta un día una sola vez, y exactamente el tipo de detalle que separa operar agentes en producción de hacer demos.

## Qué significa esto si tu negocio vive en WhatsApp

El patrón va mucho más allá de las telas. Si tus clientes ya viven en WhatsApp, si sus preguntas necesitan respuestas exactas de un catálogo o una lista de precios, y si una parte importante de la demanda llega cuando no hay nadie trabajando — esta misma arquitectura aplica: consultas verificadas en vez de conocimiento del modelo, comportamiento en capas y versionado, captura silenciosa de leads, remisión explícita a humanos. Ya estamos aplicando la misma plantilla a una segunda vertical, y la parte reutilizable de la arquitectura ronda el 80%.

A la modista de Bucaramanga nada de esto le importa. Recibió su respuesta a las 9:47 de la noche y su tela dos días después. Ese es todo el punto.

---

*Skillful AI construye agentes de IA en producción para empresas en América Latina y Europa. Tere corre sobre la plataforma [Skillful](https://skillfulai.io): agentes multicanal con herramientas verificadas, configuración versionada, compuertas de evaluación y remisión a humanos incorporada. Todas las cifras provienen de datos de producción al 15 de julio de 2026, publicadas con la aprobación de Telas Real.*
