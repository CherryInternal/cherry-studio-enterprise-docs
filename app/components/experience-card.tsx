'use client'

import { ExternalLink, Download, Copy, Check } from 'lucide-react'
import { type ReactNode, useState } from 'react'

interface ExperienceCardProps {
  step: number
  title: string
  description: string
  items: { label: string; value: string }[]
  buttonText: string
  buttonHref: string
  buttonIcon?: 'external' | 'download'
}

function CopyableValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-2 font-mono text-sm hover:text-blue-500 transition-colors cursor-pointer bg-transparent border-none p-0"
    >
      <span>{value}</span>
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-fd-muted-foreground" />}
    </button>
  )
}

export function ExperienceCard({
  step,
  title,
  description,
  items,
  buttonText,
  buttonHref,
  buttonIcon = 'external'
}: ExperienceCardProps) {
  const Icon = buttonIcon === 'download' ? Download : ExternalLink

  return (
    <div className="flex flex-col rounded-xl p-6" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }}>
      <div className="flex items-start gap-4 mb-6">
        <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white text-base font-semibold">
          {step}
        </span>
        <div>
          <h3 className="text-base font-bold m-0">{title}</h3>
          <p className="text-fd-muted-foreground text-sm m-0 mt-1">{description}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6 px-1">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-fd-muted-foreground">{item.label}</span>
            <CopyableValue value={item.value} />
          </div>
        ))}
      </div>

      <a
        href={buttonHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl text-sm font-medium no-underline hover:opacity-90 transition-opacity"
      >
        <Icon className="w-4 h-4" />
        {buttonText}
      </a>
    </div>
  )
}

export function ExperienceCards({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      {children}
    </div>
  )
}
