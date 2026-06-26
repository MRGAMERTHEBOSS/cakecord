export interface Command {
  name: string;
  description: string;
  category: "free" | "premium";
  args?: { name: string; description: string; required: boolean }[];
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatarUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  email?: string;
}

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  content: string;
  category: "feature" | "improvement" | "fix";
  author: string;
}

export interface DashboardConfig {
  serverId: string;
  channelId: string;
  roleId: string;
  customMessage: string;
  timezone: string;
  enableGifs: boolean;
  enableReminders: boolean;
}
