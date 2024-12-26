import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '@/components/Gutter'
import { RenderParams } from '@/components/RenderParams'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'

export default async function RecoverPassword() {
  return (
    <section className={classes.recoverPassword}>
      <div className={classes.heroImg}>
        <Link href="/">
          {/* <Image
            // src="/TheBlueMan-Logo-Title-Black.png"
            alt="logo"
            width={250}
            height={23}
            className={classes.logo}
          /> */}
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <Link href="/login" className={classes.backLink}>
            <Image
              src="/assets/icons/arrow-left.svg"
              className="dark:invert"
              alt="left arrow"
              width={24}
              height={24}
            />
            <p className="dark:invert">Back</p>
          </Link>
          <div className={classes.formTitle}>
            <h3>Forgot Password</h3>
          </div>
          <RecoverPasswordForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Recover Password',
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password',
  }),
}
