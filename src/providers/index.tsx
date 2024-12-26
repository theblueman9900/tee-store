import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { AuthProvider } from './Auth'
import { FilterProvider } from './Filter'
import { CartProvider } from './Cart'
import { VarientProvider } from './Varient'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FilterProvider>
          <VarientProvider>
            <CartProvider>
              <HeaderThemeProvider>{children}</HeaderThemeProvider>
            </CartProvider>
          </VarientProvider>
        </FilterProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
