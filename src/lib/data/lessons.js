// Lesson content for learnai. Plain text only (no HTML/markdown) in body fields.

export const lessons = [
  // ───────────────────────────── FOUNDATIONS ─────────────────────────────
  {
    id: 'neural-networks',
    zone: 'foundations',
    title: 'Neural networks',
    headline: ['Neural networks: ', 'tiny math dials', ', stacked really high'],
    blurb: "What's actually inside an AI model: layers of simple units passing numbers to each other.",
    minutes: 7,
    steps: [
      {
        title: 'Neurons are just math',
        body: [
          "A neural network is loosely inspired by the brain, but don't picture tiny brain cells. Each artificial \"neuron\" is a small math step. It takes in some numbers, multiplies each one by a weight, adds them up, adds a bias, and passes the result along.",
          "Weights are like volume knobs. A big weight means that input matters a lot. A weight near zero means the neuron mostly ignores it. A negative weight pushes the output the other way.",
          "After adding things up, the neuron runs the total through an activation function. That's a simple rule, like \"if it's below zero, output zero.\" This little twist is what lets networks learn curvy, complicated patterns instead of only straight lines."
        ],
        keyPoints: [
          'A neuron = weighted sum + bias + activation',
          'Weights decide how much each input matters',
          'Activation functions let networks learn non-straight patterns'
        ],
        note: "it's multiplication all the way down"
      },
      {
        title: 'Layers on layers',
        body: [
          'Neurons are arranged in layers. The input layer takes in raw data, like pixel values. Hidden layers in the middle transform it step by step. The output layer gives the answer, like "cat: 92%."',
          "Use the playground below. Change the inputs and nudge the weights, and watch how the signal flows through each layer to the output. Notice how one small change early on can ripple through everything after it.",
          '"Deep learning" just means a network with many hidden layers. Big modern models have billions of weights. Nobody sets them by hand. They get tuned automatically during training, which is the next big idea.'
        ],
        keyPoints: [
          'Input layer → hidden layers → output layer',
          '"Deep" means lots of hidden layers',
          'Big models have billions of weights, set by training'
        ],
        note: 'try cranking one weight way up',
        interactive: 'playground'
      }
    ],
    quiz: [
      {
        q: 'What does a single artificial neuron actually do?',
        options: [
          'Stores one fact about the world',
          'Computes a weighted sum, then applies an activation',
          'Sends electrical signals like a brain cell',
          'Searches the internet for an answer'
        ],
        answer: 1,
        explain: 'An artificial neuron multiplies inputs by weights, adds them up with a bias, and runs the result through an activation function.'
      },
      {
        q: 'In a neural network, what is a weight?',
        options: [
          'How heavy the computer is',
          'The number of layers',
          'A number controlling how much an input matters',
          'The final answer the model gives'
        ],
        answer: 2,
        explain: 'Weights scale each input. Bigger weights mean that input has more influence on the neuron.'
      },
      {
        q: 'What does "deep" mean in deep learning?',
        options: [
          'The network has many hidden layers',
          'The model thinks very seriously',
          'The data comes from the deep web',
          'The model runs underground'
        ],
        answer: 0,
        explain: '"Deep" refers to having many hidden layers stacked between input and output.'
      },
      {
        q: 'Why do networks need activation functions?',
        options: [
          'To turn the computer on',
          'To make the network run faster',
          'To delete bad training data',
          'So they can learn curvy, non-linear patterns'
        ],
        answer: 3,
        explain: 'Without activation functions, stacked layers collapse into one straight-line function. Activations add the bends that make complex patterns possible.'
      },
      {
        q: 'Who sets the billions of weights in a large model?',
        options: [
          'Engineers type each one in',
          'They are random forever',
          'The training process tunes them automatically',
          'Users set them while chatting'
        ],
        answer: 2,
        explain: 'Training adjusts weights automatically based on data. No person picks them one by one.'
      }
    ]
  },

  {
    id: 'linear-algebra',
    zone: 'foundations',
    title: 'Linear algebra',
    headline: ['Linear algebra: the ', 'secret language', ' AI speaks'],
    blurb: 'Vectors and matrices are how AI turns words, images, and sounds into numbers it can crunch.',
    minutes: 7,
    steps: [
      {
        title: 'Everything becomes a vector',
        body: [
          'Computers only work with numbers. So before AI can handle a photo, a song, or a sentence, it has to turn it into a list of numbers. That list is called a vector.',
          'A photo becomes a vector of pixel brightness values. A word becomes a vector called an embedding, often hundreds of numbers long. Words with similar meanings, like "happy" and "glad," end up with vectors that point in similar directions.',
          'That is a big deal. It means "meaning" becomes geometry. The model can measure how close two ideas are by measuring how close their vectors are.'
        ],
        keyPoints: [
          'A vector is an ordered list of numbers',
          'Embeddings turn words into vectors',
          'Similar meanings = vectors pointing in similar directions'
        ],
        note: 'meaning, but make it coordinates'
      },
      {
        title: 'Matrices do the heavy lifting',
        body: [
          'A matrix is a grid of numbers. In a neural network, all the weights for one layer can be stored in a single matrix. Running a layer is basically multiplying the input vector by that weight matrix.',
          'The core move is the dot product: multiply matching numbers in two vectors and add them up. A matrix multiplication is just a whole bunch of dot products done at once.',
          'This is why AI runs on GPUs. Graphics chips were built to do tons of multiplications in parallel for video games. Turns out that is exactly what neural networks need too.'
        ],
        keyPoints: [
          'A matrix is a grid of numbers, like a layer of weights',
          'Dot product: multiply pairs, then add',
          'GPUs are great at doing many multiplications at once'
        ],
        note: 'gaming chips accidentally built AI'
      }
    ],
    quiz: [
      {
        q: 'What is a vector, in AI terms?',
        options: [
          'A type of computer virus',
          'An ordered list of numbers',
          'A picture of an arrow',
          'A single yes/no answer'
        ],
        answer: 1,
        explain: 'In AI, a vector is just an ordered list of numbers that represents something, like a word or image.'
      },
      {
        q: 'What is the dot product of [1, 2] and [3, 4]?',
        options: ['10', '7', '24', '11'],
        answer: 3,
        explain: 'Multiply matching pairs and add: (1×3) + (2×4) = 3 + 8 = 11.'
      },
      {
        q: 'If "dog" and "puppy" have embeddings pointing in similar directions, what does that suggest?',
        options: [
          'The model sees them as related in meaning',
          'They are spelled similarly',
          'The model made a mistake',
          'They are the same length'
        ],
        answer: 0,
        explain: 'Embeddings place related meanings near each other, so similar directions suggest similar meaning.'
      },
      {
        q: 'Why are GPUs so useful for AI?',
        options: [
          'They have the most storage space',
          'They connect to the internet faster',
          'They do huge numbers of multiplications in parallel',
          'They were designed specifically for chatbots'
        ],
        answer: 2,
        explain: 'GPUs were built for parallel math in graphics, which matches the matrix math neural networks rely on.'
      },
      {
        q: 'In a neural network layer, what is usually stored in a matrix?',
        options: [
          'The user\'s password',
          'The final answer text',
          'A list of websites',
          'The layer\'s weights'
        ],
        answer: 3,
        explain: 'A layer\'s weights are naturally arranged as a matrix, and running the layer means multiplying by it.'
      }
    ]
  },

  {
    id: 'how-ai-learns',
    zone: 'foundations',
    title: 'How AI learns',
    headline: ['How AI learns: ', 'guess, check, nudge', ', repeat a billion times'],
    blurb: 'Training is a loop: make a guess, measure how wrong it was, and adjust the weights a tiny bit.',
    minutes: 8,
    steps: [
      {
        title: 'Measuring wrongness',
        body: [
          'A brand-new network starts with random weights, so its first guesses are basically nonsense. To improve, it needs a way to measure how wrong it is. That measurement is called the loss.',
          'Say the model sees a photo of a cat and says "dog: 80%." The loss is high. If it says "cat: 95%," the loss is low. Training has one goal: make the loss as small as possible across lots of examples.',
          'This kind of learning, where every example comes with a correct answer, is called supervised learning. The labeled answers are what the model checks itself against.'
        ],
        keyPoints: [
          'Models start with random weights',
          'Loss = a number for how wrong the model is',
          'Training tries to shrink the loss'
        ],
        note: 'wrong, but measurably wrong'
      },
      {
        title: 'Rolling downhill',
        body: [
          'Picture the loss as a hilly landscape, and the model is standing somewhere on it. Gradient descent is the strategy of feeling which way is downhill and taking a small step that way.',
          'The gradient tells each weight which direction to move to reduce the loss. An algorithm called backpropagation calculates this efficiently, working backward from the output through every layer.',
          'The step size is called the learning rate. Too big and the model overshoots and bounces around. Too small and training takes forever. One full pass through the training data is called an epoch.'
        ],
        keyPoints: [
          'Gradient descent = take small steps downhill on the loss',
          'Backpropagation figures out how to adjust every weight',
          'Learning rate = how big each step is'
        ],
        note: 'baby steps, but billions of them'
      }
    ],
    quiz: [
      {
        q: 'What is "loss" in machine learning?',
        options: [
          'Data that got deleted',
          'A number measuring how wrong the model is',
          'Money spent on training',
          'When a model forgets everything'
        ],
        answer: 1,
        explain: 'Loss is a score for how far off the model\'s predictions are. Training tries to make it smaller.'
      },
      {
        q: 'What does gradient descent do?',
        options: [
          'Adjusts weights in small steps to reduce loss',
          'Deletes the worst training examples',
          'Makes the model bigger',
          'Downloads more data'
        ],
        answer: 0,
        explain: 'Gradient descent nudges weights in the direction that lowers the loss, one small step at a time.'
      },
      {
        q: 'A model\'s loss keeps jumping up and down wildly instead of settling. What\'s a likely fix?',
        options: [
          'Add more layers',
          'Use a bigger monitor',
          'Raise the learning rate',
          'Lower the learning rate'
        ],
        answer: 3,
        explain: 'A learning rate that is too large makes the model overshoot. Smaller steps help it settle down.'
      },
      {
        q: 'What is backpropagation used for?',
        options: [
          'Backing up the model to the cloud',
          'Reversing the model\'s answers',
          'Calculating how each weight should change',
          'Removing old layers'
        ],
        answer: 2,
        explain: 'Backpropagation works backward through the network to find how each weight affects the loss.'
      },
      {
        q: 'What is one epoch?',
        options: [
          'One full pass through the training data',
          'One single weight update',
          'One year of training',
          'One layer of the network'
        ],
        answer: 0,
        explain: 'An epoch is one complete trip through the whole training dataset.'
      }
    ]
  },

  {
    id: 'overfitting',
    zone: 'foundations',
    title: 'Overfitting',
    headline: ['Overfitting: when a model ', 'memorizes', ' instead of learns'],
    blurb: 'A model that nails its practice data but flops on anything new has learned the wrong lesson.',
    minutes: 6,
    steps: [
      {
        title: 'Memorizing vs. understanding',
        body: [
          'Imagine a student who memorizes the exact answers to last year\'s test. They ace the practice test. Then the real test has slightly different questions, and they bomb it. That is overfitting.',
          'An overfit model has learned its training data too well, including random noise and weird one-off quirks. It found patterns that are not really there. So when it sees new data, those fake patterns lead it astray.',
          'The opposite problem is underfitting. That is a model too simple to catch the real pattern at all. It does badly on training data and new data alike.'
        ],
        keyPoints: [
          'Overfitting = great on training data, bad on new data',
          'The model learned noise, not the real pattern',
          'Underfitting = too simple to learn the pattern at all'
        ],
        note: 'aces the homework, flunks the test'
      },
      {
        title: 'Find the sweet spot',
        body: [
          'Drag the slider below to make the curve more or less wiggly. A stiff, simple curve misses the trend, so both errors stay high. As you add wiggle, training error keeps dropping.',
          'But watch the test error. At first it drops too. Then, past a certain point, it starts climbing again, because the curve is bending to hit every noisy dot. That turning point is where overfitting begins.',
          'Real fixes include getting more training data, using a simpler model, stopping training early, or using techniques called regularization that punish overly complicated solutions.'
        ],
        keyPoints: [
          'More complexity always lowers training error',
          'Test error drops, then rises again when overfitting starts',
          'Fixes: more data, simpler models, early stopping, regularization'
        ],
        note: 'watch the test line, not the train line',
        interactive: 'overfit'
      }
    ],
    quiz: [
      {
        q: "A model scores 99% on its training data and 61% on new data. What's most likely going on?",
        options: [
          'It needs a faster computer',
          "It's overfitting the training data",
          'The test data is too easy',
          "It's underfitting"
        ],
        answer: 1,
        explain: 'A big gap between training and new-data performance is the classic sign of overfitting.'
      },
      {
        q: 'What does an overfit model mostly learn?',
        options: [
          'Only the most important patterns',
          'Nothing at all',
          'The real pattern plus random noise',
          'How to run faster'
        ],
        answer: 2,
        explain: 'Overfit models fit the noise and quirks of the training set, not just the true pattern.'
      },
      {
        q: 'As a model gets more complex, what usually happens to training error?',
        options: [
          'It keeps going down',
          'It keeps going up',
          'It stays exactly the same',
          'It becomes negative'
        ],
        answer: 0,
        explain: 'More complex models can fit training data more closely, so training error tends to keep falling.'
      },
      {
        q: 'Which of these is a common way to reduce overfitting?',
        options: [
          'Train on less data',
          'Make the model much bigger',
          'Only test on training data',
          'Get more training data'
        ],
        answer: 3,
        explain: 'More varied data makes it harder for the model to memorize quirks, so it has to learn the real pattern.'
      },
      {
        q: 'A model does badly on both training data and new data. What\'s the likely issue?',
        options: [
          'Overfitting',
          'Underfitting',
          'Perfect fit',
          'Too much training data'
        ],
        answer: 1,
        explain: 'Poor performance everywhere means the model is too simple to capture the pattern: underfitting.'
      }
    ]
  },

  {
    id: 'training-vs-testing',
    zone: 'foundations',
    title: 'Training vs testing',
    headline: ['Training vs testing: ', 'no peeking', ' at the answer key'],
    blurb: 'To know if a model really works, you have to test it on data it has never seen.',
    minutes: 5,
    steps: [
      {
        title: 'Split your data',
        body: [
          'Before training, data scientists split their data into groups. The training set is what the model learns from. The test set is locked away and only used at the very end to check how well the model really does.',
          'Often there is a third group, the validation set. It is used during development to compare settings and catch overfitting, without touching the final test.',
          'A common split is something like 70% training, 15% validation, and 15% test, though the exact numbers vary by project.'
        ],
        keyPoints: [
          'Training set: the model learns from it',
          'Validation set: used to tune and compare',
          'Test set: the final exam, used once'
        ],
        note: 'the test set stays in the vault'
      },
      {
        title: 'Data leakage',
        body: [
          'If any test data sneaks into training, the test score becomes meaningless. That is called data leakage. It is like getting the answer key the night before. Your score looks amazing, but it does not prove you learned anything.',
          'Leakage can be sneaky. Duplicate photos might end up in both sets. Or a feature might accidentally give away the answer, like a hospital ID that hints which patients were sickest.',
          'This matters for big AI models too. When a chatbot aces a famous benchmark, researchers ask whether the benchmark questions were floating around online and ended up in its training data.'
        ],
        keyPoints: [
          'Leakage = test info sneaking into training',
          'It makes scores look better than reality',
          'Benchmarks can leak if they appear online'
        ],
        note: 'a leaked test proves nothing'
      }
    ],
    quiz: [
      {
        q: 'Why do we keep a separate test set?',
        options: [
          'To check performance on unseen data',
          'To make training faster',
          'To store extra copies of data',
          'To give the model more to memorize'
        ],
        answer: 0,
        explain: 'The test set shows how the model handles data it never trained on, which is what matters in real use.'
      },
      {
        q: 'What is data leakage?',
        options: [
          'When a hacker steals the model',
          'When training data is deleted',
          'When test information sneaks into training',
          'When the model forgets things'
        ],
        answer: 2,
        explain: 'Leakage happens when information from the test set influences training, inflating the score.'
      },
      {
        q: 'What is the validation set mainly for?',
        options: [
          'Final grading only',
          'Showing to customers',
          'Replacing the training set',
          'Tuning and comparing during development'
        ],
        answer: 3,
        explain: 'The validation set helps pick settings and catch overfitting while keeping the test set untouched.'
      },
      {
        q: 'A chatbot aces a famous online quiz benchmark. What should researchers wonder?',
        options: [
          'Whether the quiz was in its training data',
          'Whether the chatbot is conscious',
          'Whether the quiz was too long',
          'Whether the screen was too small'
        ],
        answer: 0,
        explain: 'If benchmark questions were online, they may have leaked into training, making the score misleading.'
      },
      {
        q: 'Which split is a reasonable example?',
        options: [
          '100% training, 0% test',
          '70% training, 15% validation, 15% test',
          '10% training, 90% test',
          '50% training, 50% the same data again'
        ],
        answer: 1,
        explain: 'Most data goes to training, with smaller held-out portions for validation and testing.'
      }
    ]
  },

  {
    id: 'next-word-prediction',
    zone: 'foundations',
    title: 'Next-word prediction',
    headline: ['Next-word prediction: ', 'autocomplete', ' on a cosmic scale'],
    blurb: 'Chatbots like ChatGPT and Claude write by predicting the next chunk of text, over and over.',
    minutes: 7,
    steps: [
      {
        title: 'One token at a time',
        body: [
          'Large language models, or LLMs, are trained on a simple-sounding task: given some text, predict what comes next. They do this with tokens, which are chunks of text. A token might be a whole word, part of a word, or punctuation.',
          'The model reads everything so far and outputs a probability for every possible next token. Then one token is picked, added to the text, and the whole process repeats. A long answer is just this loop running hundreds of times.',
          'After that basic training, companies fine-tune models with human feedback so they act like helpful assistants instead of just continuing random text.'
        ],
        keyPoints: [
          'LLMs predict the next token, again and again',
          'Tokens are chunks: words, word pieces, punctuation',
          'Fine-tuning turns a text predictor into an assistant'
        ],
        note: 'one token. then another. then another.'
      },
      {
        title: 'Play the prediction game',
        body: [
          'Try the game below. You will see the start of a sentence. Pick the word you think comes next, then see the probabilities a model might assign to each option.',
          'Notice that the most likely word does not get 100%. Language is flexible, so lots of words could work. The model spreads its bets across many options.',
          'Chatbots usually do not always pick the top word. A setting called temperature controls how adventurous the pick is. Low temperature sticks to safe, likely words. High temperature takes more risks, which can be creative or just weird.'
        ],
        keyPoints: [
          'The model gives every option a probability',
          'Even the top choice rarely gets close to 100%',
          'Temperature controls safe vs. surprising picks'
        ],
        note: 'moon is unlikely. not impossible.',
        interactive: 'nextword'
      }
    ],
    quiz: [
      {
        q: 'What is the core task a large language model is trained on?',
        options: [
          'Looking up facts in a database',
          'Translating only English',
          'Predicting the next token in text',
          'Copying websites word for word'
        ],
        answer: 2,
        explain: 'LLMs are trained to predict the next token given the text before it.'
      },
      {
        q: 'What is a token?',
        options: [
          'A chunk of text, like a word or word piece',
          'A coin used to pay for AI',
          'A password for the chatbot',
          'A full paragraph'
        ],
        answer: 0,
        explain: 'Tokens are the small text chunks models read and write, often words or parts of words.'
      },
      {
        q: 'You want a chatbot to give more predictable, focused answers. Which setting helps?',
        options: [
          'Higher temperature',
          'More emojis',
          'Longer prompts only',
          'Lower temperature'
        ],
        answer: 3,
        explain: 'Lower temperature makes the model favor the most likely tokens, giving steadier output.'
      },
      {
        q: 'How does a chatbot produce a long answer?',
        options: [
          'It writes the whole answer at once',
          'It repeatedly predicts and adds one token',
          'It searches for a matching answer online',
          'A human types it in the background'
        ],
        answer: 1,
        explain: 'Generation is a loop: predict a token, add it, then predict the next one using everything so far.'
      },
      {
        q: 'Why doesn\'t the top next-word choice usually get 100% probability?',
        options: [
          'The model is broken',
          'Probabilities are random',
          'Many different words could reasonably come next',
          'Models can\'t count to 100'
        ],
        answer: 2,
        explain: 'Language has lots of valid continuations, so the model spreads probability across them.'
      }
    ]
  },

  {
    id: 'why-ai-makes-things-up',
    zone: 'foundations',
    title: 'Why AI makes things up',
    headline: ['Why AI makes things up: ', 'confident', ' is not the same as correct'],
    blurb: 'Chatbots sometimes invent facts, quotes, and sources. Here is why that happens.',
    minutes: 6,
    steps: [
      {
        title: 'Plausible, not true',
        body: [
          'When a chatbot invents something false and states it like a fact, people call it a hallucination. It might make up a quote, a date, a book, or a whole scientific study.',
          'This happens because the model is built to produce text that sounds likely, not to check facts. If a fake citation looks like the kind of thing that usually appears in that spot, the model can generate it, smoothly and confidently.',
          'A model does not have a built-in "I am not sure" alarm that always works. It can sound just as confident when it is wrong as when it is right.'
        ],
        keyPoints: [
          'Hallucination = confidently stated false info',
          'Models optimize for plausible text, not truth',
          'Confidence in tone tells you nothing about accuracy'
        ],
        note: 'sounds right ≠ is right'
      },
      {
        title: 'When it happens most',
        body: [
          'Hallucinations are more common with obscure topics, very specific details like exact numbers or page references, recent events after the model\'s training cutoff, and questions with a false assumption baked in.',
          'For example, ask "Why did Abraham Lincoln invent the lightbulb?" and a model might play along instead of correcting you. Newer models push back more often, but not always.',
          'Tools that let a chatbot search the web or read documents can reduce hallucinations, but they do not eliminate them. The model can still misread or misquote a real source. Always verify anything that matters.'
        ],
        keyPoints: [
          'Watch out for obscure topics and exact details',
          'Loaded questions can lead models astray',
          'Web search helps but does not fix everything'
        ],
        note: 'specific details = check twice'
      }
    ],
    quiz: [
      {
        q: 'What is an AI "hallucination"?',
        options: [
          'When AI sees images that are not there',
          'Confidently stated information that is false',
          'When the chatbot crashes',
          'A creative writing feature'
        ],
        answer: 1,
        explain: 'A hallucination is when a model generates false information and presents it as fact.'
      },
      {
        q: 'Why do language models hallucinate?',
        options: [
          'They are designed to lie',
          'They are tired from training',
          'They generate likely-sounding text without checking facts',
          'Users trick every one of them'
        ],
        answer: 2,
        explain: 'Models predict plausible text. Plausible and true are not always the same thing.'
      },
      {
        q: 'Which question is most likely to trigger a hallucination?',
        options: [
          'Exact page number of a quote in an obscure book',
          'What color is the sky on a clear day?',
          'What is 2 + 2?',
          'Name a fruit'
        ],
        answer: 0,
        explain: 'Very specific details about obscure sources are where models most often invent answers.'
      },
      {
        q: 'A chatbot answers in a very confident tone. What does that tell you about accuracy?',
        options: [
          'It is definitely correct',
          'It is definitely wrong',
          'It searched the web',
          'Nothing reliable on its own'
        ],
        answer: 3,
        explain: 'Models can sound equally confident whether they are right or wrong, so tone is not evidence.'
      },
      {
        q: 'Does giving a chatbot web search fully stop hallucinations?',
        options: [
          'Yes, completely',
          'No, it can still misread or misquote sources',
          'Yes, but only on weekends',
          'No, search makes it hallucinate more every time'
        ],
        answer: 1,
        explain: 'Search can help ground answers, but the model can still get details wrong, so checking is still needed.'
      }
    ]
  },

  // ───────────────────────────── TOOLBOX ─────────────────────────────
  {
    id: 'clear-prompts',
    zone: 'toolbox',
    title: 'Writing clear prompts',
    headline: ['Writing clear prompts: ', 'say what you mean', ', get what you want'],
    blurb: 'Vague questions get vague answers. A few details make AI way more useful.',
    minutes: 6,
    steps: [
      {
        title: 'Be specific',
        body: [
          'A chatbot cannot read your mind. "Help with my essay" could mean a hundred things. "Give me three ways to make the opening paragraph of my essay on climate migration more engaging" is something it can actually do.',
          'Good prompts usually cover a few things: the task (what you want done), the context (who you are, what it is for), and the format (a list, a table, 100 words, simple language).',
          'You do not need fancy magic words. Clear and specific beats clever every time.'
        ],
        keyPoints: [
          'Say the task, the context, and the format',
          'Specific prompts get specific answers',
          'No magic words required'
        ],
        note: 'pretend it knows nothing about you'
      },
      {
        title: 'Show, then iterate',
        body: [
          'If you want a certain style, show an example. "Write quiz questions like this one:" followed by a sample works better than describing the style in words.',
          'Your first prompt does not have to be perfect. Treat it like a conversation. If the answer is too long, say "shorter." If it is too advanced, say "explain it for a 9th grader." Follow-ups are part of the process.',
          'You can also ask the AI to ask you questions first: "Before you answer, ask me anything you need to know." This flips the work around and often gets better results.'
        ],
        keyPoints: [
          'Examples beat descriptions',
          'Refine with follow-ups',
          'Let the AI ask you clarifying questions'
        ],
        note: 'first draft prompt. second draft better.'
      }
    ],
    quiz: [
      {
        q: 'Which prompt is clearest?',
        options: [
          'Help with history',
          'History stuff pls',
          'Summarize causes of WWI in 5 bullet points for 10th grade',
          'Tell me everything'
        ],
        answer: 2,
        explain: 'It names the task, topic, format, and audience, so the AI knows exactly what to produce.'
      },
      {
        q: 'What three things do good prompts often include?',
        options: [
          'Task, context, and format',
          'Emojis, capitals, and urgency',
          'Your name, age, and address',
          'Magic words and secret codes'
        ],
        answer: 0,
        explain: 'Saying what to do, why or for whom, and what shape the answer should take makes prompts much clearer.'
      },
      {
        q: 'The AI\'s answer is way too complicated. What\'s the best next move?',
        options: [
          'Give up on AI',
          'Copy it anyway',
          'Ask the same thing again, word for word',
          'Ask it to explain more simply'
        ],
        answer: 3,
        explain: 'Follow-up prompts let you steer. Asking for simpler language is exactly how iteration works.'
      },
      {
        q: 'You want quiz questions in a specific style. What helps most?',
        options: [
          'Typing in all caps',
          'Including an example question',
          'Saying "please" five times',
          'Making the prompt as short as possible'
        ],
        answer: 1,
        explain: 'Showing an example communicates style far better than trying to describe it.'
      },
      {
        q: 'What does adding "ask me questions before answering" do?',
        options: [
          'Lets the AI gather missing details first',
          'Makes the AI refuse to answer',
          'Turns off the AI\'s memory',
          'Makes answers longer automatically'
        ],
        answer: 0,
        explain: 'It invites the AI to fill gaps in its understanding before it starts writing.'
      }
    ]
  },

  {
    id: 'context-engineering',
    zone: 'toolbox',
    title: 'Context engineering',
    headline: ['Context engineering: ', 'pack the right bag', ' before the trip'],
    blurb: 'What you put in front of a model, and what you leave out, shapes everything it says.',
    minutes: 7,
    steps: [
      {
        title: 'The context window',
        body: [
          'A model only "knows" two things during a chat: what it learned in training, and what is in its context window right now. The context window is everything the model can see at once: your messages, its replies, any files you shared, and hidden instructions.',
          'The window has a size limit, measured in tokens. Modern models can hold a lot, sometimes whole books, but it is still finite. In a very long chat, older parts may get cut off or summarized.',
          'Context engineering is the skill of deciding what goes into that window so the model has what it needs.'
        ],
        keyPoints: [
          'Context window = everything the model can see right now',
          'It has a limit, measured in tokens',
          'You control a lot of what goes in'
        ],
        note: 'not in the window? it\'s guessing'
      },
      {
        title: 'Give it the good stuff',
        body: [
          'Want help with your lab report? Paste in the actual assignment rubric and your data. Want feedback in your teacher\'s style? Share the grading guidelines. Real source material beats the model\'s general guesses.',
          'More is not always better. Dumping in tons of unrelated text can distract the model and bury the important parts. Models can miss details buried in the middle of a very long context.',
          'If a chat drifts off track, starting a fresh conversation with a clean summary of what matters is often better than arguing with a cluttered one.'
        ],
        keyPoints: [
          'Share the real materials: rubrics, notes, data',
          'Relevant beats long',
          'Fresh chat + clean summary can reset a messy one'
        ],
        note: 'relevant > a lot'
      }
    ],
    quiz: [
      {
        q: 'What is a model\'s context window?',
        options: [
          'The browser tab it runs in',
          'Everything the model can see during the conversation',
          'Its full training dataset',
          'The settings menu'
        ],
        answer: 1,
        explain: 'The context window holds the current conversation, files, and instructions the model can see right now.'
      },
      {
        q: 'You want feedback on a lab report. What\'s the most useful thing to include?',
        options: [
          'A random article about science',
          'Your favorite song lyrics',
          'Nothing, the AI already knows your class',
          'The assignment rubric and your report'
        ],
        answer: 3,
        explain: 'The model does not know your class. Giving it the real rubric and work lets it give targeted feedback.'
      },
      {
        q: 'Why can stuffing in lots of unrelated text backfire?',
        options: [
          'It can distract the model from what matters',
          'The model deletes everything',
          'It always makes answers shorter',
          'It is against the law'
        ],
        answer: 0,
        explain: 'Irrelevant text can bury key details and pull the model\'s attention in the wrong direction.'
      },
      {
        q: 'How is the size of a context window measured?',
        options: [
          'In pages',
          'In megapixels',
          'In tokens',
          'In minutes'
        ],
        answer: 2,
        explain: 'Context windows are measured in tokens, the text chunks models process.'
      },
      {
        q: 'A long chat has gotten confused and off-track. What\'s a good move?',
        options: [
          'Keep typing the same request louder',
          'Start a new chat with a clean summary',
          'Delete your account',
          'Add more unrelated details'
        ],
        answer: 1,
        explain: 'A fresh context with only the important info often works better than a cluttered one.'
      }
    ]
  },

  {
    id: 'studying-with-ai',
    zone: 'toolbox',
    title: 'Studying with AI',
    headline: ['Studying with AI: a ', 'study buddy', ', not a ghostwriter'],
    blurb: 'AI can make you learn faster, or help you skip learning entirely. You get to pick.',
    minutes: 6,
    steps: [
      {
        title: 'Make your brain do the work',
        body: [
          'Learning happens when your brain struggles a little. Reading a perfect AI summary feels productive, but it is a lot like watching someone else lift weights. Your muscles do not grow.',
          'Research on learning shows that retrieval practice, actually pulling information out of your memory, is one of the most effective ways to study. AI is great at helping with that.',
          'Try prompts like "Quiz me on photosynthesis, one question at a time, and wait for my answer" or "Give me practice problems like this one, but don\'t show the solutions yet."'
        ],
        keyPoints: [
          'Struggle is where learning happens',
          'Retrieval practice beats rereading',
          'Ask AI to quiz you, not just tell you'
        ],
        note: 'quiz me > tell me'
      },
      {
        title: 'Smart study moves',
        body: [
          'Explain a concept to the AI in your own words, then ask it what you got wrong or left out. Teaching is a powerful way to find gaps in your understanding.',
          'Stuck on a problem? Ask for a hint, not the answer. "Give me just the first step" keeps you in the driver\'s seat.',
          'And remember, AI can be wrong. If something it says conflicts with your textbook or teacher, check it. Your class materials are the source of truth for your class.'
        ],
        keyPoints: [
          'Explain it back, then ask for gaps',
          'Ask for hints, not full solutions',
          'Your textbook and teacher win ties'
        ],
        note: 'hint please, not the answer'
      }
    ],
    quiz: [
      {
        q: 'Which prompt best supports real learning?',
        options: [
          'Write my answers for the worksheet',
          'Quiz me one question at a time on cell parts',
          'Summarize chapter 5 so I don\'t have to read it',
          'Just give me the final answer'
        ],
        answer: 1,
        explain: 'Being quizzed makes you retrieve information, which strengthens memory far more than reading answers.'
      },
      {
        q: 'What is retrieval practice?',
        options: [
          'Rereading notes many times',
          'Copying answers into a notebook',
          'Pulling information out of your memory',
          'Downloading study guides'
        ],
        answer: 2,
        explain: 'Retrieval practice means actively recalling information, one of the best-supported study techniques.'
      },
      {
        q: 'You are stuck on a math problem. What\'s the best AI request?',
        options: [
          'Give me a hint for the first step',
          'Solve it and show the answer',
          'Do the whole worksheet',
          'Tell me which answer to circle'
        ],
        answer: 0,
        explain: 'A hint gets you unstuck while you still do the thinking.'
      },
      {
        q: 'The AI explains something differently than your textbook. What should you do?',
        options: [
          'Always trust the AI',
          'Ignore both',
          'Pick whichever is shorter',
          'Check it and ask your teacher if needed'
        ],
        answer: 3,
        explain: 'AI can be wrong. Verify against your class materials and ask your teacher when unsure.'
      },
      {
        q: 'Why does explaining a concept to the AI help?',
        options: [
          'It reveals gaps in your understanding',
          'The AI grades your class',
          'It trains the AI to like you',
          'It makes the AI faster'
        ],
        answer: 0,
        explain: 'Putting ideas into your own words exposes what you do and do not actually understand.'
      }
    ]
  },

  {
    id: 'checking-accuracy',
    zone: 'toolbox',
    title: 'Checking accuracy',
    headline: ['Checking accuracy: become an ', 'AI detective', ' (trench coat optional)'],
    blurb: 'Learn to spot shaky claims in AI answers and track down what is actually true.',
    minutes: 8,
    steps: [
      {
        title: 'Think like a fact-checker',
        body: [
          'Not every sentence in an AI answer needs checking. Focus on the claims that matter: names, dates, numbers, quotes, and anything you plan to repeat or put in an assignment.',
          'Professional fact-checkers use a trick called lateral reading. Instead of staring harder at one source, they open new tabs and see what other trustworthy sources say about the same claim.',
          'Good sources for checking include encyclopedias, official websites, reputable news outlets, textbooks, and original documents. If you cannot find a claim anywhere reliable, that is a red flag.'
        ],
        keyPoints: [
          'Check names, dates, numbers, and quotes first',
          'Lateral reading: compare multiple sources',
          'No reliable source anywhere = red flag'
        ],
        note: 'open more tabs. seriously.'
      },
      {
        title: 'Crack the case',
        body: [
          'Time to practice. Below is a case file with a real chatbot-style answer. Some claims are true. Some are confidently wrong.',
          'Click any claim you think is false to flag it. Open the source cards to check your hunches. Once you have caught the errors, pick the rewritten prompt that would have led to a better answer.',
          'Notice how natural the false claims sound. They sit right next to true ones, in the same calm tone. That is exactly why checking matters.'
        ],
        keyPoints: [
          'False claims hide next to true ones',
          'Use sources, not gut feelings',
          'Better prompts can prevent errors'
        ],
        note: 'trust, but verify. mostly verify.',
        interactive: 'detective'
      }
    ],
    quiz: [
      {
        q: 'What is lateral reading?',
        options: [
          'Reading a page sideways',
          'Reading only the headline',
          'Checking what other sources say about a claim',
          'Reading very quickly'
        ],
        answer: 2,
        explain: 'Lateral reading means leaving the source and comparing what other reliable sources say.'
      },
      {
        q: 'Which part of an AI answer is most worth checking?',
        options: [
          'The greeting',
          'Specific dates, numbers, and quotes',
          'The word "the"',
          'The punctuation'
        ],
        answer: 1,
        explain: 'Specific facts are where errors cause the most trouble and where hallucinations often appear.'
      },
      {
        q: 'You can\'t find an AI\'s claim in any reliable source. What does that suggest?',
        options: [
          'It might be made up',
          'It must be secret knowledge',
          'It is definitely true',
          'The internet is broken'
        ],
        answer: 0,
        explain: 'If no trustworthy source backs it up, treat the claim as suspicious.'
      },
      {
        q: 'Why are false claims in AI answers hard to spot?',
        options: [
          'They are always in red text',
          'They are always at the end',
          'They are written in another language',
          'They sound just as confident as true ones'
        ],
        answer: 3,
        explain: 'Errors blend in because the model uses the same calm, confident tone for everything.'
      },
      {
        q: 'Which is the best source to verify a historical date?',
        options: [
          'A random comment section',
          'A reputable encyclopedia or museum site',
          'Asking the same chatbot again',
          'A meme'
        ],
        answer: 1,
        explain: 'Established reference works and institutions are far more reliable than comments or repeating the question.'
      }
    ]
  },

  {
    id: 'research-sources',
    zone: 'toolbox',
    title: 'Research & sources',
    headline: ['Research & sources: ', 'citations can lie', ' too'],
    blurb: 'AI can point you toward sources, but it can also invent them. Here is how to research safely.',
    minutes: 7,
    steps: [
      {
        title: 'The fake citation problem',
        body: [
          'Ask a plain chatbot for sources and it might hand you a perfect-looking list: real-sounding authors, a journal name, a year, even page numbers. Some of those may not exist at all.',
          'This has caused real trouble. In 2023, lawyers in a New York case were sanctioned after filing a brief that cited court cases ChatGPT had made up.',
          'The fix is simple: never cite something you have not found and opened yourself. If you cannot locate the actual article, book, or page, it does not go in your bibliography.'
        ],
        keyPoints: [
          'Chatbots can invent realistic citations',
          'Real people have gotten in trouble for this',
          'Only cite what you have actually found and read'
        ],
        note: 'if you can\'t open it, don\'t cite it'
      },
      {
        title: 'Using AI the right way for research',
        body: [
          'AI is genuinely useful early in research. It can help you brainstorm angles, explain background, suggest search terms, and break a big topic into questions.',
          'Some AI tools search the web and link their sources. That is a big improvement, but click the links. Make sure the page exists and actually says what the AI claims it says.',
          'For school research, go to the good stuff directly: your school library databases, Google Scholar, government sites, and primary sources. Use AI as a guide, not as the source.'
        ],
        keyPoints: [
          'Great for brainstorming and search terms',
          'Click every link and confirm the claim',
          'AI is a guide, not a source'
        ],
        note: 'click the link. read the thing.'
      }
    ],
    quiz: [
      {
        q: 'A chatbot gives you five citations. What should you do first?',
        options: [
          'Paste them into your bibliography',
          'Assume they are all real',
          'Find and open each one yourself',
          'Delete the ones with long titles'
        ],
        answer: 2,
        explain: 'Chatbots can invent citations, so you must confirm each source actually exists and says what is claimed.'
      },
      {
        q: 'What happened to lawyers in a 2023 New York case?',
        options: [
          'They were sanctioned for citing fake AI-made cases',
          'They won a prize for using AI',
          'They invented ChatGPT',
          'Nothing, AI citations are always accepted'
        ],
        answer: 0,
        explain: 'A judge sanctioned lawyers who submitted a brief with fake case citations generated by ChatGPT.'
      },
      {
        q: 'Which is a good use of AI in research?',
        options: [
          'Using it as your only source',
          'Copying its citations without checking',
          'Asking it to invent supporting quotes',
          'Brainstorming search terms and angles'
        ],
        answer: 3,
        explain: 'AI shines at early-stage brainstorming. Actual evidence should come from sources you verify.'
      },
      {
        q: 'An AI search tool links a source. What still needs checking?',
        options: [
          'Nothing, links are always accurate',
          'That the page says what the AI claims',
          'The color of the website',
          'How many ads the page has'
        ],
        answer: 1,
        explain: 'Even with real links, AI can misquote or misrepresent what a page says.'
      },
      {
        q: 'Which is a strong place to find sources for a school paper?',
        options: [
          'Your school library\'s databases',
          'An anonymous forum post',
          'A chatbot\'s memory',
          'A random screenshot'
        ],
        answer: 0,
        explain: 'Library databases give access to vetted, real publications you can open and cite.'
      }
    ]
  },

  {
    id: 'debugging-code',
    zone: 'toolbox',
    title: 'Debugging code',
    headline: ['Debugging code: ', 'pair up', ' with an AI'],
    blurb: 'AI can help track down bugs fast, if you give it the right clues and still understand the fix.',
    minutes: 6,
    steps: [
      {
        title: 'Give it the clues',
        body: [
          'When your code breaks, the error message is your best clue. Copy the full message, not just "it doesn\'t work." Include the code that caused it and what you expected to happen.',
          'A great debugging prompt sounds like: "My Python function should return the average of a list, but I get ZeroDivisionError when the list is empty. Here is the code." That gives the AI the goal, the problem, and the evidence.',
          'If your project is big, try to shrink the problem down to the smallest bit of code that still breaks. Often, you will spot the bug yourself while doing that.'
        ],
        keyPoints: [
          'Share the exact error message',
          'Say what you expected vs. what happened',
          'Shrink the problem to the smallest example'
        ],
        note: 'paste the whole error, not a vibe'
      },
      {
        title: 'Understand before you paste',
        body: [
          'AI-written fixes can be wrong, can introduce new bugs, or can solve the wrong problem. Sometimes they even call functions or libraries that do not exist.',
          'Before using a fix, ask "Why does this work?" If you cannot explain the change, you have not really fixed anything. You have just moved the confusion.',
          'Then test it. Run the code with normal input, weird input, and empty input. And check your class rules: some programming courses allow AI help, some do not.'
        ],
        keyPoints: [
          'AI fixes can be wrong or made up',
          'Make sure you can explain the fix',
          'Test with normal and edge-case inputs'
        ],
        note: 'if you can\'t explain it, don\'t ship it'
      }
    ],
    quiz: [
      {
        q: 'What\'s the most helpful thing to include when asking AI to debug?',
        options: [
          '"It doesn\'t work"',
          'Just the file name',
          'Only your favorite part of the code',
          'The exact error message and the code'
        ],
        answer: 3,
        explain: 'The error message and the relevant code give the AI real evidence to work with.'
      },
      {
        q: 'Why shrink a bug down to a minimal example?',
        options: [
          'It isolates the problem and often reveals it',
          'AI can only read 3 lines',
          'It makes the code run faster',
          'Teachers require it by law'
        ],
        answer: 0,
        explain: 'A small example removes distractions, making the cause easier to find for you and the AI.'
      },
      {
        q: 'The AI suggests a fix you don\'t understand. What should you do?',
        options: [
          'Paste it and move on',
          'Ask it to explain why the fix works',
          'Delete your whole project',
          'Ignore all errors from now on'
        ],
        answer: 1,
        explain: 'Understanding the fix helps you catch mistakes and actually learn.'
      },
      {
        q: 'Which is a real risk with AI-generated code?',
        options: [
          'It always runs perfectly',
          'It can only be written in English',
          'It may use functions that don\'t exist',
          'It deletes your computer'
        ],
        answer: 2,
        explain: 'AI can hallucinate functions, libraries, or options that are not real.'
      },
      {
        q: 'After applying a fix, what\'s the best next step?',
        options: [
          'Test with normal, weird, and empty inputs',
          'Assume it works',
          'Turn off error messages',
          'Submit immediately without running it'
        ],
        answer: 0,
        explain: 'Testing different inputs, including edge cases, confirms the fix really works.'
      }
    ]
  },

  {
    id: 'ai-in-radiology',
    zone: 'toolbox',
    title: 'AI in radiology',
    headline: ['AI in radiology: a ', 'second set of eyes', ' on every scan'],
    blurb: 'A real-world look at how AI helps doctors read medical images, and where humans still matter.',
    minutes: 7,
    steps: [
      {
        title: 'What AI does in the reading room',
        body: [
          'Radiologists are doctors who read medical images like X-rays, CT scans, MRIs, and mammograms. It is a field full of pattern recognition, which makes it a natural fit for AI.',
          'Medical imaging is where AI has gone furthest in medicine. The U.S. Food and Drug Administration has cleared hundreds of AI-enabled medical devices, and most of them are for radiology.',
          'These tools can flag a possible brain bleed on a CT scan so it gets read sooner, highlight suspicious spots on a mammogram, or measure things automatically that used to take a doctor several minutes.'
        ],
        keyPoints: [
          'Radiology is the biggest area for medical AI so far',
          'The FDA has cleared hundreds of AI imaging tools',
          'Uses: flagging urgent cases, highlighting spots, measuring'
        ],
        note: 'pattern spotting at hospital scale'
      },
      {
        title: 'Why humans still review',
        body: [
          'In 2016, AI pioneer Geoffrey Hinton suggested we should stop training radiologists. That did not happen. Radiologists are still in high demand, and AI mostly works as an assistant rather than a replacement.',
          'AI tools can miss things or flag false alarms. A model trained on images from one hospital\'s machines may perform worse on another hospital\'s scanners or patients. That is a real-world version of training vs. testing.',
          'Radiologists also do more than spot patterns. They consider patient history, talk with other doctors, and take responsibility for the diagnosis. AI makes them faster and can catch things, but a human reviews the result.'
        ],
        keyPoints: [
          'AI assists, radiologists decide',
          'Models can struggle on new hospitals or scanners',
          'Doctors bring context and accountability'
        ],
        note: 'assist, not replace'
      }
    ],
    quiz: [
      {
        q: 'What is the main role of most AI tools in radiology today?',
        options: [
          'Replacing radiologists entirely',
          'Assisting radiologists, who review the results',
          'Billing patients',
          'Scheduling appointments only'
        ],
        answer: 1,
        explain: 'Current tools mostly support radiologists by flagging, highlighting, and measuring, with a doctor reviewing.'
      },
      {
        q: 'Which area of medicine has the most FDA-cleared AI devices?',
        options: [
          'Dentistry',
          'Nutrition',
          'Radiology',
          'Physical therapy'
        ],
        answer: 2,
        explain: 'Most AI-enabled devices cleared by the FDA so far are for radiology and medical imaging.'
      },
      {
        q: 'An AI trained at one hospital performs worse at another. What\'s a likely reason?',
        options: [
          'Different scanners and patient groups',
          'The second hospital is bigger',
          'AI dislikes new buildings',
          'The internet is slower there'
        ],
        answer: 0,
        explain: 'Differences in equipment and patients mean the new data does not match what the model trained on.'
      },
      {
        q: 'How can AI help with urgent cases like a possible brain bleed?',
        options: [
          'By performing surgery',
          'By deleting normal scans',
          'By prescribing medicine',
          'By flagging the scan so it gets read sooner'
        ],
        answer: 3,
        explain: 'Triage tools can push suspicious scans to the front of the line so a doctor sees them faster.'
      },
      {
        q: 'Besides spotting patterns, what do radiologists provide?',
        options: [
          'Patient context and responsibility for diagnoses',
          'Faster internet',
          'Scanner repairs',
          'Nothing beyond what AI does'
        ],
        answer: 0,
        explain: 'Radiologists weigh patient history, consult with other doctors, and are accountable for the diagnosis.'
      }
    ]
  },

  // ───────────────────────────── ETHICS ─────────────────────────────
  {
    id: 'training-data',
    zone: 'ethics',
    title: 'Training data',
    headline: ['Training data: ', 'you are what you eat', ', AI edition'],
    blurb: 'Where AI training data comes from, who made it, and why that raises big questions.',
    minutes: 6,
    steps: [
      {
        title: 'Where it comes from',
        body: [
          'Large AI models learn from enormous amounts of data. For language models, much of it is text collected from the public web, plus books, code, and other sources. Image models learn from huge collections of pictures paired with captions.',
          'Lots of human work goes into this too. People label images, rate chatbot answers, and write example responses. Some of this work is done by low-paid contractors around the world.',
          'Whatever is in the data shapes the model. Good writing, helpful explanations, and also mistakes, stereotypes, and toxic content all leave fingerprints.'
        ],
        keyPoints: [
          'Much training data is scraped from the public web',
          'Human labelers and raters shape models too',
          'The model reflects what is in its data'
        ],
        note: 'garbage in, garbage out'
      },
      {
        title: 'The big questions',
        body: [
          'Did the writers, artists, and photographers agree to have their work used? Usually, nobody asked them. Several authors, artists, and news organizations have sued AI companies over this, and courts are still working through the issues.',
          'There is also privacy. Public web data can include personal information people never expected a model to learn from.',
          'Some companies now let websites opt out of being collected, sign licensing deals with publishers, or publish details about their data. Asking "what was this trained on?" is always a fair question.'
        ],
        keyPoints: [
          'Creators often were not asked for consent',
          'Copyright lawsuits are ongoing',
          'Opt-outs and licensing deals are growing'
        ],
        note: 'whose work is this, anyway?'
      }
    ],
    quiz: [
      {
        q: 'Where does much of a language model\'s training data come from?',
        options: [
          'Text collected from the public web',
          'Only textbooks written for AI',
          'Private text messages',
          'It invents its own data'
        ],
        answer: 0,
        explain: 'Language models are largely trained on text gathered from the public internet, plus books and code.'
      },
      {
        q: 'Why have some authors and artists sued AI companies?',
        options: [
          'AI made their books longer',
          'They wanted free AI access',
          'Their work was used for training without permission',
          'AI refused to read their work'
        ],
        answer: 2,
        explain: 'Many creators argue their copyrighted work was used to train models without consent or payment.'
      },
      {
        q: 'What role do human workers play in AI training?',
        options: [
          'None, it is fully automatic',
          'They only plug in computers',
          'They write the model\'s weights by hand',
          'They label data and rate model answers'
        ],
        answer: 3,
        explain: 'People label data, rate outputs, and write examples that guide how models behave.'
      },
      {
        q: 'A model\'s training data contains lots of stereotypes. What is likely?',
        options: [
          'The model may repeat those stereotypes',
          'The model will automatically remove them',
          'Stereotypes make models more accurate',
          'It has no effect at all'
        ],
        answer: 0,
        explain: 'Models learn patterns from their data, including harmful ones, unless steps are taken to address them.'
      },
      {
        q: 'Which is a step some AI companies have taken on data concerns?',
        options: [
          'Banning all books',
          'Letting websites opt out of data collection',
          'Hiding all information about data forever',
          'Training only on emojis'
        ],
        answer: 1,
        explain: 'Opt-out options and licensing deals are some ways companies respond to data concerns.'
      }
    ]
  },

  {
    id: 'deepfakes',
    zone: 'ethics',
    title: 'Deepfakes',
    headline: ['Deepfakes: ', 'seeing is not', ' believing anymore'],
    blurb: 'AI can fake faces, voices, and videos. Here is how to stay sharp and why it matters.',
    minutes: 6,
    steps: [
      {
        title: 'What deepfakes are',
        body: [
          'A deepfake is fake media made with AI: a video of someone saying words they never said, a cloned voice, or a realistic photo of an event that never happened.',
          'Some uses are harmless or creative, like movie effects or parody that is clearly labeled. But deepfakes are also used for scams, like cloned voices of family members asking for money, and for political misinformation.',
          'One of the worst uses is fake sexual images of real people made without consent. This causes serious harm, it has targeted students, and many places have made it illegal.'
        ],
        keyPoints: [
          'Deepfakes = AI-faked video, audio, or images',
          'Used for scams, misinformation, and harassment',
          'Non-consensual fake images are harmful and often illegal'
        ],
        note: 'real-looking ≠ real'
      },
      {
        title: 'Staying sharp',
        body: [
          'Old tricks like checking for weird hands or blinking are getting less reliable as tools improve. Do not count on spotting glitches.',
          'Instead, check the context. Who posted it first? Is a trusted news outlet reporting it? Does it seem designed to make you instantly angry or scared? Strong emotional reactions are a cue to slow down.',
          'Some companies now attach content credentials, digital labels that show how an image was made. If you ever see a deepfake of someone you know, do not share it. Report it and tell a trusted adult.'
        ],
        keyPoints: [
          'Visual glitches are not a reliable test anymore',
          'Check the source and context instead',
          'Never share; report and tell a trusted adult'
        ],
        note: 'pause before you share'
      }
    ],
    quiz: [
      {
        q: 'What is a deepfake?',
        options: [
          'A very deep ocean photo',
          'AI-generated fake video, audio, or images',
          'A type of computer virus',
          'A blurry photo'
        ],
        answer: 1,
        explain: 'Deepfakes are media created or altered with AI to look or sound real.'
      },
      {
        q: 'Why is "look for glitches" becoming a weak strategy?',
        options: [
          'Glitches were never real',
          'Phones hide glitches automatically',
          'AI tools keep getting more realistic',
          'Only experts can see pixels'
        ],
        answer: 2,
        explain: 'As generators improve, obvious flaws disappear, so checking context matters more.'
      },
      {
        q: 'You get a voice message that sounds like your cousin begging for money urgently. What\'s smart?',
        options: [
          'Send money right away',
          'Forward it to everyone',
          'Reply with your bank info',
          'Contact your cousin another way to verify'
        ],
        answer: 3,
        explain: 'Voice cloning scams rely on urgency. Verifying through a separate channel protects you.'
      },
      {
        q: 'A shocking video of a politician goes viral. What\'s the best first check?',
        options: [
          'See if trusted news outlets confirm it',
          'Count the likes',
          'Check if it has music',
          'Share it to ask friends'
        ],
        answer: 0,
        explain: 'Checking where it came from and whether reliable outlets confirm it is the strongest test.'
      },
      {
        q: 'You see a fake explicit image of a classmate. What should you do?',
        options: [
          'Share it privately',
          'Don\'t share it; report it and tell a trusted adult',
          'Save it just in case',
          'Comment on it'
        ],
        answer: 1,
        explain: 'Sharing spreads serious harm. Reporting and telling an adult helps protect the person targeted.'
      }
    ]
  },

  {
    id: 'academic-honesty',
    zone: 'ethics',
    title: 'Academic honesty',
    headline: ['Academic honesty: ', 'your work', ', your voice'],
    blurb: 'Using AI for school can be fine or can be cheating. The line depends on the rules and on honesty.',
    minutes: 5,
    steps: [
      {
        title: 'Know the rules',
        body: [
          'There is no single rule for AI in school. One teacher might encourage AI brainstorming. Another might ban it for a specific assignment. Both can be fair, depending on what the assignment is meant to teach.',
          'When in doubt, ask. "Can I use AI to check my grammar on this essay?" is a totally normal question. Asking before is much better than explaining after.',
          'If you do use AI and it is allowed, be open about it. Many teachers ask you to note what tool you used and how.'
        ],
        keyPoints: [
          'Rules vary by teacher and assignment',
          'Ask before, not after',
          'Disclose how you used AI'
        ],
        note: 'when in doubt, just ask'
      },
      {
        title: 'Why it matters',
        body: [
          'Assignments are not just about producing an essay. They exist to build skills: thinking, arguing, writing, solving. If AI does the work, you get the grade without the skill, and the skill is what you actually needed.',
          'Some schools use AI detectors, but these tools are known to be unreliable. They can flag human writing as AI-generated, and research has found non-native English writers get falsely flagged more often.',
          'Keeping drafts, notes, and version history is a smart habit. It shows your process and protects you if anyone ever questions your work.'
        ],
        keyPoints: [
          'The skill is the point, not just the grade',
          'AI detectors make mistakes',
          'Save drafts to show your process'
        ],
        note: 'version history = your receipts'
      }
    ],
    quiz: [
      {
        q: 'Your teacher hasn\'t said anything about AI for an essay. What should you do?',
        options: [
          'Use it secretly',
          'Ask your teacher what\'s allowed',
          'Assume everything is allowed',
          'Have AI write it and change a few words'
        ],
        answer: 1,
        explain: 'Rules vary, so asking first is the honest and safe move.'
      },
      {
        q: 'Why are AI detectors a problem to rely on?',
        options: [
          'They are always correct',
          'They only work on math',
          'They can wrongly flag human writing',
          'They make essays longer'
        ],
        answer: 2,
        explain: 'Detectors produce false positives, sometimes flagging genuine student writing as AI.'
      },
      {
        q: 'What\'s a good way to show your own writing process?',
        options: [
          'Keep drafts and version history',
          'Delete all old drafts',
          'Write only at the last minute',
          'Use invisible text'
        ],
        answer: 0,
        explain: 'Drafts and history document how your work developed over time.'
      },
      {
        q: 'AI use is allowed on an assignment. What\'s the honest thing to do?',
        options: [
          'Hide that you used it',
          'Claim you used it less than you did',
          'Let AI write everything',
          'Note what tool you used and how'
        ],
        answer: 3,
        explain: 'Being transparent about AI use is part of academic honesty, even when it is allowed.'
      },
      {
        q: 'Why can having AI do your homework hurt you?',
        options: [
          'You skip building the skill the work was meant to teach',
          'AI charges you per assignment',
          'Homework is always graded by robots',
          'It makes your computer slower'
        ],
        answer: 0,
        explain: 'The point of assignments is skill-building, which you miss if AI does the thinking.'
      }
    ]
  },

  {
    id: 'bias-misinformation',
    zone: 'ethics',
    title: 'Bias & misinformation',
    headline: ['Bias & misinformation: ', 'mirrors', ' that can warp'],
    blurb: 'AI can repeat unfair patterns from its data and make false info faster to create and spread.',
    minutes: 7,
    steps: [
      {
        title: 'How bias sneaks in',
        body: [
          'AI learns from data made by people, and people\'s data reflects history, including unfair parts. If past hiring favored men, a model trained on that history may learn to favor men too.',
          'That actually happened. Reuters reported in 2018 that Amazon scrapped an experimental hiring tool after finding it downgraded résumés that included the word "women\'s," like "women\'s chess club captain."',
          'Image generators have shown bias too. Ask for a "CEO" or a "nurse," and some tools have mostly produced stereotypical genders and skin colors, sometimes more skewed than reality.'
        ],
        keyPoints: [
          'Biased data leads to biased models',
          'Real example: Amazon\'s scrapped hiring tool',
          'Image generators can amplify stereotypes'
        ],
        note: 'the past is in the data'
      },
      {
        title: 'Misinformation at speed',
        body: [
          'AI makes it cheap and fast to produce realistic fake articles, posts, reviews, and images. One person can now create content that looks like it came from hundreds.',
          'AI can also spread misinformation by accident. A chatbot might confidently repeat a myth because that myth appeared a lot in its training data.',
          'Your defense: check claims before sharing, look for original sources, be suspicious of content designed to make you furious, and remember that a lot of posts does not mean a lot of real people.'
        ],
        keyPoints: [
          'AI makes fake content cheap and fast',
          'Chatbots can repeat popular myths',
          'Check before you share'
        ],
        note: 'viral ≠ verified'
      }
    ],
    quiz: [
      {
        q: 'How does bias usually get into an AI model?',
        options: [
          'Programmers type it in on purpose',
          'It learns patterns from biased data',
          'Computers are naturally unfair',
          'Users vote for it'
        ],
        answer: 1,
        explain: 'Models pick up patterns, including unfair ones, from the data they are trained on.'
      },
      {
        q: 'What problem did Amazon find with its experimental hiring tool?',
        options: [
          'It was too slow',
          'It only read short résumés',
          'It hired everyone',
          'It downgraded résumés mentioning "women\'s"'
        ],
        answer: 3,
        explain: 'According to Reuters, the tool penalized résumés containing "women\'s" and was scrapped.'
      },
      {
        q: 'An image generator mostly shows men when asked for "engineer." What is this an example of?',
        options: [
          'Bias reflecting stereotypes',
          'Perfect accuracy',
          'A hardware failure',
          'Overfitting to colors'
        ],
        answer: 0,
        explain: 'This reflects stereotypes in training data, which the tool can repeat or amplify.'
      },
      {
        q: 'Why does AI make misinformation a bigger challenge?',
        options: [
          'It makes all content true',
          'It deletes fact-checks',
          'It makes fake content fast and cheap to produce',
          'It only works in English'
        ],
        answer: 2,
        explain: 'AI lowers the cost of creating convincing fake content at large scale.'
      },
      {
        q: 'You see 50 posts saying the same surprising claim. What should you remember?',
        options: [
          'Many posts doesn\'t mean it\'s true',
          'It must be true if 50 people said it',
          'You should share it right away',
          'Only the first post matters'
        ],
        answer: 0,
        explain: 'Repetition is not evidence, and fake accounts or AI can make one claim look widespread.'
      }
    ]
  },

  {
    id: 'personal-info',
    zone: 'ethics',
    title: 'Personal info',
    headline: ['Personal info: ', 'think before you paste', ' anything personal'],
    blurb: 'What you type into AI tools may be stored, reviewed, or used. Protect yourself and others.',
    minutes: 5,
    steps: [
      {
        title: 'Where your chats go',
        body: [
          'When you type into a chatbot, your words are sent to a company\'s servers. Depending on the service and your settings, chats may be stored, reviewed by people for safety or quality, or used to train future models.',
          'Many tools have privacy settings that let you turn off training on your chats or delete history. It is worth checking them. But the safest approach is simple: do not share what you would not want stored.',
          'Many AI services also have minimum age requirements, often 13, with parent permission needed for younger teens in some cases.'
        ],
        keyPoints: [
          'Chats go to company servers',
          'They may be stored, reviewed, or used for training',
          'Check privacy settings, but share carefully anyway'
        ],
        note: 'the chat box is not a diary'
      },
      {
        title: 'What not to share',
        body: [
          'Skip passwords, your home address, phone number, ID numbers, and financial details. Avoid detailed private health info too, unless you are using a tool your doctor or school specifically approved.',
          'Be careful with other people\'s info as well. Pasting a friend\'s private messages or photos into an AI tool shares their data without asking them.',
          'You can still get great help without personal details. Instead of your full name and school, say "a high school junior." The AI does not need to know exactly who you are to help.'
        ],
        keyPoints: [
          'No passwords, addresses, IDs, or financial info',
          'Don\'t share friends\' private info either',
          'Use general descriptions instead of real details'
        ],
        note: 'their secrets aren\'t yours to paste'
      }
    ],
    quiz: [
      {
        q: 'What can happen to what you type into a chatbot?',
        options: [
          'It disappears instantly every time',
          'It may be stored or used for training',
          'It is always printed and mailed to you',
          'Only you can ever see it, guaranteed'
        ],
        answer: 1,
        explain: 'Depending on the service and settings, chats can be stored, reviewed, or used for training.'
      },
      {
        q: 'Which is safe to share with a chatbot?',
        options: [
          'Your password',
          'Your home address',
          '"I\'m a high school junior studying chemistry"',
          'Your bank card number'
        ],
        answer: 2,
        explain: 'General descriptions give helpful context without exposing sensitive personal details.'
      },
      {
        q: 'A friend sent you private messages. Should you paste them into an AI tool?',
        options: [
          'Not without their permission',
          'Yes, it\'s always fine',
          'Yes, if you remove the emojis',
          'Only on weekends'
        ],
        answer: 0,
        explain: 'Their private messages are their data. Sharing them with a service without asking is not fair to them.'
      },
      {
        q: 'What\'s a useful privacy step in many AI tools?',
        options: [
          'Typing faster',
          'Using all caps',
          'Sharing more details',
          'Turning off chat history or training'
        ],
        answer: 3,
        explain: 'Many tools let you limit history storage or opt out of having chats used for training.'
      },
      {
        q: 'What\'s the safest rule of thumb for personal info and AI?',
        options: [
          'Don\'t share what you wouldn\'t want stored',
          'Share everything; it\'s private',
          'Only share passwords if asked nicely',
          'Personal info makes AI smarter, so share it'
        ],
        answer: 0,
        explain: 'Assume anything you type could be kept, and share accordingly.'
      }
    ]
  },

  {
    id: 'data-poisoning',
    zone: 'ethics',
    title: 'Data poisoning',
    headline: ['Data poisoning: ', 'sabotage', ' in the training set'],
    blurb: 'If someone sneaks bad data into training, they can quietly change how a model behaves.',
    minutes: 6,
    steps: [
      {
        title: 'Poison in, problems out',
        body: [
          'Models learn from their data, so whoever controls the data has power over the model. Data poisoning is when someone deliberately slips misleading or malicious examples into training data.',
          'Some attacks aim to make a model worse in general. Others plant a hidden backdoor: the model acts normal until it sees a secret trigger phrase or pattern, then misbehaves.',
          'Because big models are trained on huge amounts of web data, an attacker might just post poisoned content online and wait for it to be collected.'
        ],
        keyPoints: [
          'Poisoning = sneaking bad examples into training data',
          'Backdoors trigger on secret phrases or patterns',
          'Web-scraped data makes this possible'
        ],
        note: 'a few bad apples, a whole weird tree'
      },
      {
        title: 'How small is small?',
        body: [
          'You might think poisoning a giant model would require poisoning a giant chunk of its data. Research suggests otherwise. A 2025 study by Anthropic and UK researchers found that around 250 malicious documents could plant a simple backdoor in language models of very different sizes.',
          'Not all poisoning is malicious, though. Tools like Nightshade, from the University of Chicago, let artists subtly alter their images so AI models trained on them without permission learn the wrong things. It is a protest tactic, and a debated one.',
          'Defenses include carefully filtering data, tracking where data comes from, and testing models for strange hidden behaviors.'
        ],
        keyPoints: [
          'A small number of poisoned documents can matter',
          'Some artists use poisoning as protest',
          'Defense: filter data, track sources, test models'
        ],
        note: 'small dose, big effect'
      }
    ],
    quiz: [
      {
        q: 'What is data poisoning?',
        options: [
          'Spilling drinks on a server',
          'Deliberately adding bad examples to training data',
          'Deleting a model\'s files',
          'Training a model too long'
        ],
        answer: 1,
        explain: 'Data poisoning means intentionally inserting misleading or malicious data to change a model\'s behavior.'
      },
      {
        q: 'What is a backdoor in an AI model?',
        options: [
          'A hidden behavior triggered by a secret input',
          'A shortcut key on the keyboard',
          'The model\'s exit button',
          'A way to speed up training'
        ],
        answer: 0,
        explain: 'A backdoor makes the model behave normally until a specific trigger appears.'
      },
      {
        q: 'Why are web-trained models vulnerable to poisoning?',
        options: [
          'The web is always accurate',
          'Models refuse web data',
          'Web data is encrypted',
          'Attackers can post poisoned content online'
        ],
        answer: 3,
        explain: 'If models collect public web text, anyone who can post online can try to insert poisoned data.'
      },
      {
        q: 'What does Nightshade let artists do?',
        options: [
          'Sell art faster',
          'Draw automatically',
          'Alter images so unauthorized training learns wrong things',
          'Turn art into music'
        ],
        answer: 2,
        explain: 'Nightshade subtly modifies images so models trained on them without permission learn incorrect associations.'
      },
      {
        q: 'Which is a defense against data poisoning?',
        options: [
          'Collecting data from anywhere without checks',
          'Carefully filtering and tracking data sources',
          'Making the model smaller only',
          'Ignoring strange model behavior'
        ],
        answer: 1,
        explain: 'Filtering data, tracking its origin, and testing for odd behaviors all help defend against poisoning.'
      }
    ]
  },

  {
    id: 'water-use',
    zone: 'ethics',
    title: 'Water use',
    headline: ['Water use: AI is ', 'thirstier', ' than you\'d think'],
    blurb: 'Data centers that run AI need cooling, and that often means water. The details are messier than headlines suggest.',
    minutes: 6,
    steps: [
      {
        title: 'Why computers need water',
        body: [
          'AI runs in data centers: giant buildings packed with computer chips. Those chips get hot, and they have to be cooled. Many data centers use evaporative cooling, where water evaporates to carry heat away, similar to how sweating cools you down.',
          'There is also indirect water use. Power plants that generate electricity for data centers, especially ones that burn fuel, often use water for cooling too.',
          'Training a large model takes a lot of computing at once. But day-to-day use by millions of people, called inference, adds up over time too.'
        ],
        keyPoints: [
          'Chips get hot; cooling often uses water',
          'Electricity generation uses water too',
          'Both training and everyday use count'
        ],
        note: 'chips get sweaty too'
      },
      {
        title: 'Why the numbers vary so much',
        body: [
          'You may see headlines about how much water one chatbot answer uses. Be careful. Estimates vary widely, from under a milliliter to tens of milliliters per response, depending on the model, the data center, and what the researchers counted.',
          'Location matters a lot. A data center in a hot, dry region may use much more water than one in a cool climate, and drawing water in a drought-prone area has a bigger local impact.',
          'Some companies are moving toward closed-loop or air-based cooling and publishing more data. Good questions to ask: what was measured, where, and does it include electricity?'
        ],
        keyPoints: [
          'Per-answer estimates vary widely',
          'Location and climate change the impact',
          'Ask what was measured and where'
        ],
        note: 'check what they counted'
      }
    ],
    quiz: [
      {
        q: 'Why do many data centers use water?',
        options: [
          'To clean the computers',
          'To cool hot computer chips',
          'To power the chips directly',
          'To store data in water'
        ],
        answer: 1,
        explain: 'Chips produce heat, and evaporative cooling uses water to carry that heat away.'
      },
      {
        q: 'What is "indirect" water use for AI?',
        options: [
          'Water used by power plants making the electricity',
          'Water employees drink',
          'Rain on the roof',
          'Water in the chips'
        ],
        answer: 0,
        explain: 'Generating electricity, especially at thermal power plants, often uses water for cooling.'
      },
      {
        q: 'A headline gives one exact water number for every AI answer. What\'s the best response?',
        options: [
          'Believe it completely',
          'Assume it\'s zero',
          'Share it without reading',
          'Ask what was measured, since estimates vary'
        ],
        answer: 3,
        explain: 'Estimates differ widely based on the model, location, and whether electricity is included.'
      },
      {
        q: 'Why does a data center\'s location matter for water impact?',
        options: [
          'It doesn\'t matter at all',
          'Only the building color matters',
          'Hot, dry areas may need more water and have less to spare',
          'Cold places use more water'
        ],
        answer: 2,
        explain: 'Climate affects cooling needs, and water use hits harder in drought-prone regions.'
      },
      {
        q: 'Which is one way companies are reducing data center water use?',
        options: [
          'Closed-loop or air-based cooling',
          'Running chips hotter until they melt',
          'Turning off all computers',
          'Moving data centers underwater only'
        ],
        answer: 0,
        explain: 'Closed-loop systems reuse water, and air-based cooling can cut water use.'
      }
    ]
  }
];

// Rounds for the 'nextword' widget. Probabilities are illustrative; the rest goes to other words.
export const nextWordRounds = [
  { context: 'The cat sat on the', options: [['mat', 0.41], ['floor', 0.22], ['couch', 0.17], ['moon', 0.02]] },
  { context: 'Peanut butter and', options: [['jelly', 0.68], ['honey', 0.09], ['bananas', 0.07], ['ketchup', 0.01]] },
  { context: 'I forgot to do my', options: [['homework', 0.47], ['chores', 0.14], ['laundry', 0.09], ['dragon', 0.01]] },
  { context: 'Once upon a', options: [['time', 0.93], ['hill', 0.02], ['dream', 0.01], ['spreadsheet', 0.001]] },
  { context: 'The best part of summer is', options: [['the', 0.31], ['swimming', 0.12], ['sleeping', 0.08], ['algebra', 0.005]] }
];
