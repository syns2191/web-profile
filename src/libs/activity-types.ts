export interface Activity {
  slug: string;
  title: string;
  author: string;
  hoursPast: string;
  replies: string;
  progress: number;
  techStack: {
    name: string;
    icon?: string;
  }[];
  summary: string;
  fullContent: string;
  timeline: Milestone[];
  githubActivities: GithubActivity[];
  githubIssues: GithubIssue[];
}

export interface Milestone {
  slug: string;
  date: string;
  title: string;
  description: string;
  fullContent: string;
  relatedGithubIssues: RelatedGithubIssue[];
  relatedGithubCommits: RelatedGithubCommit[];
  relatedGithubPullRequests: RelatedGithubPullRequest[];
}

export interface RelatedGithubIssue {
  title: string;
  status: string;
  issueNumber: number;
  date: string;
}

export interface RelatedGithubCommit {
  repo: string;
  description: string;
  date: string;
}

export interface RelatedGithubPullRequest {
  repo: string;
  description: string;
  prNumber: number;
  date: string;
}

export interface GithubActivity {
  type: string;
  repo: string;
  description: string;
  date: string;
}

export interface GithubIssue {
  title: string;
  status: string;
  issueNumber: number;
  date: string;
}
