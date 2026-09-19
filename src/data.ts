import { CategoryKey, Question, DateIdea, MessageGroup, PlanDay, AppConfig } from './types';

export const CONFIG: AppConfig = {
  price: "$7 USD",
  paymentUrl: "https://www.paypal.com/ncp/payment/PLB-VVEFXQETRP2W",
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
    a: "Revisa tu ropero y aseo: corte de cabello fresco, barba delineada, camisa en excelente estado y aroma discreto. Arma un conjunto cómodo y distinguido.",
    x: "Pídele la opinión honesta a una amiga o hermana sobre tu conjunto. Un ojo femenino sincero te dará un plus invaluable."
  },
  {
    t: "Entrenamiento de escucha activa",
    cat: "conversacion",
    a: "Practica hoy en tus interacciones cotidianas: haz 3 preguntas abiertas y deja que la otra persona concluya sin que tú hables de ti mismo.",
    x: "Anota mentalmente un detalle relevante. En la cita lo traerás a colación de forma natural y ella quedará deslumbrada por tu atención."
  },
  {
    t: "El mensaje de conexión sincera",
    cat: "confianza",
    a: "Redacta un mensaje breve, cálido y auténtico. Sin frases copiadas: haz alusión a un gusto o detalle que ella haya mencionado en su perfil o charla.",
    x: "Léelo en voz alta: si suena a 'estrategia' o formalidad rígida, reescríbelo como se lo dirías mirándola a los ojos con una sonrisa."
  },
  {
    t: "La propuesta de cita irresistible",
    cat: "citas",
    a: "Plantea un plan definido (lugar con encanto, fecha y hora sugerida), dejándole abierta la posibilidad de ajustar si le acomoda otro horario.",
    x: "Ten listo un plan B cercano en caso de que el lugar esté concurrido. Demostrar previsión sin quejarse genera tremenda admiración."
  },
  {
    t: "El encuentro: presencia y caballerosidad",
    cat: "conversacion",
    a: "Llega 10 minutos antes, guarda el teléfono celular en silencio dentro del bolsillo, sostén la mirada y dile un elogio genuino sobre su energía.",
    x: "Aplica la regla 70/30: haz que ella se sienta el centro de atención. El mejor conversador es quien mejor sabe escuchar."
  },
  {
    t: "El cierre y seguimiento elegante",
    cat: "errores",
    a: "Escríbele esa misma noche al llegar a casa: agradece la velada y destaca un momento específico que disfrutaste. Luego dale aire y tiempo.",
    x: "Si tarda en responder al día siguiente, no te inquietes ni mandes dobles mensajes. Deja pasar al menos 36-48 horas con absoluta tranquilidad."
  },
  {
    t: "Comunicación de intenciones y honestidad",
    cat: null,
    a: "",
    x: ""
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
    tag: "Conversación íntima"
  },
  {
    s: "tranquilo",
    c: 1,
    t: "Paseo al atardecer junto al lago o malecón con helado",
    d: "Caminar hombro con hombro alivia cualquier tensión inicial y genera complicidad espontánea.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tag: "Relajado y natural"
  },
  {
    s: "tranquilo",
    c: 1,
    t: "Picnic campestre con quesos y pan artesanal",
    d: "Lleva una manta de calidad, copas y algo que sepas que a ella le guste. El esmero personal impresiona más que una cuenta cara.",
    imageUrl: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=800&q=80",
    tag: "Detallista"
  },
  {
    s: "tranquilo",
    c: 2,
    t: "Brunch de domingo en un jardín acristalado",
    d: "Luz de sol matutina, café recién molido y una vibra despejada sin la pesadez de una cita nocturna formal.",
    imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80",
    tag: "Luminoso y fresco"
  },
  {
    s: "tranquilo",
    c: 2,
    t: "Cena íntima en restaurante boutique",
    d: "Mesa reservada con antelación en una esquina tranquila. Excelente vino y cocina cuidada.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    tag: "Romance clásico"
  },
  {
    s: "tranquilo",
    c: 3,
    t: "Escapada de tarde a un pueblo histórico con encanto",
    d: "Caminar por calles de piedra, visitar una pastelería tradicional y regresar al anochecer. Ideal cuando ya existe confianza.",
    imageUrl: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80",
    tag: "Aventura suave"
  },
  {
    s: "cultural",
    c: 1,
    t: "Visita a una exposición de arte o galería local",
    d: "Contemplar obras juntos da pie a comentar gustos de vida, viajes y recuerdos sin silencios incómodos.",
    imageUrl: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
    tag: "Estilo e intelecto"
  },
  {
    s: "cultural",
    c: 1,
    t: "Cine de autor seguido de un trago de autor",
    d: "Elige una película con temática humana y luego siéntense en un bar sereno a debatir las impresiones.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    tag: "Inspirador"
  },
  {
    s: "cultural",
    c: 1,
    t: "Feria de libros antiguos y antigüedades",
    d: "Descubrir libros de su juventud o piezas nostálgicas despierta anécdotas de su infancia y vida con profunda calidez.",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    tag: "Nostalgia dulce"
  },
  {
    s: "cultural",
    c: 2,
    t: "Concierto acústico de jazz o bossa nova en vivo",
    d: "Buena música a volumen moderado para acompañar un cóctel y poder susurrar al oído.",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    tag: "Sofisticado"
  },
  {
    s: "cultural",
    c: 2,
    t: "Clase de tango, salsa o bolero para parejas",
    d: "El contacto físico suave guiado por el ritmo rompe el hielo y fomenta miradas cómplices llenas de picardía.",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    tag: "Química corporal"
  },
  {
    s: "cultural",
    c: 3,
    t: "Noche de teatro de gala u ópera con cena posterior",
    d: "Una experiencia sublime para vestirse de fiesta y disfrutar de un evento memorable juntos.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    tag: "Elegancia total"
  },
  {
    s: "aire",
    c: 1,
    t: "Caminata botánica y mirador al atardecer",
    d: "Naturaleza, aire puro y una panorámica para contemplar la puesta de sol. Lleva una botella de agua para los dos.",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    tag: "Serenidad natural"
  },
  {
    s: "aire",
    c: 1,
    t: "Paseo en bicicleta por sendero ribereño",
    d: "Plan activo pero liviano que activa endorfinas y termina en una terraza tomando limonada fresca.",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    tag: "Vitalidad"
  },
  {
    s: "aire",
    c: 2,
    t: "Almuerzo frente al mar o laguna",
    d: "Comida con vista al agua, brisa fresca y sobremesa sin reloj. La atmósfera costera invita al desahogo y la alegría.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tag: "Brisa marina"
  },
  {
    s: "aire",
    c: 3,
    t: "Paseo privado en velero o lancha al caer el sol",
    d: "El sol hundiéndose en el horizonte, una copa de espumante y la inmensidad del agua. Inolvidable.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tag: "Experiencia de oro"
  },
  {
    s: "aire",
    c: 3,
    t: "Fin de semana en cabaña boutique con chimenea",
    d: "Fuego de leña, silencio de bosque y vino tinto. Solo para cuando la relación ya tiene sólidos lazos de intimidad.",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    tag: "Intimidad absoluta"
  },
  {
    s: "gastro",
    c: 1,
    t: "Recorrido por mercado gastronómico gourmet",
    d: "Degustar quesos artesanales, aceitunas y panes rústicos mientras van picando de puesto en puesto.",
    imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    tag: "Sabores y sonrisas"
  },
  {
    s: "gastro",
    c: 1,
    t: "Cocinar juntos una receta italiana casera",
    d: "Unas pastas caseras con salsa de albahaca fresca y música de fondo. Muy íntimo cuando ya hay confianza.",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    tag: "Hogar y complicidad"
  },
  {
    s: "gastro",
    c: 2,
    t: "Cata guiada de vinos de autor o café selecto",
    d: "Aprender sobre maridajes y notas olfativas convierte la cita en un juego sensorial interactivo.",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    tag: "Experiencia sensorial"
  },
  {
    s: "gastro",
    c: 2,
    t: "Ruta de tapas selectas en casco antiguo",
    d: "Probar un bocado en tres locales distintos caminando de la mano entre uno y otro.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tag: "Dinámico"
  },
  {
    s: "gastro",
    c: 2,
    t: "Clase magistral de cocina internacional",
    d: "Preparar sushi, tapas o risotto con un chef profesional. Reírse de los errores fomenta gran empatía.",
    imageUrl: "https://images.unsplash.com/photo-1507048329827-76672646c30e?auto=format&fit=crop&w=800&q=80",
    tag: "Complicidad pura"
  },
  {
    s: "gastro",
    c: 3,
    t: "Cena degustación con maridaje en restaurante con estrella",
    d: "Servicio impecable, mantel blanco y una experiencia culinaria de nivel superior.",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    tag: "Gran ocasión"
  }
];

