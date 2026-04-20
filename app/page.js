export default function Home() {
  return (
    <main style={{ fontFamily: "Arial", background: "#0b1c3f", color: "white", minHeight: "100vh" }}>
      
      {/* NAVBAR */}
      <div style={{ display: "flex", alignItems: "center", padding: "20px 40px" }}>
        <img src="/llb-logo.png" alt="LLB Logo" style={{ width: "60px", marginRight: "15px" }} />
        <h2>LLBAI</h2>
      </div>

      {/* HERO SECTION */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h1 style={{ fontSize: "42px" }}>Unlock The World Of Law</h1>
        <p style={{ marginTop: "10px", fontSize: "18px", color: "#ccc" }}>
          AI-powered legal drafting, research & automation
        </p>

        <div style={{ marginTop: "30px" }}>
          <button style={btn}>Start Drafting</button>
          <button style={{ ...btn, marginLeft: "10px", background: "#444" }}>Explore Tools</button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "80px" }}>
        <Card title="Legal Notice" desc="Draft professional notices instantly" />
        <Card title="Police Complaint" desc="Generate complaint formats easily" />
        <Card title="Legal Research" desc="AI-powered research assistant" />
      </div>

    </main>
  );
}

const btn = {
  padding: "12px 20px",
  background: "#FFD700",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

function Card({ title, desc }) {
  return (
    <div style={{
      background: "#122a5c",
      padding: "20px",
      borderRadius: "10px",
      width: "250px",
      textAlign: "center"
    }}>
      <h3>{title}</h3>
      <p style={{ color: "#ccc" }}>{desc}</p>
    </div>
  );
}
