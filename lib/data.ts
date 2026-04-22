import participantsJson from "./participants.json";
import topProjectsJson from "./top-projects.json";
import countriesJson from "./countries.json";
import statsJson from "./stats.json";
import type { CohortStats, CountryCount, Participant, TopProject } from "./types";

export const participants = participantsJson as Participant[];
export const topProjects = topProjectsJson as TopProject[];
export const countries = countriesJson as CountryCount[];
export const stats = statsJson as CohortStats;

export function findByHandle(handle: string): Participant | undefined {
  const needle = handle.toLowerCase();
  return participants.find((p) => p.handle.toLowerCase() === needle);
}

export function allHandles(): string[] {
  return participants.map((p) => p.handle).filter(Boolean);
}