export const MSG_GROUPS: MessageGroup[] = [
  {
    g: "Primer contacto por WhatsApp",
    tone: "Cálido, respetuoso y sin lugares comunes",
    items: [
      "Hola [nombre], soy [tu nombre]. Me encantó coincidir contigo y me quedé con mucha curiosidad de conocer la historia detrás de tu sonrisa. ¿Cómo comenzó tu semana?",
      "Hola [nombre], qué gusto saludarte. Me llamó mucho la atención cuando mencionaste [detalle de su foto o charla sobre libros/viajes]. ¿Cómo te fue finalmente con ese proyecto?",
      "Buenos días, [nombre]. Solo quería saludarte y desearte un día tranquilo y con buena energía. Ojalá encuentres un momento para disfrutar de un buen café.",
      "Hola [nombre], me quedé pensando en nuestra conversación sobre [tema]. Tienes una mirada muy singular sobre la vida, me encantó escucharte."
    ]
  },
  {
    g: "Invitación con propuesta clara",
    tone: "Segura, con plan definido y sin presiones",
    items: [
      "[Nombre], me daría mucho gusto invitarte a tomar un buen café este [día] a las [hora] en [nombre de un lugar lindo]. Si prefieres otro día o lugar, dímelo con total confianza y nos adaptamos.",
      "Me enteré de una muestra muy linda en [lugar] este fin de semana. Creo que va perfecto con tus gustos. ¿Te gustaría acompañarme el [día]? Un plan tranquilo para disfrutar y charlar.",
      "Me encanta la fluidez con la que conversamos, pero me gustaría mucho más verte sonreír en persona. ¿Qué te parece una caminata y algo rico el [día]? Tú dime qué horario te queda más cómodo.",
      "[Nombre], me gustaría agasajarte con una cena tranquila este [día]. Conozco un rincón donde cocinan espectacular y se puede conversar sin apuro. ¿Te animas?"
    ]
  },
  {
    g: "Después de la cita",
    tone: "Agradecido, maduro y sereno",
    items: [
      "Gracias por tu hermosa compañía hoy, [nombre]. Disfruté muchísimo cuando me contaste sobre [anécdota]. Regresé a casa con una sonrisa. Que descanses muy bien.",
      "Espero que hayas llegado bien a casa, [nombre]. Me encantó conocerte en persona; eres aún más encantadora de lo que transmitías por mensaje. Me quedé con ganas de repetir.",
      "Fue una noche sumamente agradable, [nombre]. Valoro mucho tu tiempo y la calidez de tu charla. Mañana seguimos en contacto, que tengas linda noche."
    ]
  },
  {
    g: "Cuando ella necesita espacio o tarda",
    tone: "Cero reclamos, alta inteligencia emocional",
    items: [
      "Entiendo perfectamente, [nombre]. Tómate todo el tiempo que necesites. Aquí estaré cuando gustes conversar, con mucho gusto y sin ninguna prisa.",
      "Aprecio mucho tu sinceridad, [nombre]. Sé que la vida a veces nos exige enfocarnos. Te deseo una excelente semana y cuando te liberes me avisas."
    ]
  },
  {
    g: "Disculpa sincera de caballero",
    tone: "Humilde, directo y sin excusas",
    items: [
      "[Nombre], quiero pedirte una disculpa sincera por [lo sucedido]. No fue mi intención incomodarte en absoluto y comprendo tu sentir. Gracias por hacérmelo notar con madurez.",
      "Me quedé reflexionando sobre lo que comenté y reconozco que no me expresé con la delicadeza debida. Lamento haberte hecho pasar un mal momento. Si deseas conversarlo con calma, aquí estoy."
    ]
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
