'use client'

import { create } from '@orama/orama'
import { useDocsSearch } from 'fumadocs-core/search/client'
import type { SortedResult } from 'fumadocs-core/search'
import type { SharedProps } from 'fumadocs-ui/components/dialog/search'
import { useMemo } from 'react'
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay
} from 'fumadocs-ui/components/dialog/search'

const CJK_REGEX = /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/

function cjkTokenize(text: string): string[] {
  const tokens: string[] = []
  const words = text
    .toLowerCase()
    .split(/[\s,.;:!?()[\]{}"'""''、。！？；：（）【】「」『』·…—\-/]+/)
    .filter(Boolean)
  tokens.push(...words)
  for (const word of words) {
    if (CJK_REGEX.test(word)) {
      for (let i = 0; i < word.length - 1; i++)
        tokens.push(word.slice(i, i + 2))
    }
  }
  return tokens
}

const CJK_LOCALES = new Set(['zh', 'ja'])

const ORAMA_LANGUAGES: Record<string, string> = {
  en: 'english',
  zh: 'chinese',
  ja: 'japanese'
}

function initOrama(locale?: string) {
  if (locale && CJK_LOCALES.has(locale)) {
    return create({
      schema: { _: 'string' as const },
      components: {
        tokenizer: { tokenize: cjkTokenize }
      }
    })
  }
  return create({
    schema: { _: 'string' as const },
    language: ORAMA_LANGUAGES[locale ?? 'en'] ?? 'english'
  })
}

interface Props extends SharedProps {
  api?: string
  delayMs?: number
  locale?: string
  links?: [name: string, href: string][]
}

export default function CustomSearchDialog({
  api,
  delayMs,
  locale,
  links = [],
  ...props
}: Props) {
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    from: api,
    locale,
    delayMs,
    initOrama
  })

  // Remove redundant page entries when the same page has matching heading entries
  const items = useMemo(() => {
    if (query.data === 'empty' || !query.data) return null
    const results = query.data as SortedResult[]
    const pagesWithHeadings = new Set<string>()
    for (const item of results) {
      if (item.type === 'heading' || item.type === 'text') {
        const pageUrl = item.url.split('#')[0]
        pagesWithHeadings.add(pageUrl)
      }
    }
    return results.filter(
      (item) => item.type !== 'page' || !pagesWithHeadings.has(item.url)
    )
  }, [query.data])

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
      <SearchDialogFooter />
    </SearchDialog>
  )
}
