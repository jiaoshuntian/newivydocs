import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          IvorySQL Documentation
        </h1>
        <p className="text-lg text-fd-muted-foreground mb-12">
          Oracle-compatible PostgreSQL. Open source. Production ready.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mx-auto">
          <Link
            href="/docs/v5/getting-started"
            className="group block rounded-lg border border-fd-border bg-fd-card p-6 text-left transition-colors hover:bg-fd-accent"
          >
            <div className="text-lg font-semibold mb-2 group-hover:underline">
              Getting Started
            </div>
            <p className="text-sm text-fd-muted-foreground">
              What IvorySQL is, how to install it, and run your first instance in minutes.
            </p>
          </Link>

          <Link
            href="/docs/v5/deploy"
            className="group block rounded-lg border border-fd-border bg-fd-card p-6 text-left transition-colors hover:bg-fd-accent"
          >
            <div className="text-lg font-semibold mb-2 group-hover:underline">
              Deploy
            </div>
            <p className="text-sm text-fd-muted-foreground">
              Install from packages, source, Docker, or set up a production cluster.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
