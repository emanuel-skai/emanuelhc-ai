---
title: "Diez meses operando un agente de IA en WhatsApp: el caso de Francesca"
description: "Francesca agenda citas por WhatsApp para San Roque, una cadena de spas de grooming en Bogotá. 234.000 mensajes en diez meses, incluido el mes en que el cliente la apagó, las caídas y lo que costó volver a modo automático. Un caso de estudio sobre operar, no lanzar, un agente de IA."
date: "2026-11-12"
pillar: "Agentic AI"
published: true
keywords:
  - agente de IA en WhatsApp
  - caso de estudio IA
  - agente de IA en producción
  - recepcionista virtual
  - agendamiento de citas con IA
  - humano en el ciclo
  - operación de agentes de IA
  - IA en Colombia
lang: "es"
translationSlug: "whatsapp-ai-agent-ten-months-production"
---

Francesca contesta el WhatsApp de San Roque, una cadena de spas de grooming en Bogotá: dos sedes, más de una docena de groomers, perros y gatos. Cotiza por raza, agenda sobre calendarios reales, mueve y cancela citas, y le pasa la conversación al equipo cuando le toca a una persona.

En diez meses ha manejado más de 234.000 mensajes en 6.300 conversaciones. Su primera respuesta tarda, en la mediana, unos 50 segundos. En agosto, el cliente la apagó.

Esta es la historia completa. No la del lanzamiento, sino la de la operación. Casi todos los casos de estudio de agentes de IA terminan el día que el agente sale a producción. Lo que vale la pena contar empieza después.

## El trabajo real

Decirle "recepcionista" se queda corto. Una sola conversación de agendamiento toca cuatro sistemas.

**La cotización.** El precio depende de la raza: 76 razas, cada una con tamaño, tipo de pelaje y cuatro planes de servicio. Las razas de doble manto tienen reglas propias. Los criollos no están en el catálogo, así que a los perros se les cotiza por tamaño y a los gatos por largo de pelo. Cada precio sale de una herramienta conectada al catálogo vivo, nunca de la memoria del modelo.

**El calendario.** El spa usa un Google Calendar por groomer y uno por piso: perros grandes, perros pequeños y cachorros, gatos. Confirmar una cita implica revisar la disponibilidad real del groomer, el cupo del piso en ese turno, quién descansa ese día según una nota de texto libre, y si un perro grande de doble manto está pidiendo el último turno del día. Después se escriben dos eventos, groomer y piso, en una sola operación, para que dos clientes no se queden con el mismo cupo.

**El ciclo de la cita.** Los planes cambian. Desde agosto, Francesca reprogramó 78 citas y canceló 27 de punta a punta: encontrar la cita por el teléfono y el nombre de la mascota, liberar los dos calendarios, agendar el nuevo turno y confirmar.

**Todo lo demás.** Reconoce a los clientes que vuelven y los saluda con la historia de su mascota. Entiende notas de voz, fotos y videos, porque así se usa WhatsApp en Colombia. Las preguntas de salud van a la veterinaria en lugar de improvisar. Después del servicio hay encuesta. Cerca del 30% de las conversaciones empiezan fuera del horario de atención, cuando no hay nadie más para responder.

## De enero a julio: el equipo la entrenó trabajando a su lado

El dato más claro de los primeros meses es qué parte de todas las respuestas del número salió de Francesca y no del equipo.

Marzo: 38%. Abril: 18%. Julio: 67%.

Abril parece un retroceso y es lo contrario. Ese mes el equipo dejó la app de WhatsApp Business y pasó a la bandeja compartida de la plataforma. Tomaban conversaciones a mitad de camino, corregían respuestas, y cada corrección terminaba en un cambio de configuración. En julio ella ya enviaba dos de cada tres respuestas, y las conversaciones en que el último mensaje del cliente se quedaba sin respuesta habían bajado de 72,8% en marzo a 9,4%.

