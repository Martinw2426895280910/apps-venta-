import { CategoryKey, Question, DateIdea, MessageGroup, PlanDay, PracticalCase, AppConfig } from './types';

export const CONFIG: AppConfig = {
  price: "$7 USD",
  paymentUrl: "https://www.paypal.com/ncp/payment/PLB-CYD69X6FXCUJ",
  whatsapp: "543772636749",
  codes: ["CONQUISTA50", "VIP50", "AMOR50"]
};

export const CATS: Record<CategoryKey, string> = {
  presencia: "Presencia personal y estilo",
  conversacion: "Conversación y escucha activa",
  citas: "Planificación de citas",
  errores: "Errores comunes a evitar",
  confianza: "Confianza y seguridad madura"
};

export const CAT_ICON: Record<CategoryKey, string> = {
  presencia: "✨",
  conversacion: "💬",
  citas: "☕",
  errores: "🚫",
  confianza: "💪"
};

export const QUESTIONS: Question[] = [
  {
    cat: "presencia",
    q: "¿Cómo es tu cuidado personal y estilo en el día a día?",
    opts: [
      { t: "Cuido mi aseo, mi ropa y mi aroma casi siempre con dedicación", s: 3 },
      { t: "Me arreglo bien, pero solo cuando hay ocasiones especiales", s: 2 },
      { t: "Lo hago por rutina automática, sin prestarle mucha atención", s: 1 },
      { t: "Reconozco que lo tengo bastante descuidado últimamente", s: 0 }
    ]
  },
  {
    cat: "presencia",
    q: "Vas a conocerla en persona por primera vez. ¿Cómo eliges qué ponerte?",
    opts: [
      { t: "Algo limpio, cómodo, a mi medida y adecuado para el lugar", s: 3 },
      { t: "Me visto muy elegante y formal, aunque me sienta algo rígido", s: 2 },
      { t: "Lo primero que encuentro en el ropero, sin pensarlo mucho", s: 1 },
      { t: "Trato de impresionar con exceso de perfume o ropa llamativa", s: 1 }
    ]
  },
  {
    cat: "conversacion",
    q: "Cuando conversas con ella, normalmente…",
    opts: [
      { t: "Escucho con atención real y le hago preguntas sobre lo que cuenta", s: 3 },
      { t: "Hablamos casi a partes iguales equilibradamente", s: 2 },
      { t: "Me pongo algo nervioso y me quedo muy callado", s: 1 },
      { t: "Termino hablando sobre todo de mí, mis logros o mi trabajo", s: 0 }
    ]
  },
  {
    cat: "conversacion",
    q: "Ella te cuenta algo personal importante: su familia, una pasión o un miedo. ¿Qué haces?",
    opts: [
      { t: "Le doy toda mi atención visual y después recuerdo ese detalle", s: 3 },
      { t: "Escucho superficialmente y cambio de tema con rapidez", s: 1 },
      { t: "Le doy consejos o soluciones enseguida, aunque no los haya pedido", s: 1 },
      { t: "Me distraigo con el celular o mirando alrededor", s: 0 }
    ]
  },
  {
    cat: "citas",
    q: "¿Qué tipo de cita sueles proponer para una mujer madura?",
    opts: [
      { t: "Un plan tranquilo, bien pensado, donde se pueda conversar con calma", s: 3 },
      { t: "Algo muy ruidoso o extremadamente costoso solo para impresionar", s: 1 },
      { t: "Lo que surja a último minuto sin ninguna reserva previa", s: 1 },
      { t: "Prefiero seguir chateando semanas y postergar la cita real", s: 0 }
    ]
  },
  {
    cat: "errores",
    q: "Si surge hablar de relaciones pasadas en la charla, normalmente…",
    opts: [
      { t: "Digo lo justo, con respeto y sin hablar mal de absolutamente nadie", s: 3 },
      { t: "Prefiero no mencionarlas en absoluto", s: 2 },
      { t: "A veces me quejo o muestro resentimiento hacia mis ex", s: 1 },
      { t: "Suelo comparar a las nuevas personas con mis experiencias pasadas", s: 0 }
    ]
  },
  {
    cat: "errores",
    q: "Ella tarda horas en responder o te dice que necesita su propio espacio. ¿Qué haces?",
    opts: [
      { t: "Respeto su tiempo con serenidad y continúo con mis proyectos", s: 3 },
      { t: "Le escribo un mensaje más tarde, con calma y sin reclamos", s: 2 },
      { t: "Me impaciento, me molesto y se lo hago notar de inmediato", s: 1 },
      { t: "Insisto con llamadas y mensajes repetidos hasta que me conteste", s: 0 }
    ]
  },
  {
    cat: "confianza",
    q: "Antes de salir a la cita con ella, ¿cómo te sientes interiormente?",
    opts: [
      { t: "Tranquilo y con ganas de conocerla: sé que puedo ser yo mismo", s: 3 },
      { t: "Un poco nervioso, pero sé manejarlo y relajarme", s: 2 },
      { t: "Muy inseguro: dudo si estaré a su altura o si le resultaré interesante", s: 1 },
      { t: "Prefiero cancelar o evitar la cita para no exponerme al rechazo", s: 0 }
    ]
  },
  {
    cat: "objetivo",
    scored: false,
    q: "¿Qué buscas honestamente construir con ella?",
    opts: [
      { t: "Una relación seria, duradera y con complicidad mutua", v: "seria" },
      { t: "Conocernos con calma, disfrutar el camino y ver qué surge", v: "calma" },
      { t: "Todavía no lo tengo del todo definido", v: "claro" }
    ]
  },
  {
    cat: "estilo",
    scored: false,
    q: "¿Qué tipo de actividades crees que ella disfrutaría más?",
    opts: [
      { t: "Tranquilas y acogedoras: buen café, paseos sin prisa, charlas íntimas", v: "tranquilo" },
      { t: "Culturales: galerías, música acústica, teatro o cine clásico", v: "cultural" },
      { t: "Al aire libre: senderos naturales, atardecer frente al agua, jardines", v: "aire" },
      { t: "Gastronómicas: degustación de vinos, cocina gourmet, sabores nuevos", v: "gastro" }
    ]
  }
];

