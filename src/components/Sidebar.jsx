import { useState } from 'react';
import '../styles/Sidebar.css';
import { categoryConfig } from '../data/eventsData';

const Sidebar = ({ onAddEvent, filters, onFilterChange }) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [terpmail, setTerpmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const categories = [
    { key: 'academic', label: 'A', title: 'Academic Event' },
    { key: 'social', label: 'S', title: 'Social Event' },
    { key: 'umd-sponsored', label: 'U', title: 'UMD Sponsored' }
  ];

  const handlePlusClick = () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
    } else {
      setShowCategoryMenu(!showCategoryMenu);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();

    // Validate TerpMail format (must end with @umd.edu or @terpmail.umd.edu)
    const terpmailRegex = /^[a-zA-Z0-9._-]+@(umd\.edu|terpmail\.umd\.edu)$/;

    if (terpmailRegex.test(terpmail)) {
      setIsAuthenticated(true);
      setShowAuthPrompt(false);
      setShowCategoryMenu(true);
      setAuthError('');
    } else {
      setAuthError('Please enter a valid UMD TerpMail address');
    }
  };

  const handleCategorySelect = (category) => {
    setShowCategoryMenu(false);
    onAddEvent(category);
  };

  const handleFilterToggle = (category) => {
    onFilterChange({
      ...filters,
      [category]: !filters[category]
    });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <h2>UMD</h2>
      </div>

      <div className="icon-container">
        {categories.map(cat => (
          <div
            key={cat.key}
            className={`event-icon ${cat.key} ${!filters[cat.key] ? 'dimmed' : ''}`}
            title={cat.title}
          >
            <span className="icon-letter">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-title">FILTERS</div>
        {categories.map(cat => (
          <div key={cat.key} className="filter-checkbox">
            <input
              type="checkbox"
              id={`filter-${cat.key}`}
              checked={filters[cat.key]}
              onChange={() => handleFilterToggle(cat.key)}
            />
            <label htmlFor={`filter-${cat.key}`}>
              <span
                className="filter-dot"
                style={{ backgroundColor: categoryConfig[cat.key].color }}
              ></span>
              {cat.label}
            </label>
          </div>
        ))}
      </div>

      {/* Plus Button */}
      <div className="sidebar-footer">
        <button
          className={`create-category-btn ${showCategoryMenu ? 'active' : ''}`}
          onClick={handlePlusClick}
          title="Add New Event"
        >
          +
        </button>
      </div>

      {/* TerpMail Authentication Prompt */}
      {showAuthPrompt && (
        <div className="auth-modal">
          <div className="auth-content">
            <div className="auth-header">
              <h3>Verify TerpMail</h3>
              <button
                className="auth-close"
                onClick={() => {
                  setShowAuthPrompt(false);
                  setAuthError('');
                  setTerpmail('');
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAuthSubmit}>
              <div className="auth-description">
                Please enter your UMD TerpMail to create events
              </div>
              <input
                type="email"
                placeholder="username@umd.edu"
                value={terpmail}
                onChange={(e) => setTerpmail(e.target.value)}
                className="auth-input"
                autoFocus
                required
              />
              {authError && <div className="auth-error">{authError}</div>}
              <button type="submit" className="auth-submit">
                Verify & Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Category Selection Menu */}
      {showCategoryMenu && (
        <div className="category-menu">
          <div className="category-menu-title">Select Event Type</div>
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`category-menu-item ${cat.key}`}
              onClick={() => handleCategorySelect(cat.key)}
            >
              <span className="menu-icon" style={{ backgroundColor: categoryConfig[cat.key].color }}>
                {cat.label}
              </span>
              <span className="menu-label">{cat.title}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
