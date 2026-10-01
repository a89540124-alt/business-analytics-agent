'use client';

import React, { useState, useEffect } from 'react';

const kpis = [
  { label: 'Revenue', value: '$1.24M', trend: '+18.2%' },
  { label: 'Orders', value: '12.8K', trend: '+11.4%' },
  { label: 'Profit Margin', value: '26.6%', trend: '+3.1%' },
  { label: 'Customer Retention', value: '87.4%', trend: '+5.2%' },
];

const salesData = [
  { month: 'Jan', sales: 2400 },
  { month: 'Feb', sales: 3100 },
  { month: 'Mar', sales: 2800 },
  { month: 'Apr', sales: 3900 },
  { month: 'May', sales: 4200 },
  { month: 'Jun', sales: 5100 },
  { month: 'Jul', sales: 4700 },
  { month: 'Aug', sales: 5600 },
  { month: 'Sep', sales: 6100 },
  { month: 'Oct', sales: 6500 },
  { month: 'Nov', sales: 7200 },
  { month: 'Dec', sales: 8100 },
];

const topRegions = [
  { name: 'North America', value: '$420K', badge: 'High growth' },
  { name: 'Europe', value: '$315K', badge: 'Stable' },
  { name: 'APAC', value: '$289K', badge: 'High growth' },
  { name: 'Middle East', value: '$216K', badge: 'Watchlist' },
];

const insights = [
  'Revenue is growing consistently month over month with strongest performance in Q4.',
  'Customer retention exceeds target and is expected to remain stable across the next quarter.',
  'Inventory performance is healthy, but seasonal stock planning is recommended for peak demand periods.',
];

const reportSections = [
  {
    title: 'Executive Summary',
    items: [
      'Revenue grew by 18.2% YoY.',
      'Operating margin improved to 26.6%.',
      'Retention remains above the annual benchmark.',
    ],
  },
  {
    title: 'Key Recommendations',
    items: [
      'Increase inventory for high-velocity SKUs.',
      'Push cross-sell campaigns for repeat buyers.',
      'Prioritize retention offers in APAC.',
    ],
  },
];

