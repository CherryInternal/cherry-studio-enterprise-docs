#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs'
import { join, basename } from 'path'

const GITBOOK_DIR = '/Users/cherry-ai/workspace/cherry-studio-enterprise-gitbook-docs'
const OUTPUT_DIR = '/Users/cherry-ai/workspace/cse-checkouts/cherry-studio-enterprise-api-4/apps/docs/content/docs/zh/admin'

// Mapping from GitBook folder names to our folder names
const folderMapping = {
  'user-management_zh': 'user-management',
  'group-management_zh': 'group-management',
  'service-provider-management_zh': 'service-provider',
  'default-model-settings_zh': 'model-settings',
  'assistant-library_zh': 'assistant-library',
  'assistant-management_zh': 'assistant-management',
  'mini-program-management_zh': 'minapp',
  'knowledge-base-management_zh': 'knowledge-base',
  'mcp-server_zh': 'mcp-server',
  'usage-analytics_zh': 'usage-analytics',
  'system-settings_zh': 'system-settings',
  'authorization-management_zh': 'authorization',
  'about-us_zh': 'about'
}

// Chinese titles for meta.json
const folderTitles = {
  'user-management': '用户管理',
  'group-management': '分组管理',
  'service-provider': '服务商管理',
  'model-settings': '默认模型设置',
  'assistant-library': '助手库',
  'assistant-management': '助手管理',
  'minapp': '小程序管理',
  'knowledge-base': '知识库管理',
  'mcp-server': 'MCP 服务器',
  'usage-analytics': '用量统计',
  'system-settings': '系统设置',
  'authorization': '授权管理',
  'about': '关于我们'
}

function cleanFileName(name) {
  // Remove _zh suffix and .md extension
  let clean = name.replace(/_zh\.md$/, '.mdx')
  // Remove leading numbers like "1.-"
  clean = clean.replace(/^\d+\.-/, '')
  // Handle index files
  if (clean.includes('-management.mdx') || clean.includes('-settings.mdx') ||
      clean.includes('-library.mdx') || clean.includes('-server.mdx') ||
      clean.includes('-analytics.mdx') || clean.includes('-us.mdx')) {
    return 'index.mdx'
  }
  return clean
}

function convertContent(content, title) {
  let result = content

  // Extract title from H1 if exists
  const h1Match = result.match(/^#\s+(.+)$/m)
  const extractedTitle = h1Match ? h1Match[1].replace(/^\d+\.\s*/, '') : title

  // Update frontmatter - add title
  if (result.startsWith('---')) {
    const endIndex = result.indexOf('---', 3)
    const frontmatter = result.slice(0, endIndex + 3)
    const body = result.slice(endIndex + 3)

    // Add title to frontmatter
    const newFrontmatter = frontmatter.replace(
      '---\n',
      `---\ntitle: "${extractedTitle}"\n`
    )
    result = newFrontmatter + body
  } else {
    // Add frontmatter if missing
    result = `---\ntitle: "${extractedTitle}"\n---\n\n${result}`
  }

  // Update image paths
  result = result.replace(
    /\.\.\/(\.\.\/)?\.gitbook\/assets\//g,
    '/assets/images/zh/admin/'
  )

  // Convert GitBook hints to Callout
  result = result.replace(
    /\{%\s*hint\s+style="(\w+)"\s*%\}/g,
    (_, style) => {
      const typeMap = { warning: 'warn', info: 'info', success: 'info', danger: 'error' }
      return `<Callout type="${typeMap[style] || 'info'}">`
    }
  )
  result = result.replace(/\{%\s*endhint\s*%\}/g, '</Callout>')

  // Convert figure/img to standard markdown image
  result = result.replace(
    /<figure><img src="([^"]+)"[^>]*><figcaption><p>([^<]*)<\/p><\/figcaption><\/figure>/g,
    '![$2]($1)'
  )
  result = result.replace(
    /<figure><img src="([^"]+)"[^>]*><figcaption>([^<]*)<\/figcaption><\/figure>/g,
    '![$2]($1)'
  )

  // Add Callout import at the top if used
  if (result.includes('<Callout')) {
    const importStatement = "import { Callout } from 'fumadocs-ui/components/callout'\n\n"
    const frontmatterEnd = result.indexOf('---', 3) + 3
    result = result.slice(0, frontmatterEnd) + '\n\n' + importStatement + result.slice(frontmatterEnd + 2)
  }

  return result
}

function processFolder(gitbookFolder, outputFolder) {
  const gitbookPath = join(GITBOOK_DIR, 'enterprise-admin-console-manual_zh', gitbookFolder)
  const outputPath = join(OUTPUT_DIR, outputFolder)

  if (!existsSync(outputPath)) {
    mkdirSync(outputPath, { recursive: true })
  }

  const files = readdirSync(gitbookPath).filter(f => f.endsWith('.md'))
  const pages = []

  for (const file of files) {
    const content = readFileSync(join(gitbookPath, file), 'utf-8')
    const newFileName = cleanFileName(file)
    const pageName = newFileName.replace('.mdx', '')

    const converted = convertContent(content, folderTitles[outputFolder] || outputFolder)
    writeFileSync(join(outputPath, newFileName), converted)

    if (pageName !== 'index') {
      pages.push(pageName)
    }

    console.log(`  ${file} -> ${newFileName}`)
  }

  // Generate meta.json
  const meta = {
    title: folderTitles[outputFolder] || outputFolder,
    pages: ['index', ...pages.sort()]
  }
  writeFileSync(join(outputPath, 'meta.json'), JSON.stringify(meta, null, 2) + '\n')
  console.log(`  Generated meta.json`)
}

// Main
console.log('Converting GitBook docs to Fumadocs...\n')

for (const [gitbookFolder, outputFolder] of Object.entries(folderMapping)) {
  console.log(`Processing ${gitbookFolder} -> ${outputFolder}`)
  try {
    processFolder(gitbookFolder, outputFolder)
  } catch (e) {
    console.error(`  Error: ${e.message}`)
  }
  console.log('')
}

console.log('Done!')
