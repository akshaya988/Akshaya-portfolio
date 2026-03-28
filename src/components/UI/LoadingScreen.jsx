import './LoadingScreen.css';

export default function LoadingScreen({ isVisible }) {
  return (
    <div className={`loading-screen ${!isVisible ? 'loading-screen--hidden' : ''}`} aria-live="polite" aria-busy={isVisible}>
      <div className="loading-screen__content">
        {/* Animated logo */}
        <div className="loading-screen__logo">
          <span className="loading-screen__bracket">&lt;</span>
          <span className="loading-screen__name">AR</span>
          <span className="loading-screen__bracket">/&gt;</span>
        </div>

        {/* Progress bar */}
        <div className="loading-screen__bar-track">
          <div className="loading-screen__bar-fill" />
        </div>

        <p className="loading-screen__text mono">Initializing portfolio...</p>
      </div>

      {/* Corner decorations */}
      <span className="loading-screen__corner loading-screen__corner--tl" />
      <span className="loading-screen__corner loading-screen__corner--tr" />
      <span className="loading-screen__corner loading-screen__corner--bl" />
      <span className="loading-screen__corner loading-screen__corner--br" />
    </div>
  );
}
