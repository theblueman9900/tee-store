'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer, Media } from '@/payload-types'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { inclusions, noHeaderFooterUrls, profileNavItems } from '@/constants'
import { Button } from '@/components/Button'
import { Gutter } from '@/components/Gutter'

import classes from './index.module.scss'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <footer className={pathname && noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <Gutter>
        <ul className={classes.inclusions}>
          {inclusions.map((inclusion) => (
            <li key={inclusion.title}>
              <Image
                src={inclusion.icon}
                alt={inclusion.title}
                width={36}
                height={36}
                className={classes.icon}
              />
              <h5 className={classes.title}>{inclusion.title}</h5>
              <p>{inclusion.description}</p>
            </li>
          ))}
        </ul>
      </Gutter>

      <div className={classes.footer}>
        <Gutter>
          <div className={classes.wrap}>
            <Link href="/">
              <Logo />
            </Link>
            {/* <p>{footer?.copyright}</p> */}
            <div className={classes.socialLinks}>
              {navItems.map((item, i) => {
                const icon = item?.link?.icon as Media

                return (
                  <div key={item?.link?.label}>
                    {item?.link?.url && item?.link?.label && item?.link?.icon ? (
                      <Button
                        key={item.link.label}
                        el="link"
                        href={item.link.url!}
                        newTab={true}
                        className={classes.socialLinkItem}
                      >
                        {icon ? (
                          <Image
                            src={icon?.url!}
                            alt={item.link.label}
                            width={24}
                            height={24}
                            className={classes.socialIcon}
                          />
                        ) : (
                          <span>{item?.link?.label}</span>
                        )}
                      </Button>
                    ) : (
                      <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
                        <nav className="flex flex-col md:flex-row gap-4">
                          <CMSLink className="text-white" key={i} {...item.link} />
                        </nav>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <ThemeSelector />
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
