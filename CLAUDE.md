# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the VitePress-based documentation site for Cherry Studio Enterprise. It provides comprehensive documentation for the Cherry Studio Enterprise platform, including setup guides, admin features, client usage, and deployment instructions.

## Technology Stack

- **Framework**: VitePress 1.6.4 (Vue-powered static site generator)
- **Language**: Markdown with Vue components support
- **Package Manager**: Yarn
- **Build Tool**: Vite

## Essential Commands

### Development

```bash
yarn dev         # Start development server at localhost:5173
```

### Build & Preview

```bash
yarn build       # Build static site to src/.vitepress/dist
yarn preview     # Preview production build locally
```

## Architecture & Structure

### Directory Layout

```
docs/
├── src/                      # Documentation source files
│   ├── .vitepress/          # VitePress configuration and build output
│   │   ├── config.mts       # VitePress configuration file
│   │   └── dist/            # Built static site output
│   ├── assets/              # Static assets
│   │   └── images/          # Documentation images
│   ├── setup/               # Deployment and setup guides
│   │   ├── docker.md        # Docker deployment guide
│   │   ├── helm.md          # Kubernetes Helm deployment
│   │   ├── database.md      # Database configuration
│   │   └── casdoor.md       # SSO authentication setup
│   ├── index.md             # Homepage (uses VitePress home layout)
│   ├── docs.md              # Main documentation entry point
│   ├── admin.md             # Admin panel documentation
│   ├── client.md            # Client application guide
│   └── pricing.md           # Pricing information
├── package.json             # Project dependencies and scripts
└── yarn.lock               # Dependency lock file
```

### VitePress Configuration

The site configuration is defined in `src/.vitepress/config.mts`:

- **Localization**: Chinese (zh-CN) with translated UI elements
- **Search**: Local search provider with Chinese translations
- **Navigation**: Top nav bar with Home, Docs, and Pricing sections
- **Sidebar**: Two-level sidebar with Introduction and Setup sections
- **Theme**: Default VitePress theme with custom Chinese labels

### Content Organization

1. **Introduction Section** (`/docs`, `/admin`, `/client`, `/pricing`)
   - Overview of Cherry Studio Enterprise features
   - Admin backend capabilities and demo access
   - Client application features
   - Pricing plans and comparisons

2. **Setup Guides** (`/setup/*`)
   - Docker deployment with docker-compose examples
   - Kubernetes deployment using Helm charts
   - PostgreSQL/SQLite database configuration
   - Casdoor SSO integration

### Key Documentation Pages

- `index.md`: Landing page with hero section and feature cards
- `docs.md`: Main documentation hub with links to all sections
- `admin.md`: Detailed admin panel features and usage
- `client.md`: Client application installation and features
- `setup/docker.md`: Complete Docker deployment guide with environment variables

## Development Workflow

### Adding New Documentation

1. Create new `.md` file in appropriate directory
2. Add page to sidebar in `src/.vitepress/config.mts`
3. Use Markdown with optional Vue components for rich content
4. Place images in `src/assets/images/`

### Updating Navigation

Edit `src/.vitepress/config.mts`:
- `nav`: Top navigation bar items
- `sidebar`: Side navigation structure
- `socialLinks`: Social media links

### Building for Production

1. Run `yarn build` to generate static site
2. Output is in `src/.vitepress/dist/`
3. Deploy dist folder to any static hosting service

## Important Notes

- All documentation is in Chinese
- Images use WebP format for optimization
- Site includes demo links to live environments
- Contact information and feedback forms are provided