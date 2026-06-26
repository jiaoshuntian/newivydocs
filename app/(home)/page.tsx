import Link from 'next/link';
import { LifeBuoy, FlaskConical, Pencil } from 'lucide-react';

interface SectionCard {
  href: string;
  title: string;
  description: string;
}

interface SectionGroup {
  heading: string;
  cards: SectionCard[];
}

const sectionGroups: SectionGroup[] = [
  {
    heading: 'Get up and running',
    cards: [
      {
        href: '/docs/v5/getting-started',
        title: 'Getting Started',
        description: 'Understand IvorySQL in 5 minutes, then run your first instance.',
      },
      {
        href: '/docs/v5/deploy',
        title: 'Install & Deploy',
        description: 'Install on Linux with YUM, APT, RPM, or DEB. Configure streaming replication for HA.',
      },
      {
        href: '/docs/v5/cloud-service',
        title: 'Cloud Service',
        description: 'Docker, Podman, Docker Swarm, Kubernetes, IvorySQL Operator, and the managed Cloud Platform.',
      },
    ],
  },
  {
    heading: 'Oracle compatibility',
    cards: [
      {
        href: '/docs/v5/oracle-compatibility',
        title: 'Use Oracle Features',
        description: 'PL/iSQL, data types, packages, sequences, and SQL syntax — what works out of the box.',
      },
      {
        href: '/docs/v5/migration',
        title: 'Migrate from Oracle',
        description: 'Strategy, tooling, and step-by-step migration from Oracle to IvorySQL using Ora2Pg.',
      },
    ],
  },
  {
    heading: 'Operate & extend',
    cards: [
      {
        href: '/docs/v5/ecosystem',
        title: 'Ecosystem',
        description: 'PostGIS, pgvector, pg_cron, pgAudit, and 7 more extensions. CPU and OS compatibility.',
      },
      {
        href: '/docs/v5/monitor-manage',
        title: 'Monitor & Manage',
        description: 'Monitoring metrics, routine maintenance, upgrades, backup, and HA operations.',
      },
    ],
  },
  {
    heading: 'Go deeper',
    cards: [
      {
        href: '/docs/v5/developers',
        title: 'Developers',
        description: 'Architecture internals, dual parser design, and contributing to IvorySQL.',
      },
      {
        href: '/docs/v5/reference',
        title: 'Reference',
        description: 'Tool reference and FAQ.',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ── Hero ── */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs text-fd-muted-foreground">
            Latest: IvorySQL 5.4 · Built on PostgreSQL 18
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-fd-foreground">
            IvorySQL Documentation
          </h1>
          <p className="mx-auto mb-3 max-w-2xl text-xl text-fd-muted-foreground">
            Oracle-compatible PostgreSQL — open source, no license fees.
          </p>
          <p className="mx-auto max-w-xl text-base text-fd-muted-foreground">
            Run Oracle workloads on a fully open PostgreSQL foundation. PL/SQL, data types, packages,
            and Oracle SQL syntax work with minimal changes.
          </p>
        </div>
      </section>

      {/* ── Where do you want to start? ── */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-fd-muted-foreground">
            Where do you want to start?
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/docs/v5/getting-started/quick-start"
              className="group relative rounded-xl border border-fd-border bg-fd-card p-6 transition-colors hover:bg-fd-accent"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-fd-muted text-fd-foreground text-lg">
                ▶
              </div>
              <div className="mb-1 text-base font-semibold text-fd-foreground group-hover:underline">
                I'm starting fresh with IvorySQL
              </div>
              <p className="text-sm text-fd-muted-foreground">
                Install on Linux or Docker in under 5 minutes. Oracle compatibility mode
                is on by default — connect and run Oracle SQL right away.
              </p>
              <div className="mt-4 text-xs font-medium text-fd-muted-foreground">
                Quick Start →
              </div>
            </Link>

            <Link
              href="/docs/v5/oracle-compatibility"
              className="group relative rounded-xl border-2 border-fd-primary/30 bg-fd-card p-6 transition-colors hover:border-fd-primary/60 hover:bg-fd-accent"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary text-lg">
                ✦
              </div>
              <div className="mb-1 text-base font-semibold text-fd-foreground group-hover:underline">
                I want to use Oracle features
              </div>
              <p className="text-sm text-fd-muted-foreground">
                PL/iSQL, packages, sequences, data types, and Oracle SQL syntax —
                run your Oracle workloads on IvorySQL with minimal changes.
              </p>
              <div className="mt-4 text-xs font-medium text-fd-primary">
                Oracle Compatibility →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Browse the docs ── */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-fd-muted-foreground">
            Browse the docs
          </h2>
          <div className="space-y-10">
            {sectionGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
                  {group.heading}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.cards.map((card) => (
                    <Link
                      key={card.href}
                      href={card.href}
                      className="group rounded-lg border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent"
                    >
                      <div className="mb-1 text-sm font-semibold text-fd-foreground group-hover:underline">
                        {card.title}
                      </div>
                      <p className="text-xs leading-relaxed text-fd-muted-foreground">
                        {card.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-fd-border">
        <div className="mx-auto max-w-5xl px-6 py-10">

          {/* Primary links */}
          <ul className="flex flex-col gap-2.5">
            <li className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
              <LifeBuoy size={15} strokeWidth={1.5} aria-hidden="true" />
              <span>Need some help?</span>
              <a
                href="https://github.com/IvorySQL/IvorySQL/issues/new"
                className="text-fd-primary hover:underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                Submit a GitHub Issue
              </a>
            </li>
            <li className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
              <FlaskConical size={15} strokeWidth={1.5} aria-hidden="true" />
              <span>Latest product updates?</span>
              <Link href="/docs/v5/getting-started/release-notes" className="text-fd-primary hover:underline">
                View Release Notes
              </Link>
            </li>
            <li className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
              <Pencil size={15} strokeWidth={1.5} aria-hidden="true" />
              <span>Found an error in the docs?</span>
              <a
                href="https://github.com/jiaoshuntian/newivydocs"
                className="text-fd-primary hover:underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                Edit on GitHub
              </a>
            </li>
          </ul>

          <hr className="my-6 border-fd-border" />

          {/* Bottom row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-xs text-fd-muted-foreground">
                © {new Date().getFullYear()} Highgo Software &amp; IvorySQL contributors
              </span>
              <span className="text-xs text-fd-muted-foreground hidden sm:inline">—</span>
              <a
                href="https://github.com/IvorySQL/IvorySQL/blob/main/CONTRIBUTING.md"
                className="text-xs text-fd-muted-foreground hover:text-fd-foreground hover:underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                Contributing
              </a>
              <a
                href="https://github.com/IvorySQL/IvorySQL"
                className="text-xs text-fd-muted-foreground hover:text-fd-foreground hover:underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                Open Source
              </a>
              <a
                href="https://www.ivorysql.org"
                className="text-xs text-fd-muted-foreground hover:text-fd-foreground hover:underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                ivorysql.org
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/IvorySQL/IvorySQL"
                className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}