export const TIP: Record<CategoryKey, string> = {
  presencia: "Renueva lo básico: aseo impecable, ropa planchada a tu medida justa, un aroma sobrio y calzado cuidado. La elegancia sobria comunica madurez y respeto por ella y por ti.",
  conversacion: "Aplica la regla de oro 70/30: escucha con curiosidad genuina el 70 % y habla el 30 %. Preguntas abiertas (¿qué te apasionó de…? ¿cómo fue esa etapa?) son la llave al corazón de una mujer con historia.",
  citas: "Elige ambientes cálidos con baja contaminación sonora: un café con encanto, un paseo o un bistró acogedor. Tener un plan anticipado demuestra que le diste valor a su tiempo.",
  errores: "Prohibido quejarse de relaciones pasadas o presionar por respuestas inmediatas. A los 50, la paz mental y la independencia son intocables; respetarlas te vuelve irresistible.",
  confianza: "La seguridad madura no es prepotencia ni fingir éxito: es serenidad interior, honestidad y saber quién eres. Llegar 10 minutos antes te dará calma y dominio."
};

export const DIAG: Record<CategoryKey, { hi: string; lo: string }> = {
  presencia: {
    hi: "Cuidas tu imagen y eso proyecta respeto propio y distinción. Mantén esa coherencia en cada encuentro: no es para impresionar, es tu sello de caballero.",
    lo: "Aquí tienes tu victoria más veloz. Empieza por lo fundamental: corte de cabello pulcro, barba arreglada, camisa planchada de buen calce, calzado impecable y perfume sutil. No requiere dinero, sino esmero personal."
  },
  conversacion: {
    hi: "Sabes escuchar y hacerla sentir única, un atributo escaso y sumamente valorado por mujeres maduras. Sigue profundizando en sus vivencias con preguntas inteligentes.",
    lo: "Practica la escucha empática: mantén contacto visual sereno, no interrumpas, valida sus emociones antes de opinar y resiste la tentación de hablar únicamente de tus logros o trabajo."
  },
  citas: {
    hi: "Planificas con intención y buen gusto. Demuestras liderazgo amable eligiendo sitios con atmósfera que favorecen la intimidad y la confidencia.",
    lo: "Improvisar denota poco interés. Ten siempre una propuesta definida: día, hora exacta, lugar con estacionamiento accesible y una alternativa reservada si el plan principal se complica."
  },
  errores: {
    hi: "Manejas con maestría los límites y respetas sus tiempos. Esa serenidad hace que una mujer experimentada baje la guardia y confíe plenamente en ti.",
    lo: "Atención a las conductas reactivas: comparar con tu pasado, cuestionar sus silencios o insistir en WhatsApp. La serenidad emocional es lo que más seguridad le transmite a una mujer de 50 años."
  },
  confianza: {
    hi: "Transmites templanza y naturalidad. No necesitas máscaras ni poses impostadas: tu presencia calma es tu mayor atractivo.",
    lo: "Los nervios son humanos y bien encauzados resultan entrañables. Un sincero 'estoy un poco nervioso porque me pareciste encantadora' desarma cualquier frialdad. Respira hondo y llega con tiempo."
  }
};

export const OBJ: Record<string, string> = {
  seria: "Tu meta es una relación sólida y duradera con una mujer madura. Esta guía enfatiza la constancia, la coherencia entre palabra y acción, y el compañerismo real.",
  calma: "Tu meta es conocerse a fuego lento, sin presiones. Esta guía potencia la diversión madura, la curiosidad mutua y citas memorables.",
  claro: "Aún estás descubriendo tus intenciones, y es perfectamente honesto. La guía te orienta para disfrutar con autenticidad y caballerosidad en cada paso."
};

