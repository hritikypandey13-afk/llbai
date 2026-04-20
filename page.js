export default function DashboardPage() {
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>LLBAI Dashboard</h1>
        <p className="small">This page is reserved for admin analytics, course funnel triggers, user history, plan control, and future payment integration.</p>
        <div className="grid grid-2" style={{ marginTop: 20 }}>
          <div className="card">
            <h3>Planned Modules</h3>
            <ul>
              <li>User authentication</li>
              <li>Saved drafts and matters</li>
              <li>Course recommendations</li>
              <li>Usage analytics</li>
              <li>Subscription management</li>
            </ul>
          </div>
          <div className="card">
            <h3>Deployment Notes</h3>
            <ul>
              <li>Deploy on Vercel, Railway, or a VPS</li>
              <li>Set OPENAI_API_KEY in environment</li>
              <li>Upgrade to database-backed storage for production</li>
              <li>Add legal-source validation before citing exact case law</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
