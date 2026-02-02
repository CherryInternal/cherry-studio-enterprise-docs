'use client'

import { DynamicLink } from 'fumadocs-core/dynamic-link'
import type { ReactNode } from 'react'

import { cn } from 'fumadocs-ui/utils/cn'

export interface CardProps {
  icon?: ReactNode
  title: string
  description?: string
  href?: string
  children?: ReactNode
  className?: string
}

export function Card({ icon, title, description, href, children, className }: CardProps) {
  const Wrapper = href ? DynamicLink : 'div'
  const wrapperProps = href ? { href } : {}

  return (
    <Wrapper
      {...wrapperProps}
      data-card
      className={cn(
        'block rounded-xl border bg-fd-card p-4 text-fd-card-foreground transition-colors @max-lg:col-span-full',
        href && 'hover:bg-fd-accent/80',
        className
      )}
    >
      {icon ? (
        <div className="not-prose mb-2 w-fit shadow-md rounded-lg border bg-fd-muted p-1.5 text-fd-muted-foreground [&_svg]:size-4">
          {icon}
        </div>
      ) : null}
      <h3 className="not-prose mb-1 text-sm font-medium">{title}</h3>
      {description ? <p className="!my-0 text-sm text-fd-muted-foreground">{description}</p> : null}
      <div className="text-sm text-fd-muted-foreground prose-no-margin empty:hidden">{children}</div>
    </Wrapper>
  )
}

export function Cards({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('grid grid-cols-2 gap-3 @container', className)}>{children}</div>
}