export const PLAN: PlanDay[] = [
  {
    t: "Tu mejor versión visual",
    cat: "presencia",
    a: "Revisa tu ropero y aseo: corte de cabello fresco, barba delineada o afeitado impecable, camisa de algodón planchada a tu talla justa y aroma discreto pero distintivo.",
    x: "Pídele la opinión honesta a una amiga o hermana sobre tu conjunto. Un ojo femenino sincero te dará un plus invaluable.",
    ejemploReal: "No uses ropa holgada del pasado ni intentes vestir como un joven de 20 años. Una camisa celeste o azul marino bien planchada con mangas arremangadas dos vueltas, pantalón recto chino o jean oscuro sin roturas, zapatos o zapatillas de cuero limpias y un reloj clásico transmiten la máxima elegancia masculina a los 50.",
    guionSugerido: "Regla del espejo antes de salir: 'No busco aparentar 30 años; honro mis 50 con distinción, aseo impecable y comodidad sobria'."
  },
  {
    t: "Entrenamiento de escucha activa",
    cat: "conversacion",
    a: "Practica hoy en tus interacciones cotidianas: aplica la regla 70/30 (escuchar con curiosidad el 70% del tiempo y hablar el 30%). Haz 3 preguntas abiertas y deja que la otra persona concluya sin interrumpir con tus propias historias.",
    x: "Anota mentalmente un detalle relevante. En la cita lo traerás a colación de forma natural y ella quedará deslumbrada por tu atención.",
    ejemploReal: "Si ella te dice: 'Me encanta la jardinería porque me desconecta del estrés', el error común es decir 'Ah sí, yo en mi casa tengo 4 plantas...'. El acierto del caballero es profundizar: 'Qué hermoso refugio. ¿Cuál es la planta que más disfrutas cuidar o qué sientes cuando estás en ese rincón?'.",
    guionSugerido: "Pregunta mágica de transición: 'Cuéntame más sobre eso... me fascina cómo se te iluminan los ojos cuando hablas de ese tema'."
  },
  {
    t: "El mensaje de conexión sincera",
    cat: "confianza",
    a: "Redacta un mensaje breve, cálido y auténtico. Sin frases copiadas ni piropos superficiales: haz alusión a un gusto o detalle que ella haya mencionado en su perfil o en charlas previas.",
    x: "Léelo en voz alta: si suena a 'estrategia' o formalidad rígida, reescríbelo como se lo dirías mirándola a los ojos con una sonrisa.",
    ejemploReal: "En vez de enviar un frío 'Hola linda, ¿cómo estás?', envía: 'Hola María, me acordé de ti hoy porque pasé frente a una librería con jardín de té y recordé que me mencionaste tu fascinación por la literatura histórica. Espero que tu semana haya comenzado con linda energía.'",
    guionSugerido: "Fórmula de oro: [Saludo afectuoso con su nombre] + [Detalle que ella mencionó] + [Deseo cálido y desinteresado, sin exigir respuesta]."
  },
  {
    t: "La propuesta de cita irresistible",
    cat: "citas",
    a: "Plantea un plan definido (lugar con encanto, fecha y hora sugerida), dejándole abierta la posibilidad de ajustar si le acomoda otro horario. Demuestra liderazgo amable y considerado.",
    x: "Ten listo un plan B cercano en caso de que el lugar esté concurrido. Demostrar previsión sin quejarse genera tremenda admiración.",
    ejemploReal: "La peor propuesta es: '¿Cuándo nos vemos? Tú dime qué hacemos'. Eso le traslada la carga mental a ella. La propuesta de caballero es: 'Elena, me encantaría invitarte a tomar un rico café este jueves a las 18:30 en el bistró del centro. Tienen una terraza hermosa y café de especialidad. Si te queda mejor el viernes o prefieres otro rincón, dímelo con total confianza.'",
    guionSugerido: "Estructura: Invitación clara + Lugar sugerido con motivo especial + Día y hora tentativa + Salida elegante y flexible si no puede."
  },
  {
    t: "El encuentro: presencia y caballerosidad",
    cat: "conversacion",
    a: "Llega 10 minutos antes para elegir una mesa acogedora y apartada del ruido. Guarda el teléfono celular en silencio dentro del bolsillo, sostén la mirada con serenidad y dile un elogio genuino sobre su presencia.",
    x: "Aplica la regla 70/30: haz que ella se sienta el centro de atención. El mejor conversador es quien mejor sabe escuchar.",
    ejemploReal: "Al verla llegar, ponte de pie, sonríe con tranquilidad y dale un beso suave en la mejilla o un abrazo cálido de dos segundos. Dile: 'Qué gusto enorme verte en persona, Carmen. Tienes una luz y una sonrisa que contagian paz. Ven, elegí una mesa tranquila para que podamos conversar sin prisa.'",
    guionSugerido: "Gesto clave: Retira suavemente la silla si es oportuno y mantén las manos sobre la mesa, con el cuerpo ligeramente inclinado hacia ella en señal de interés genuino."
  },
  {
    t: "El cierre y seguimiento elegante",
    cat: "errores",
    a: "Escríbele esa misma noche al llegar a casa: agradece la velada y destaca un momento específico que disfrutaste. Luego dale aire y tiempo, sin bombardearla al día siguiente.",
    x: "Si tarda en responder al día siguiente, no te inquietes ni mandes dobles mensajes. Deja pasar al menos 36-48 horas con absoluta tranquilidad.",
    ejemploReal: "Mensaje nocturno exacto (a los 40 minutos de despedirse): 'Carmen, espero que hayas llegado muy bien a casa. Me encantó compartir la velada contigo; me hiciste reír mucho con tu anécdota del viaje a Mendoza. Descansa y que tengas un hermoso despertar mañana.' Y apagas el teléfono.",
    guionSugerido: "Regla de oro: No preguntes '¿cuándo nos volvemos a ver?' en el mensaje de la misma noche. Deja que procese la magia del encuentro y saboree el recuerdo."
  },
  {
    t: "Comunicación de intenciones y honestidad",
    cat: null,
    a: "",
    x: "",
    ejemploReal: "A los 50 años, la incertidumbre y los juegos de adolescentes cansan. Un hombre que expresa con calma lo que valora y siente sin poner presión resulta sumamente atractivo.",
    guionSugerido: "Frase honesta: 'Valoro muchísimo la paz y la sinceridad en esta etapa de mi vida. Me encanta compartir tiempo contigo y conocer tu mundo con tranquilidad y sin apuros'."
  }
];

export const DAY7: Record<string, string> = {
  seria: "Transmítele con serenidad y sin exigir nada a cambio que disfrutaste conocerla y que buscas alguien con quien construir algo genuino. Escucha su postura con apertura y respeto.",
  calma: "Dile con naturalidad lo bien que la pasas en su compañía y que te agrada el ritmo pausado con el que se están conociendo, preguntándole cómo lo siente ella.",
  claro: "Sé transparente: 'Disfruto mucho compartir tiempo contigo y me encanta descubrir hacia dónde fluye nuestra química'. Deja que ella exprese su sentir."
};

