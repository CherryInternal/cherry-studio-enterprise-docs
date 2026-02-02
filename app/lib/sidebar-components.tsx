'use client'

import type * as PageTree from 'fumadocs-core/page-tree'
import { icons } from 'lucide-react'
import { createElement, type ReactNode } from 'react'
import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator
} from 'fumadocs-ui/components/layout/sidebar'

function renderIcon(icon: ReactNode | undefined): ReactNode {
  if (!icon) return null
  if (typeof icon !== 'string') return icon
  const Icon = icons[icon as keyof typeof icons]
  if (!Icon) return null
  return createElement(Icon)
}

export function Item({ item }: { item: PageTree.Item }) {
  return (
    <SidebarItem href={item.url} external={item.external} icon={renderIcon(item.icon)}>
      {item.name}
    </SidebarItem>
  )
}

export function Folder({ item, children }: { item: PageTree.Folder; level: number; children: ReactNode }) {
  const icon = renderIcon(item.icon)
  return (
    <SidebarFolder defaultOpen={item.defaultOpen}>
      {item.index ? (
        <SidebarFolderLink href={item.index.url} external={item.index.external}>
          {icon}
          {item.name}
        </SidebarFolderLink>
      ) : (
        <SidebarFolderTrigger>
          {icon}
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
