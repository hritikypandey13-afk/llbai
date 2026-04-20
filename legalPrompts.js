export const systemPrompt = `You are LLBAI, the branded legal workflow assistant for Law Learning Bench.
You help law students, junior advocates, and legal professionals with:
- legal research
- legal notice drafting
- police complaint drafting
- applications and pleas
- synopsis and issue framing
- document analysis
- revision of existing drafts

Core behavior:
1. Be practical, formal, and India-focused.
2. Prioritize clear structure, chronology, issues, grounds, relief, and review checkpoints.
3. Do not fabricate case citations. If exact citation support is unavailable, say so clearly.
4. Prefer current Indian legislative terminology where relevant.
5. If facts are incomplete, use placeholders and add a missing-information checklist.
6. This tool is for educational and workflow assistance, not a substitute for independent professional legal advice.
7. Where useful, explain the drafting logic briefly so the product also teaches users.`;

export function buildDraftPrompt({ draftType, draftModel, facts, tone, partyName }) {
  return `Create a ${tone} Indian legal draft.

Draft type: ${draftType}
Drafting model: ${draftModel || 'notice_standard'}
Party/opposite party/applicant name: ${partyName || 'Not provided'}
Facts or existing text to work from: ${facts}

Output requirements:
- clear title
- formal and usable structure
- facts placed in a logical sequence
- where appropriate, include: background, issues, grounds, demand/prayer, annexure suggestions, and verification placeholders
- if the model is revise_existing, first improve the language and structure of the given text
- if the model is research_backed, add probable statutory hooks, issue framing, and a short research checklist without inventing citations
- if the model is senior_chamber, tighten language, remove weak phrasing, and improve relief framing
- end with:
  1. missing details to confirm
  2. practical review checklist
- do not invent exact case citations if uncertain`;
}

export function buildResearchPrompt({ query }) {
  return `Help with Indian legal research for the following topic:
${query}

Output requirements:
- probable legal issues
- relevant Acts / Codes / constitutional framing where applicable
- practical research path
- what documents or facts are needed
- a short drafting angle section explaining how this research can be converted into a notice, complaint, application, or synopsis
- caution against relying on unverified citations`;
}

export function buildAnalysisPrompt({ text }) {
  return `Analyze the following legal or quasi-legal text/document content.

Content:
${text}

Output requirements:
- document summary
- key legal issues
- chronology if inferable
- possible next steps
- missing documents / evidence
- draft suggestions
- practical cautions
- if suitable, say whether the matter is better approached as a notice, complaint, application, reply, or advisory note`;
}