export const IDEAS: DateIdea[] = [
  {
    s: "tranquilo",
    c: 1,
    t: "Café de especialidad en un rincón acogedor",
    d: "Un bistró con sofás cómodos y música jazz suave de fondo donde puedan conversar horas sin interrupciones.",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    tag: "Conversación íntima",
    detalleCaballero: "Llega 10 minutos antes para asegurarte una mesa esquinera con sofás alejada del tránsito de camareros. Pide la carta y déjala a su lado con naturalidad.",
    quePedir: "Café de origen filtrado o infusión de hierbas con una porción para compartir de tarta artesanal."
  },
  {
    s: "tranquilo",
    c: 1,
    t: "Paseo al atardecer junto al lago o malecón con helado",
    d: "Caminar hombro con hombro alivia cualquier tensión inicial y genera complicidad espontánea.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tag: "Relajado y natural",
    detalleCaballero: "Camina siempre del lado de la calle o tráfico vehicular como gesto protector instintivo. Lleva una toallita húmeda en el bolsillo por si comen helado.",
    quePedir: "Helado artesanal en cucurucho o copa; pregunta qué sabor de su infancia le trae mejores recuerdos."
  },
  {
    s: "tranquilo",
    c: 1,
    t: "Picnic campestre con quesos y pan artesanal",
    d: "Lleva una manta de calidad, copas y algo que sepas que a ella le guste. El esmero personal impresiona más que una cuenta cara.",
    imageUrl: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=800&q=80",
    tag: "Detallista",
    detalleCaballero: "Empaca copas de cristal de verdad (no plástico) y servilletas de tela. Servir vino en cristal sobre el pasto es un toque supremo de distinción.",
    quePedir: "Queso brie o gouda curado, uvas frescas, frutos secos, pan de masa madre y un vino tinto suave."
  },
  {
    s: "tranquilo",
    c: 2,
    t: "Brunch de domingo en un jardín acristalado",
    d: "Luz de sol matutina, café recién molido y una vibra despejada sin la pesadez de una cita nocturna formal.",
    imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80",
    tag: "Luminoso y fresco",
    detalleCaballero: "Las citas de mañana reducen las presiones románticas típicas y permiten una conversación muy lúcida y honesta.",
    quePedir: "Tostadas francesas o huevos benedictinos, jugo de naranja recién exprimido y capuchino con canela."
  },
  {
    s: "tranquilo",
    c: 2,
    t: "Cena íntima en restaurante boutique",
    d: "Mesa reservada con antelación en una esquina tranquila. Excelente vino y cocina cuidada.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    tag: "Romance clásico",
    detalleCaballero: "Pide discretamente al maître una mesa tranquila al hacer la reserva. Al llegar la cuenta, resuélvela con una sonrisa y sin teatralidad.",
    quePedir: "Plato de pesca del día o pastas rellenas caseras acompañadas de una botella de buen Malbec o Pinot Noir."
  },
  {
    s: "tranquilo",
    c: 3,
    t: "Escapada de tarde a un pueblo histórico con encanto",
    d: "Caminar por calles de piedra, visitar una pastelería tradicional y regresar al anochecer. Ideal cuando ya existe confianza.",
    imageUrl: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80",
    tag: "Aventura suave",
    detalleCaballero: "Ten el coche impecablemente limpio por dentro, perfumado y con buena música suave seleccionada en una lista.",
    quePedir: "Chocolate caliente espeso con churros o repostería típica del pueblo artesanal."
  },
  {
    s: "cultural",
    c: 1,
    t: "Visita a una exposición de arte o galería local",
    d: "Contemplar obras juntos da pie a comentar gustos de vida, viajes y recuerdos sin silencios incómodos.",
    imageUrl: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
    tag: "Estilo e intelecto",
    detalleCaballero: "No intentes dar una clase de historia del arte; pregúntale: '¿Qué emoción te transmite este cuadro a ti?'. La conexión emocional supera a la erudición.",
    quePedir: "Un café en la cafetería del museo tras terminar el recorrido para intercambiar opiniones."
  },
  {
    s: "cultural",
    c: 1,
    t: "Cine de autor seguido de un trago de autor",
    d: "Elige una película con temática humana y luego siéntense en un bar sereno a debatir las impresiones.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    tag: "Inspirador",
    detalleCaballero: "Elige una sala pequeña o cine club con butacas cómodas. El debate posterior revela valores éticos y sensibles de ambos.",
    quePedir: "Un Negroni suave o copa de vino blanco, acompañado de unas aceitunas marinadas."
  },
  {
    s: "cultural",
    c: 1,
    t: "Feria de libros antiguos y antigüedades",
    d: "Descubrir libros de su juventud o piezas nostálgicas despierta anécdotas de su infancia y vida con profunda calidez.",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    tag: "Nostalgia dulce",
    detalleCaballero: "Si ves que se le iluminan los ojos con un libro o pequeña postal antigua, cómprasela de regalo sorpresa sin que se dé cuenta.",
    quePedir: "Un café para llevar mientras recorren los puestos con paso pausado."
  },
  {
    s: "cultural",
    c: 2,
    t: "Concierto acústico de jazz o bossa nova en vivo",
    d: "Buena música a volumen moderado para acompañar un cóctel y poder susurrar al oído.",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    tag: "Sofisticado",
    detalleCaballero: "Asegúrate de que el sitio no sea ruidoso. Una mujer de 50 años detesta tener que gritar para que la escuchen.",
    quePedir: "Un Gin Tonic con pepino o cóctel de frutas de estación con frutos rojos."
  },
  {
    s: "cultural",
    c: 2,
    t: "Clase de tango, salsa o bolero para parejas",
    d: "El contacto físico suave guiado por el ritmo rompe el hielo y fomenta miradas cómplices llenas de picardía.",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    tag: "Química corporal",
    detalleCaballero: "Si cometes errores de pasos, ríete con caballerosidad y autocrítica. El sentido del humor bailando es sumamente seductor.",
    quePedir: "Agua mineral fría durante la clase y una copa de vino al terminar para brindar por los pasos aprendidos."
  },
  {
    s: "cultural",
    c: 3,
    t: "Noche de teatro de gala u ópera con cena posterior",
    d: "Una experiencia sublime para vestirse de fiesta y disfrutar de un evento memorable juntos.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    tag: "Elegancia total",
    detalleCaballero: "Abre la puerta del auto, ofrécele el brazo al subir las escalinatas del teatro y ayuda a colocar su abrigo.",
    quePedir: "Copa de champán en el intervalo de la función."
  },
  {
    s: "aire",
    c: 1,
    t: "Caminata botánica y mirador al atardecer",
    d: "Naturaleza, aire puro y una panorámica para contemplar la puesta de sol. Lleva una botella de agua para los dos.",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    tag: "Serenidad natural",
    detalleCaballero: "Avisa con tiempo el calzado recomendado: 'Lleva zapatillas cómodas, caminaremos por un sendero llano y hermoso'. Cuidar su comodidad le transmite enorme protección.",
    quePedir: "Termo con té de hierbas tibio y galletas de avena caseras para disfrutar en el mirador."
  },
  {
    s: "aire",
    c: 1,
    t: "Paseo en bicicleta por sendero ribereño",
    d: "Plan activo pero liviano que activa endorfinas y termina en una terraza tomando limonada fresca.",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    tag: "Vitalidad",
    detalleCaballero: "Mantén un ritmo relajado, sin afán de entrenamiento ni competencia; el objetivo es reírse y compartir el paisaje.",
    quePedir: "Limonada con menta y jengibre en una terraza sombreada."
  },
  {
    s: "aire",
    c: 2,
    t: "Almuerzo frente al mar o laguna",
    d: "Comida con vista al agua, brisa fresca y sobremesa sin reloj. La atmósfera costera invita al desahogo y la alegría.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tag: "Brisa marina",
    detalleCaballero: "Lleva en el coche un abrigo liviano extra por si refresca la brisa costera. Ofrecérselo al notar frío es un detalle inolvidable.",
    quePedir: "Pescado a la plancha con vegetales asados y vino blanco frío bien mineral."
  },
  {
    s: "aire",
    c: 3,
    t: "Paseo privado en velero o lancha al caer el sol",
    d: "El sol hundiéndose en el horizonte, una copa de espumante y la inmensidad del agua. Inolvidable.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tag: "Experiencia de oro",
    detalleCaballero: "Solo para cuando ya exista un lazo de intimidad y confianza consolidada. Ofrécele tu mano para subir y bajar con total seguridad.",
    quePedir: "Copa de cava o espumante brut con fresas o frutos secos."
  },
  {
    s: "aire",
    c: 3,
    t: "Fin de semana en cabaña boutique con chimenea",
    d: "Fuego de leña, silencio de bosque y vino tinto. Solo para cuando la relación ya tiene sólidos lazos de intimidad.",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    tag: "Intimidad absoluta",
    detalleCaballero: "Ocúpate de encender el fuego y que todo esté cálido y ordenado. La calidez del fuego despierta confidencias profundas.",
    quePedir: "Fondue de queso o guisado tradicional de montaña con pan casero."
  },
  {
    s: "gastro",
    c: 1,
    t: "Recorrido por mercado gastronómico gourmet",
    d: "Degustar quesos artesanales, aceitunas y panes rústicos mientras van picando de puesto en puesto.",
    imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    tag: "Sabores y sonrisas",
    detalleCaballero: "Ofrécele probar bocados en la boca con suavidad y complicidad si el ambiente es descontracturado y distendido.",
    quePedir: "Tabla mixta de quesos regionales y empanaditas gourmet al horno."
  },
  {
    s: "gastro",
    c: 1,
    t: "Cocinar juntos una receta italiana casera",
    d: "Unas pastas caseras con salsa de albahaca fresca y música de fondo. Muy íntimo cuando ya hay confianza.",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    tag: "Hogar y complicidad",
    detalleCaballero: "Ten todos los ingredientes ya lavados y picados en cuencos pequeños (mise en place). Eso demuestra orden y dedicación suprema.",
    quePedir: "Fettuccine caseros al pesto o salsa pomodoro fresca con parmesano recién rallado."
  },
  {
    s: "gastro",
    c: 2,
    t: "Cata guiada de vinos de autor o café selecto",
    d: "Aprender sobre maridajes y notas olfativas convierte la cita en un juego sensorial interactivo.",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    tag: "Experiencia sensorial",
    detalleCaballero: "Compara con ella los aromas y sensaciones que perciben; los sentidos estimulados despiertan una vibrante atracción química.",
    quePedir: "Selección de 3 vinos tintos de guarda y maridaje de chocolates amargos."
  },
  {
    s: "gastro",
    c: 2,
    t: "Ruta de tapas selectas en casco antiguo",
    d: "Probar un bocado en tres locales distintos caminando de la mano entre uno y otro.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tag: "Dinámico",
    detalleCaballero: "Cambiar de escenario durante la cita crea la sensación psicológica de haber vivido tres citas distintas en una misma tarde.",
    quePedir: "Tortilla española jugosa, gambas al ajillo y croquetas de jamón ibérico."
  },
  {
    s: "gastro",
    c: 2,
    t: "Clase magistral de cocina internacional",
    d: "Preparar sushi, tapas o risotto con un chef profesional. Reírse de los errores fomenta gran empatía.",
    imageUrl: "https://images.unsplash.com/photo-1507048329827-76672646c30e?auto=format&fit=crop&w=800&q=80",
    tag: "Complicidad pura",
    detalleCaballero: "Ayúdala a colocarse el delantal anudándolo por detrás con delicadeza. Ese pequeño contacto físico cercano es eléctrico.",
    quePedir: "Rolls de salmón fresco y palta o risotto de hongos portobello."
  },
  {
    s: "gastro",
    c: 3,
    t: "Cena degustación con maridaje en restaurante con estrella",
    d: "Servicio impecable, mantel blanco y una experiencia culinaria de nivel superior.",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    tag: "Gran ocasión",
    detalleCaballero: "Viste traje sobrio o chaqueta de corte moderno sin corbata. El trato respetuoso y afectuoso con el sommelier y los mozos habla volúmenes de tu calidad humana.",
    quePedir: "Menú degustación de 5 pasos con maridaje de vinos locales seleccionados."
  }
];

