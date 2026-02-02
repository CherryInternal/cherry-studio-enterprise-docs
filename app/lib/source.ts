import { loader } from 'fumadocs-core/source'

import { create, docs } from '@/.source'
import { i18n } from './i18n'

let _source: ReturnType<typeof loader> | null = null

export async function getSource() {
  if (!_source) {
    _source = loader({
      source: await create.sourceAsync(docs.doc, docs.meta),
      baseUrl: '/docs',
      i18n
    })
  }
  return _source
}
