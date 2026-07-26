/* ============================================================
   data.js
   All story content for "The Development of the Atomic Model".
   Edit this file to change any text, questions, or facts —
   the rendering engine in script.js reads everything from here.
   ============================================================ */

const STORY = {

  /* ---------- Opening screen ---------- */
  intro: {
    title: "The Development of the Atomic Model",
    subtitle: "A Chemistry Student's Journey Through History",
    body: [
      "Welcome, chemistry student! You've been invited to visit the laboratories of five scientists who changed the way we understand the atom.",
      "Atoms are far too small to see, even with the best microscopes of the past. So how did scientists figure out what's inside them? By observing evidence, asking questions, and revising their ideas — exactly what you'll do on this journey.",
      "At each stop, you'll learn what scientists believed, see a new piece of evidence, and decide for yourself how the model of the atom should change. Let's get started."
    ],
    buttonLabel: "Begin the Journey"
  },

  /* ---------- The five chapters ---------- */
  chapters: [

    /* ============ CHAPTER 1: DALTON ============ */
    {
      id: "dalton",
      scientist: "John Dalton",
      year: "1803",
      place: "Manchester, England",
      modelName: "The Solid Sphere Model",
      visualKey: "dalton",

      arrival: {
        fact: "There is no electricity in homes yet. People light their rooms with candles and oil lamps, and news travels by horse and ship rather than wire.",
        belief: "Matter is made of atoms — tiny particles so small they cannot be seen or divided into anything smaller.",
        narrative: "You step into John Dalton's workshop in Manchester, England. Glass jars of gases line the shelves, and Dalton is carefully weighing samples of different elements, jotting numbers into a worn notebook. He looks up and greets you as his new assistant for the day."
      },

      currentModel: {
        intro: "Dalton proposes that every element is made of identical, indivisible atoms — like tiny solid balls. Atoms of different elements have different sizes and masses, and they combine in simple whole-number ratios to form compounds.",
        strengths: [
          "Explains why elements always combine in fixed, predictable ratios (for example, water is always 2 parts hydrogen to 1 part oxygen).",
          "Explains why matter cannot be created or destroyed, only rearranged.",
          "Gives scientists a simple, testable idea: the atom as the basic building block of matter."
        ]
      },

      newClue: {
        text: "Decades later, other scientists experiment with sealed glass tubes with most of the air removed. When they run electricity through the tubes, a glowing beam streams from one end to the other. Careful measurements show that whatever makes up this beam is thousands of times lighter than even the lightest known atom (hydrogen) — and the same result shows up no matter what gas is inside the tube or what metal the electrodes are made of."
      },

      investigation: {
        intro: "Before moving on, think carefully about what this glowing beam tells you.",
        questions: [
          {
            prompt: "Whatever is in this beam is thousands of times lighter than even the lightest atom (hydrogen). What does this tell you?",
            options: [
              "These particles must simply be a very light kind of whole atom.",
              "These particles are smaller than atoms — pieces of atoms, not whole atoms.",
              "The measurement must be a mistake, since atoms are the smallest thing that exists.",
              "Size and mass don't matter when identifying particles."
            ],
            correct: 1,
            hint: "If Dalton's model says atoms are the smallest unit of matter, what does it mean for something even smaller to exist?",
            explanation: "Correct. Something far lighter than the lightest atom cannot itself be an atom — it must be a piece of one."
          },
          {
            prompt: "The same beam appears no matter what material the electrodes are made of. What does that suggest?",
            options: [
              "These particles are unique to one type of metal.",
              "These particles come from inside all types of atoms — they are a basic part of matter itself.",
              "The beam is just a trick of the light.",
              "Atoms cannot produce beams at all."
            ],
            correct: 1,
            hint: "If changing the material doesn't change the beam, the source of the beam probably isn't tied to that one material.",
            explanation: "Right — since every material tested produces the same beam, these particles must exist inside atoms of every element, not just one special metal."
          },
          {
            prompt: "If atoms contain a smaller particle, what does this suggest about Dalton's solid sphere model?",
            options: [
              "The model is completely correct and needs no changes.",
              "The atom might not be a solid, indivisible ball after all — it may contain smaller parts.",
              "Atoms must not actually exist.",
              "Only some atoms contain particles; others are solid spheres."
            ],
            correct: 1,
            hint: "Dalton's model assumed atoms were the smallest possible piece of matter. Does that still hold up?",
            explanation: "Exactly. If something smaller than an atom exists inside it, the atom cannot be a single solid, indivisible sphere."
          }
        ]
      },

      prediction: {
        prompt: "Before you find out what really happened: if atoms contain a tiny particle much smaller than the whole atom, how do you think Dalton's solid sphere model should change? Write a short prediction in your own words.",
        teaser: "Hold that thought — in the next lab, you'll meet the scientist who investigates exactly this question."
      },

      explanation: {
        text: "The tiny particles in the beam were named electrons. Their discovery showed that atoms are not solid, indivisible balls — atoms are made of even smaller pieces. This didn't erase Dalton's important ideas about how atoms combine in fixed ratios, but it proved that atoms have internal structure. Scientists needed a new model that included electrons — and their next question would be what kind of charge these particles carry.",
        keyPoints: [
          "Atoms contain smaller particles called electrons.",
          "Electrons are found inside every kind of atom, no matter the element.",
          "Dalton's model correctly described how atoms combine, but incorrectly assumed atoms had no internal parts."
        ]
      },

      revision: {
        beforeLabel: "Dalton's Solid Sphere",
        afterLabel: "Atoms Contain Smaller Particles",
        beforeVisualKey: "dalton",
        afterVisualKey: "daltonParticles",
        changes: [
          "Added: tiny electrons, much smaller than the atom itself, somewhere inside it.",
          "Changed: the atom is no longer a single solid piece of matter — it has internal parts.",
          "Kept: the atom is still the basic unit that makes up elements."
        ]
      },

      summary: {
        newConcept: "The Electron",
        conceptDetail: "Relative mass: extremely small (about 1/1800th the mass of a hydrogen atom)  •  Location: inside the atom  •  Role: proof that atoms are divisible  •  Charge: still unknown — that's next",
        text: "You've learned that atoms are not solid, unbreakable balls — they contain even smaller particles. This single clue from a glowing glass tube changed how every scientist after Dalton thought about the atom.",
        transition: "Your next stop: the laboratory of J.J. Thomson, the scientist who will figure out what charge the electron carries — and build a new model around it."
      }
    },

    /* ============ CHAPTER 2: THOMSON ============ */
    {
      id: "thomson",
      scientist: "J.J. Thomson",
      year: "1897",
      place: "Cambridge, England",
      modelName: "The Plum Pudding Model",
      visualKey: "thomson",

      arrival: {
        fact: "Electricity is just beginning to light city streets and a few wealthy homes. The telephone exists but is rare, and the automobile has only just been invented — most people still travel by horse and rail.",
        belief: "Atoms contain tiny electrons, far smaller than the atom itself — but no one yet knows what charge these electrons carry, or how they're arranged inside the atom.",
        narrative: "You arrive at the Cavendish Laboratory in Cambridge, where J.J. Thomson is running electricity through a sealed glass tube. A glowing beam streaks from one end to the other, curving as he moves a magnet nearby. \"Ah, right on time,\" he says. \"Come see what this beam is made of.\""
      },

      currentModel: {
        intro: "At this point, scientists know atoms contain tiny electrons, but they don't yet know the electrons' charge, or how the rest of the atom is arranged around them.",
        strengths: [
          "Confirms that atoms are divisible and contain at least one smaller particle.",
          "Still explains how elements combine in fixed ratios to form compounds."
        ]
      },

      newClue: {
        text: "Thomson places electrically charged plates on either side of his tube. The beam of electrons bends toward the positively charged plate every time — and it bends the same way no matter what gas is inside the tube or what metal the electrodes are made of."
      },

      investigation: {
        intro: "Study Thomson's experiment before deciding what it means.",
        questions: [
          {
            prompt: "The beam of electrons bends toward the positively charged plate. What does this tell you about the electron's charge?",
            options: [
              "Electrons are positively charged.",
              "Electrons are negatively charged.",
              "Electrons have no charge at all.",
              "The electron's charge cannot be determined from this."
            ],
            correct: 1,
            hint: "Opposite charges attract. Which charge would be pulled toward a positive plate?",
            explanation: "Correct! Opposite charges attract, so a beam bending toward a positive plate must itself be negatively charged."
          },
          {
            prompt: "This same negative deflection happens no matter what material the electrodes are made of. What does that tell you about the electron's charge?",
            options: [
              "Negative charge is a fixed, universal property of every electron, not something special to one material.",
              "Only electrons from certain metals are negatively charged.",
              "The charge changes depending on the material tested.",
              "Charge has nothing to do with what material is used."
            ],
            correct: 0,
            hint: "If changing the material never changes the result, what does that say about how fundamental this property is?",
            explanation: "Right — since the result never changes across materials, negative charge must be a built-in, universal property of every electron."
          },
          {
            prompt: "Atoms overall have no electric charge (they are neutral), but electrons are negatively charged. What must also be true of the atom?",
            options: [
              "The atom must contain no charge of any kind besides the electron's.",
              "The atom must also contain enough positive charge to balance out the electrons' negative charge.",
              "The electron's charge must not actually be real.",
              "Atoms must lose their charge over time."
            ],
            correct: 1,
            hint: "For the overall atom to have zero charge, negative and positive charges must cancel out.",
            explanation: "Exactly — since atoms are neutral overall, there must be positive charge somewhere in the atom to balance the electrons' negative charge."
          }
        ]
      },

      prediction: {
        prompt: "Thomson now knows atoms contain small, negative electrons, and that atoms must also contain positive charge to stay neutral overall. How do you think he arranged these two things in his new model? Write your prediction.",
        teaser: "Thomson pictured it in a way that reminded people of a popular dessert. Keep reading to see if you were close."
      },

      explanation: {
        text: "Thomson proposed that the atom is a sphere of positive charge, spread evenly throughout, with negatively charged electrons scattered inside it — like raisins or plums scattered through a pudding. This became known as the plum pudding model. It kept Dalton's idea of the atom as a single unified sphere, but revised it to include the electron and the positive charge needed to balance it.",
        keyPoints: [
          "The atom is a sphere of positive charge.",
          "Negatively charged electrons are embedded throughout that sphere.",
          "The positive and negative charges balance so the atom is neutral overall."
        ]
      },

      revision: {
        beforeLabel: "Electrons Found, Charge Unknown",
        afterLabel: "Thomson's Plum Pudding",
        beforeVisualKey: "daltonParticles",
        afterVisualKey: "thomson",
        changes: [
          "Determined: the electrons are negatively charged.",
          "Added: a positively charged \"soup\" filling the rest of the sphere, balancing the electrons' charge.",
          "Kept: the atom is still pictured as a single sphere, with no dense center."
        ]
      },

      summary: {
        newConcept: "Positive Charge in the Atom",
        conceptDetail: "Thomson showed atoms must contain positive charge to balance their electrons — though he didn't yet know exactly how that positive charge was arranged. That question comes next.",
        text: "You've now confirmed that atoms are not solid — they hold tiny electrons embedded in a positively charged sphere. But is that positive charge really spread out evenly? One scientist is about to test this directly.",
        transition: "Your next stop: Ernest Rutherford's laboratory, where a surprising experiment will reveal what's really at the center of the atom."
      }
    },

    /* ============ CHAPTER 3: RUTHERFORD ============ */
    {
      id: "rutherford",
      scientist: "Ernest Rutherford",
      year: "1911",
      place: "Manchester, England",
      modelName: "The Nuclear Model",
      visualKey: "rutherford",

      arrival: {
        fact: "Wireless radio messages can now cross the Atlantic Ocean, and the first flimsy airplanes have just begun to fly. Most family homes still have no electricity or telephone.",
        belief: "Atoms are spheres of positive charge with negatively charged electrons scattered evenly throughout, like plums in a pudding.",
        narrative: "In Rutherford's lab, two of his students, Geiger and Marsden, are firing a beam of tiny positively charged particles (called alpha particles) at an extremely thin sheet of gold foil, only a few atoms thick. A ring of detector screens surrounds the foil, ready to flash wherever a particle lands. \"Watch closely,\" Rutherford says. \"This should be routine — but keep your eyes on that screen anyway.\""
      },

      currentModel: {
        intro: "According to Thomson's plum pudding model, positive charge is spread evenly and thinly across the whole atom.",
        strengths: [
          "Explains that atoms contain both positive and negative charge.",
          "Explains why atoms are electrically neutral overall.",
          "Predicts that fast, heavy alpha particles fired at gold foil should pass straight through with barely any deflection, since the positive charge is so spread out and weak in any one spot."
        ]
      },

      newClue: {
        text: "Most of the alpha particles do pass straight through the gold foil, just as expected. But a small number are deflected at sharp angles — and a tiny few bounce almost straight back toward the source, as if they had struck something solid. Rutherford later said it was \"as if you fired a fifteen-inch shell at a piece of tissue paper and it came back and hit you.\""
      },

      investigation: {
        intro: "This surprising result is one of the most famous in the history of science. Work through what it means.",
        questions: [
          {
            prompt: "Most alpha particles pass straight through the foil undisturbed. What does this suggest about most of the space inside an atom?",
            options: [
              "Most of the atom is tightly packed, solid matter.",
              "Most of the atom is empty space.",
              "Gold atoms have no positive charge at all.",
              "Alpha particles cannot interact with atoms."
            ],
            correct: 1,
            hint: "If particles pass through with nothing in their way, what does that say about the atom's interior?",
            explanation: "Correct — since most particles pass straight through, most of the atom's volume must be empty space."
          },
          {
            prompt: "A few particles bounce almost straight back. For a small, fast-moving particle to reverse direction, what must it have hit?",
            options: [
              "Something spread out thin and light, like the plum pudding model predicts.",
              "Something extremely small, dense, and heavily charged, concentrated in one tiny spot.",
              "Nothing — the particles just changed direction on their own.",
              "Another alpha particle bouncing off the detector."
            ],
            correct: 1,
            hint: "A thin, spread-out charge (like plum pudding predicts) couldn't send a fast particle backward. What kind of object could?",
            explanation: "Right — only a small, extremely dense, concentrated charge could repel a fast alpha particle strongly enough to send it backward."
          },
          {
            prompt: "Since alpha particles are positively charged and some bounce straight back, what must be the charge of this small, dense region?",
            options: [
              "Negative, since opposite charges repel.",
              "Positive, since like charges repel.",
              "Neutral, since neutral objects always repel.",
              "The charge cannot be determined."
            ],
            correct: 1,
            hint: "Like charges repel each other; opposite charges attract. Which case would push the alpha particle backward?",
            explanation: "Exactly — like charges repel, so this dense region must be positively charged, just like the alpha particles being fired at it."
          },
          {
            prompt: "Given all this evidence, how must the plum pudding model change?",
            options: [
              "The positive charge is not spread out evenly — it must be concentrated in a small, dense center.",
              "The atom must have no positive charge anywhere.",
              "Electrons must be located at the center of the atom.",
              "The plum pudding model needs no changes at all."
            ],
            correct: 0,
            hint: "Think about where the positive charge needs to be for a small number of particles to bounce straight back.",
            explanation: "Correct — the positive charge must be concentrated in a tiny, dense center, not spread evenly through the atom."
          }
        ]
      },

      prediction: {
        prompt: "If nearly all of an atom's positive charge and mass are packed into one tiny, dense spot, and the rest of the atom is mostly empty space, what do you think Rutherford's new model looks like? Where do you think the electrons are? Write your prediction.",
        teaser: "Rutherford's answer would give the atom a structure that still shapes how we draw atoms today."
      },

      explanation: {
        text: "Rutherford concluded that the atom has a tiny, dense, positively charged center — which he called the nucleus. Almost all of the atom's mass is packed into this nucleus, even though the nucleus takes up only a tiny fraction of the atom's total volume. The negatively charged electrons move around the nucleus, out in the mostly empty space surrounding it. This explained why most alpha particles passed straight through (empty space) while a few struck the tiny, dense, positively charged nucleus and bounced back.",
        keyPoints: [
          "Atoms have a small, dense, positively charged nucleus at the center.",
          "Almost all of the atom's mass is concentrated in the nucleus.",
          "Electrons occupy the mostly empty space surrounding the nucleus.",
          "The positive particles in the nucleus are called protons."
        ]
      },

      revision: {
        beforeLabel: "Thomson's Plum Pudding",
        afterLabel: "Rutherford's Nuclear Model",
        beforeVisualKey: "thomson",
        afterVisualKey: "rutherford",
        changes: [
          "Added: a tiny, dense, positively charged nucleus at the center of the atom.",
          "Changed: positive charge is no longer spread evenly — it's concentrated in the nucleus.",
          "Changed: most of the atom is now understood to be empty space.",
          "Kept: negatively charged electrons are still part of the atom, though now they surround the nucleus instead of being embedded in a positive \"soup.\""
        ]
      },

      summary: {
        newConcept: "The Proton and the Nucleus",
        conceptDetail: "Charge: positive  •  Relative mass: about 1,800 times the mass of an electron (roughly equal to a neutron)  •  Location: in the nucleus, at the atom's center  •  Role: gives the nucleus its positive charge",
        text: "You've discovered that the atom has a dense, positively charged core, with electrons occupying the space around it. But one puzzle remains: classical physics predicts that orbiting electrons should quickly lose energy and spiral into the nucleus, collapsing the atom. Since atoms clearly don't collapse, something about this picture is still incomplete.",
        transition: "Your next stop: Niels Bohr's institute, where a new clue about light itself will explain how electrons really move."
      }
    },

    /* ============ CHAPTER 4: BOHR ============ */
    {
      id: "bohr",
      scientist: "Niels Bohr",
      year: "1913",
      place: "Copenhagen, Denmark",
      modelName: "The Planetary (Shell) Model",
      visualKey: "bohr",

      arrival: {
        fact: "Electric lighting and telephones are now common in major cities, though radio broadcasting for the public doesn't exist yet. Within a year, World War I will begin, and physics is entering one of its most exciting periods.",
        belief: "Atoms have a tiny, dense, positively charged nucleus at the center, with electrons occupying the mostly empty space around it.",
        narrative: "You find Niels Bohr in his study, surrounded by photographs of light passed through a prism. Each photograph shows a pattern of thin, bright lines rather than a smooth rainbow. \"Every element makes its own unique pattern,\" Bohr explains, sliding one across the table to you. \"But no one can yet explain why.\""
      },

      currentModel: {
        intro: "Rutherford's model pictures electrons moving freely through the space around the nucleus, the way planets orbit the sun.",
        strengths: [
          "Correctly places almost all of the atom's mass and positive charge in a tiny central nucleus.",
          "Correctly explains that atoms are mostly empty space.",
          "Gives electrons room to move around the nucleus."
        ]
      },

      newClue: {
        text: "When elements are heated until they glow and their light is passed through a prism, they don't produce a smooth rainbow of every color. Instead, each element produces its own distinct pattern of a few sharp, bright lines of color, with darkness in between. Hydrogen, for example, always produces the exact same four lines, every single time."
      },

      investigation: {
        intro: "This pattern of light — called a line spectrum — puzzled scientists for years. Work through what it reveals.",
        questions: [
          {
            prompt: "If electrons could orbit the nucleus at any distance, freely gaining or losing any amount of energy, what kind of light spectrum would you expect atoms to produce?",
            options: [
              "A smooth rainbow made of every possible color, with no gaps.",
              "A few sharp lines of specific colors, with gaps in between.",
              "No light at all.",
              "The exact same spectrum for every different element."
            ],
            correct: 0,
            hint: "If any energy is allowed, energy could be released in any amount, producing any color.",
            explanation: "Right — free, unrestricted orbits should allow any amount of energy to be released, producing a smooth rainbow, not sharp separate lines."
          },
          {
            prompt: "But real atoms only ever produce a few specific lines of color, never a smooth rainbow. What does this suggest about the electron's energy?",
            options: [
              "Electron energy can be absolutely anything.",
              "Electrons can only have certain fixed amounts of energy, not just any amount.",
              "Electrons don't have any energy at all.",
              "Light has nothing to do with electrons."
            ],
            correct: 1,
            hint: "If only specific colors (specific energies) of light ever appear, what does that imply about which energies are even possible?",
            explanation: "Exactly — since only specific colors of light appear, electrons must be limited to only certain fixed energy amounts, not a free range."
          },
          {
            prompt: "Each color line corresponds to a specific amount of energy released as light. What must happen inside the atom to release that energy?",
            options: [
              "An electron moves from a higher energy level to a lower one, releasing the energy difference as light.",
              "A proton is destroyed.",
              "The whole atom disappears.",
              "The nucleus changes its charge."
            ],
            correct: 0,
            hint: "Where would the released energy come from if not from an electron changing its position or state?",
            explanation: "Correct — an electron dropping from a higher energy level to a lower one releases exactly the right amount of energy to produce one line of color."
          }
        ]
      },

      prediction: {
        prompt: "If electrons can only exist at certain fixed energy amounts rather than anywhere around the nucleus, how do you think Bohr redrew the paths electrons take? Write your prediction.",
        teaser: "Bohr's answer is the model most people picture first when they think of an atom."
      },

      explanation: {
        text: "Bohr proposed that electrons travel in fixed, specific orbits — often pictured as rings or shells — at set distances from the nucleus, each corresponding to a specific amount of energy. Electrons can jump between these fixed energy levels by absorbing or releasing energy, but they cannot exist in between them. When an electron drops from a higher energy level to a lower one, it releases the energy difference as a specific color of light — exactly matching the sharp lines scientists observed.",
        keyPoints: [
          "Electrons occupy fixed, specific energy levels (often drawn as shells or rings) around the nucleus.",
          "Electrons cannot exist between energy levels.",
          "Moving between energy levels absorbs or releases a specific amount of energy, seen as a specific color of light.",
          "This explained why each element produces its own unique line spectrum."
        ]
      },

      revision: {
        beforeLabel: "Rutherford's Nuclear Model",
        afterLabel: "Bohr's Shell Model",
        beforeVisualKey: "rutherford",
        afterVisualKey: "bohr",
        changes: [
          "Changed: electrons no longer move freely through open space — they occupy fixed, specific energy levels.",
          "Added: the idea that electrons jump between levels by absorbing or releasing set amounts of energy.",
          "Kept: a small, dense, positively charged nucleus remains at the center of the atom."
        ]
      },

      summary: {
        newConcept: "Energy Levels (Electron Shells)",
        conceptDetail: "Bohr showed that electrons occupy fixed energy levels around the nucleus rather than moving freely. Around this same time (1932), another scientist, James Chadwick, discovered a neutral particle in the nucleus alongside the protons — the neutron. Neutrons have no charge, roughly the same mass as protons, and help explain why atoms of the same element can have slightly different masses.",
        text: "You've learned that electrons don't wander freely — they occupy specific, fixed energy levels, jumping between them and releasing light of exact colors. This solved the mystery of line spectra. But scientists soon found that even Bohr's fixed orbits were not the full picture.",
        transition: "Your final stop: the world of quantum mechanics, where the modern model of the atom takes shape."
      }
    },

    /* ============ CHAPTER 5: MODERN ELECTRON CLOUD MODEL ============ */
    {
      id: "electroncloud",
      scientist: "Erwin Schrödinger and the Quantum Physicists",
      year: "1926",
      place: "Zurich, Switzerland",
      modelName: "The Electron Cloud (Quantum Mechanical) Model",
      visualKey: "cloud",

      arrival: {
        fact: "Radio broadcasting has become popular in homes, and \"talking\" movies are just about to arrive in theaters. Air travel exists but is still slow, loud, and uncommon.",
        belief: "Electrons travel in fixed, specific orbits or shells around the nucleus, like tiny planets circling the sun along set paths.",
        narrative: "You arrive in a quiet office filled with chalkboards covered in equations. Erwin Schrödinger and his colleagues are debating a strange new question: not just what energy an electron has, but whether it's even possible to know exactly where an electron is and exactly how it's moving, at the same time."
      },

      currentModel: {
        intro: "Bohr's model pictures electrons moving in fixed, well-defined orbits at specific distances from the nucleus, similar to planets on rails.",
        strengths: [
          "Correctly explains that electrons occupy fixed energy levels.",
          "Successfully explained the line spectrum of hydrogen.",
          "Gave scientists a clear, simple picture of the atom's structure."
        ]
      },

      newClue: {
        text: "As physicists study electrons more closely using quantum mechanics, they find something strange: it is impossible to measure both an electron's exact location and its exact motion at the same time. The more precisely you pin down where an electron is, the less certain you can be about how it's moving — and the reverse is also true. Electrons behave less like tiny planets on fixed paths and more like spread-out waves of probability."
      },

      investigation: {
        intro: "This is one of the strangest ideas in all of science. Work through what it means for the atom.",
        questions: [
          {
            prompt: "If it's impossible to know an electron's exact location and motion at the same time, can scientists draw one single fixed path for an electron, the way Bohr did?",
            options: [
              "Yes, a single exact path can always be drawn.",
              "No — since the electron's exact position can't be pinned down, a single fixed path can't be drawn either.",
              "Yes, but only for hydrogen atoms.",
              "The question doesn't relate to the electron's path."
            ],
            correct: 1,
            hint: "If you can never know exactly where something is, can you draw the one exact line it travels along?",
            explanation: "Correct — since an electron's exact position is never fully certain, scientists can't draw one single fixed path for it."
          },
          {
            prompt: "If scientists can't know an electron's exact position, what can they still calculate?",
            options: [
              "Nothing at all about the electron.",
              "The probability of finding the electron in a particular region of space.",
              "The electron's exact color.",
              "The electron's exact birthday."
            ],
            correct: 1,
            hint: "Even without an exact location, scientists can still describe where an electron is more or less likely to be found.",
            explanation: "Right — scientists can calculate the probability of finding an electron in a given region, even without knowing its exact position."
          },
          {
            prompt: "Given this, how should the model of the atom's electrons be redrawn?",
            options: [
              "As electrons on fixed, thin, circular paths, exactly like Bohr proposed.",
              "As a fuzzy \"cloud\" showing the regions where an electron is more or less likely to be found.",
              "Electrons should be removed from the model entirely.",
              "As electrons frozen in one exact, permanent spot."
            ],
            correct: 1,
            hint: "Think about how you'd draw something whose exact position you can never fully pin down, but whose likely regions you can calculate.",
            explanation: "Exactly — electrons are now shown as a probability \"cloud,\" denser where the electron is more likely to be found and fainter where it's less likely."
          }
        ]
      },

      prediction: {
        prompt: "If electrons can't be pinned to one exact path, but their likely locations can still be calculated, how do you picture the modern model of the atom? Write your prediction.",
        teaser: "This model looks quite different from the neat rings of Bohr's atom — but it fits the evidence better than any model before it."
      },

      explanation: {
        text: "The modern model describes electrons not as particles on fixed orbits, but as existing within \"electron clouds\" or orbitals — three-dimensional regions of probability around the nucleus. The cloud is denser in areas where the electron is more likely to be found, and fainter where it's less likely. This model keeps Bohr's idea that electrons are limited to specific energy levels, but abandons the idea of one exact, fixed path.",
        keyPoints: [
          "Electrons exist in probability \"clouds\" or orbitals rather than fixed circular paths.",
          "The cloud shows where an electron is more or less likely to be found, not its exact position.",
          "Electrons are still restricted to specific energy levels, building on Bohr's work.",
          "This is the model best supported by current evidence."
        ]
      },

      revision: {
        beforeLabel: "Bohr's Shell Model",
        afterLabel: "Modern Electron Cloud Model",
        beforeVisualKey: "bohr",
        afterVisualKey: "cloud",
        changes: [
          "Changed: electrons are no longer shown on fixed, thin orbital lines.",
          "Added: fuzzy probability \"clouds\" showing where electrons are likely to be found.",
          "Kept: a small, dense, positively charged nucleus at the center, and the idea of distinct energy levels."
        ]
      },

      summary: {
        newConcept: "The Neutron (completing the atomic picture)",
        conceptDetail: "Charge: neutral (no charge)  •  Relative mass: about 1,800 times the mass of an electron (roughly equal to a proton)  •  Location: in the nucleus, alongside protons  •  Role: adds mass and helps hold the nucleus together, without adding charge",
        text: "You've now traveled from Dalton's solid sphere all the way to the modern electron cloud model. Along the way, evidence — not guesswork — revealed three subatomic particles: negatively charged electrons surrounding the nucleus, positively charged protons packed into the nucleus, and neutral neutrons alongside them.",
        transition: "Your journey is complete. Continue to your final review."
      }
    }
  ],

  /* ---------- Final review screen ---------- */
  outro: {
    title: "Journey Complete",
    body: [
      "Congratulations, chemistry student! You've traced the atomic model from Dalton's solid sphere, through Thomson's plum pudding and Rutherford's nucleus, to Bohr's energy levels and the modern electron cloud model.",
      "At every step, the model changed because of new evidence — not because scientists guessed randomly. This is how science works: models are built, tested against evidence, and revised when the evidence demands it."
    ],
    table: {
      headers: ["Particle", "Charge", "Relative Mass", "Location", "Role"],
      rows: [
        ["Proton", "Positive (+1)", "~1,800× an electron", "Nucleus", "Gives the nucleus its positive charge"],
        ["Neutron", "Neutral (0)", "~1,800× an electron (about equal to a proton)", "Nucleus", "Adds mass; helps hold the nucleus together"],
        ["Electron", "Negative (−1)", "Very small (~1/1800th of a proton)", "Surrounding the nucleus, in a probability cloud", "Carries negative charge; determines chemical behavior"]
      ]
    },
    restartLabel: "Restart the Journey"
  }
};
