import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { customerProxy } from './endpoints/customer'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import { admins } from '@/access/admins'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user!),
  },
  hooks: {
    beforeChange: [],
    afterChange: [loginAfterCreate],
  },
  auth: true,
  endpoints: [
    {
      path: '/:teamID/customer',
      method: 'get',
      handler: customerProxy,
    },
    {
      path: '/:teamID/customer',
      method: 'patch',
      handler: customerProxy,
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: 'purchases',
      label: 'Purchases',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      label: 'Cart',
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
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
          name: 'createdOn',
          label: 'Created On',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'lastModified',
          label: 'Last Modified',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
  timestamps: true,
}

export {Users}
