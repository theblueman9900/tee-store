'use client'
import { useFilter } from '@/providers/Filter'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()
  const { setCategoryFilters, setSort } = useFilter()

  useEffect(() => {
    return () => {
      setCategoryFilters([])
      setSort('-createdAt')
    }
  }, [setCategoryFilters, setSort])

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  return <React.Fragment />
}

export default PageClient
