export const zones = [
  {
    id: 'foundations', n: '01', name: 'Foundations', bg: '#3a5bff', fg: '#fff', tint: 'var(--tint-blue)',
    tourTitle: 'Foundations of AI',
    tourText: "What a neural network actually is, how machines learn from examples, and why a chatbot sometimes sounds sure about things that aren't true.",
    art: 'a brain made of connected dots',
  },
  {
    id: 'toolbox', n: '02', name: 'Toolbox', bg: '#ffe14d', fg: '#111', tint: 'var(--tint-yellow)',
    tourTitle: 'Practical tools',
    tourText: 'How to write prompts that get useful answers, study with AI without letting it think for you, and catch it when it gets things wrong.',
    art: 'a toolbox full of prompts',
  },
  {
    id: 'ethics', n: '03', name: 'Ethics', bg: '#ff9ecb', fg: '#111', tint: 'var(--tint-pink)',
    tourTitle: 'Using AI fairly',
    tourText: 'Deepfakes, academic honesty, bias, privacy and the real-world cost of running AI. The stuff that decides whether AI helps or hurts.',
    art: 'a balance scale made of stickers',
  },
];

export const zoneById = Object.fromEntries(zones.map((z) => [z.id, z]));
