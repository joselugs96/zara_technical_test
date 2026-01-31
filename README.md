# Zara Technical Test - Phone Store

A modern e-commerce application for browsing and purchasing phones, built with Next.js, React, and TypeScript. Features server-side rendering, client-side cart management, and comprehensive test coverage.

![Tests](https://img.shields.io/badge/tests-304%20passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)
![Node](https://img.shields.io/badge/node-18%2B-brightgreen)
![Docker](https://img.shields.io/badge/docker-ready-blue)

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

2. **Run development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

3. **Run tests:**
   ```bash
   npm test              # Run tests once
   npm run test:watch    # Watch mode
   npm run test:coverage # With coverage report
   ```

## Features

- ✅ **Product Browsing**: Search and filter phones with pagination
- ✅ **Shopping Cart**: Add/remove items with persistent storage
- ✅ **Phone Details**: Variant selection (color, storage) with price updates
- ✅ **Responsive Design**: Mobile-first with SCSS modules
- ✅ **Server-Side Rendering**: Optimized with Next.js App Router
- ✅ **Full Test Coverage**: 304 tests covering components, services, and APIs
- ✅ **TypeScript**: Type-safe throughout the codebase
- ✅ **Accessibility**: WCAG compliant with semantic HTML and ARIA attributes

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── cart/              # Cart page
│   ├── phone/             # Phone detail pages
│   └── layout.tsx         # Root layout
├── features/              # Feature modules
│   ├── cart/              # Cart components & logic
│   ├── phone-detail/      # Phone detail components & logic
│   └── phones/            # Product list & grid
├── shared/                # Shared components & utilities
│   ├── components/        # Navigation, etc.
│   ├── context/          # React context (Cart)
│   └── lib/              # Routes, types, utilities
└── styles/               # Global SCSS styles
```

## Available Scripts

```bash
npm run dev             # Start development server
npm run build          # Production build
npm start              # Run production server
npm test              # Run test suite
npm run test:watch    # Test watch mode
npm run test:coverage # Generate coverage report
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

## Testing

The project includes comprehensive test coverage with Jest and React Testing Library:

- **Unit Tests**: Services and utilities (62 tests)
- **Component Tests**: Cart, phone detail, product grid (196 tests)
- **Integration Tests**: API routes (42 tests)
- **Coverage Target**: 70% minimum (achieved ~90%)

View detailed coverage information in [COVERAGE.md](COVERAGE.md)

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/lcov-report/index.html
```

## Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and run in production mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Docker Build & Run

```bash
# Build image
docker build -t phone-store:latest .

# Run container
docker run -p 3000:3000 phone-store:latest

# Check health
docker healthcheck inspect <container-id>
```

### Image Details

- **Base Image**: Node.js 18-alpine (multi-stage build)
- **Size**: ~300MB (optimized with production dependencies only)
- **Health Check**: Enabled for production deployments
- **Port**: 3000 (configurable)

## Environment Configuration

Create `.env.local` based on `.env.example`:

```bash
cp .env.example .env.local
```

**Available Variables:**

```env
NODE_ENV=development                    # production or development
NEXT_TELEMETRY_DISABLED=1              # Disable Next.js telemetry
API_BASE_URL=http://localhost:3000     # API endpoint
UPSTREAM_API_URL=                      # External API (if needed)
```

## CI/CD Pipeline

GitHub Actions automated pipeline includes:

1. **Lint**: ESLint validation
2. **Test**: Jest test suite with coverage check
3. **Build**: Next.js production build
4. **Docker**: Build and push to container registry (main branch)

See [.github/workflows/ci.yml](.github/workflows/ci.yml) for configuration.

**Status**: [![CI](https://github.com/YOUR_ORG/YOUR_REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_ORG/YOUR_REPO/actions)

## Deployment Options

### Vercel (Recommended)

```bash
# Deploy with Vercel CLI
vercel

# Or connect GitHub repository to Vercel dashboard
```

[Vercel Deployment Guide](https://vercel.com/docs/frameworks/nextjs)

### Docker Registry (Docker Hub, ECR, GHCR)

```bash
# Build and tag
docker build -t username/phone-store:1.0.0 .

# Push to registry
docker push username/phone-store:1.0.0

# Deploy container
docker run -p 3000:3000 username/phone-store:1.0.0
```

### Self-Hosted Server

```bash
# Build
npm run build

# Start in production
npm start

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "phone-store" -- start
pm2 save
pm2 startup
```

## Performance Optimization

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **CSS Modules**: Scoped styling to prevent conflicts
- **Tree Shaking**: Unused code removal in production build
- **Font Optimization**: System fonts (no external font loading)

## Code Quality

- **Type Safety**: Full TypeScript coverage
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier for consistent code style
- **Testing**: 90%+ code coverage with Jest
- **Accessibility**: WCAG 2.1 Level AA compliance

## Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Commit changes: `git commit -m "Add feature"`
3. Push branch: `git push origin feature/new-feature`
4. Open Pull Request

All commits trigger CI pipeline for linting, testing, and building.

## License

This project is private and proprietary.

## Support

For issues or questions, please open an issue in the repository or contact the development team.
