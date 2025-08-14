# Overview

This is an AI-powered chatbot application that combines real-time messaging with secure authentication. The application features a React frontend with a chat interface, user authentication through Nhost, and AI responses powered by external services. The system is designed with a full-stack architecture supporting both web and mobile interfaces, with plans for integration with GraphQL, n8n automation workflows, and OpenRouter AI services.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack React Query for server state, Apollo Client for GraphQL operations
- **Routing**: Wouter for lightweight client-side routing
- **Authentication**: Nhost React SDK for authentication state management

## Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication Service**: Nhost for user management and JWT-based authentication
- **GraphQL**: Apollo Client configured for both HTTP and WebSocket connections
- **Real-time**: GraphQL subscriptions for live chat updates

## Data Layer
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema**: Three main entities - users, chats, and messages with UUID primary keys
- **Database Provider**: Neon Database for serverless PostgreSQL
- **Migrations**: Drizzle Kit for schema migrations and database management

## Authentication & Security
- **Provider**: Nhost authentication service with email/password flow
- **Token Management**: JWT tokens with automatic refresh
- **Authorization**: Role-based access control planned with Hasura Row-Level Security
- **Session Handling**: Secure session management with HTTP-only cookies

## UI/UX Design System
- **Component Library**: Comprehensive Shadcn/ui component set including forms, navigation, feedback, and layout components
- **Theming**: CSS custom properties for light/dark mode support
- **Typography**: Inter font family with multiple weights
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure ARIA compliance and keyboard navigation

# External Dependencies

## Core Services
- **Nhost**: Backend-as-a-Service providing authentication, GraphQL API, and PostgreSQL database
- **Neon Database**: Serverless PostgreSQL database for data persistence
- **OpenRouter**: AI model API integration (planned for AI responses)
- **n8n**: Workflow automation platform (planned for AI pipeline)

## Development & Deployment
- **Replit**: Development environment with runtime error overlay and cartographer plugins
- **Netlify**: Frontend hosting and deployment (configured with build scripts and environment setup)
- **Vite**: Build tool with React plugin and custom asset handling
- **Deployment Files**: netlify.toml, vite.config.client.ts, build-client.js for Netlify deployment

## Third-party Libraries
- **Apollo Client**: GraphQL client with caching and real-time subscriptions
- **React Hook Form**: Form state management with Zod validation
- **Date-fns**: Date manipulation and formatting utilities
- **Embla Carousel**: Carousel component for UI interactions
- **Lucide React**: Icon library for consistent iconography

## AI & Automation Stack
- **GraphQL Subscriptions**: Real-time message delivery
- **Hasura Actions**: Custom business logic integration (planned)
- **WebSocket**: Real-time communication protocol for live updates
- **OpenRouter API**: Free AI model endpoints for chat responses (planned)