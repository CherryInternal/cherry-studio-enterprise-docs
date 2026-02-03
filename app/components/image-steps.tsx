'use client'

import { useState } from 'react'
import { useParams } from 'react-router'

import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { cn } from 'fumadocs-ui/utils/cn'

import { i18n, locales } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'

export interface Step {
  title: string
  image: string
}

export interface ImageStepsProps {
  title?: string
  /** 图片基础路径，如 "cloudappinstall"，会自动拼接为 /assets/images/{lang}/{basePath}/ */
  basePath?: string
  steps: Step[]
  className?: string
}

interface StepImageProps {
  src: string
  alt: string
  basePath?: string
  currentLocale: string
  fallbackLocale: string
  visible: boolean
}

function getImagePath(src: string, locale: string, basePath?: string) {
  if (basePath) {
    return `/assets/images/${locale}/${basePath}/${src}`
  }
  const localePattern = /^\/assets\/images\/([a-z]{2})\//
  const match = src.match(localePattern)
  if (match) {
    return src.replace(localePattern, `/assets/images/${locale}/`)
  }
  return src
}

/**
 * 带 fallback 功能的图片组件
 */
function StepImage({ src, alt, basePath, currentLocale, fallbackLocale, visible }: StepImageProps) {
  const [imgSrc, setImgSrc] = useState(getImagePath(src, currentLocale, basePath))
  const [hasFallback, setHasFallback] = useState(false)

  const handleError = () => {
    if (!hasFallback && currentLocale !== fallbackLocale) {
      setImgSrc(getImagePath(src, fallbackLocale, basePath))
      setHasFallback(true)
    }
  }

  return (
    <div className={cn('transition-opacity duration-200', visible ? 'block' : 'hidden')}>
      <ImageZoom>
        <img
          src={imgSrc}
          alt={alt}
          className="w-full rounded-lg border"
          onError={handleError}
        />
      </ImageZoom>
    </div>
  )
}

export function ImageSteps({ title, basePath, steps, className }: ImageStepsProps) {
  const [current, setCurrent] = useState(0)
  const total = steps.length

  const params = useParams()
  const currentLocale = params.lang && locales.includes(params.lang as string) ? params.lang : i18n.defaultLanguage
  const t = getTranslations(currentLocale as string)
  const fallbackLocale = 'zh'

  const goTo = (index: number) => {
    if (index >= 0 && index < total) {
      setCurrent(index)
    }
  }

  const goPrev = () => goTo(current - 1)
  const goNext = () => goTo(current + 1)

  return (
    <div className={cn('not-prose my-4 rounded-xl border bg-fd-card shadow-md overflow-hidden', className)}>
      {/* Header */}
      {title && (
        <div className="px-4 py-3 border-b bg-fd-muted/50">
          <h4 className="font-medium text-fd-foreground">{title}</h4>
        </div>
      )}

      {/* Progress bar */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-fd-muted-foreground">
            {t.imageSteps.step} {current + 1} / {total}
          </span>
          <div className="flex-1 h-1.5 bg-fd-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-fd-primary transition-all duration-300"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step title */}
      <div className="px-4 pb-2">
        <p className="text-sm font-medium text-fd-foreground">
          {steps[current].title}
        </p>
      </div>

      {/* Images - 预渲染所有图片，用 CSS 控制显示 */}
      <div className="px-4 pb-3">
        {steps.map((step, index) => (
          <StepImage
            key={index}
            src={step.image}
            alt={step.title}
            basePath={basePath}
            currentLocale={currentLocale as string}
            fallbackLocale={fallbackLocale}
            visible={index === current}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="px-4 pb-4 flex items-center justify-between">
        {/* Step dots */}
        <div className="flex gap-1.5">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                index === current
                  ? 'bg-fd-primary'
                  : 'bg-fd-muted-foreground/30 hover:bg-fd-muted-foreground/50'
              )}
              aria-label={`${t.imageSteps.goToStep} ${index + 1}`}
            />
          ))}
        </div>

        {/* Prev/Next buttons */}
        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className={cn(
              'px-3 py-1.5 text-sm rounded-md border transition-colors',
              current === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-fd-accent'
            )}
          >
            {t.imageSteps.prev}
          </button>
          <button
            onClick={goNext}
            disabled={current === total - 1}
            className={cn(
              'px-3 py-1.5 text-sm rounded-md border transition-colors',
              current === total - 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-fd-accent'
            )}
          >
            {t.imageSteps.next}
          </button>
        </div>
      </div>
    </div>
  )
}
