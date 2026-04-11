import { PageBreadcrumb } from 'fumadocs-ui/layouts/docs/page'

/**
 * Only renders the breadcrumb when there are 2+ levels.
 * Top-level pages (e.g. 介绍, 快速开始, 管理后台) won't show a breadcrumb.
 */
export function ConditionalBreadcrumb() {
  return (
    <PageBreadcrumb
      includePage
      className="empty:hidden [&:not(:has(svg))]:hidden"
    />
  )
}