export const MSG_GROUPS: MessageGroup[] = [
  {
    g: "Primer contacto por WhatsApp",
    tone: "Cálido, respetuoso y sin lugares comunes",
    porQueFunciona: "Una mujer de 50 años recibe docenas de 'Hola hermosa' vacíos. Cuando mencionas un detalle intelectual o sensible que ella dijo, le demuestras que la escuchas como persona y no como objeto.",
    items: [
      "Hola [nombre], soy [tu nombre]. Me encantó coincidir contigo y me quedé con mucha curiosidad de conocer la historia detrás de tu sonrisa. ¿Cómo comenzó tu semana?",
      "Hola [nombre], qué gusto saludarte. Me llamó mucho la atención cuando mencionaste [detalle de su foto o charla sobre libros/viajes]. ¿Cómo te fue finalmente con ese proyecto?",
      "Buenos días, [nombre]. Solo quería saludarte y desearte un día tranquilo y con buena energía. Ojalá encuentres un momento para disfrutar de un buen café.",
      "Hola [nombre], me quedé pensando en nuestra conversación sobre [tema]. Tienes una mirada muy singular sobre la vida, me encantó escucharte."
    ],
    analisis: [
      {
        msg: "Me quedé con mucha curiosidad de conocer la historia detrás de tu sonrisa...",
        explicacion: "Valora su historia de vida y su energía en lugar de su físico superficial.",
        momento: "Ideal al intercambiar números tras conocerse brevemente o en apps."
      },
      {
        msg: "Me llamó mucho la atención cuando mencionaste [detalle de libros/viajes]...",
        explicacion: "Activa el principio de validación: a todos nos gusta que recuerden nuestros gustos.",
        momento: "Para reiniciar una conversación que quedó en pausa."
      }
    ]
  },
  {
    g: "Invitación con propuesta clara",
    tone: "Segura, con plan definido y sin presiones",
    porQueFunciona: "A los 50 años, la falta de iniciativa y el 'tú dime qué hacemos' genera pereza mental. Proponer lugar, día y dar salida elegante demuestra liderazgo maduro y caballerosidad.",
    items: [
      "[Nombre], me daría mucho gusto invitarte a tomar un buen café este [día] a las [hora] en [nombre de un lugar lindo]. Si prefieres otro día o lugar, dímelo con total confianza y nos adaptamos.",
      "Me enteré de una muestra muy linda en [lugar] este fin de semana. Creo que va perfecto con tus gustos. ¿Te gustaría acompañarme el [día]? Un plan tranquilo para disfrutar y charlar.",
      "Me encanta la fluidez con la que conversamos, pero me gustaría mucho más verte sonreír en persona. ¿Qué te parece una caminata y algo rico el [día]? Tú dime qué horario te queda más cómodo.",
      "[Nombre], me gustaría agasajarte con una cena tranquila este [día]. Conozco un rincón donde cocinan espectacular y se puede conversar sin apuro. ¿Te animas?"
    ],
    analisis: [
      {
        msg: "Si prefieres otro día o lugar, dímelo con total confianza y nos adaptamos...",
        explicacion: "Le quita la presión de tener que inventar excusas si ese día está ocupada con sus hijos o trabajo.",
        momento: "Al proponer la primera cita presencial tras varios intercambios fluidos."
      }
    ]
  },
  {
    g: "Después de la cita",
    tone: "Agradecido, maduro y sereno",
    porQueFunciona: "Cerrar la noche con un mensaje a los 40 minutos de llegar a casa le brinda sensación de seguridad y calidez sin invasión. Demuestra que disfrutaste su presencia.",
    items: [
      "Gracias por tu hermosa compañía hoy, [nombre]. Disfruté muchísimo cuando me contaste sobre [anécdota]. Regresé a casa con una sonrisa. Que descanses muy bien.",
      "Espero que hayas llegado bien a casa, [nombre]. Me encantó conocerte en persona; eres aún más encantadora de lo que transmitías por mensaje. Me quedé con ganas de repetir.",
      "Fue una noche sumamente agradable, [nombre]. Valoro mucho tu tiempo y la calidez de tu charla. Mañana seguimos en contacto, que tengas linda noche."
    ],
    analisis: [
      {
        msg: "Disfruté muchísimo cuando me contaste sobre [anécdota]...",
        explicacion: "Ancla un recuerdo feliz de la cita en su mente antes de dormir.",
        momento: "Esa misma noche al llegar a casa. No preguntar por la segunda cita aún."
      }
    ]
  },
  {
    g: "Cuando ella necesita espacio o tarda",
    tone: "Cero reclamos, alta inteligencia emocional",
    porQueFunciona: "El 90% de los hombres se ofende, reclama o insiste. Cuando un hombre responde con calma, madurez y sin drama, ella siente alivio inmenso y una profunda admiración.",
    items: [
      "Entiendo perfectamente, [nombre]. Tómate todo el tiempo que necesites. Aquí estaré cuando gustes conversar, con mucho gusto y sin ninguna prisa.",
      "Aprecio mucho tu sinceridad, [nombre]. Sé que la vida a veces nos exige enfocarnos. Te deseo una excelente semana y cuando te liberes me avisas."
    ],
    analisis: [
      {
        msg: "Aquí estaré cuando gustes conversar, con mucho gusto y sin ninguna prisa...",
        explicacion: "Comunica serenidad de acero y cero dependencia emocional. Esto despierta su respeto inmediato.",
        momento: "Cuando cancela una cita o tarda más de 24 horas en responder por temas familiares o laborales."
      }
    ]
  },
  {
    g: "Disculpa sincera de caballero",
    tone: "Humilde, directo y sin excusas",
    porQueFunciona: "Asumir la responsabilidad sin justificarse ni atacar demuestra la entereza y honestidad de un verdadero caballero maduro.",
    items: [
      "[Nombre], quiero pedirte una disculpa sincera por [lo sucedido]. No fue mi intención incomodarte en absoluto y comprendo tu sentir. Gracias por hacérmelo notar con madurez.",
      "Me quedé reflexionando sobre lo que comenté y reconozco que no me expresé con la delicadeza debida. Lamento haberte hecho pasar un mal momento. Si deseas conversarlo con calma, aquí estoy."
    ],
    analisis: [
      {
        msg: "Gracias por hacérmelo notar con madurez...",
        explicacion: "Valida su criterio y desarma cualquier resentimiento.",
        momento: "Si cometiste una torpeza o malinterpretación en una conversación."
      }
    ]
  }
];

