from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Task Suggestion Engine",
    description="Returns actionable suggestions based on task title and description " \
    "using simple rules."
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers (including Authorization if needed)
)

class SuggestionRequest(BaseModel):
    title: str
    description: str

class SuggestionResponse(BaseModel):
    suggestion: str

def generate_suggestion(title: str, description: str) -> str:
    text = (title + " " + description).lower()

    # Priority 1: Security & Authentication
    if any(kw in text for kw in [
        "auth", "login", "signup", "jwt", "token", "password", "bcrypt", "oauth", 
        "security", "hash", "session", "cookie", "authorize", "middleware", "cors", "helmet"
    ]):
        return (
            "🛡️ **Security & Authentication Best Practices**:\n"
            "• **Passwords**: Always hash passwords using `bcrypt` or `argon2`. Never store in plain text.\n"
            "• **JWT**: Store tokens in `httpOnly` cookies to prevent XSS. Set a reasonable expiration time.\n"
            "• **Validation**: Implement server-side validation using libraries like `Joi` or `Zod`.\n"
            "• **CORS**: Restrict `allow_origins` to your frontend domain; avoid `*` in production.\n"
            "• **Headers**: Use `Helmet` to set secure HTTP headers (HSTS, CSP, etc.).\n"
            "• **Rate Limiting**: Prevent brute-force attacks by limiting login attempts."
        )

    # Priority 2: Real-time & WebSockets
    elif any(kw in text for kw in ["socket", "websocket", "ws", "socket.io", "realtime", "real-time", "chat", "notification"]):
        return (
            "🔌 **Real-time Communication Tips**:\n"
            "• **Heartbeat**: Implement a 'ping/pong' heartbeat to detect and close dead connections.\n"
            "• **Rooms**: Use 'rooms' or 'namespaces' to broadcast messages only to relevant users.\n"
            "• **Security**: Authenticate the socket connection (e.g., via JWT in handlers).\n"
            "• **Scaling**: Use a Redis adapter if you plan to scale horizontally (multiple server instances).\n"
            "• **Graceful Fallback**: Ensure the UI handles reconnection logic gracefully."
        )

    # Priority 3: GraphQL
    elif any(kw in text for kw in ["graphql", "apollo", "query", "mutation", "resolver", "schema", "relay"]):
        return (
            "🕸️ **GraphQL Development Advice**:\n"
            "• **Schema-First**: Define your schema clearly before implementing resolvers.\n"
            "• **N+1 Problem**: Use `DataLoader` to batch and cache database requests.\n"
            "• **Depth Limiting**: Implement query depth limiting to prevent malicious nested queries.\n"
            "• **Naming**: Use descriptive names for mutations (e.g., `userUpdateEmail` instead of `updateUser`).\n"
            "• **Idempotency**: Ensure mutations are idempotent where possible."
        )

    # Priority 4: Performance & Optimization
    elif any(kw in text for kw in [
        "performance", "slow", "fast", "optimize", "speed", "cache", "redis", 
        "lazy", "memo", "re-render", "bundle", "minify", "lighthouse", "index"
    ]):
        return (
            "⚡ **Performance Optimization Tips**:\n"
            "• **React**: Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders.\n"
            "• **Images**: Use modern formats (WebP), lazy loading, and proper sizing.\n"
            "• **Caching**: Implement `Redis` for expensive DB queries or use HTTP caching (ETags).\n"
            "• **Splitting**: Use dynamic imports (`React.lazy` + `Suspense`) to reduce initial bundle size.\n"
            "• **DB**: Ensure your MongoDB collections are properly indexed for common queries.\n"
            "• **Scripts**: Move non-critical scripts to the end of the body or use `defer`."
        )

    # Priority 5: State Management
    elif any(kw in text for kw in [
        "state", "redux", "zustand", "context", "store", "reducer", "action", "dispatch", "observable", "recoil"
    ]):
        return (
            "📦 **State Management Strategy**:\n"
            "• **Local vs Global**: Keep state as local as possible. Only lift state up if multiple components need it.\n"
            "• **Immutability**: Never mutate state directly; always return new objects/arrays.\n"
            "• **Selectors**: Use memoized selectors (like `reselect`) to optimize state lookups.\n"
            "• **Slices**: Use `Redux Toolkit` for cleaner code and built-in best practices.\n"
            "• **DevTools**: Use Redux/Zustand devtools to debug state transitions in real-time."
        )

    # Priority 6: PWA & Mobile Web
    elif any(kw in text for kw in ["pwa", "service worker", "offline", "manifest", "installable", "mobile web"]):
        return (
            "📱 **Progressive Web App (PWA) Tips**:\n"
            "• **Service Worker**: Use `Workbox` to simplify caching strategies (Stale-While-Revalidate).\n"
            "• **Manifest**: Ensure your `manifest.json` is correctly linked with appropriate icon sizes.\n"
            "• **Offline UI**: Provide a clear fallback UI when the user is offline.\n"
            "• **Storage**: Use `IndexedDB` for large amounts of client-side data instead of LocalStorage."
        )

    # Priority 7: Internationalization (i18n)
    elif any(kw in text for kw in ["i18n", "translation", "locale", "language", "l10n", "multi-language"]):
        return (
            "🌍 **Internationalization (i18n) Advice**:\n"
            "• **Keys**: Use hierarchical keys (e.g., `common.buttons.save`) for translations.\n"
            "• **Dynamic Values**: Use interpolation for dynamic content (e.g., `Hello, {{name}}`).\n"
            "• **Dates/Numbers**: Use `Intl` API or `date-fns` for locale-aware formatting.\n"
            "• **RTL**: Consider Right-to-Left (RTL) layout support if targeting languages like Arabic."
        )

    # Priority 8: UI/UX & Styling
    elif any(kw in text for kw in [
        "ui", "ux", "css", "style", "tailwind", "sass", "responsive", "bootstrap", "flex", "grid", 
        "animation", "theme", "dark mode", "font", "layout", "mobile"
    ]):
        return (
            "🎨 **UI/UX & Styling Advice**:\n"
            "• **Responsive**: Design mobile-first using CSS Grid and Flexbox.\n"
            "• **Consistency**: Use CSS variables or a utility-first framework like `Tailwind` for consistent spacing/colors.\n"
            "• **Accessibility**: Ensure high color contrast and readable font sizes (min 16px for body).\n"
            "• **Feedback**: Show loading spinners for async actions and clear success/error messages.\n"
            "• **Animations**: Use CSS transitions for micro-interactions; keep them subtle (under 300ms).\n"
            "• **Dark Mode**: Implement using `prefers-color-scheme` media query for better user comfort."
        )

    # Priority 9: REST API & Backend
    elif any(kw in text for kw in [
        "api", "rest", "crud", "endpoint", "http", "post", "get", "patch", "delete",
        "backend", "server", "express", "fastapi", "axios", "route", "controller", "status code"
    ]):
        return (
            "🔗 **REST API Design Guidelines**:\n"
            "• **Structure**: Keep controllers thin and move logic to service layers.\n"
            "• **Naming**: Use plural nouns for endpoints (e.g., `/api/v1/tasks`).\n"
            "• **Versioning**: Always version your API (e.g., `/v1/`) to avoid breaking client changes.\n"
            "• **Status Codes**: Use semantic codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 500 Error).\n"
            "• **Pagination**: Use `limit` and `page` parameters for endpoints that return long lists."
        )

    # Priority 10: Database & MongoDB
    elif any(kw in text for kw in [
        "database", "db", "mongodb", "mongoose", "schema", "model", "query", "nosql", "collection", "aggregate"
    ]):
        return (
            "🗄️ **Database & Modeling Tips**:\n"
            "• **Schemas**: Use Mongoose schemas with `required`, `trim`, and `lowercase` validators.\n"
            "• **Relationships**: Choose between embedding (fast reads) or referencing (flexible) based on query patterns.\n"
            "• **Performance**: Avoid `select('*')`; only fetch the fields you actually need.\n"
            "• **Soft Delete**: Consider using a `isDeleted` flag instead of removing records for data integrity.\n"
            "• **Backup**: Set up automated backups for your production database."
        )

    # Priority 11: Cloud & Serverless
    elif any(kw in text for kw in ["aws", "lambda", "serverless", "cloud", "s3", "azure", "gcp", "firebase", "vercel", "netlify"]):
        return (
            "☁️ **Cloud & Serverless Best Practices**:\n"
            "• **Cold Starts**: Keep functions small and minimize dependencies to reduce cold start times.\n"
            "• **Stateless**: Ensure functions are stateless; use external DBs or caches for persistence.\n"
            "• **IAM**: Follow the principle of least privilege for cloud permissions.\n"
            "• **Monitoring**: Use tools like `Sentry` or `CloudWatch` to track errors in production."
        )

    # Priority 12: TypeScript & Type Safety
    elif any(kw in text for kw in ["typescript", "ts", "type", "interface", "generic", "enum", "narrowing"]):
        return (
            "🔷 **TypeScript Best Practices**:\n"
            "• **Strict Mode**: Enable `strict: true` in `tsconfig.json` for maximum safety.\n"
            "• **Interfaces**: Prefer `interface` for public APIs and `type` for internal complex types.\n"
            "• **Any**: Avoid `any` at all costs; use `unknown` if the type is truly dynamic.\n"
            "• **Zod**: Combine TypeScript with `Zod` for runtime type validation of API responses."
        )

    # Priority 13: Testing & Quality
    elif any(kw in text for kw in ["test", "jest", "cypress", "vitest", "coverage", "mock", "tdd", "unit"]):
        return (
            "🧪 **Testing & Quality Assurance**:\n"
            "• **Unit Tests**: Focus on testing pure functions and critical business logic.\n"
            "• **Integration**: Test how components/services interact with each other.\n"
            "• **Coverage**: Aim for high coverage on core logic, but don't obsess over reaching 100% on everything.\n"
            "• **CI**: Integrate tests into your CI/CD pipeline to catch bugs before they hit production."
        )

    # Priority 14: Accessibility (A11y)
    elif any(kw in text for kw in ["accessibility", "a11y", "aria", "screen reader", "semantic", "alt text"]):
        return (
            "♿ **Accessibility (A11y) Checklist**:\n"
            "• **Semantic HTML**: Use `<header>`, `<main>`, `<nav>`, and `<button>` correctly.\n"
            "• **Alt Text**: Always provide descriptive `alt` attributes for images.\n"
            "• **Keyboard**: Ensure all interactive elements are reachable via `Tab` key.\n"
            "• **ARIA**: Use `aria-label` only when the visual label isn't sufficient for screen readers."
        )

    # Priority 15: Tooling & Workflow
    elif any(kw in text for kw in ["eslint", "prettier", "vite", "webpack", "npm", "yarn", "husky", "lint"]):
        return (
            "🛠️ **Tooling & Workflow Tips**:\n"
            "• **Linting**: Use `ESLint` + `Prettier` to enforce a consistent code style automatically.\n"
            "• **Pre-commit**: Use `Husky` to run linting and tests before every commit.\n"
            "• **Vite**: Prefer `Vite` over `CRA` for significantly faster development and build times.\n"
            "• **Dependencies**: Periodically run `npm audit` to check for security vulnerabilities."
        )

    # Priority 16: SEO & Web Vitals
    elif any(kw in text for kw in ["seo", "indexing", "metadata", "sitemap", "crawler", "lighthouse", "vital", "sr"]):
        return (
            "🔍 **SEO & Web Vitals Tips**:\n"
            "• **Metadata**: Use `React Helmet` to set unique titles and meta descriptions for every route.\n"
            "• **SSR/SSG**: Consider Next.js for better indexing if SEO is a top priority.\n"
            "• **Web Vitals**: Optimize LCP (Largest Contentful Paint) by preloading critical fonts and hero images.\n"
            "• **Semantic**: Use structured data (JSON-LD) to help search engines understand your content better."
        )

    # Priority 17: Microservices & System Design
    elif any(kw in text for kw in ["microservice", "gateway", "message queue", "kafka", "rabbitmq", "distributed", "grpc", "proxy"]):
        return (
            "🏗️ **Microservices & System Design**:\n"
            "• **Decoupling**: Use an Event-Driven architecture with `Kafka` or `RabbitMQ` for asynchronous communication.\n"
            "• **Gateway**: Implement an API Gateway for request routing, auth, and rate limiting.\n"
            "• **Observability**: Use distributed tracing (e.g., Jaeger) to track requests across services.\n"
            "• **Resiliency**: Implement the Circuit Breaker pattern to prevent cascading failures."
        )

    # Priority 18: Documentation & Design Systems
    elif any(kw in text for kw in ["docs", "documentation", "swagger", "storybook", "design system", "wiki", "readme"]):
        return (
            "📚 **Documentation & Design Systems**:\n"
            "• **Storybook**: Use `Storybook` to build and test UI components in isolation.\n"
            "• **API Docs**: Use `Swagger/OpenAPI` or `scalar` to automatically generate interactive API documentation.\n"
            "• **README**: Maintain a clear `README.md` with setup instructions and architecture diagrams.\n"
            "• **JSDoc**: Use JSDoc to document complex functions, especially for shared utility libraries."
        )

    # Priority 19: Monitoring & Analytics
    elif any(kw in text for kw in ["monitor", "analytics", "sentry", "log", "prometheus", "grafana", "amplitude", "tracking"]):
        return (
            "📈 **Monitoring & Analytics Advice**:\n"
            "• **Error Tracking**: Use `Sentry` or `LogRocket` to catch and debug frontend/backend crashes in real-time.\n"
            "• **Logs**: Use a structured logging library (like `Winston` or `Pino`) instead of `console.log`.\n"
            "• **Metrics**: Track business KPIs (like conversion rate) using `Amplitude` or `Mixpanel`.\n"
            "• **Health**: Set up uptime monitoring to get notified immediately if your server goes down."
        )

    # Priority 20: Payment Integration
    elif any(kw in text for kw in ["stripe", "paypal", "payment", "checkout", "transaction", "invoice", "billing", "card", "wallet"]):
        return (
            "💳 **Payment Integration Best Practices**:\n"
            "• **Security**: Never handle raw card data on your server. Use tokens or pre-built elements (like Stripe Elements).\n"
            "• **Webhooks**: Always implement webhooks to handle asynchronous events like `payment_intent.succeeded`.\n"
            "• **Idempotency**: Use idempotency keys to prevent double-charging the user on network retries.\n"
            "• **Test Mode**: Always use a sandbox/test environment before moving to live production keys."
        )

    # Priority 21: File Handling & Uploads
    elif any(kw in text for kw in ["upload", "file", "image", "pdf", "multer", "cloudinary", "s3", "blob", "storage"]):
        return (
            "📁 **File Upload & Storage Tactics**:\n"
            "• **Validation**: Check file size and MIME type on the server to prevent malicious uploads.\n"
            "• **Optimization**: Resize and compress images on the fly using services like Cloudinary or Sharp (Node.js).\n"
            "• **Security**: Use 'signed URLs' for private files to ensure only authorized users can access them.\n"
            "• **Multer**: Use memory storage for small files and temporary disk storage for larger ones."
        )

    # Priority 22: Advanced Forms & Validation
    elif any(kw in text for kw in ["form", "input", "validation", "formik", "hook form", "zod", "yup", "schema"]):
        return (
            "📝 **Advanced Form Handling**:\n"
            "• **Library**: Use `React Hook Form` for high performance and minimal re-renders.\n"
            "• **Validation**: Use `Zod` or `Yup` for schema-based validation that works on both frontend and backend.\n"
            "• **Feedback**: Provide immediate inline validation feedback rather than waiting for submit.\n"
            "• **UX**: Implement 'dirty state' checks to warn users if they try to leave the page with unsaved changes."
        )

    # Priority 23: 3D, Canvas & Graphics
    elif any(kw in text for kw in ["canvas", "three.js", "webgl", "svg", "d3", "animation", "graphics", "3d", "r3f"]):
        return (
            "🎮 **3D & Graphics Advice**:\n"
            "• **Optimization**: Use 'instance mesh' in Three.js when rendering many identical objects.\n"
            "• **Cleanup**: Always dispose of geometries and textures to prevent memory leaks in the browser.\n"
            "• **Performance**: Keep the animation loop simple; avoid heavy calculations inside `requestAnimationFrame`.\n"
            "• **SVG**: Prefer SVGs for simple vector graphics and icons for sharpness at any zoom level."
        )

    # Priority 24: Machine Learning & AI
    elif any(kw in text for kw in ["ai", "ml", "tensor", "openai", "gpt", "model", "prediction", "chatgpt", "llama"]):
        return (
            "🤖 **AI & ML Integration Tips**:\n"
            "• **Streaming**: Use server-sent events (SSE) to stream AI responses word-by-word for a better UX.\n"
            "• **Prompting**: Use structured prompts (e.g., 'Act as a...') to get more predictable results.\n"
            "• **Costs**: Implement usage limits and aggressive caching to keep your API costs under control.\n"
            "• **Privacy**: Never send sensitive user data to external LLMs without proper anonymization."
        )

    # Priority 25: Blockchain & Web3
    elif any(kw in text for kw in ["web3", "blockchain", "crypto", "ether", "solana", "nft", "wallet", "metamask", "contract"]):
        return (
            "⛓️ **Web3 & Blockchain Best Practices**:\n"
            "• **Provider**: Use `ethers.js` or `viem` for interacting with the blockchain from the frontend.\n"
            "• **Security**: Always verify contract interactions on the user's wallet (e.g., Metamask) before execution.\n"
            "• **Gas**: Estimate gas fees before suggesting a transaction to avoid 'out of gas' errors.\n"
            "• **State**: Keep blockchain data separate from your transactional DB to maintain a single source of truth."
        )

    # Priority 26: CMS & Headless
    elif any(kw in text for kw in ["cms", "strapi", "contentful", "sanity", "wordpress", "headless", "ghost"]):
        return (
            "📰 **CMS & Content Strategy**:\n"
            "• **Decoupling**: Use a headless CMS (like Strapi) to serve content via API to multiple platforms.\n"
            "• **Drafts**: Implement a 'preview mode' so content editors can see changes before they go live.\n"
            "• **Hooks**: Use webhooks from the CMS to trigger site rebuilds (in SSG) or cache purges.\n"
            "• **Media**: Use the CMS's built-in media library for automatic image optimization and CDN delivery."
        )

    # Priority 27: Cross-Platform (Mobile/Desktop)
    elif any(kw in text for kw in ["native", "electron", "react native", "expo", "desktop", "mobile app", "android", "ios"]):
        return (
            "📱 **Cross-Platform Development Tips**:\n"
            "• **Expo**: Use `Expo` for React Native to speed up development and simplify the build process.\n"
            "• **Electron**: Use the 'IPC' (Inter-Process Communication) safely to bridge your web code and system OS.\n"
            "• **Bridge**: Minimize the data sent over the 'bridge' in React Native to prevent performance bottlenecks.\n"
            "• **Styles**: Use platform-specific stylesheets (`Platform.select`) to adhere to iOS and Android HIG."
        )

    # Priority 28: Git & DevOps
    elif any(kw in text for kw in [
        "git", "commit", "pr", "branch", "deploy", "docker", "pipeline", "env", "production", "ci/cd"
    ]):
        return (
            "🚀 **Git & Deployment Tips**:\n"
            "• **Commits**: Use the Conventional Commits format (e.g., `feat: add login`, `fix: header logo`).\n"
            "• **Secrets**: Never commit `.env` files. Use secret managers (like GitHub Secrets) for deployment.\n"
            "• **Branches**: Use a feature-branch workflow and require PR reviews before merging to main.\n"
            "• **Docker**: Use multi-stage builds to keep your production images small and secure."
        )

    # Default fallback
    else:
        return (
            "💡 **General Development Strategy**:\n"
            "• **Requirement Analysis**: Spend 10 mins purely on planning before writing a single line of code.\n"
            "• **Modularity**: If a function/component is longer than 50 lines, consider breaking it down.\n"
            "• **Documentation**: Write JSDoc comments for complex logic to help your 'future self' or teammates.\n"
            "• **Code Review**: Read your own code one last time before committing — you'll often find a typo or a cleaner way!"
        )

@app.post("/suggestion", response_model=SuggestionResponse)
async def get_suggestion(request: SuggestionRequest):
    suggestion = generate_suggestion(request.title, request.description)
    return SuggestionResponse(suggestion=suggestion)