// A post is live when it is not a draft AND its publish date has arrived
// (Eastern time). Merging a post early is safe: it stays hidden until its
// date, and the daily rebuild (.github/workflows/daily-publish.yml) shows it.
export function todayEastern(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date()); // YYYY-MM-DD
}

export function isPublished(data: { draft?: boolean; publishDate: string }): boolean {
  return !data.draft && String(data.publishDate).slice(0, 10) <= todayEastern();
}
