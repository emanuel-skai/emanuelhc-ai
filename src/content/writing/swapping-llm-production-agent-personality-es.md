---
title: "Le cambiamos el cerebro a la recepcionista IA de una peluquería de mascotas — y los clientes no se dieron cuenta"
description: "El 8 de julio de 2026 cambiamos el modelo detrás de Francesca, la recepcionista de WhatsApp de San Roque, de Claude Opus 4.5 a Grok 4.3 con sus instrucciones de personalidad idénticas byte a byte — y medimos qué pasó. Seis meses de datos de producción sobre qué controla realmente una especificación de personalidad, y qué reescribe en silencio un cambio de modelo."
date: "2026-08-01"
pillar: "Agentic AI"
published: true
keywords:
  - cambio de modelo LLM
  - personalidad de agente IA
  - agente de IA en producción
  - agente de IA WhatsApp
  - recepcionista IA
  - migración de modelo
  - caso de estudio IA agéntica
  - IA para pymes
lang: "es"
translationSlug: "swapping-llm-production-agent-personality"
image: "/writing/san-roque/tone-card-ES.png"
---

Hay una pregunta que casi ningún negocio se hace antes de montar un agente de IA: si mañana cambia el modelo que lo mueve, ¿tu agente sigue siendo tu agente?

Nosotros la respondimos con datos de producción. El 8 de julio de 2026 cambiamos el modelo detrás de Francesca — la recepcionista de WhatsApp de San Roque, un negocio de grooming de mascotas en Colombia — de Claude Opus 4.5 a Grok 4.3. Sus instrucciones de personalidad quedaron idénticas byte a byte. Y medimos qué pasó.

El experimento es la mitad de la historia. La otra mitad es lo que Francesca hace todos los días.

## Un negocio que vive en WhatsApp

En Colombia, como en casi toda Latinoamérica, el canal de ventas de una pyme no es la página web: es WhatsApp. San Roque no es la excepción. Precios, disponibilidad, citas, reclamos, fotos del perro recién bañado — todo pasa por una sola línea.

Eso tiene un costo operativo que cualquier dueño de negocio reconoce: alguien tiene que contestar. Y los clientes no escriben en horario de oficina — el 25% de los mensajes de San Roque llegan con el local cerrado. El que pregunta un precio a las 9 de la noche y no recibe respuesta, a la mañana siguiente ya le escribió a otra peluquería.

Francesca atiende esa línea desde enero de 2026 — más de 4.600 conversaciones en seis meses. Antes de llegar al experimento vale la pena desglosar su trabajo real, porque "recepcionista" se queda cortísimo.

## El trabajo es más difícil de lo que parece

![Francesca — el avatar mascota de San Roque, "Soy FrancescAI"](/writing/san-roque/francesca-avatar.png)

### Cotización por raza, no lista de precios

Empieza por la cotización. San Roque cotiza por raza: un catálogo de 76 razas — 63 de perro, 13 de gato — cada una con su tamaño, su tipo de manto y cuatro niveles de servicio. Las razas de doble capa tienen regla propia: solo corte a tijera, nunca máquina, y hay que decirlo antes de agendar. Los criollos no tienen fila en el catálogo, así que los perros se cotizan por tamaño y los gatos por largo de manto — dos caminos de preguntas distintos que Francesca tiene que elegir bien a mitad de conversación, por contexto. Y nunca cotiza de memoria: cada precio sale de una herramienta conectada al catálogo vivo, porque un número equivocado en WhatsApp es una conversación de reembolso después.

### Cirugía de calendarios

Sigue el agendamiento, que es cirugía de calendarios de verdad. San Roque maneja un calendario por groomer más tres calendarios de piso — perros, perros pequeños y un piso aparte para gatos. Confirmar una cita significa revisar la disponibilidad real del groomer, crear el evento en su calendario y en el del piso, y enviarle al cliente la invitación por correo — como una sola operación atómica, para que dos clientes no ganen el mismo cupo. Las familias con varias mascotas tienen una sola conversación y un evento por mascota, cada una con su groomer. Y si el cliente pide a alguien por nombre, agenda contra el calendario de esa persona, no del primero que esté libre.

### El ciclo de vida completo de la cita — incluida la parte que los bots se saltan

Luego viene donde casi todos los bots de agendamiento se rinden en silencio: el ciclo de vida. Los planes cambian — en julio el 9% de las citas se cancelaron y el 12% se reprogramaron. Francesca encuentra la cita existente por teléfono y nombre de la mascota, la borra de ambos calendarios, reagenda el cupo nuevo y confirma — y 4 de cada 5 de esas gestiones las resolvió de punta a punta, sin que un humano tocara un calendario.

### Las habilidades que la hacen sentir del equipo, no un formulario

Alrededor de todo eso están las capacidades que la hacen sentir parte del equipo y no un formulario: reconoce a los clientes que vuelven y los saluda con el historial de su mascota en vez de un pitch de bienvenida; entiende notas de voz, fotos, videos y documentos, porque así se usa WhatsApp de verdad; deriva las preguntas de salud al aliado veterinario en lugar de jugar al doctor; y comparte la bandeja con el equipo humano, que puede pausarla o tomar cualquier conversación a mitad de camino — que es exactamente como ocurrió el arco de entrenamiento que sigue.

### La otra mitad: bienvenida, material, encuestas y CRM

