'use client';

import { useRouter, usePathname } from 'next/navigation';

// Phase 1: single-option placeholder. Add more versions when Phase 2 ships v4 content.
const VERSIONS = [
  { label: 'v5 (latest)', value: 'v5' },
];

export function VersionSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current version from path like /docs/v5/...
  const currentVersion = pathname?.match(/\/docs\/(v\d+)/)?.[1] ?? 'v5';

  return (
    <select
      value={currentVersion}
      onChange={(e) => {
        const newVersion = e.target.value;
        const rest = pathname?.replace(/\/docs\/v\d+/, `/docs/${newVersion}`) ?? `/docs/${newVersion}`;
        router.push(rest);
      }}
      className="rounded-md border border-fd-border bg-fd-background px-2 py-1 text-sm font-medium transition-colors hover:bg-fd-accent cursor-pointer"
      aria-label="Select documentation version"
    >
      {VERSIONS.map((version) => (
        <option key={version.value} value={version.value}>
          {version.label}
        </option>
      ))}
    </select>
  );
}
