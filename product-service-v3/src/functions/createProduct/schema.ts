export default {
  type: "object",
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    count: { type: 'number' },
    imglink: { type: 'string' },
  },
  required: ['title', 'price', 'count']
} as const;