En julio también le cambiamos el modelo de lenguaje, con el prompt de personalidad idéntico byte a byte, y medimos qué sobrevivía. Todo lo que estaba escrito en la especificación pasó intacto: el registro, el vocabulario, el proceso. Lo que no estaba escrito cambió: los mensajes se acortaron 28% y la proporción de mensajes con una pregunta al cliente pasó de 58% a 76%. Los clientes no lo notaron. La lección que importó después fue otra: una regla que vive solo en el prompt falla en silencio. El modelo nuevo le cotizó una vez a un gato con precios de perro, aunque el prompt lo prohibía. Lo que lo resolvió fue validar la especie dentro de la herramienta de precios.

## Agosto: el mes en que la apagaron

En agosto, el cliente reportaba incidentes más rápido de lo que los corregíamos. Un cliente escribió "cancela mi cita" y la cancelación se ejecutó sin pedir confirmación. A clientes que volvían se les duplicaba el contacto. Una respuesta dejó ver andamiaje interno. Cada cosa era pequeña; juntas rompieron la confianza. A inicios de agosto apagaron a Francesca en parte del número, y desde finales de mes todas las conversaciones pasaron a modo asistido: ella redactaba cada respuesta y una persona tenía que aprobarla antes de que llegara al cliente.

El modo asistido es la respuesta de manual a "la IA se está equivocando". En esta operación no funcionó.

En dos semanas, el equipo envió cerca del 3% de los borradores: 119 de 4.344. El resto del tiempo escribió su propia respuesta o no respondió. Una recepción ocupada no revisa borradores; atiende al cliente que tiene enfrente. Las sesiones sin ninguna respuesta pasaron de 9,4% en julio a 30% en agosto.

El humano en el ciclo solo funciona si el ciclo tiene capacidad. Sin ella, el modo asistido no es una red de seguridad: es una forma más lenta de dejar clientes sin respuesta.

## Septiembre: ganarse otra vez el modo automático

Volver a automático tomó cinco semanas y tres tipos de trabajo.

**QA externo.** Un tercero la probó de punta a punta y encontró 12 problemas. Cada uno se convirtió en un cambio de reglas o de herramienta, con su caso de regresión. Nada se publicó sin correr antes el banco de pruebas: el banco decide si un cambio sale, no confirma algo que ya salió.

**Sacar reglas del prompt.** Las escrituras quedaron con candado: Francesca solo agenda, mueve o cancela después de resumir el cambio y recibir un "sí" explícito del cliente. La lógica del calendario (quién trabaja hoy, cupo por piso, último turno para razas grandes) pasó a las herramientas de agendamiento, donde el modelo no puede saltársela con un buen argumento.

**Una migración con el agente en marcha.** En medio de todo, la plataforma completa se mudó a infraestructura nueva. La operación de Francesca se movió con una copia completa de los datos y no con una parcial, porque la copia parcial del ambiente de pruebas había perdido tablas sin avisar.

El 23 de septiembre volvió a automático. Las 5.544 conversaciones que estaban en modo asistido regresaron a ella. Las que el equipo había tomado a mano siguieron en manual.

## Lo que la producción nos lanzó de todas formas

Las semanas después de volver a automático fueron las más instructivas del año, porque casi ninguna falla tuvo que ver con el modelo.

Una llave de API venció en el camino que generaba los borradores del modo asistido, y la IA no produjo nada ahí durante 43 horas mientras todos los chequeos decían "sano". Entraban mensajes, los webhooks respondían, la bandeja se veía viva. Un cambio de tamaño del broker de mensajes dejó un listener que nunca se reconectó, y los agentes se callaron unas 11 horas, otra vez con todo en verde. En octubre, una configuración de pagos en la cuenta de Meta del propio cliente bloqueó el 65% de los mensajes salientes durante varios días, y el número quedó dado de baja unos dos días.

