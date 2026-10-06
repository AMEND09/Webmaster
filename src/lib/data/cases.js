// "AI Detective" case files. Plain strings are normal text; objects are clickable claims.

export const cases = [
  {
    id: '07',
    title: 'The Confident Chatbot',
    zone: 'toolbox',
    prompt: 'Write a paragraph about who invented the telephone.',
    response: [
      {
        text: 'Alexander Graham Bell patented the telephone in 1876.',
        ok: true,
        source: 'US Patent 174,465 was granted to Bell on March 7, 1876.'
      },
      ' ',
      {
        text: 'Born in Boston,',
        ok: false,
        note: 'edinburgh, actually',
        clue: 'Bell was born in Edinburgh, Scotland, in 1847.',
        source: 'Alexander Graham Bell was born on March 3, 1847, in Edinburgh, Scotland. He later moved to Canada and then to Boston, where he taught.'
      },
      ' ',
      {
        text: 'Bell had long studied speech and hearing.',
        ok: true,
        source: 'Bell worked as a teacher of deaf students in Boston, and his mother and wife were both deaf. His father was a well-known expert in speech.'
      },
      ' He made the first call to his assistant, ',
      {
        text: 'Thomas Edison,',
        ok: false,
        note: 'it was Watson!',
        clue: "Bell's assistant was Thomas Watson. Thomas Edison was a different inventor who was never Bell's assistant.",
        source: 'On March 10, 1876, Bell called to his assistant, Thomas A. Watson, in the first successful telephone transmission.'
      },
      ' ',
      {
        text: 'saying “Mr. Watson, come here.”',
        ok: true,
        source: 'Bell\'s lab notebook records his words as “Mr. Watson, come here, I want to see you.”'
      },
      ' He was later ',
      {
        text: 'awarded the 1915 Nobel Prize in Physics for the invention.',
        ok: false,
        note: 'no Nobel. ever.',
        clue: 'Bell never won a Nobel Prize. The 1915 Nobel Prize in Physics went to William Henry Bragg and William Lawrence Bragg for X-ray crystallography.',
        source: 'The Nobel Prize in Physics 1915 was awarded jointly to Sir William Henry Bragg and William Lawrence Bragg "for their services in the analysis of crystal structure by means of X-rays."'
      }
    ],
    fixOptions: [
      {
        text: 'Write a better paragraph about the telephone.',
        best: false,
        why: 'Too vague. It does not ask for accuracy or sources, so the same errors could come right back.'
      },
      {
        text: 'Write a paragraph about who invented the telephone. Include only facts you are confident about, name a source for each date or name, and say "I\'m not sure" if you don\'t know something.',
        best: true,
        why: 'It asks for sources and gives permission to say "I\'m not sure," which nudges the model away from inventing details. You still need to check, but now you have something to check against.'
      },
      {
        text: 'Write a really exciting paragraph about Thomas Edison inventing the telephone.',
        best: false,
        why: 'This bakes a false assumption into the prompt. Asking for "exciting" also invites drama over accuracy.'
      }
    ],
    xp: 60
  },

  {
    id: '08',
    title: 'The Study That Wasn\'t',
    zone: 'toolbox',
    prompt: 'Summarize what science says about how much sleep teenagers need, with sources.',
    response: [
      {
        text: 'The American Academy of Sleep Medicine recommends that teens aged 13 to 18 get 8 to 10 hours of sleep per night.',
        ok: true,
        source: 'In 2016, the American Academy of Sleep Medicine published consensus recommendations: teenagers 13 to 18 years old should sleep 8 to 10 hours per 24 hours on a regular basis. The American Academy of Pediatrics endorsed them.'
      },
      ' ',
      {
        text: 'Part of the reason teens stay up late is biology: during puberty, the body\'s release of the sleep hormone melatonin shifts later at night.',
        ok: true,
        source: 'Sleep researchers have found that during adolescence, the circadian rhythm shifts, and melatonin is released later in the evening than in children or adults, making it harder for teens to fall asleep early.'
      },
      ' However, ',
      {
        text: 'a 2021 Stanford study by Dr. Lena Marsh, published in the Journal of Adolescent Rest, found that most teens actually function best on just 6 hours.',
        ok: false,
        note: 'study doesn\'t exist',
        clue: 'This study and journal could not be found in any research database. It looks like a made-up citation, and its conclusion contradicts the expert recommendations.',
        source: 'Search results: no article by this author, with this title or finding, appears in Google Scholar or PubMed, and no journal named "Journal of Adolescent Rest" could be found.'
      },
      ' ',
      {
        text: 'Luckily, the CDC reports that about 9 in 10 high school students get enough sleep on school nights.',
        ok: false,
        note: 'nope, most don\'t',
        clue: 'CDC survey data shows it is the opposite: roughly 7 in 10 high school students do not get enough sleep on school nights.',
        source: 'According to the CDC\'s Youth Risk Behavior Survey, about 7 in 10 U.S. high school students reported getting less than 8 hours of sleep on an average school night.'
      },
      ' ',
      {
        text: 'Because of this, the American Academy of Pediatrics recommends that middle and high schools start no earlier than 7:00 a.m.',
        ok: false,
        note: 'it\'s 8:30 a.m.',
        clue: 'The AAP recommends middle and high schools start at 8:30 a.m. or later, not 7:00 a.m.',
        source: 'In a 2014 policy statement, the American Academy of Pediatrics recommended that middle and high schools aim for a start time of 8:30 a.m. or later to let students get enough sleep.'
      }
    ],
    fixOptions: [
      {
        text: 'Summarize teen sleep research. Only cite sources you can link to, such as the CDC, AASM, or AAP websites. If you aren\'t sure a study exists, say so instead of naming one.',
        best: true,
        why: 'It points the AI toward real, checkable organizations and explicitly allows it to admit uncertainty, which cuts down on invented studies. You can then click each link to confirm.'
      },
      {
        text: 'Give me 10 studies proving teens need less sleep.',
        best: false,
        why: 'This demands a conclusion and a big number of studies, which pressures the model to invent citations to fit.'
      },
      {
        text: 'Summarize teen sleep research, but make it sound more scientific.',
        best: false,
        why: 'Sounding scientific is not the same as being accurate. This could produce even more official-looking fake citations.'
      }
    ],
    xp: 70
  },

  {
    id: '09',
    title: 'The Homework Helper',
    zone: 'toolbox',
    prompt: 'Explain the Pythagorean theorem for my geometry homework, with an example.',
    response: [
      {
        text: 'The Pythagorean theorem says that in a right triangle, a² + b² = c², where a and b are the two legs and c is the hypotenuse.',
        ok: true,
        source: 'Geometry textbook: In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides (a² + b² = c²).'
      },
      ' ',
      {
        text: 'The hypotenuse is always the shortest side of the triangle.',
        ok: false,
        note: 'longest side!',
        clue: 'The hypotenuse is the longest side of a right triangle. It sits opposite the right angle.',
        source: 'Geometry textbook: The hypotenuse is the side opposite the right angle and is always the longest side of a right triangle.'
      },
      ' ',
      {
        text: 'For example, a right triangle with legs of 3 and 4 has a hypotenuse of 7.',
        ok: false,
        note: '3² + 4² = 25, so 5',
        clue: '3² + 4² = 9 + 16 = 25, and the square root of 25 is 5. The hypotenuse is 5, not 7.',
        source: 'Worked example: 3² + 4² = 9 + 16 = 25. c = √25 = 5. The 3-4-5 triangle is the most famous Pythagorean triple.'
      },
      ' ',
      {
        text: 'The formula works for any triangle, not just right triangles.',
        ok: false,
        note: 'right triangles only',
        clue: 'a² + b² = c² only holds for right triangles. For other triangles, you need a more general rule, such as the law of cosines.',
        source: 'Geometry textbook: The Pythagorean theorem applies only to right triangles. In fact, if a² + b² = c² for a triangle\'s sides, that triangle must be a right triangle.'
      },
      ' ',
      {
        text: 'The theorem is named after Pythagoras, an ancient Greek mathematician and philosopher.',
        ok: true,
        source: 'Pythagoras of Samos was an ancient Greek philosopher who lived in the 500s BCE. The theorem is traditionally named after him.'
      },
      ' ',
      {
        text: 'But Babylonian clay tablets show that people understood these number relationships more than a thousand years before him.',
        ok: true,
        source: 'The Babylonian tablet Plimpton 322, dated to around 1800 BCE, lists sets of numbers that fit the Pythagorean relationship, over a thousand years before Pythagoras.'
      }
    ],
    fixOptions: [
      {
        text: 'Just give me the answers to my geometry homework.',
        best: false,
        why: 'This skips the learning entirely, may break your class rules, and gives you no way to tell if the answers are wrong.'
      },
      {
        text: 'Explain the Pythagorean theorem.',
        best: false,
        why: 'Shorter is not better here. Nothing in this prompt helps you or the AI catch mistakes.'
      },
      {
        text: 'Explain the Pythagorean theorem for a 9th grader. Show every step of the example\'s arithmetic, then double-check the math, and tell me when the formula does and doesn\'t apply.',
        best: true,
        why: 'Asking for every step makes errors visible, so you can catch something like 3-4-7 yourself. Asking when the formula applies targets exactly the kind of mistake that slipped in.'
      }
    ],
    xp: 60
  }
];
