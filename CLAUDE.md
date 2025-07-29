# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (recommended)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Architecture Overview

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS. The project follows a soccer team management system architecture with role-based features.

### Key Structure Patterns

- **Route Groups**: Uses Next.js route groups with `(auth)`, `(dashboard)`, `(root)` for logical organization
- **Component Organization**: 
  - `components/landing/` - Landing page components (Header, Footer, HeroSection, etc.)
  - `components/layouts/` - Layout wrappers (AuthLayout, Layout)
  - `components/dashboard/` - Dashboard-specific components
  - `components/shared/` - Reusable components across features
  - `components/ui/` - Basic UI components
- **Path Aliases**: Uses `@/*` for root-level imports configured in tsconfig.json

### Technology Stack

- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with custom globals.css
- **Development**: ESLint with Next.js TypeScript preset
- **Performance**: Dynamic imports used for landing page sections

### Current Implementation State

The application appears to be in early development:
- Landing page structure is implemented with Header/Footer
- Authentication routes exist but are placeholder components
- Dashboard structure is planned but not fully implemented
- Uses basic Tailwind styling with responsive design considerations

### Development Notes

- The app uses `suppressHydrationWarning` in root layout
- Dynamic imports are used for performance optimization on landing page
- Component structure suggests role-based dashboard system (team managers, coaches, players)
- Authentication system is currently mock/placeholder (mentioned in README)