De los tres incidentes salió una regla simple que hoy considero obligatoria: **el chequeo de salud de un agente de IA tiene que verificar la salida de la IA, no la plomería.** Nuestro canario ahora pregunta "¿el modelo produjo respuestas en la última ventana y llegaron a WhatsApp?". El tráfico entrante y los HTTP 200 no prueban nada. Las respuestas humanas esconden una IA muerta, así que el chequeo las separa.

La segunda regla salió de las mismas semanas: un cambio por ventana, de noche, con el rollback escrito antes del cambio.

## Octubre y noviembre: así se ve el modo automático hoy

Del 23 de septiembre al 10 de noviembre, en automático:

- Primera respuesta en la mediana: unos 50 segundos (p90, 72 s). El equipo humano, en el mismo número: unos 17 minutos.
- El 99,7% de las respuestas de Francesca llega en menos de cinco minutos. Las del equipo: 38,9%.
- Las conversaciones fuera de horario que reciben respuesta pasaron de 60,3% a 87,4%, y a 90,4% en noviembre.
- 377 citas agendadas por Francesca en siete semanas.
- Conversaciones que nadie respondió: 7,8% a inicios de noviembre, el nivel más bajo del año.

Octubre cerró con 249 citas agendadas por la IA, aunque el número estuvo caído o en pausa unos 13 días entre la caída de Meta y pausas planeadas.

El trabajo de noviembre ya no es si responde. Es cómo comparte el número con personas.

**Dos personas en una conversación.** El equipo sigue escribiendo a los clientes: fotos del perro después del baño, "ya puedes pasar por él". Cuando el cliente responde "¡gracias!", un agente que también contesta mete ruido. Ahora Francesca se queda callada cuando el último mensaje del equipo es reciente y el cliente solo agradece o manda un emoji. En la primera semana eso silenció 22 respuestas, y ninguna era una pregunta.

**Una segunda sede.** La cadena abrió otra sede. Los groomers rotan entre las dos, y la fuente de verdad era una frase en la nota diaria del calendario. Francesca ahora lee los turnos por sede y por día, incluido "hoy asiste en la otra sede", y respeta límites por groomer: algunos solo atienden el piso de perros pequeños, una no recibe razas grandes.

**Un sistema de agenda de verdad.** Doce calendarios de Google y notas de texto libre son la raíz de casi todos los errores que quedan. Construimos un producto de agenda con reglas por sede, turnos del equipo y cupo por piso. Desde esta semana se sincroniza con Google Calendar en las dos direcciones, así que el equipo puede pasarse de a poco, sin un día de corte: lo que agenda en la agenda nueva llega a Google con el mismo formato que usa Francesca, y lo que hace en Google aparece en la agenda.

## Lo que generalizaría

**Un agente en producción es una operación, no un lanzamiento.** La configuración de Francesca cambió decenas de veces en diez meses. Cada cambio fue una decisión sobre qué delegarle a la IA y qué dejar en manos de personas.

**El humano en el ciclo necesita capacidad, no un botón.** Si nadie tiene tiempo de aprobar borradores, el modo asistido se convierte, sin que nadie lo note, en "sin respuesta". Mide la tasa de aprobación antes de confiar en él.

**Las reglas que importan van en las herramientas.** El prompt dice lo que el modelo debería hacer. Las herramientas deciden lo que puede hacer. Cada regla que pasamos del prompt a una herramienta dejó de fallar.

**Monitorea lo que ve el cliente.** El volumen entrante, los webhooks y el uptime estaban en verde en cada caída silenciosa que tuvimos. La única señal que nunca mintió fue "respuestas de la IA entregadas en la última ventana".

**La autonomía se gana con números que el cliente puede revisar.** El regreso a automático pasó porque el cliente recibía un reporte diario (respuestas, tiempos, citas y fallas, una por una) y podía ver la tendencia por su cuenta.

Hoy Francesca responde en 50 segundos, agenda cientos de citas al mes y comparte un número de WhatsApp con un equipo que en algún momento la apagó. Nada de eso salió del modelo. Salió de tratar al agente como algo que se opera todos los días.
