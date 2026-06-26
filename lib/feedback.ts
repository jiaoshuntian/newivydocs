'use server';

import type { ActionResponse, PageFeedback } from '@/components/feedback/schema';

const GITHUB_TOKEN = process.env.GITHUB_FEEDBACK_TOKEN;
const GITHUB_REPO = 'jiaoshuntian/newivydocs';
const FEEDBACK_LABEL = 'docs-feedback';

async function githubFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function onPageFeedbackAction(feedback: PageFeedback): Promise<ActionResponse> {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_FEEDBACK_TOKEN is not set');

  const url = new URL(feedback.url);
  const pageSlug = url.pathname;
  const title = `[Docs Feedback] ${pageSlug}`;
  const opinion = feedback.opinion === 'good' ? '👍 Good' : '👎 Bad';
  const body = [
    `**Rating:** ${opinion}`,
    `**Page:** ${feedback.url}`,
    feedback.message ? `**Message:**\n${feedback.message}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  // Search for an existing open issue for this page
  const searchRes = await githubFetch(
    `/search/issues?q=${encodeURIComponent(`"${title}" repo:${GITHUB_REPO} is:issue is:open`)}&per_page=1`,
  );

  if (searchRes.total_count > 0) {
    const issue = searchRes.items[0] as { number: number; html_url: string };
    await githubFetch(`/repos/${GITHUB_REPO}/issues/${issue.number}/comments`, {
      method: 'POST',
      body: JSON.stringify({ body }),
    });
    return { githubUrl: issue.html_url };
  }

  // No existing issue — create one
  const issue = await githubFetch(`/repos/${GITHUB_REPO}/issues`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      labels: [FEEDBACK_LABEL],
    }),
  });
  return { githubUrl: (issue as { html_url: string }).html_url };
}
