import type { CollectionConfig } from 'payload'

const Sizes: CollectionConfig = {
  slug: 'sizes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'value',
      type: 'text',
      required: true,
    },
  ],
}

export { Sizes }
