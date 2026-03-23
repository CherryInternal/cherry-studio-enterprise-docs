import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { Link, useParams } from 'react-router'

import { i18n, locales } from '@/lib/i18n'
import { baseOptions } from '@/lib/layout.shared'
import { getTranslations } from '@/lib/translations'

import type { Route } from './+types/home'

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang && locales.includes(params.lang) ? params.lang : i18n.defaultLanguage
  const t = getTranslations(lang)

  return [{ title: t.meta.title }, { name: 'description', content: t.meta.description }]
}

export default function Home() {
  const params = useParams()
  const lang = params.lang && locales.includes(params.lang) ? params.lang : i18n.defaultLanguage
  const t = getTranslations(lang)

  const docsPath = lang === i18n.defaultLanguage ? '/docs' : `/${lang}/docs`
  const setupPath = lang === i18n.defaultLanguage ? '/docs/setup' : `/${lang}/docs/setup`

  return (
    <HomeLayout {...baseOptions(lang)}>
      <div className="p-8 flex flex-col items-center justify-center text-center flex-1">
        <h1 className="text-4xl font-bold mb-4">{t.home.title}</h1>
        <h2 className="text-2xl font-semibold mb-3">{t.home.subtitle}</h2>
        <p className="text-fd-muted-foreground mb-6 text-lg">{t.home.description}</p>
        <div className="flex gap-4 mb-8">
          <Link
            className="text-sm bg-fd-primary text-fd-primary-foreground rounded-lg font-medium px-6 py-3"
            to={docsPath}
          >
            {t.home.getStarted}
          </Link>
          <Link
            className="text-sm border border-fd-border rounded-lg font-medium px-6 py-3 hover:bg-fd-accent"
            to={setupPath}
          >
            {t.home.deployGuide}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mt-8">
          <FeatureCard icon="🤖" title={t.features.modelManagement.title} description={t.features.modelManagement.description} />
          <FeatureCard icon="📚" title={t.features.knowledgeBase.title} description={t.features.knowledgeBase.description} />
          <FeatureCard icon="🔐" title={t.features.accessControl.title} description={t.features.accessControl.description} />
          <FeatureCard icon="🏢" title={t.features.privateDeployment.title} description={t.features.privateDeployment.description} />
          <FeatureCard icon="⚡" title={t.features.backendService.title} description={t.features.backendService.description} />
          <FeatureCard icon="🛡️" title={t.features.security.title} description={t.features.security.description} />
        </div>
      </div>
    </HomeLayout>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 border border-fd-border rounded-lg">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-fd-muted-foreground">{description}</p>
    </div>
  )
}