export const CASOS_PRACTICOS: PracticalCase[] = [
  {
    id: "primeros-5-minutos",
    title: "Los Primeros 5 Minutos: Romper el Hielo con Encanto",
    icon: "🤝",
    situation: "La ves llegar al lugar acordado. Ambos sienten la pequeña dosis natural de nerviosismo del primer contacto.",
    errorComun: "Permanecer sentado, mirar el teléfono disimulando, hacer piropos físicos invasivos ('¡qué cuerpo tienes!') o empezar a hablar rápido de ti mismo para tapar el silencio.",
    formaCaballero: "Ponte de pie con una sonrisa relajada, sostén su mirada, acércate dos pasos y dale un beso suave en la mejilla o un abrazo cálido y breve de dos segundos. Halaga su elegancia y su energía con suavidad.",
    dialogoExacto: "\"¡Qué gusto enorme verte en persona, [Nombre]! Tienes una sonrisa y una energía muy linda. Qué bien te sienta ese color. Ven, elegí una mesa tranquila para que conversemos cómodos.\"",
    porQueFunciona: "A los 50 años, la serenidad cobija. Si tú estás en calma, ella respira hondo, se siente protegida y baja la guardia inmediatamente.",
    reglaDeOro: "Los primeros 5 minutos marcan el tono de toda la velada: sonríe un 20% más de lo habitual y habla un 20% más pausado."
  },
  {
    id: "tema-ex-divorcio",
    title: "Cuando Surge el Pasado: Exparejas y Divorcios",
    icon: "🕊️",
    situation: "En medio de la charla surge la pregunta: '¿Hace cuánto estás separado?' o ella empieza a comentar algo de su vida anterior.",
    errorComun: "Hablar con rencor de tu expareja ('se quedó con todo', 'estaba loca', 'las mujeres son difíciles') o victimizarse. Eso enciende todas las alarmas rojas.",
    formaCaballero: "Honra tu historia con gratitud y brevedad, demostrando que has cerrado ese ciclo con paz y estás enfocado en el presente y el futuro.",
    dialogoExacto: "\"Estuve casado X años. Fueron etapas importantes de las que aprendí mucho y agradezco los buenos momentos y la familia que formamos. Hoy tengo el corazón en paz, cerrado ese ciclo con respeto y con mucha ilusión por compartir esta nueva etapa con una mujer con quien reír y construir complicidad.\"",
    porQueFunciona: "Una mujer madura busca un compañero emocionalmente disponible y en paz consigo mismo, no convertirse en terapeuta de resentimientos ajenos.",
    reglaDeOro: "Menciona el pasado en menos de 2 minutos y devuelve el foco al presente: 'Y tú, ¿qué es lo que más disfrutas de tu independencia hoy?'."
  },
  {
    id: "momento-de-la-cuenta",
    title: "El Momento de la Cuenta: Cortesía sin Imposición",
    icon: "💳",
    situation: "Llega la cuenta a la mesa. Ella hace el gesto educado de abrir su bolso o preguntar '¿cuánto es lo mío?'.",
    errorComun: "Calcular centavos con la calculadora del celular, pelear agresivamente ('¡yo soy el hombre y yo pago!') o dudar mirando la cuenta con incomodidad.",
    formaCaballero: "Cubre la cuenta discretamente con una sonrisa natural y tono afable, respetando su intención pero ejerciendo tu caballerosidad con estilo.",
    dialogoExacto: "\"Por favor, permíteme invitarte hoy. Para mí fue un auténtico placer compartir esta mesa contigo. Si te parece, tú eliges el rincón y me invitas el próximo café.\"",
    porQueFunciona: "Mantiene la galantería clásica de agasajar a la dama, pero deja la puerta sutilmente abierta para una segunda cita sin presiones.",
    reglaDeOro: "Si ella insiste con firmeza absoluta en pagar su mitad, no forces una discusión: sonríe, agradece y dile 'Acepto con la condición de que la próxima corre por mi cuenta'."
  },
  {
    id: "ella-cancela-tarda",
    title: "Cuando Ella Cancela a Último Momento o Tarda en Responder",
    icon: "⏳",
    situation: "Faltan pocas horas para la cita y te escribe: 'Perdón, se enfermó mi nieto / tuve una urgencia laboral, hoy no podré llegar'.",
    errorComun: "Responder con frialdad ('Ok', 'Bueno, si no querías venir me decías antes'), mostrarse herido o llamarla repetidas veces.",
    formaCaballero: "Responder con empatía sincera, desearle que todo se resuelva bien y no presionarla. Tu serenidad demuestra que tienes una vida plena y madura.",
    dialogoExacto: "\"No te preocupes en absoluto, [Nombre]. La familia y la salud son siempre la prioridad. Espero de corazón que todo se resuelva bien. Despreocúpate por hoy y cuando las aguas se calmen retomamos con mucho gusto. Un abrazo grande.\"",
    porQueFunciona: "Ella espera que te enfades como la mayoría. Al ver tu madurez y falta de reclamos, tu valor se multiplica por diez en su mente y ella misma buscará reagendar.",
    reglaDeOro: "Después de enviar este mensaje, guarda silencio total. No vuelvas a escribir hasta que ella lo haga."
  },
  {
    id: "tacto-respetuoso",
    title: "De la Amistad al Romance: El Contacto Físico Respetuoso",
    icon: "✨",
    situation: "La charla fluye de maravilla, hay risas compartidas, pero temes quedar encasillado como un simple 'amigo de charla' o cruzar una línea incómoda.",
    errorComun: "Lanzarse a besarla abruptamente sin señales previas o, en el extremo opuesto, mantener una distancia corporal rígida como si fueras un desconocido.",
    formaCaballero: "Aplica la micro-escalada de contacto: un roce suave y breve en el antebrazo al reírte de una broma, ofrecerle el brazo con caballerosidad al cruzar una calle concurrida, o acomodarle el abrigo con delicadeza.",
    dialogoExacto: "\"Permíteme... tienes una pestaña aquí en la mejilla\" (o al cruzar la calle: \"Ven por aquí, crucemos juntos\"). Luego sostén su mirada 3 segundos con una media sonrisa tierna.",
    porQueFunciona: "El contacto físico suave y contextual crea tensión romántica sin invadir. Si ella no se aleja y sonríe, te está dando luz verde para avanzar.",
    reglaDeOro: "Si al rozar su antebrazo ella retira el brazo o se tensa, retrocede con simpatía y continúa la charla sin darle importancia ni sentirte rechazado."
  },
  {
    id: "silencios-comodos",
    title: "El Arte de los Silencios Cómodos (Sin Ansiedad)",
    icon: "🍷",
    situation: "Se produce una pausa de 5 a 10 segundos en la mesa y nadie habla.",
    errorComun: "Desesperarse, ponerse a mirar el menú con ansiedad, reírse nervioso o soltar una pregunta disparatada por miedo al vacío.",
    formaCaballero: "Toma un sorbo de tu bebida con calma, mira sus ojos con tranquilidad, esboza una sonrisa cómplice y disfruta del momento presente.",
    dialogoExacto: "\"Qué linda paz se siente aquí... Me gusta mucho cómo se puede estar en calma contigo sin necesidad de apurar las palabras.\"",
    porQueFunciona: "Saber sostener el silencio transmite una seguridad varonil arrolladora. Demuestra que estás cómodo en tu propia piel y disfrutando de su compañía.",
    reglaDeOro: "Un silencio compartido con una sonrisa cálida une más que mil palabras apresuradas."
  }
];

