import clsx from 'clsx'
import React from 'react'
import { CMSLink } from '../Link'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const brandName = `The Blue Man`
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="flex flex-row justify-start items-end gap-1">
      <img
        alt="Payload Logo"
        width={193}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('w-full h-[34px]', className)}
        src="/assets/images/TBM-logo-white/fi-br-paper-plane.svg"
      />
      <p className={clsx('w-full text-3xl', className)}>The</p>
      <p className={clsx('w-full text-3xl', className)}>Blue</p>
      <p className={clsx('w-full text-3xl', className)}>Man</p>
    </div>
  )
}
