import { defineI18n } from 'fumadocs-core/i18n'
import { defineI18nUI } from 'fumadocs-ui/i18n'

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'zh', 'ja'],
  hideLocale: 'default-locale',
  parser: 'dir'
})

export const locales = i18n.languages

export const localeNames: Record<string, string> = {
  en: 'English',
  zh: '简体中文',
  ja: '日本語'
}

// Fumadocs UI i18n provider
export const { provider: i18nProvider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
      search: 'Search',
      searchNoResult: 'No results found',
      toc: 'On this page',
      tocNoHeadings: 'No headings',
      lastUpdate: 'Last updated on',
      chooseLanguage: 'Language',
      nextPage: 'Next',
      previousPage: 'Previous',
      chooseTheme: 'Theme',
      editOnGithub: 'Edit on GitHub'
    },
    zh: {
      displayName: '简体中文',
      search: '搜索',
      searchNoResult: '没有找到结果',
      toc: '本页目录',
      tocNoHeadings: '无标题',
      lastUpdate: '最后更新于',
      chooseLanguage: '语言',
      nextPage: '下一页',
      previousPage: '上一页',
      chooseTheme: '主题',
      editOnGithub: '在 GitHub 上编辑'
    },
    ja: {
      displayName: '日本語',
      search: '検索',
      searchNoResult: '結果が見つかりません',
      toc: 'このページの内容',
      tocNoHeadings: '見出しなし',
      lastUpdate: '最終更新日',
      chooseLanguage: '言語',
      nextPage: '次へ',
      previousPage: '前へ',
      chooseTheme: 'テーマ',
      editOnGithub: 'GitHub で編集'
    }
  }
})

export function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && locales.includes(firstSegment)) {
    return firstSegment
  }

  return i18n.defaultLanguage
}

export function getLocalizedPath(pathname: string, targetLocale: string): string {
  // Remove current locale prefix if exists
  let cleanPath = pathname
  for (const locale of locales) {
    if (locale !== i18n.defaultLanguage && pathname.startsWith(`/${locale}`)) {
      cleanPath = pathname.slice(`/${locale}`.length) || '/'
      break
    }
  }

  // Add target locale prefix if not default
  if (targetLocale === i18n.defaultLanguage) {
    return cleanPath
  }

  return `/${targetLocale}${cleanPath === '/' ? '' : cleanPath}`
}

/**
 * Detect user's preferred language from browser settings
 */
export function detectBrowserLocale(): string {
  if (typeof navigator === 'undefined') {
    return i18n.defaultLanguage
  }

  const browserLanguages = navigator.languages || [navigator.language]

  for (const browserLang of browserLanguages) {
    // Exact match
    if (locales.includes(browserLang)) {
      return browserLang
    }

    // Match by language code (e.g., zh-CN -> zh)
    const langCode = browserLang.split('-')[0]
    if (locales.includes(langCode)) {
      return langCode
    }
  }

  return i18n.defaultLanguage
}

const LOCALE_STORAGE_KEY = 'preferred-locale'

export function getPreferredLocale(): string {
  if (typeof localStorage === 'undefined') {
    return detectBrowserLocale()
  }

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && locales.includes(stored)) {
    return stored
  }

  return detectBrowserLocale()
}

export function setPreferredLocale(locale: string): void {
  if (typeof localStorage !== 'undefined' && locales.includes(locale)) {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }
}
