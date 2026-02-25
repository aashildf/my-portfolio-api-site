export default function ThemeToggleButton({ pressed, onToggle }) {
  return (
    <div className="checkbox">
      <input type="checkbox" checked={pressed} onChange={onToggle} />
      <span className="thumb">
        {pressed ? (
          /* Moon */
          <svg viewBox="0 0 24 24">
            <path
              d="M21 12.5A9 9 0 1 1 11.5 3
                 7 7 0 0 0 21 12.5Z"
            />
          </svg>
        ) : (
          /* Sun */
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4" y1="4" x2="6" y2="6" />
              <line x1="18" y1="18" x2="20" y2="20" />
            </g>
          </svg>
        )}
      </span>
    </div>
  );
}
