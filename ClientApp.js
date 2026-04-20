'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

const draftModels = [
  {
    key: 'notice_standard',
    label: 'Standard Notice',
    summary: 'Fast first draft for demand letters and general legal notices.',
    bestFor: 'Recovery, breach, employment, property, consumer matters.'
  },
  {
    key: 'police_complaint_structured',
    label: 'Police Complaint',
    summary: 'Fact-first complaint format with chronology, evidence list, and prayer.',
    bestFor: 'Cheating, intimidation, trespass, cyber complaints, harassment.'
  },
  {
    key: 'court_pleading',
    label: 'Court Pleading',
    summary: 'Court-facing drafting with cause title, facts, grounds, and prayer.',
    bestFor: 'Applications, replies, synopsis, bail, misc. pleadings.'
  },
  {
    key: 'research_backed',
    label: 'Research-Backed Draft',
    summary: 'Draft plus issue framing, likely statutes, and a research checklist.',
    bestFor: 'Junior advocates and students who want learning with drafting.'
  },
  {
    key: 'revise_existing',
    label: 'Revise Existing Draft',
    summary: 'Rework pasted draft into cleaner, stronger, more formal language.',
    bestFor: 'Improving notices, complaints, applications, and replies.'
  },
  {
    key: 'senior_chamber',
    label: 'Senior Chamber Style',
    summary: 'Sharper tone, better sequencing, stronger relief framing, and review notes.',
    bestFor: 'Professional client-facing drafts before final advocate review.'
  }
];

const draftTypes = [
  'Legal Notice',
  'Police Complaint',
  'Bail Application',
  'Synopsis',
  'Application / Plea',
  'Written Statement',
  'Consumer Complaint',
  'Reply Notice',
  'Arbitration Notice',
  'Client Advisory Note'
];

const tones = ['Basic', 'Court-Ready', 'Senior Advocate Style', 'Aggressive Litigation Style'];

const sampleResearchPrompts = [
  'Legal notice for unpaid professional fees in India',
  'Police complaint structure for cheating and money transfer dispute',
  'Consumer complaint for deficiency in legal or professional services',
  'Synopsis structure for civil injunction matter',
  'Checklist for drafting a reply to employment termination dispute'
];

