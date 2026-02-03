'use client'

import { ReactRouterProvider } from 'fumadocs-core/framework/react-router'
import { RootProvider } from 'fumadocs-ui/provider/base'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import {
  getLocaleFromPath,
  getLocalizedPath,
  getPreferredLocale,
  i18n,
  i18nProvider,
  setPreferredLocale
} from './i18n'

export function Providers({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isReady, setIsReady] = useState(false)

  const currentLocale = getLocaleFromPath(location.pathname)

  // Auto-detect and redirect on first visit to root paths
  useEffect(() => {
    const isRootPath = location.pathname === '/' || location.pathname === '/docs'
    const isDefaultLocale = currentLocale === i18n.defaultLanguage

    if (isRootPath && isDefaultLocale) {
      const preferredLocale = getPreferredLocale()

      if (preferredLocale !== i18n.defaultLanguage) {
        const newPath = getLocalizedPath(location.pathname, preferredLocale)
        navigate(newPath, { replace: true })
        return
      }
    }

    setIsReady(true)
  }, [location.pathname, currentLocale, navigate])

  // Handle hash scroll (ScrollRestoration conflicts with native hash scrolling)
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = decodeURIComponent(location.hash.slice(1))
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.hash, location.pathname])

  if (!isReady) {
    return null
  }

  const i18nConfig = i18nProvider(currentLocale)

  return (
    <ReactRouterProvider>
      <RootProvider
        i18n={{
          ...i18nConfig,
          onLocaleChange: (newLocale) => {
            setPreferredLocale(newLocale)
            const newPath = getLocalizedPath(location.pathname, newLocale)
            navigate(newPath)
          }
        }}
      >
        {children}
      </RootProvider>
    </ReactRouterProvider>
  )
}
