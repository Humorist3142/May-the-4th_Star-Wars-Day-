/* ============================================================
   Star Wars Trivia — Question Bank
   20 questions, fixed order:
     - Odd-numbered (1,3,5,...,19) are in English
     - Even-numbered (2,4,6,...,20) are in Spanish
   Difficulty distribution: 10 easy, 5 moderate, 5 hard.
   Scope: Theatrical "Skywalker Saga" films, Episodes I–IX only.
   Each question has 4 choices labeled A, B, C, D.
   `answer` is the 0-based index of the correct choice.
   ============================================================ */

// eslint-disable-next-line no-unused-vars
const QUESTIONS = [
  // -------------------- 1–10: EASY --------------------

  // 1 — English, Easy
  {
    lang: "en",
    difficulty: "easy",
    question: "Who is Luke Skywalker's twin sister, revealed in the original trilogy?",
    choices: [
      "Padmé Amidala",
      "Princess Leia Organa",
      "Mon Mothma",
      "Rey"
    ],
    answer: 1,
    explanation: "Princess Leia Organa is revealed to be Luke's twin sister in Return of the Jedi (Episode VI)."
  },

  // 2 — Spanish, Easy
  {
    lang: "es",
    difficulty: "easy",
    question: "¿Cuál es el nombre del pequeño droide astromecánico azul y blanco, mejor amigo de C-3PO?",
    choices: [
      "BB-8",
      "R5-D4",
      "R2-D2",
      "IG-88"
    ],
    answer: 2,
    explanation: "R2-D2 es el droide astromecánico azul y blanco que aparece en las nueve películas episódicas."
  },

  // 3 — English, Easy
  {
    lang: "en",
    difficulty: "easy",
    question: "What weapon is most associated with the Jedi Knights?",
    choices: [
      "The blaster pistol",
      "The bowcaster",
      "The vibroblade",
      "The lightsaber"
    ],
    answer: 3,
    explanation: "The lightsaber is the iconic energy sword carried by Jedi (and Sith) throughout the saga."
  },

  // 4 — Spanish, Easy
  {
    lang: "es",
    difficulty: "easy",
    question: "¿Cómo se llama la enorme estación de combate imperial con forma de luna que aparece en la trilogía original?",
    choices: [
      "La Estrella de la Muerte",
      "La Base Starkiller",
      "El Halcón Milenario",
      "El Ejecutor"
    ],
    answer: 0,
    explanation: "La Estrella de la Muerte (Death Star) aparece en los Episodios IV y VI."
  },

  // 5 — English, Easy
  {
    lang: "en",
    difficulty: "easy",
    question: "Which famous phrase is used as a farewell or blessing throughout the Star Wars films?",
    choices: [
      "Live long and prosper",
      "May the Force be with you",
      "To infinity and beyond",
      "So say we all"
    ],
    answer: 1,
    explanation: "\"May the Force be with you\" is the saga's signature farewell, heard in every episode."
  },

  // 6 — Spanish, Easy
  {
    lang: "es",
    difficulty: "easy",
    question: "¿Quién es el padre de Luke Skywalker?",
    choices: [
      "Obi-Wan Kenobi",
      "Han Solo",
      "Anakin Skywalker / Darth Vader",
      "El Emperador Palpatine"
    ],
    answer: 2,
    explanation: "En El Imperio Contraataca (Episodio V), Darth Vader revela: \"Yo soy tu padre\"."
  },

  // 7 — English, Easy
  {
    lang: "en",
    difficulty: "easy",
    question: "What is the name of Han Solo's iconic spaceship?",
    choices: [
      "The Ghost",
      "The Tantive IV",
      "The Millennium Falcon",
      "The Razor Crest"
    ],
    answer: 2,
    explanation: "The Millennium Falcon, piloted by Han Solo and Chewbacca, appears throughout the saga."
  },

  // 8 — Spanish, Easy
  {
    lang: "es",
    difficulty: "easy",
    question: "¿De qué especie es Chewbacca, el copiloto de Han Solo?",
    choices: [
      "Ewok",
      "Wookiee",
      "Hutt",
      "Twi'lek"
    ],
    answer: 1,
    explanation: "Chewbacca es un Wookiee del planeta Kashyyyk."
  },

  // 9 — English, Easy
  {
    lang: "en",
    difficulty: "easy",
    question: "Which color is Yoda's lightsaber when we see him fight in the prequel trilogy?",
    choices: [
      "Blue",
      "Red",
      "Green",
      "Purple"
    ],
    answer: 2,
    explanation: "Yoda wields a green lightsaber in Episodes II and III."
  },

  // 10 — Spanish, Easy
  {
    lang: "es",
    difficulty: "easy",
    question: "En El Imperio Contraataca, ¿en qué planeta helado se encuentra la base secreta de la Alianza Rebelde?",
    choices: [
      "Tatooine",
      "Hoth",
      "Endor",
      "Dagobah"
    ],
    answer: 1,
    explanation: "La Base Eco de los rebeldes se encuentra en el planeta helado Hoth (Episodio V)."
  },

  // -------------------- 11–15: MODERATE --------------------

  // 11 — English, Moderate
  {
    lang: "en",
    difficulty: "moderate",
    question: "In Episode I: The Phantom Menace, who is the young Anakin Skywalker's mother?",
    choices: [
      "Beru Lars",
      "Shmi Skywalker",
      "Padmé Naberrie",
      "Mon Mothma"
    ],
    answer: 1,
    explanation: "Shmi Skywalker raises Anakin as a slave on Tatooine until Qui-Gon Jinn frees him."
  },

  // 12 — Spanish, Moderate
  {
    lang: "es",
    difficulty: "moderate",
    question: "En El Despertar de la Fuerza (Episodio VII), ¿en qué planeta desértico encuentran a Rey por primera vez?",
    choices: [
      "Tatooine",
      "Jakku",
      "Jedha",
      "Crait"
    ],
    answer: 1,
    explanation: "Rey vive como chatarrera en el planeta desértico Jakku al inicio del Episodio VII."
  },

  // 13 — English, Moderate
  {
    lang: "en",
    difficulty: "moderate",
    question: "Which Jedi Master trains Obi-Wan Kenobi as his Padawan in The Phantom Menace?",
    choices: [
      "Mace Windu",
      "Yoda",
      "Qui-Gon Jinn",
      "Ki-Adi-Mundi"
    ],
    answer: 2,
    explanation: "Qui-Gon Jinn, played by Liam Neeson, is Obi-Wan's master in Episode I."
  },

  // 14 — Spanish, Moderate
  {
    lang: "es",
    difficulty: "moderate",
    question: "¿Cómo se llama el cazarrecompensas que captura a Han Solo y lo entrega a Jabba el Hutt?",
    choices: [
      "Greedo",
      "Bossk",
      "Boba Fett",
      "Cad Bane"
    ],
    answer: 2,
    explanation: "Boba Fett captura a Han Solo congelado en carbonita al final del Episodio V."
  },

  // 15 — English, Moderate
  {
    lang: "en",
    difficulty: "moderate",
    question: "What color is Mace Windu's distinctive lightsaber, unique among the Jedi Council?",
    choices: [
      "Yellow",
      "Purple",
      "White",
      "Orange"
    ],
    answer: 1,
    explanation: "Mace Windu, played by Samuel L. Jackson, wields a purple lightsaber in the prequel trilogy."
  },

  // -------------------- 16–20: HARD --------------------

  // 16 — Spanish, Hard
  {
    lang: "es",
    difficulty: "hard",
    question: "En La Venganza de los Sith (Episodio III), ¿cuál es el nombre del general droide separatista que tose y colecciona sables de luz?",
    choices: [
      "El General Grievous",
      "El Conde Dooku",
      "Nute Gunray",
      "El Almirante Trench"
    ],
    answer: 0,
    explanation: "El General Grievous es el comandante cyborg del ejército separatista en el Episodio III."
  },

  // 17 — English, Hard
  {
    lang: "en",
    difficulty: "hard",
    question: "In Return of the Jedi, which forest moon is the site of the climactic battle against the second Death Star's shield generator?",
    choices: [
      "The forest moon of Yavin",
      "The forest moon of Endor",
      "The forest moon of Kashyyyk",
      "The forest moon of Takodana"
    ],
    answer: 1,
    explanation: "The Battle of Endor takes place on the forest moon of Endor, home of the Ewoks."
  },

  // 18 — Spanish, Hard
  {
    lang: "es",
    difficulty: "hard",
    question: "En El Ascenso de Skywalker (Episodio IX), ¿cuál es el verdadero linaje familiar de Rey?",
    choices: [
      "Es nieta de Obi-Wan Kenobi",
      "Es hija de Luke Skywalker",
      "Es nieta del Emperador Palpatine",
      "No tiene ningún parentesco con personajes famosos"
    ],
    answer: 2,
    explanation: "En el Episodio IX se revela que Rey es nieta del Emperador Palpatine."
  },

  // 19 — English, Hard
  {
    lang: "en",
    difficulty: "hard",
    question: "In The Phantom Menace, what is the name of the queen of Naboo who is later revealed to use a decoy and go by another name?",
    choices: [
      "Queen Jamillia",
      "Queen Apailana",
      "Queen Breha",
      "Queen Amidala"
    ],
    answer: 3,
    explanation: "Queen Amidala is the elected ruler of Naboo; her birth name is Padmé Naberrie."
  },

  // 20 — Spanish, Hard
  {
    lang: "es",
    difficulty: "hard",
    question: "En El Imperio Contraataca, ¿cuál es el nombre del cazarrecompensas humano (no Boba Fett) que el Imperio contrata para perseguir el Halcón Milenario?",
    choices: [
      "Dengar",
      "Bossk",
      "IG-88",
      "4-LOM"
    ],
    answer: 0,
    explanation: "Dengar es el cazarrecompensas humano vendado que aparece en la línea de cazarrecompensas en el Episodio V; los demás son alienígenas o droides."
  }
];
