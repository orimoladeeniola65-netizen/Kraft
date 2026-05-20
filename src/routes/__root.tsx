import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-gold">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-foreground">Page not found</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center border border-gold text-gold px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-primary-foreground transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-foreground">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-gold text-gold px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-primary-foreground transition-all"
          >
            Try again
          </button>
          <a href="/" className="border border-border px-6 py-3 text-sm uppercase tracking-[0.2em] hover:border-foreground transition-all">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kraftify — We Craft Visual Stories" },
      { name: "description", content: "Kraftify is a cinematic photography and videography brand telling authentic visual stories." },
      { name: "author", content: "Kraftify" },
      { property: "og:title", content: "Kraftify — We Craft Visual Stories" },
      { property: "og:description", content: "Kraftify is a cinematic photography and videography brand telling authentic visual stories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@shotbykraft" },
      { name: "twitter:title", content: "Kraftify — We Craft Visual Stories" },
      { name: "twitter:description", content: "Kraftify is a cinematic photography and videography brand telling authentic visual stories." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6baf5fe6-6261-46b4-8feb-1aa1c0e16b7c/id-preview-cdad3d93--fe8e92bb-c68a-4814-bb4b-f2cd4e499639.lovable.app-1779271151537.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6baf5fe6-6261-46b4-8feb-1aa1c0e16b7c/id-preview-cdad3d93--fe8e92bb-c68a-4814-bb4b-f2cd4e499639.lovable.app-1779271151537.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}
