import React from 'react';

export const StardustButton = ({ 
  children = "Launching Soon", 
  onClick, 
  className = "",
  style: styleProp,
  variant = "default", // "default" (blue) | "black"
  ...props 
}) => {
  const isBlack = variant === "black";
  const buttonStyle = {
    '--white': isBlack ? '#f5f5f5' : '#e6f3ff',
    '--bg': isBlack ? '#000' : '#0a1929',
    '--radius': '100px',
    outline: 'none',
    cursor: 'pointer',
    border: 0,
    position: 'relative',
    borderRadius: 'var(--radius)',
    backgroundColor: 'var(--bg)',
    transition: 'all 0.2s ease',
    boxShadow: isBlack
      ? `
      inset 0 0.3rem 0.9rem rgba(255, 255, 255, 0.15),
      inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.5),
      0 3rem 3rem rgba(0, 0, 0, 0.3),
      0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.6)
    `
      : `
      inset 0 0.3rem 0.9rem rgba(255, 255, 255, 0.3),
      inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
      inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.5),
      0 3rem 3rem rgba(0, 0, 0, 0.3),
      0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8)
    `,
  };

  const wrapStyle = {
    fontSize: '25px',
    fontWeight: 500,
    color: isBlack ? 'rgba(255, 255, 255, 0.95)' : 'rgba(129, 216, 255, 0.9)',
    padding: '32px 45px',
    borderRadius: 'inherit',
    position: 'relative',
    overflow: 'hidden',
  };

  const pStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: 0,
    transition: 'all 0.2s ease',
    transform: 'translateY(2%)',
    maskImage: isBlack
      ? 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 40%, transparent)'
      : 'linear-gradient(to bottom, rgba(129, 216, 255, 1) 40%, transparent)',
  };

  const beforeAfterStyles = `
    .pearl-button .wrap::before,
    .pearl-button .wrap::after {
      content: "";
      position: absolute;
      transition: all 0.3s ease;
    }
    
    .pearl-button .wrap::before {
      left: -15%;
      right: -15%;
      bottom: 25%;
      top: -100%;
      border-radius: 50%;
      background-color: rgba(64, 180, 255, 0.15);
    }
    
    .pearl-button .wrap::after {
      left: 6%;
      right: 6%;
      top: 12%;
      bottom: 40%;
      border-radius: 22px 22px 0 0;
      box-shadow: inset 0 10px 8px -10px rgba(129, 216, 255, 0.6);
      background: linear-gradient(
        180deg,
        rgba(64, 180, 255, 0.25) 0%,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    
    .pearl-button .wrap p span:nth-child(2) {
      display: none;
    }
    
    .pearl-button:hover .wrap p span:nth-child(1) {
      display: none;
    }
    
    .pearl-button:hover .wrap p span:nth-child(2) {
      display: inline-block;
    }
    
    .pearl-button:hover {
      box-shadow:
        inset 0 0.3rem 0.5rem rgba(129, 216, 255, 0.4),
        inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
        inset 0 -0.4rem 0.9rem rgba(64, 180, 255, 0.6),
        0 3rem 3rem rgba(0, 0, 0, 0.3),
        0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8);
    }
    
    .pearl-button:hover .wrap::before {
      transform: translateY(-5%);
    }
    
    .pearl-button:hover .wrap::after {
      opacity: 0.4;
      transform: translateY(5%);
    }
    
    .pearl-button:hover .wrap p {
      transform: translateY(-4%);
    }
    
    .pearl-button:active {
      transform: translateY(4px);
      box-shadow:
        inset 0 0.3rem 0.5rem rgba(129, 216, 255, 0.5),
        inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.8),
        inset 0 -0.4rem 0.9rem rgba(64, 180, 255, 0.4),
        0 3rem 3rem rgba(0, 0, 0, 0.3),
        0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8);
    }
    
    /* Black variant: no blue, white/neutral accents only */
    .pearl-button.pearl-button-black .wrap::before {
      background-color: rgba(255, 255, 255, 0.08);
    }
    .pearl-button.pearl-button-black .wrap::after {
      box-shadow: inset 0 10px 8px -10px rgba(255, 255, 255, 0.25);
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.12) 0%,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    .pearl-button.pearl-button-black:hover {
      box-shadow:
        inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.12),
        inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.6),
        0 3rem 3rem rgba(0, 0, 0, 0.3),
        0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.6);
    }
    .pearl-button.pearl-button-black:active {
      box-shadow:
        inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.1),
        inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
        0 3rem 3rem rgba(0, 0, 0, 0.3),
        0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.6);
    }
  `;

  return (
    <>
      <style>{beforeAfterStyles}</style>
      <button
        className={`pearl-button ${isBlack ? 'pearl-button-black ' : ''}${className}`}
        style={{ ...buttonStyle, ...styleProp }}
        onClick={onClick}
        {...props}
      >
        <div className="wrap" style={wrapStyle}>
          <p style={pStyle}>
            <span>✧</span>
            <span>✦</span>
            {children}
          </p>
        </div>
      </button>
    </>
  );
};

// Demo component showing the button in action
export const StardustButtonDemo = () => {
  return (
   <div className="min-h-screen bg-slate-200 dark:bg-stone-900 w-full flex items-center justify-center font-sans">
  <StardustButton onClick={() => alert('Coming soon!')}>
    Launching Soon
  </StardustButton>
</div>
  );
};
