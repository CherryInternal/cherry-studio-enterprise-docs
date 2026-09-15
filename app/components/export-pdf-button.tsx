'use client'

import { useEffect } from 'react'
import { useParams } from 'react-router'

import { cn } from 'fumadocs-ui/utils/cn'
import { Printer } from 'lucide-react'

import { i18n, isLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'

/**
 * The browser always prints onto white paper, so a page printed while the dark
 * theme is active comes out as light text on white. Drop the dark class for the
 * duration of the print job and restore it afterwards.
 *
 * Bound to the window events rather than to the button's click handler so that
 * Cmd+P behaves the same as the button. Call once per page.
 */
export function usePrintLightTheme() {
  useEffect(() => {
    const root = document.documentElement
    let restore: (() => void) | null = null

    const onBeforePrint = () => {
      if (!root.classList.contains('dark')) return
      const previousColorScheme = root.style.colorScheme
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
      restore = () => {
        root.classList.add('dark')
        root.style.colorScheme = previousColorScheme
      }
    }

    const onAfterPrint = () => {
      restore?.()
      restore = null
    }

    window.addEventListener('beforeprint', onBeforePrint)
    window.addEventListener('afterprint', onAfterPrint)
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint)
      window.removeEventListener('afterprint', onAfterPrint)
      onAfterPrint()
    }
  }, [])
}

/**
 * Opens the browser print dialog for the current page. The print stylesheet in
 * `app.css` strips the layout chrome, so choosing "Save as PDF" as the print
 * destination yields a PDF of just the article.
 */
export function ExportPdfButton({ className }: { className?: string }) {
  const params = useParams()
  const locale = isLocale(params.lang) ? params.lang : i18n.defaultLanguage
  const t = getTranslations(locale)

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        'print:hidden inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
        className
      )}
    >
      <Printer className="size-3.5 shrink-0" />
      {t.pdf.export}
    </button>
  )
}
