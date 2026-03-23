'use client'

import type * as PageTree from 'fumadocs-core/page-tree'
import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator
} from 'fumadocs-ui/components/layout/sidebar'
import { useTreePath } from 'fumadocs-ui/contexts/tree'
import { icons } from 'lucide-react'
import type { ReactNode } from 'react'

function renderIcon(icon: ReactNode): ReactNode {
  if (!icon) return null
  if (typeof icon !== 'string') return icon

  const Icon = icons[icon as keyof typeof icons]
  if (!Icon) return null

  return <Icon className="size-4 shrink-0" />
}

export function Item({ item }: { item: PageTree.Item }) {
  return (
    <SidebarItem href={item.url} external={item.external} icon={renderIcon(item.icon)}>
      {item.name}
    </SidebarItem>
  )
}

export function Folder({
  item,
  level,
  children
}: {
  item: PageTree.Folder
  level: number
  children: ReactNode
}) {
  const path = useTreePath()
  const isOpen = item.defaultOpen || path.includes(item)

  return (
    <SidebarFolder defaultOpen={isOpen}>
      {item.index ? (
        <SidebarFolderLink href={item.index.url} external={item.index.external}>
          {renderIcon(item.icon)}
          {item.name}
        </SidebarFolderLink>
      ) : (
        <SidebarFolderTrigger>
          {renderIcon(item.icon)}
          {item.name}
        </SidebarFolderTrigger>
      )}
      <SidebarFolderContent>{children}</SidebarFolderContent>
    </SidebarFolder>
  )
}

export function Separator({ item }: { item: PageTree.Separator }) {
  return (
    <SidebarSeparator>
      {renderIcon(item.icon)}
      {item.name}
    </SidebarSeparator>
  )
}

export const sidebarComponents = { Item, Folder, Separator }
