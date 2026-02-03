import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  // Default language (en-US) - no prefix
  index('routes/home.tsx', { id: 'home' }),
  route('docs', 'docs/page.tsx', { id: 'docs-index' }),
  route('docs/*', 'docs/page.tsx', { id: 'docs' }),

  // Other languages with prefix
  route(':lang', 'routes/home.tsx', { id: 'home-lang' }),
  route(':lang/docs', 'docs/page.tsx', { id: 'docs-lang-index' }),
  route(':lang/docs/*', 'docs/page.tsx', { id: 'docs-lang' })
] satisfies RouteConfig