Y eso es solo la mitad del trabajo. A los clientes nuevos les da una bienvenida de verdad — videos de presentación del spa, no un muro de texto. Las preguntas sobre el proceso de grooming o un servicio se responden con material curado que el negocio aprobó, porque "¿qué le hacen exactamente en el baño?" merece fotos, no improvisación. Después de la visita, corre la encuesta post-servicio que alimenta el ciclo de calidad. Y debajo de cada conversación mantiene la ficha del cliente — quién eres, qué mascotas tienes, qué servicio se llevaron la última vez — que es lo que hace posible el reconocimiento en tu próximo mensaje. En total, opera una docena de workflows de producción conectados a los calendarios, el catálogo y el CRM reales del negocio.

## El equipo humano no desapareció: entrenó

El número que mejor cuenta la historia de Francesca no es el de conversaciones. Es la curva de autonomía: qué porcentaje de las respuestas de la línea salieron de la IA y no del equipo.

Marzo: 38%. Abril: 18%. Mayo: 31%. Junio: 51%. Julio: 67%.

Abril parece un retroceso y es lo contrario. Ese mes el equipo de San Roque adoptó la bandeja compartida de la plataforma y mandó más de 11.000 respuestas por ahí: tomaban conversaciones a mitad de camino, corregían a Francesca, y cada corrección se convertía en un ajuste de configuración. 65 versiones de configuración en cinco meses, incluyendo un rollback.

Ese trabajo se nota en las métricas. Mediana de primera respuesta en julio: 44 segundos. La IA responde en menos de 5 minutos el 99% de las veces; el equipo humano, con turnos y bandeja compartida, el 46%. Y las consultas que quedaban "en visto" — el último mensaje es del cliente y nadie respondió — cayeron del 82% en marzo al 21% en julio.

La lección para cualquier pyme evaluando esto: un agente no se "instala". Se opera. Los primeros meses el equipo trabaja al lado de la IA, y la delegación es gradual y medible.

## ¿Y la personalidad? Lo que el cambio de modelo nos enseñó

Volvamos al 8 de julio. Mismo guion, distinto actor. Comparamos cuatro semanas de respuestas antes y después — 4.259 mensajes con Opus, 4.781 con Grok — con estadística sobre cada mensaje y con evaluación ciega de 300 respuestas anonimizadas por período.

Lo que estaba escrito en la personalidad, sobrevivió completo: el tuteo colombiano, el vocabulario de la marca — las mascotas son "sanroqueros" —, el emoji de firma, la disciplina comercial de siempre proponer el siguiente paso de la cita. En proactividad de venta, ambas versiones puntuaron igual.

Lo que no estaba escrito, cambió: los mensajes se acortaron 28%, los emojis bajaron a la mitad, y Francesca pasó de preguntar en el 58% de sus mensajes al 76% — hoy conduce más y celebra menos. Los evaluadores ciegos notaron un punto menos de calidez y empatía, sobre todo en momentos delicados: un reclamo, una mascota enferma. Y aparecieron fallas nuevas: algún saludo truncado, una respuesta suelta en inglés.

¿Los clientes? No se enteraron. El sentimiento positivo pasó de 13,5% a 12,4% y el negativo bajó de 0,7% a 0,5%. Estable.

![Tarjeta comparativa del cambio de modelo: lo que sobrevivió — el tuteo colombiano, el vocabulario de marca, el emoji de firma, siempre proponer el siguiente paso de la cita — versus lo que cambió — palabras por mensaje de 29 a 21, emojis por mensaje de 1,75 a 0,90, respuestas que preguntan de 58% a 76%, un punto menos de calidez y empatía en evaluación ciega. El sentimiento de los clientes se mantuvo estable.](/writing/san-roque/tone-card-ES.png)

## Por qué esto le importa a cualquier negocio con un agente

La conclusión práctica es una sola: la personalidad de tu agente es un activo tuyo, no del proveedor del modelo. Todo lo que San Roque tenía escrito en la especificación de Francesca viajó intacto al modelo nuevo — que además corre en un tier más barato. Todo lo que nunca se escribió, el modelo nuevo lo rellenó con sus propios hábitos.

Y la ley tiene un reverso que pagamos por aprender: la regla que solo vive en el prompt falla en silencio. Las instrucciones de Francesca decían, con todas las letras, que a un gato jamás se le cotiza con precios de perro. El modelo nuevo lo hizo igual, una vez, con una clienta mirando. El arreglo que de verdad funcionó no fue otra regla — fue un candado de especie dentro de la herramienta de precios. El prompt le dice al modelo qué hacer; las herramientas deciden qué puede hacer.

Eso convierte el cambio de modelo en una decisión de negocio manejable en vez de una apuesta. ¿Prefieren el registro más cálido de antes? Se escribe en el prompt y vuelve — es una edición, no una migración. ¿El modelo nuevo es más barato y más rápido? Se cambia, se mide, y se ajusta lo que se movió.

La condición es esa palabra: medir. Nosotros tratamos el cambio como una migración de base de datos — foto del comportamiento antes, cohortes definidas de antemano, misma medición después. Una advertencia honesta que también va en el informe del cliente: nuestra plataforma de ejecución migró el mismo día, así que no todo el cambio es atribuible solo al modelo. Medir con confundidores no declarados no es medir, es hacer marketing.

Hoy Francesca manda 2 de cada 3 respuestas de la línea de San Roque y agenda más de 200 citas al mes contra calendarios reales. El modelo detrás de ella va a volver a cambiar — los modelos cambian cada seis meses. Su personalidad está en la especificación. Y esta vez sabemos exactamente qué va a sobrevivir.