export const CLAVES_PSICOLOGIA_50 = [
  {
    titulo: "1. La mujer de 50 no busca que la salves",
    detalle: "Ya crio hijos, construyó su vida o superó batallas difíciles. No busca un 'proveedor salvador' ni un 'crítico'. Busca un compañero de vida con quien reírse, tener paz mental y compartir buenos momentos sin drama.",
    concepto: "Ya crio hijos, construyó su vida o superó batallas difíciles. No busca un 'proveedor salvador' ni un 'crítico'. Busca un compañero de vida con quien reírse, tener paz mental y compartir buenos momentos sin drama.",
    accionClave: "En lugar de intentar impresionarla resolviéndole la vida, enfócate en aportarle momentos de disfrute, tranquilidad y risas genuinas."
  },
  {
    titulo: "2. La coherencia es su afrodisíaco número uno",
    detalle: "A esta edad las palabras bonitas ya no deslumbran por sí solas. Lo que conquista a una mujer madura es ver que lo que dices coincide exactamente con lo que haces: puntualidad, cumplimiento de promesas y honestidad sin rodeos.",
    concepto: "A esta edad las palabras bonitas ya no deslumbran por sí solas. Lo que conquista a una mujer madura es ver que lo que dices coincide exactamente con lo que haces: puntualidad, cumplimiento de promesas y honestidad sin rodeos.",
    accionClave: "Si dices que llamarás a las 8, llama a las 8. Si prometes algo, cúmplelo sin excusas. La consistencia desarma cualquier desconfianza."
  },
  {
    titulo: "3. Admiran al hombre que tiene su propia vida",
    detalle: "Tener tus propias pasiones, amigos, proyectos y hobbies te hace diez veces más atractivo. Una mujer independiente no quiere convertirse en el único entretenimiento de un hombre; quiere sumarse a un camino interesante.",
    concepto: "Tener tus propias pasiones, amigos, proyectos y hobbies te hace diez veces más atractivo. Una mujer independiente no quiere convertirse en el único entretenimiento de un hombre; quiere sumarse a un camino interesante.",
    accionClave: "Conserva tus actividades, tus deportes y tus pasiones. Háblale de lo que te apasiona con brillo en los ojos sin descuidar tu tiempo propio."
  },
  {
    titulo: "4. El valor de los detalles de la 'vieja escuela'",
    detalle: "Caminar por el lado de la calzada, abrir la puerta del coche, ayudar con el abrigo y guardar el teléfono en el bolsillo son gestos que hoy escasean. Quien los practica con naturalidad se distingue de inmediato del 95% de los hombres.",
    concepto: "Caminar por el lado de la calzada, abrir la puerta del coche, ayudar con el abrigo y guardar el teléfono en el bolsillo son gestos que hoy escasean. Quien los practica con naturalidad se distingue de inmediato del 95% de los hombres.",
    accionClave: "Guarda tu móvil en el bolsillo durante toda la cita y sé atento con los pequeños detalles de cortesía. Notará la diferencia en el primer minuto."
  }
];

