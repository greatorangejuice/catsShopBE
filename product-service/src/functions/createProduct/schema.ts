export default {
  type: "object",
  properties: {
    title: { type: 'string' },
    count: {type: 'number'}
  },
  required: ['title']
} as const;
