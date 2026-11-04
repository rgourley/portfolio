/* Proxies: the facts the page and its agent view share. */
export const GH = "https://github.com/rgourley/proxies";

export const PSTEPS: [string, string][] = [
  ["Pick a team", "Choose a company and its personas. Three sample teams come with the project, or you can describe your own and Claude drafts it."],
  ["Give them something to review", "Hand over a flow, a spec, a prototype, or a design idea. Add one line about the situation."],
  ["Read the results page", "See who would block it, the problems ranked from critical to minor, and what to fix first. Click any name to read their full answer."],
];

export const CMDS: [string, string][] = [
  ["redteam", "Everyone tries to break your idea."],
  ["meeting", "They debate it, then the persona who decides makes the call."],
  ["prep", "Get each persona’s top questions before you walk in."],
  ["followup", "Check whether your new version answered their objections."],
  ["compare", "Show two versions. Each persona picks one."],
  ["ask / talk", "Ask one persona a question, or have a longer chat."],
];