export const ERR_FLAGS = [
  { q: 2, t: "Hablar casi únicamente de ti mismo", d: "Ella busca un compañero con quien dialogar, no un conferencista. Alterna preguntas con escucha atenta y silencios cómodos." },
  { q: 3, t: "Dar soluciones inmediatas o cambiar de tema", d: "Una mujer de 50 años ya sabe resolver sus problemas; cuando comparte algo íntimo busca empatía y validación, no lecciones." },
  { q: 4, t: "Improvisar la cita o dejar todo 'en el aire'", d: "Proponer con seguridad demuestra interés y resolución. Tener reserva y plan B transmite una imagen de hombre confiable." },
  { q: 5, t: "Hablar mal de tus relaciones anteriores", d: "El resentimiento hacia tus exparejas es la alarma roja número uno. El pasado se honra con pocas palabras y absoluto respeto." },
  { q: 6, t: "Insistir o mostrarte ofendido por sus tiempos", d: "A esta edad las mujeres tienen familia, trabajo e independencia consolidada. Respetar sus ritmos sin angustia te sitúa un escalón arriba de los demás." },
  { q: 7, t: "Fingir seguridad artificial o evadir el encuentro", d: "Decir con simpatía: 'hace tiempo no tenía una cita con una mujer tan linda y estoy algo emocionado' desarma cualquier frialdad." },
  { q: 0, t: "Descuidar los detalles de aseo y ropa", d: "El cuidado personal denota autoestima. Zapatos lustrados, aroma sobrio y ropa a tu talla son tu carta de presentación." },
  { q: 1, t: "Vestir para aparentar estatus en vez de comodidad", d: "La elegancia madura es sobria y auténtica. Menos es más: calidad en las telas antes que marcas llamativas." }
];

export const ERR_GENERAL = [
  { t: "Halagos condescendientes como 'para tu edad te ves genial'", d: "Elimina cualquier referencia comparativa a su edad. Elogia su estilo, su elegancia, su mirada y su inteligencia sin coletillas." },
  { t: "Exagerar sobre tus finanzas o logros materiales", d: "Una mujer madura detecta de inmediato la fanfarronería. La verdadera solidez se nota en los modales, la tranquilidad y el trato a los camareros." },
  { t: "Comportamientos posesivos o celos prematuros", d: "Preguntar dónde está, a qué hora se conectó o pedir explicaciones arruina todo en minutos. La libertad mutua es el cimiento de la atracción madura." },
  { t: "No respetar un 'no' o empujar límites", d: "Un 'no' o una evasiva elegante se aceptan con caballerosidad y sin resentimiento. La aceptación airosa deja la puerta abierta." },
  { t: "Dejar el celular sobre la mesa durante la cita", d: "Revisar notificaciones mientras ella habla comunica que hay algo más importante que ella. Guarda el teléfono en el bolsillo y concéntrate al 100%." },
  { t: "Competir con sus hijos, amistades o compromisos", d: "Sus seres queridos y su tiempo son sagrados. Quien se suma para sumar alegría y apoyo es quien se queda con su corazón." }
];

export const AVOID_PHRASES = [
  "\"Para la edad que tienes, te conservas excelente\"",
  "\"Las mujeres de tu edad suelen ser complicadas\"",
  "\"Todas mis exparejas estaban locas\"",
  "\"Si de verdad te interesara verme, ya me habrías respondido\"",
  "\"Tranquila, no exageres tanto\"",
  "\"Yo no soy como todos los hombres que conoces\""
];

export const PILARES = [
  { t: "1. Confianza y palabra empeñada", d: "Cumple con precisión cada pequeño compromiso que hagas. Para una mujer madura, la coherencia entre lo que prometes y lo que haces es el afrodisíaco definitivo." },
  { t: "2. Comunicación frontal y templada", d: "Expresa lo que sientes sin rodeos infantiles y sin agresividad. Si algo te desconcierta, pídelo con serenidad y buscando entendimiento mutuo." },
  { t: "3. Admiración por su independencia", d: "Celebra sus proyectos personales, sus amistades y sus espacios a solas. Un hombre maduro es un puerto seguro, no una jaula." },
  { t: "4. Calidad sobre cantidad en el tiempo compartido", d: "Menos chats interminables y más momentos reales de presencia: mirarse a los ojos, pasear tomados de la mano y compartir risas sin reloj." },
  { t: "5. Humor fino y complicidad compartida", d: "Saber reírse de uno mismo, cultivar anécdotas internas y mantener la chispa pícara mantiene vivo el romance semana a semana." },
  { t: "6. Madurez ante los desacuerdos", d: "No levantar la voz, no recurrir al silencio castigador y nunca usar confidencias del pasado como armas. Discutir para encontrar soluciones, no para vencer." }
];

export const CHECK90 = [
  "Conocí a su círculo más íntimo y compartimos una velada amena",
  "Tuvimos una conversación honesta y sin máscaras sobre lo que ambos esperamos",
  "Planificamos un día completo donde ella eligió todo según sus preferencias",
  "Atravesamos un desacuerdo y lo solucionamos con serenidad y afecto",
  "Le demostré aprecio genuino tanto con detalles cotidianos como con palabras",
  "Respeté con total soltura y sin reclamos un momento en que necesitó su propio espacio",
  "Organizamos juntos una escapada o proyecto especial para los próximos meses",
  "Nos reímos juntos hasta llorar de la risa con anécdotas compartidas"
];