export default function Page() {
  const [n8nConnected, setN8nConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'n8n' | 'integration'>('dashboard');
  const [n8nInput, setN8nInput] = useState(JSON.stringify({ revenue: '1240000', orders: '12800', region: 'North America', email: 'admin@business.com' }, null, 2));
  const [integrationStatus, setIntegrationStatus] = useState('Ready to connect to N8N');

  useEffect(() => {
    // Check if N8N webhook is available
    const checkN8nConnection = async () => {
      try {
        // This would check if N8N is running
        console.log('N8N integration ready');
      } catch (error) {
        console.log('N8N not currently connected');
      }
    };

    checkN8nConnection();
  }, []);

  const triggerN8nWorkflow = async () => {
    try {
      const data = JSON.parse(n8nInput);
      const response = await fetch('http://localhost:5678/webhook/business-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIntegrationStatus('✅ Workflow triggered successfully!');
        setN8nConnected(true);
      } else {
        setIntegrationStatus('⚠️ N8N webhook not responding. Make sure N8N is running on port 5678.');
      }
    } catch (error) {
      setIntegrationStatus('❌ Error: ' + (error instanceof Error ? error.message : 'Failed to connect'));
    }
  };

  const exportToFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <main className="dashboard-shell">
        <div className="dashboard-container">
          <header className="topbar">
            <div className="brand">
              <div className="brand-icon">BA</div>
              Business Analytics Agent
            </div>

            <div className="header-actions">
              <button
                className={activeTab === 'dashboard' ? 'primary-button' : 'ghost-button'}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button
                className={activeTab === 'n8n' ? 'primary-button' : 'ghost-button'}
                onClick={() => setActiveTab('n8n')}
              >
                N8N Workflow
              </button>
              <button
                className={activeTab === 'integration' ? 'primary-button' : 'ghost-button'}
                onClick={() => setActiveTab('integration')}
              >
                Integration
              </button>
              <button className="secondary-button">Export Report</button>
            </div>
          </header>

          {activeTab === 'dashboard' && (
            <section className="main-grid">
              <div className="section-stack">
                <div className="kpi-grid">
                  {kpis.map((kpi) => (
                    <div key={kpi.label} className="kpi-card">
                      <div className="kpi-label">{kpi.label}</div>
                      <div className="kpi-value">{kpi.value}</div>
                      <div className="kpi-trend">{kpi.trend} vs last period</div>
                    </div>
                  ))}
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <h2 className="panel-title">Sales Performance</h2>
                    <button className="secondary-button">View Report</button>
                  </div>

                  <div className="chart-box">
                    <SalesChart />
                  </div>
                </div>
              </div>

              <div className="section-stack">
                <div className="panel">
                  <div className="panel-header">
                    <h2 className="panel-title">Regional Revenue</h2>
                  </div>

                  <div className="list-group">
                    {topRegions.map((region) => (
                      <div className="list-item" key={region.name}>
                        <div>
                          <div>{region.name}</div>
                          <div className="muted">{region.value}</div>
                        </div>
                        <span className="badge badge-success">{region.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <h2 className="panel-title">AI Insights</h2>
                  </div>

                  <div className="insights-box">
                    {insights.map((item) => (
                      <div key={item} style={{ marginBottom: 10 }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'n8n' && (
            <section className="panel" style={{ marginTop: 24 }}>
              <div className="panel-header">
                <h2 className="panel-title">N8N Workflow Files</h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 16,
                  marginTop: 16,
                }}
              >
                <div className="report-card">
                  <h3>📋 Basic Analytics Workflow</h3>
                  <p style={{ color: '#94a3b8', marginBottom: 12 }}>
                    Simple workflow that saves data, analyzes with AI, and sends email reports.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() =>
                      exportToFile(
                        'basic-workflow.json',
                        JSON.stringify(
                          {
                            name: 'Business Analytics Agent Workflow',
                            description: 'Basic analytics workflow for business data analysis',
                            file: 'business-analytics-workflow.json',
                          },
                          null,
                          2
                        )
                      )
                    }
                    style={{ width: '100%', marginTop: 8 }}
                  >
                    Download
                  </button>
                </div>

                <div className="report-card">
                  <h3>🚀 Advanced Analytics Workflow</h3>
                  <p style={{ color: '#94a3b8', marginBottom: 12 }}>
                    Advanced workflow with PDF generation, detailed recommendations, and dashboard sync.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() =>
                      exportToFile(
                        'advanced-workflow.json',
                        JSON.stringify(
                          {
                            name: 'Advanced Business Analytics Agent Workflow',
                            description: 'Advanced workflow with PDF reports and dashboard integration',
                            file: 'advanced-analytics-workflow.json',
                          },
                          null,
                          2
                        )
                      )
                    }
                    style={{ width: '100%', marginTop: 8 }}
                  >
                    Download
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'integration' && (
            <section className="panel" style={{ marginTop: 24 }}>
              <div className="panel-header">
                <h2 className="panel-title">N8N Integration & Testing</h2>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ marginBottom: 8 }}>Setup Instructions:</h3>
                  <ol style={{ color: '#cbd5e1', lineHeight: 1.8 }}>
                    <li>Install N8N: <code style={{ background: '#111827', padding: '4px 8px', borderRadius: 4 }}>npm install -g n8n</code></li>
                    <li>Start N8N: <code style={{ background: '#111827', padding: '4px 8px', borderRadius: 4 }}>n8n start</code></li>
                    <li>Open N8N: <code style={{ background: '#111827', padding: '4px 8px', borderRadius: 4 }}>http://localhost:5678</code></li>
                    <li>Import workflow JSON file from the N8N Workflow tab</li>
                    <li>Configure your API keys (OpenAI, SendGrid, MongoDB)</li>
                    <li>Activate the workflow</li>
                  </ol>
                </div>

                <div className="report-card" style={{ marginBottom: 20 }}>
                  <h3>Test Workflow Execution</h3>
                  <p style={{ color: '#94a3b8', marginBottom: 12 }}>
                    Send test data to trigger the N8N workflow:
                  </p>

                  <textarea
                    value={n8nInput}
                    onChange={(e) => setN8nInput(e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '200px',
                      background: 'rgba(15, 23, 42, 0.7)',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: 8,
                      padding: 12,
                      color: '#e2e8f0',
                      fontFamily: 'monospace',
                      fontSize: 12,
                      marginBottom: 12,
                    }}
                  />

                  <button className="primary-button" onClick={triggerN8nWorkflow} style={{ width: '100%' }}>
                    {n8nConnected ? '✅ Send to N8N Workflow' : '▶️ Test Trigger'}
                  </button>

                  <div
                    style={{
                      marginTop: 12,
                      padding: 12,
                      borderRadius: 8,
                      background: 'rgba(15, 23, 42, 0.7)',
                      color: n8nConnected ? '#86efac' : '#fbbf24',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                    }}
                  >
                    Status: {integrationStatus}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'dashboard' && (
            <section className="panel" style={{ marginTop: 24 }}>
              <div className="panel-header">
                <h2 className="panel-title">Business Report Summary</h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: 18,
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                }}
              >
                {reportSections.map((section) => (
                  <div className="report-card" key={section.title}>
                    <h3>{section.title}</h3>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <style jsx>{`
        :root {
          --bg: #07111f;
          --panel: #0f172a;
          --panel-alt: #111827;
          --muted: #94a3b8;
          --text: #e2e8f0;
          --primary: #38bdf8;
          --primary-strong: #0ea5e9;
          --success: #22c55e;
          --warning: #f59e0b;
          --danger: #f43f5e;
          --border: rgba(148, 163, 184, 0.2);
        }

        html {
          color-scheme: dark;
        }

        body {
          margin: 0;
          background: linear-gradient(135deg, #020817 0%, #0f172a 45%, #111827 100%);
          color: var(--text);
          font-family: Arial, Helvetica, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        .dashboard-shell {
          min-height: 100vh;
          padding: 28px 20px 42px;
        }

        .dashboard-container {
          max-width: 1360px;
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 18px 22px;
          backdrop-filter: blur(8px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #0ea5e9, #22c55e);
          color: white;
          box-shadow: 0 12px 28px rgba(14, 165, 233, 0.35);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .primary-button,
        .secondary-button,
        .ghost-button {
          border: none;
          border-radius: 12px;
          padding: 10px 16px;
          transition: transform 0.2s ease;
          cursor: pointer;
        }

        .primary-button {
          background: linear-gradient(135deg, #0ea5e9, #22c55e);
          color: white;
          font-weight: 600;
          box-shadow: 0 10px 22px rgba(14, 165, 233, 0.35);
        }

        .secondary-button {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid var(--border);
          color: var(--text);
        }

        .ghost-button {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
        }

        .primary-button:hover,
        .secondary-button:hover,
        .ghost-button:hover {
          transform: translateY(-1px);
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 22px;
          margin-top: 24px;
        }

        .panel {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 16px 38px rgba(2, 6, 23, 0.35);
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 22px;
        }

        .kpi-card {
          padding: 18px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(17, 24, 39, 0.9));
        }

        .kpi-label {
          color: var(--muted);
          font-size: 0.85rem;
          margin-bottom: 10px;
        }

        .kpi-value {
          font-size: 1.8rem;
          font-weight: 700;
        }

        .kpi-trend {
          margin-top: 10px;
          font-size: 0.8rem;
          color: #86efac;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .panel-title {
          margin: 0;
          font-size: 1.12rem;
          font-weight: 700;
        }

        .chart-box {
          width: 100%;
          height: 320px;
        }

        .list-group {
          display: grid;
          gap: 12px;
        }

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px;
          background: rgba(15, 23, 42, 0.7);
        }

        .muted {
          color: var(--muted);
        }

        .badge {
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge-success {
          background: rgba(34, 197, 94, 0.1);
          color: #86efac;
        }

        .section-stack {
          display: grid;
          gap: 24px;
        }

        .insights-box {
          margin-top: 12px;
          padding: 18px;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid var(--border);
          line-height: 1.7;
          color: #dbeafe;
        }

        .report-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.7);
          padding: 18px;
        }

        .report-card h3 {
          margin: 0 0 12px;
          font-size: 1rem;
        }

        .report-card ul {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
          line-height: 1.8;
        }

        .report-card ol {
          margin: 0;
          padding-left: 18px;
          line-height: 1.8;
        }

        code {
          color: #60a5fa;
        }

        @media (max-width: 980px) {
          .main-grid {
            grid-template-columns: 1fr;
          }

          .kpi-grid {
            grid-template-columns: repeat(2, minmax(150px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .dashboard-shell {
            padding: 18px 12px 30px;
          }

          .topbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-end;
            flex-wrap: wrap;
          }

          .kpi-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

function SalesChart() {
  const data = salesData.map((item) => ({ ...item, sales: item.sales / 1000 }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg viewBox="0 0 760 300" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="salesStroke" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((index) => (
          <line
            key={index}
            x1="0"
            x2="760"
            y1={40 + index * 70}
            y2={40 + index * 70}
            stroke="rgba(148,163,184,0.2)"
            strokeDasharray="4 6"
          />
        ))}

        <path
          d="M 0 230 C 80 210, 100 180, 150 160 S 250 120, 300 140 S 420 60, 470 110 S 600 80, 760 30 L 760 300 L 0 300 Z"
          fill="rgba(56, 189, 248, 0.12)"
        />

        <path
          d="M 0 230 C 80 210, 100 180, 150 160 S 250 120, 300 140 S 420 60, 470 110 S 600 80, 760 30"
          fill="none"
          stroke="url(#salesStroke)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 760;
          const y = 300 - (point.sales / 8.1) * 260;
          return (
            <g key={point.month}>
              <circle cx={x} cy={y} r="5" fill="#38bdf8" />
              <text x={x} y={290} fill="#94a3b8" fontSize="11" textAnchor="middle">
                {point.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
