import { CopyToClipboard, Select } from '@payloadcms/ui'
import { TextField } from 'payload'
import * as React from 'react'

export const CustomerSelect: React.FC<TextField> = props => {
  const { name, label } = props
  const [options, setOptions] = React.useState<
    {
      label: string
      value: string
    }[]
  >([])

  React.useEffect(() => {}, [])

  return (
    <div>
      <p style={{ marginBottom: '0' }}>{typeof label === 'string' ? label : 'Customer'}</p>
      <p
        style={{
          marginBottom: '0.75rem',
          color: 'var(--theme-elevation-400)',
        }}
      >
        {`Select the related Stripe customer or `}
        <a target="_blank" rel="noopener noreferrer" style={{ color: 'var(--theme-text' }}>
          create a new one
        </a>
        {'.'}
      </p>
      <Select {...props} options={options} />
      {
        <div>
          <div>
            <span
              className="label"
              style={{
                color: '#9A9A9A',
              }}
            ></span>
            <CopyToClipboard value={''} />
          </div>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: '600',
            }}
          >
            <a target="_blank" rel="noreferrer noopener">
              {'Link'}
            </a>
          </div>
        </div>
      }
    </div>
  )
}
