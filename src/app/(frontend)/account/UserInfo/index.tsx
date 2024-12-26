'use client'

import React from 'react'
import Image from 'next/image'

import { useAuth } from '@/providers/Auth'

import classes from './index.module.scss'

export const UserInfo = () => {
  const { user } = useAuth()

  return (
    <div className={classes.profile}>
      <img src="/assets/icons/profile.svg" alt="profile" className={classes.profileImage} />

      <div className={classes.profileInfo}>
        <p className={classes.name}>{user?.name}</p>
        <p className={classes.email}>{user?.email}</p>
      </div>
    </div>
  )
}
