import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { i18n, locales, setPreferredLocale } from '@/lib/i18n'

export default function Home() {
  const params = useParams()
  const explicitLang = params.lang && locales.includes(params.lang) ? params.lang : null
  const lang = explicitLang ?? i18n.defaultLanguage
  const docsPath = lang === i18n.defaultLanguage ? '/docs' : `/${lang}/docs`
  const navigate = useNavigate()

  useEffect(() => {
    if (explicitLang) setPreferredLocale(explicitLang)
    navigate(docsPath, { replace: true })
  }, [docsPath, explicitLang, navigate])

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${docsPath}`} />
      <noscript>
        <p style={{ padding: '2rem', textAlign: 'center' }}>
          Redirecting to <a href={docsPath}>{docsPath}</a>...
        </p>
      </noscript>
    </>
  )
}
