export type Socials = {
  github: string | null;
  linkedin: string | null;
  x: string | null;
  site: string | null;
  cv: string | null;
};

export type CohortStats = {
  builders: number;
  countries: number;
  withGithub: number;
  withAvatar: number;
  totalStarsShipped: number;
  totalContribsLastYear: number;
  totalPublicRepos: number;
  totalPRsLastYear: number;
  topLanguages: { name: string; count: number }[];
  mentorCount: number;
  judgeCount: number;
};

export type Repo = {
  name: string | null;
  description: string | null;
  url: string | null;
  stars: number;
  forks: number;
  language: string | null;
};

export type GithubInfo = {
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  websiteUrl: string | null;
  twitterUsername: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  hireable: boolean;
  createdAt: string | null;
  contributionsLastYear: number;
  totalCommits: number;
  totalPRs: number;
  totalReviews: number;
  totalIssues: number;
  pinnedRepos: Repo[];
  topRepos: Repo[];
  totalStars: number;
};

export type ScoreComponents = {
  followers: number;
  stars: number;
  repos: number;
  contribs: number;
  prs: number;
  reviews: number;
  tenure: number;
  raw: number;
};

export type Role = "participant" | "mentor" | "judge";

export type Participant = {
  userId: string;
  firstName: string;
  lastName: string;
  handle: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  description: string | null;
  location: string | null;
  country: string | null;
  city: string | null;
  isOrganization: boolean;
  role: Role;
  socials: Socials;
  github: GithubInfo | null;
  score: number;
  scoreRaw: number;
  scoreComponents: ScoreComponents | null;
};

export type TopProject = Repo & {
  ownerHandle: string;
  ownerName: string;
  ownerGithub: string | null;
  country: string | null;
};

export type CountryCount = { name: string; count: number };

export function fullName(p: Participant): string {
  const n = [p.firstName, p.lastName].filter(Boolean).join(" ").trim();
  return n || p.handle || "Anonymous";
}

export function initials(p: Participant): string {
  const f = (p.firstName || "").trim()[0] || "";
  const l = (p.lastName || "").trim()[0] || "";
  const combined = (f + l).toUpperCase();
  if (combined) return combined;
  return (p.handle || "?").slice(0, 2).toUpperCase();
}

export function bestLocation(p: Participant): string | null {
  if (p.city && p.country) return `${p.city}, ${p.country}`;
  return p.country || p.city || p.location || p.github?.location || null;
}
