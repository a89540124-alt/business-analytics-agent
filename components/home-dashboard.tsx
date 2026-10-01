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
    items: ['Revenue grew by 18.2% YoY.', 'Operating margin improved to 26.6%.', 'Retention remains above the annual benchmark.'],
  },
  {
    title: 'Key Recommendations',
    items: ['Increase inventory for high-velocity SKUs.', 'Push cross-sell campaigns for repeat buyers.', 'Prioritize retention offers in APAC.'],
  },
];

export default function HomeDashboard() {
  return (
    <main className="dashboard-shell">
      <div className="dashboard-container">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">BA</div>
            Business Analytics Agent
          </div>

          <div className="header-actions">
            <button className="ghost-button">Export Report</button>
            <button className="primary-button">Generate AI Insight</button>
          </div>
        </header>

        <section className="main-grid">
          <div className="section-stack">
            <div className="kpi-grid">
              {kpis.map(kpi => (
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
                <SalesChart data={salesData} />
              </div>
            </div>
          </div>

          <div className="section-stack">
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">Regional Revenue</h2>
              </div>

              <div className="list-group">
                {topRegions.map(region => (
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
                {insights.map(item => (
                  <div key={item} style={{ marginBottom: 10 }}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="panel" style={{ marginTop: 24 }}>
          <div className="panel-header">
            <h2 className="panel-title">Business Report Summary</h2>
          </div>

          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {reportSections.map(section => (
              <div className="report-card" key={section.title}>
                <h3>{section.title}</h3>
                <ul>
                  {section.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SalesChart({ data }: { data: Array<{ month: string; sales: number }> }) {
  const chartData = data.map(item => ({ ...item, sales: item.sales / 1000 }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg viewBox="0 0 760 300" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="salesStroke" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map(index => (
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

        {chartData.map((point, index) => {
          const x = (index / (chartData.length - 1)) * 760;
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
