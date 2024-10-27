import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { updateUserPurchases } from './hooks/updateUserPurchases'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
        {
          name: 'variant', // Define the variant field
          type: 'group',
          fields: [
            {
              name: 'id',
              type: 'text',
            },
            {
              name: 'sku',
              type: 'text',
            },
            {
              name: 'price',
              type: 'number',
            },
            {
              name: 'compareAtPrice',
              type: 'number',
            },
            {
              name: 'stock',
              type: 'number',
              required: false,
            },
            {
              name: 'size',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'value',
                  type: 'text',
                },
              ],
            },
            {
              name: 'color',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'value',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Receiver',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email Address',
          required: true,
        },
        {
          name: 'street',
          type: 'text',
          label: 'Street Address',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          label: 'State/Province',
          required: true,
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Postal Code',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          label: 'Country',
          required: true,
        },
        {
          name: 'isDefault',
          type: 'checkbox',
          label: 'Default Address',
          defaultValue: false,
          admin: {
            description: 'Check if this is the default address for the user.',
          },
        },
      ],
    },
  ],
}
