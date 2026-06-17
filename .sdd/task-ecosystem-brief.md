### Task 2: Migrate Ecosystem Content

Create all Ecosystem MDX pages in `content/docs/v5/ecosystem/`.

**Source files at:** `/home/ivorysql/projects/new_ivy_doc/ivorysql_docs/EN/modules/ROOT/pages/`

**Source → Target mapping:**
| Source | Target |
|--------|--------|
| 5.0.adoc | index.mdx (Overview) |
| cpu_arch_adp.adoc | cpu-architecture.mdx |
| os_arch_adp.adoc | os-support.mdx |
| 5.1.adoc | postgis.mdx |
| 5.2.adoc | pgvector.mdx |
| 5.3.adoc | pgddl.mdx |
| 5.4.adoc | pg-cron.mdx |
| 5.5.adoc | pgsql-http.mdx |
| 5.6.adoc | plpgsql-check.mdx |
| 5.7.adoc | pgroonga.mdx |
| 5.8.adoc | pgaudit.mdx |
| 5.9.adoc | pgrouting.mdx |
| 5.10.adoc | system-stats.mdx |

**Migration rules:**
- NOTE: → <Callout type="info">
- TIP: → <Callout type="tip">
- CAUTION: → <Callout type="warn">
- xref: links → /docs/v5/... relative paths
- [source,lang] → ```lang
- Tables → Markdown tables
- Each extension page should have: what it is, how to install/enable it, basic usage examples

**Overview page (index.mdx):**
- From 5.0.adoc
- Include <Cards> navigation to all sub-pages
- CPU and OS support pages as separate cards too
- Frontmatter: title "Ecosystem", description

**Each extension page:**
- Frontmatter with title and description
- What the extension does
- Installation/enablement steps
- Basic usage example
- Link to extension docs if available

**meta.json:**
```json
{
  "title": "Ecosystem",
  "pages": [
    "index", "cpu-architecture", "os-support",
    "postgis", "pgvector", "pgddl", "pg-cron",
    "pgsql-http", "plpgsql-check", "pgroonga",
    "pgaudit", "pgrouting", "system-stats"
  ]
}
```

**Steps:**
1. Read all 13 source .adoc files
2. Create index.mdx (Overview)
3. Create each sub-page as .mdx
4. Create meta.json
5. Verify: all pages render at HTTP 200
6. Commit
