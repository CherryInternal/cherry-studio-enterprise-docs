'use client'

import { useState } from 'react'
import { useParams } from 'react-router'

import { i18n, locales } from '@/lib/i18n'

interface LocalizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

/**
 * Image component with automatic locale fallback
 *
 * Usage:
 * <LocalizedImage src="admin-demo.webp" alt="Admin Dashboard" />
 *
 * Will try to load:
 * 1. /assets/images/{currentLocale}/admin-demo.webp
 * 2. /assets/images/zh/admin-demo.webp (fallback)
 */
export function LocalizedImage({ src, alt, className, width, height }: LocalizedImageProps) {
  const params = useParams()
  const currentLocale = params.lang && locales.includes(params.lang as string) ? params.lang : i18n.defaultLanguage
  const fallbackLocale = 'zh'

  const [imgSrc, setImgSrc] = useState(`/assets/images/${currentLocale}/${src}`)
  const [hasFallback, setHasFallback] = useState(false)

  const handleError = () => {
    if (!hasFallback && currentLocale !== fallbackLocale) {
      setImgSrc(`/assets/images/${fallbackLocale}/${src}`)
      setHasFallback(true)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
      loading="lazy"
    />
  )
}

/**
 * Shared image component (no locale prefix)
 *
 * Usage:
 * <SharedImage src="logo.webp" alt="Logo" />
 *
 * Loads from: /assets/images/shared/logo.webp
 */
export function SharedImage({ src, alt, className, width, height }: LocalizedImageProps) {
  return (
    <img
      src={`/assets/images/shared/${src}`}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
    />
  )
}