export default function ClientApp() {
  const [tab, setTab] = useState('draft');
  const [draftType, setDraftType] = useState('Legal Notice');
  const [draftModel, setDraftModel] = useState('research_backed');
  const [tone, setTone] = useState('Court-Ready');
  const [partyName, setPartyName] = useState('');
  const [facts, setFacts] = useState('My client paid fees for services, but the opposite party failed to perform and has not refunded the money despite repeated requests.');
  const [draftOutput, setDraftOutput] = useState('Your generated draft will appear here.');
  const [loadingDraft, setLoadingDraft] = useState(false);

  const [researchQuery, setResearchQuery] = useState(sampleResearchPrompts[0]);
  const [researchOutput, setResearchOutput] = useState('Your research guidance will appear here.');
  const [loadingResearch, setLoadingResearch] = useState(false);

  const [analysisText, setAnalysisText] = useState('Employee was verbally asked not to continue services and has not been paid full dues. Appointment terms and communications are partly available over email and WhatsApp.');
  const [analysisOutput, setAnalysisOutput] = useState('Your document analysis will appear here.');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const activeModel = useMemo(() => draftModels.find((m) => m.key === draftModel), [draftModel]);

  async function handleDraft() {
    setLoadingDraft(true);
    try {
      const res = await fetch('/api/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftType, draftModel, tone, partyName, facts })
      });
      const data = await res.json();
      setDraftOutput(data.output || data.error || 'No output generated.');
    } catch (error) {
      setDraftOutput('Request failed. Please check your environment setup and try again.');
    } finally {
      setLoadingDraft(false);
    }
  }

  async function handleResearch() {
    setLoadingResearch(true);
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: researchQuery })
      });
      const data = await res.json();
      setResearchOutput(data.output || data.error || 'No output generated.');
    } catch (error) {
      setResearchOutput('Request failed. Please check your environment setup and try again.');
    } finally {
      setLoadingResearch(false);
    }
  }

  async function handleAnalyze() {
    setLoadingAnalysis(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: analysisText })
      });
      const data = await res.json();
      setAnalysisOutput(data.output || data.error || 'No output generated.');
    } catch (error) {
      setAnalysisOutput('Request failed. Please check your environment setup and try again.');
    } finally {
      setLoadingAnalysis(false);
    }
  }

  return (
    <div className="site-shell">
      <div className="container">
        <div className="nav glass">
          <div className="brand-wrap">
            <Image src="/llb-logo.png" alt="Law Learning Bench logo" width={72} height={72} className="brand-logo" priority />
            <div>
              <div className="brand-title">LLBAI</div>
              <div className="brand-subtitle">Law Learning Bench</div>
              <div className="brand-tagline">Unlock The World Of Law</div>
            </div>
          </div>
          <div className="nav-actions">
            <span className="pill">AI Legal Workspace</span>
            <a href="/dashboard" className="btn secondary">Dashboard</a>
          </div>
        </div>

        <section className="hero hero-dark">
          <div className="hero-copy">
            <div className="mini-pill">Built for Indian legal drafting, research, and case analysis</div>
            <h1>Draft smarter. Research faster. Operate under the LLB brand.</h1>
            <p>
              LLBAI now carries your Law Learning Bench logo and tagline directly inside the live product experience.
              It is designed as a branded legal workspace for students, junior advocates, and working professionals.
            </p>
            <div className="hero-actions">
              <a href="#workspace" className="btn gold">Open Workspace</a>
              <a href="#models" className="btn secondary">View Drafting Models</a>
            </div>
            <div className="hero-note">
              Brand-first MVP with multiple drafting modes, research guidance, and matter analysis.
            </div>
          </div>

          <div className="hero-panel glass">
            <div className="panel-title">What users can do</div>
            <div className="feature-list">
              <div className="feature-item"><strong>Draft a legal document</strong><span>Notices, complaints, pleadings, replies, synopsis, and more.</span></div>
              <div className="feature-item"><strong>Run legal research</strong><span>Issue framing, probable statutes, document checklist, and next steps.</span></div>
              <div className="feature-item"><strong>Analyze a matter</strong><span>Summarize documents, identify issues, missing evidence, and drafting direction.</span></div>
              <div className="feature-item"><strong>Learn through drafting</strong><span>Research-backed model aligned with your course funnel and practical training.</span></div>
            </div>
          </div>
        </section>

        <section id="models" className="card models-card">
          <div className="section-head">
            <div>
              <div className="section-kicker">Drafting models</div>
              <h2>Multiple drafting modes inspired by market-standard legal AI workflows</h2>
            </div>
            <div className="section-copy">
              Built to combine fast first drafts, revision workflows, research-backed drafting, and chamber-style refinement.
            </div>
          </div>

          <div className="model-grid">
            {draftModels.map((model) => (
              <button
                key={model.key}
                className={`model-card ${draftModel === model.key ? 'active' : ''}`}
                onClick={() => setDraftModel(model.key)}
              >
                <div className="model-name">{model.label}</div>
                <div className="model-summary">{model.summary}</div>
                <div className="model-bestfor">Best for: {model.bestFor}</div>
              </button>
            ))}
          </div>
        </section>

        <section id="workspace" className="card workspace-card">
          <div className="tabs">
            <button className={`tab ${tab === 'draft' ? 'active' : ''}`} onClick={() => setTab('draft')}>Drafting</button>
            <button className={`tab ${tab === 'research' ? 'active' : ''}`} onClick={() => setTab('research')}>Research</button>
            <button className={`tab ${tab === 'analyze' ? 'active' : ''}`} onClick={() => setTab('analyze')}>Analyzer</button>
          </div>

          {tab === 'draft' && (
            <div className="grid grid-2">
              <div>
                <div className="field">
                  <label>Draft Type</label>
                  <select className="select" value={draftType} onChange={(e) => setDraftType(e.target.value)}>
                    {draftTypes.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Drafting Model</label>
                  <select className="select" value={draftModel} onChange={(e) => setDraftModel(e.target.value)}>
                    {draftModels.map((model) => <option key={model.key} value={model.key}>{model.label}</option>)}
                  </select>
                  <div className="small">{activeModel?.summary}</div>
                </div>
                <div className="field">
                  <label>Draft Style</label>
                  <select className="select" value={tone} onChange={(e) => setTone(e.target.value)}>
                    {tones.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Party Name</label>
                  <input className="input" value={partyName} onChange={(e) => setPartyName(e.target.value)} placeholder="Enter party / opposite party / applicant name" />
                </div>
                <div className="field">
                  <label>Facts / Existing Draft / Matter Background</label>
                  <textarea className="textarea" value={facts} onChange={(e) => setFacts(e.target.value)} />
                </div>
                <button className="btn gold" onClick={handleDraft}>{loadingDraft ? 'Generating...' : 'Generate Draft'}</button>
              </div>
              <div>
                <div className="output-title">Generated Draft</div>
                <div className="output">{draftOutput}</div>
              </div>
            </div>
          )}

          {tab === 'research' && (
            <div className="grid grid-2">
              <div>
                <div className="field">
                  <label>Research Query</label>
                  <textarea className="textarea" value={researchQuery} onChange={(e) => setResearchQuery(e.target.value)} />
                </div>
                <div className="quick-chips">
                  {sampleResearchPrompts.map((prompt) => (
                    <button key={prompt} className="chip" onClick={() => setResearchQuery(prompt)}>{prompt}</button>
                  ))}
                </div>
                <button className="btn gold" onClick={handleResearch}>{loadingResearch ? 'Researching...' : 'Run Research'}</button>
              </div>
              <div>
                <div className="output-title">Research Output</div>
                <div className="output">{researchOutput}</div>
              </div>
            </div>
          )}

          {tab === 'analyze' && (
            <div className="grid grid-2">
              <div>
                <div className="field">
                  <label>Paste Document / Matter Text</label>
                  <textarea className="textarea" value={analysisText} onChange={(e) => setAnalysisText(e.target.value)} />
                </div>
                <button className="btn gold" onClick={handleAnalyze}>{loadingAnalysis ? 'Analyzing...' : 'Analyze Matter'}</button>
              </div>
              <div>
                <div className="output-title">Analysis Output</div>
                <div className="output">{analysisOutput}</div>
              </div>
            </div>
          )}

          <div className="footer-note">
            All outputs should be reviewed by a qualified advocate before filing, issuing, or relying on them professionally.
          </div>
        </section>
      </div>
    </div>
  );
}
