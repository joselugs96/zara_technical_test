# Zara Technical Test - Phone Store

A modern e-commerce application for browsing and purchasing phones, built with Next.js, React, and TypeScript. The application features server-side rendering, client-side cart management, and automated testing.

## Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- Docker & Docker Compose (optional, for containerized deployment)
- npm or yarn

### Development

1. **Clone and install:**

   ```bash
   git clone <repository>
   cd zara_technical_test
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API credentials
   ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

4. **Run tests:**
   ```bash
   npm test              # Run tests once
   npm run test:watch    # Watch mode
   npm run test:coverage # With coverage report
   ```

### Production Build & Deployment

1. **Build for production:**

   ```bash
   npm run build
   ```

   Creates optimized production bundle in `.next/` directory.

2. **Run production server:**

   ```bash
   npm start
   ```

   Starts the application on `http://localhost:3000` (port configurable via `PORT` env var).

3. **Using Docker:**

   ```bash
   docker-compose up --build
   ```

## Features

- ✅ **Product Browsing**: Search and filter phones
- ✅ **Shopping Cart**: Add/remove items with persistent storage
- ✅ **Global State**: Cart state managed via React Context API with `localStorage` persistence
- ✅ **Phone Details**: Variant selection (color, storage) with dynamic price updates
- ✅ **Responsive Design**: Mobile-first layout using SCSS Modules
- ✅ **Server-Side Rendering**: Powered by Next.js App Router
- ✅ **TypeScript**: Type-safe codebase
- ✅ **Accessibility**: Semantic HTML, keyboard navigation and selective ARIA usage

## Project Architecture

The application follows a **feature-based modular** architecture, with a clear separation of concerns between routing, business logic, UI components and shared utilities.

```
src/
├── app/                # Next.js App Router (routes & layouts)
│   ├── api/            # API routes (SSR proxies)
│   ├── phone/          # Phone detail route
│   └── cart/           # Cart route
│
├── features/           # Feature-based modules
│   ├── phones/         # Product listing feature
│   ├── phone-detail    # Product detail feature
│   └── cart/           # Shopping cart feature
│
├── shared/             # Reusable app-wide code
│   ├── components/     # Shared UI components
│   ├── context/        # Global state (CartContext)
│   └── lib/            # Utilities and helpers
│
└── styles/             # Global styles and design

```

### Architecture Principles

**Feature-Based Organization**: Each feature module (`phones`, `phone-detail`, `cart`) is self-contained with its own components, services, hooks, and types. This improves scalability and team collaboration.

**Separation of Concerns**:

- `app/`: Routing and page structure
- `features/`: Domain-specific business logic
- `shared/`: Reusable utilities and components
- `styles/`: Global styling

## Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Production build
npm start             # Run production server
npm test              # Run test suite
npm run test:watch    # Test watch mode
npm run test:coverage # Generate coverage report
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

## Data Fetching & API

The application uses **Next.js Route Handlers** as a thin proxy layer to interact with the external "upstream" API. This approach:

- ✅ Centralizes API communication
- ✅ Hides sensitive configuration from the client
- ✅ Keeps data-fetching logic isolated from UI components
- ✅ Enables server-side validation and error handling

To ensure robustness in real-world scenarios, upstream requests are protected with timeouts, controlled retries with backoff, and cache disabling. This prevents inconsistent behavior during SSR, cold starts, or transient upstream failures.

**Environment variables required:**

- `PHONES_API_BASE_URL`: Base URL of the upstream API
- `PHONES_API_KEY`: API authentication key

See `.env.example` for details.

## State Management

**Global cart state** is managed using **React Context API**, with persistence handled via localStorage.

- Keep implementation simple and predictable
- Avoid external dependencies
- Provide real-time synchronization across browser tabs
- Persist cart across sessions

## Styling

Styles are implemented using **SCSS Modules**, ensuring local scope per component and preventing global CSS conflicts.

Global styles are kept minimal and limited to base layout, resets, and **CSS variables** used for shared values such as colors, spacing, typography, and responsive breakpoints.

## Performance Considerations

The application leverages Next.js App Router features to ensure good performance by default:

- **Route-based code splitting**: Automatic via App Router
- **Server-side rendering**: Fast initial page load
- **Image optimization**: Next.js Image component with lazy loading
- **Minimal client JavaScript**: Server components reduce bundle size
- **CSS modules**: Prevents styling conflicts

## Testing

| Area            | Coverage | Status |
| --------------- | -------- | ------ |
| **Overall**     | 90.12%   | ✅     |
| Components      | 98.97%   | ✅     |
| Services        | 87.31%   | ✅     |
| Hooks & Context | 97.27%   | ✅     |

The project includes automated tests implemented with **Jest** and **React Testing Library**, focusing on the most relevant parts of the application.

The test suite covers:

- Core UI components
- Key user interactions
- Global state management (CartContext)

Tests are written following Testing Library best practices, prioritizing user-centric queries and accessibility-friendly selectors.

SSR API routes are intentionally excluded from testing, as they act as thin proxies without business logic.

### Running Tests

```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
npm test -- PhoneCard       # Specific component tests
```

## Accessibility (a11y)

Basic accessibility best practices have been applied throughout the application to ensure a solid and inclusive user experience.

### Implemented considerations

#### Semantic HTML

- Use of semantic elements such as `<nav>`, `<main>`, `<section>` and `<footer>`
- Proper heading hierarchy to structure the content
- Native HTML controls (`button`, `a`, `input`) used for interactive elements

#### Screen reader support

- Descriptive `alt` attributes for meaningful images
- Decorative images marked appropriately when applicable
- Accessible labels for form inputs and interactive controls

#### Keyboard accessibility

- All interactive elements are reachable via keyboard navigation
- Logical tab order following the document structure
- Visible focus styles to indicate the currently focused element

#### ARIA usage

- ARIA attributes are used selectively where semantic HTML alone is not sufficient
- Focus on accessibility without overusing ARIA roles or properties

The goal was to provide a solid accessibility baseline aligned with the scope of the technical challenge, prioritizing clarity and usability over advanced or speculative optimizations.

## Code Quality

- **Type Safety**: Full TypeScript coverage across the codebase
- **Linting**: ESLint configured with Next.js best practices
- **Formatting**: Prettier for consistent and readable code style
- **Testing**: Automated tests with Jest and React Testing Library, including coverage reporting
- **Accessibility**: Accessibility best practices applied following semantic HTML and user-centric patterns

## Deployment & Infrastructure

Although infrastructure setup was optional for this technical test, a basic production-ready setup has been included to demonstrate how the application could be deployed and integrated into a team workflow.

### Docker

The project includes a multi-stage Dockerfile optimized for production builds and a docker-compose setup for running the application locally in a containerized environment.

```bash
# Build and run the application
docker-compose up --build
```

### CI/CD

A sample GitHub Actions pipeline is included to illustrate a typical frontend workflow in a team environment. The pipeline covers:

- Code linting

- Automated tests with coverage

- Production build

- Optional Docker image build

The CI/CD setup is provided as an example and was intentionally kept simple, as deployment infrastructure was outside the core scope of the challenge.
