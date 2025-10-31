# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for Cherry Studio Enterprise API, built with Fumadocs - a React-based documentation framework. The site is configured as a **fully static website** using React Router 7 with static prerendering (no server-side rendering or API routes).

## Technology Stack

- **Framework**: React Router 7 (static mode, SSR disabled)
- **Documentation**: Fumadocs (fumadocs-core, fumadocs-mdx, fumadocs-ui)
- **Content Format**: MDX (Markdown with JSX components)
- **Styling**: Tailwind CSS 4 (via @tailwindcss/vite)
- **Build Tool**: Vite 7
- **Code Quality**: Biome (linting and formatting)
- **Language**: TypeScript
- **Package Manager**: Yarn

## Essential Commands

### Development

```bash
yarn dev              # Start development server (hot reload)
```

### Build & Production

```bash
yarn build            # Build for production (generates SSR + static pages)
yarn start            # Start production server
yarn typecheck        # Type check with TypeScript
```

### Code Quality

```bash
yarn lint             # Run Biome linter
yarn format           # Format code with Biome
```

### Content Management

```bash
yarn postinstall      # Process MDX files (runs automatically after install)
```

## Architecture & Structure

### Directory Structure

- **app/** - React Router application code
  - `routes/` - Route components
  - `lib/` - Shared utilities and configuration (source.ts for docs loader)
  - `root.tsx` - Root app component
  - `routes.ts` - Route definitions
- **content/docs/** - MDX documentation files (Chinese content)
  - `meta.json` - Navigation structure and page ordering
  - `setup/` - Setup and deployment guides
  - Individual MDX files for each documentation page
- **public/** - Static assets
- **.source/** - Generated files from fumadocs-mdx (auto-generated, gitignored)

### Configuration Files

- **source.config.ts** - Fumadocs MDX configuration
  - Defines docs directory as `content/docs`
  - Configures git-based last modified time tracking
- **react-router.config.ts** - React Router configuration
  - Enables SSR
  - Configures static prerendering for all MDX pages
  - Base URL set to `/docs`
- **vite.config.ts** - Vite build configuration with plugins:
  - `fumadocs-mdx` - MDX processing
  - `@tailwindcss/vite` - Tailwind CSS integration
  - `@react-router/dev/vite` - React Router integration
  - `vite-tsconfig-paths` - TypeScript path mapping
- **biome.json** - Code quality rules and formatting

### Content Management Workflow

1. **Creating New Pages**:
   - Add new `.mdx` files to `content/docs/` or subdirectories
   - Update `meta.json` to include the page in navigation
   - Use frontmatter for title and description:
     ```yaml
     ---
     title: Page Title
     description: Page description
     ---
     ```

2. **Navigation Structure**:
   - Controlled by `content/docs/meta.json`
   - Use `"---"` for separators in navigation
   - Folder names become navigation sections

3. **MDX Processing**:
   - MDX files are processed by fumadocs-mdx during `postinstall`
   - Generated TypeScript files are placed in `.source/` directory
   - The source loader in `app/lib/source.ts` loads processed content

### Build & Deployment

- **Static Site Generation**: The build process generates a fully static site with all pages pre-rendered at build time
- **No Server Required**: All pages are static HTML/CSS/JS - can be deployed to any static hosting (GitHub Pages, Cloudflare Pages, Vercel, etc.)
- **Prerendering**: All MDX documentation pages are statically generated during build for optimal performance and SEO
- **Client-Side Only**: No server-side rendering or API routes - the site runs entirely in the browser after initial page load

### Documentation Language

- Primary language: Chinese (Simplified)
- Content targets enterprise users deploying Cherry Studio Enterprise API

## Development Workflow

### Adding New Documentation

1. Create new `.mdx` file in appropriate `content/docs/` subdirectory
2. Add frontmatter with title and description
3. Update `content/docs/meta.json` to include the page
4. The page will be automatically processed on next build
5. Development server will hot-reload changes

### Modifying Existing Pages

1. Edit `.mdx` files directly in `content/docs/`
2. Save - hot reload will update the page immediately
3. No build step needed during development

### Adding Custom Components

1. Create React components in `app/` directory
2. Import and use them in MDX files
3. Fumadocs UI components are available by default
