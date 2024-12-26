import { Select } from '@payloadcms/ui'
import { TextField } from 'payload'
import * as React from 'react'


export const ProductSelect: React.FC<TextField> = props => {
  const { name, label } = props
  const [options, setOptions] = React.useState<
    {
      label: string
      value: string
    }[]
  >([])

  return (
    <div>
      <p style={{ marginBottom: '0' }}>{typeof label === 'string' ? label : 'Product'}</p>
      <p
        style={{
          marginBottom: '0.75rem',
          color: 'var(--theme-elevation-400)',
        }}
      >
        {`Select the related Stripe product`}
        {'.'}
      </p>
      <Select {...props} options={options} />
    </div>
  )
}
