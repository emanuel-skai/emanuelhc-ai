// Shared links and offer data for the home page, metadata and JSON-LD.

export const CALENDAR_HOUR = 'https://calendar.app.google/1P4C3Q9yWTBsxLv38';
export const CALENDAR_DISCOVERY = 'https://calendar.app.google/g3v7PbEf9fkuWCRs7';
export const CONTACT_EMAIL = 'emanuel@skillfulai.io';
export const FLAGSHIP_CASE = '/writing/whatsapp-ai-agent-ten-months-production';

export interface Service {
  id: string;
  name: string;
  summary: string;
  forWho: string;
  youGet: string[];
  pricing: string;
}

export const services: Service[] = [
  {
    id: 'fractional-cto',
    name: 'Fractional CTO',
    summary: 'Part-time technical leadership, for as long as you need a senior engineering voice at the table.',
    forWho: 'Startups and SMBs without a CTO, or with a team that has outgrown its first architecture.',
    youGet: [
      'Architecture and roadmap, and build vs buy calls',
      'Hiring and running the engineering team',
      'Vendor and AI tooling decisions',
      'A technical voice with investors and clients',
    ],
    pricing: 'Custom, scoped in discovery',
  },
  {
    id: 'technical-interviews',
    name: 'Technical interviews & hiring',
    summary: 'A hiring loop that finds engineers who can do the work, run by someone who has done it.',
    forWho: 'Teams hiring backend, AI or data engineers without a senior interviewer in house.',
    youGet: [
      'Hiring loop and take-home design',
      'Technical interviews, run live',
      'A written evaluation per candidate',
      'Help closing the people you want',
    ],
    pricing: 'Custom, scoped in discovery',
  },
  {
    id: 'due-diligence',
    name: 'Architecture review & due diligence',
    summary: 'An outside read on a system or a startup before you commit money or a roadmap to it.',
    forWho: 'Founders checking their own stack, and investors looking at a technical company.',
    youGet: [
      'Audit of the system, code and team',
      'Risks ranked by cost and likelihood',
      'A written report',
      'An action plan you can execute',
    ],
    pricing: 'Custom, scoped in discovery',
  },
  {
    id: 'ai-agents',
    name: 'AI agents in production',
    summary: 'Agents that answer, quote and book for real customers, designed, built and operated like the ones I run today.',
    forWho: 'Businesses that want an agent on WhatsApp or the web doing real work, not a demo.',
    youGet: [
      'Agent design, tools and guardrails',
      'Build, regression bench and release',
      'Monitoring and a runbook',
      'Handover to your team, or ongoing operation',
    ],
    pricing: '50-hour block, $10,000',
  },
];

/** Options for the discovery form "service" select. */
export const serviceOptions = [...services.map((s) => s.name), 'Not sure yet'];
