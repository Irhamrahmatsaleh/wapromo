export default function ApiLoadingSkeleton() {
  return (
    <div className="skeleton-container container" aria-busy="true" aria-label="Memuat dokumentasi API...">
      {/* Skeleton Header */}
      <div className="skeleton-header">
        <div className="skeleton-box skeleton-logo" />
        <div className="skeleton-nav">
          <div className="skeleton-box skeleton-nav-item" />
          <div className="skeleton-box skeleton-nav-item" />
          <div className="skeleton-box skeleton-nav-item" />
          <div className="skeleton-box skeleton-nav-item" />
        </div>
        <div className="skeleton-box skeleton-btn-sm" />
      </div>

      {/* Skeleton Hero */}
      <div className="skeleton-hero">
        <div className="skeleton-box skeleton-eyebrow" />
        <div className="skeleton-box skeleton-title-lg" />
        <div className="skeleton-box skeleton-title-md" />
        <div className="skeleton-box skeleton-lead" />
        <div className="skeleton-hero-actions">
          <div className="skeleton-box skeleton-btn" />
          <div className="skeleton-box skeleton-btn" />
        </div>
      </div>

      {/* Skeleton Stats Strip */}
      <div className="skeleton-stats-strip">
        <div className="skeleton-box skeleton-stat-card" />
        <div className="skeleton-box skeleton-stat-card" />
        <div className="skeleton-box skeleton-stat-card" />
      </div>

      {/* Skeleton Code Terminal Window */}
      <div className="skeleton-terminal">
        <div className="skeleton-terminal-header">
          <div className="skeleton-dots">
            <span className="skeleton-box skeleton-dot" />
            <span className="skeleton-box skeleton-dot" />
            <span className="skeleton-box skeleton-dot" />
          </div>
          <div className="skeleton-box skeleton-tabs" />
        </div>
        <div className="skeleton-terminal-body">
          <div className="skeleton-box skeleton-code-line w-80" />
          <div className="skeleton-box skeleton-code-line w-60" />
          <div className="skeleton-box skeleton-code-line w-90" />
          <div className="skeleton-box skeleton-code-line w-40" />
          <div className="skeleton-box skeleton-code-line w-75" />
          <div className="skeleton-box skeleton-code-line w-50" />
        </div>
      </div>

      {/* Skeleton Endpoints Grid */}
      <div className="skeleton-endpoints-grid">
        <div className="skeleton-box skeleton-endpoint-card" />
        <div className="skeleton-box skeleton-endpoint-card" />
        <div className="skeleton-box skeleton-endpoint-card" />
        <div className="skeleton-box skeleton-endpoint-card" />
      </div>
    </div>
  );
}
