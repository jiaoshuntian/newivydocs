import Link from 'next/link';

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
        title: 'Deploy',
        description: 'YUM, APT, Docker, Kubernetes, or the IvorySQL Operator — every install method.',
      },
      {
        href: '/docs/v5/cloud-service',
        title: 'Cloud Service',
        description: 'Self-hosted web control plane for provisioning and managing IvorySQL on K8s.',
      },
    ],
  },
  {
    heading: 'Oracle compatibility & migration',
    cards: [
      {
        href: '/docs/v5/oracle-compatibility',
        title: 'Oracle Compatibility',
        description: 'PL/iSQL, data types, packages, sequences, and SQL syntax — what works out of the box.',
      },
      {
        href: '/docs/v5/migration',
        title: 'Migrate from Oracle',
        description: 'Automate schema and data export from Oracle to IvorySQL with Ora2Pg.',
      },
    ],
  },
  {
    heading: 'Operate & extend',
    cards: [
      {
        href: '/docs/v5/monitor-manage',
        title: 'Monitor & Manage',
        description: 'Monitoring metrics, routine maintenance, and operations management.',
      },
      {
        href: '/docs/v5/ecosystem',
        title: 'Ecosystem',
        description: 'PostGIS, pgvector, pg_cron, pgAudit, and 7 more bundled extensions.',
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
          <p className="mx-auto mb-10 max-w-xl text-base text-fd-muted-foreground">
            Run Oracle workloads on a fully open PostgreSQL foundation. PL/SQL, data types, packages,
            and Oracle SQL syntax work with minimal changes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/docs/v5/getting-started/quick-start"
              className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Quick Start — 5 min
            </Link>
            <Link
              href="/docs/v5/oracle-compatibility"
              className="rounded-lg border border-fd-border bg-fd-card px-5 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              Oracle Compatibility →
            </Link>
          </div>
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
              href="/docs/v5/oracle-compatibility"
              className="group relative rounded-xl border-2 border-fd-primary/30 bg-fd-card p-6 transition-colors hover:border-fd-primary/60 hover:bg-fd-accent"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary text-lg">
                ⇄
              </div>
              <div className="mb-1 text-base font-semibold text-fd-foreground group-hover:underline">
                I'm migrating from Oracle
              </div>
              <p className="text-sm text-fd-muted-foreground">
                Map PL/SQL to PL/iSQL, Oracle data types, packages, sequences, and SQL
                syntax. See what works automatically and what needs adjustment.
              </p>
              <div className="mt-4 text-xs font-medium text-fd-primary">
                Start with Oracle Compatibility →
              </div>
            </Link>

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

      {/* ── Footer strip ── */}
      <section className="border-t border-fd-border">
        <div className="mx-auto max-w-5xl px-6 py-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-fd-muted-foreground">
            IvorySQL is maintained by{' '}
            <a
              href="https://www.highgo.com"
              className="underline hover:text-fd-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Highgo Software
            </a>{' '}
            and the open-source community.
          </p>
          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/IvorySQL/IvorySQL"
              className="text-fd-muted-foreground underline hover:text-fd-foreground"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.ivorysql.org"
              className="text-fd-muted-foreground underline hover:text-fd-foreground"
              target="_blank"
              rel="noreferrer"
            >
              ivorysql.org
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
