let mounted = false;

const RETUNE_VERSION = '0.7.6';
const REACT_VERSION = '19';

// Loads retune via native ES modules from esm.sh, bypassing Metro/Hermes.
// Metro can't bundle retune because it uses `import.meta` (ESM-only).
export function mountRetune() {
  if (mounted) return;
  if (typeof document === 'undefined') return;
  mounted = true;

  if (!document.getElementById('retune-root')) {
    const div = document.createElement('div');
    div.id = 'retune-root';
    document.body.appendChild(div);
  }

  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    (async () => {
      try {
        const [{ Retune }, React, { createRoot }] = await Promise.all([
          import('https://esm.sh/retune@${RETUNE_VERSION}?bundle&deps=react@${REACT_VERSION},react-dom@${REACT_VERSION}'),
          import('https://esm.sh/react@${REACT_VERSION}'),
          import('https://esm.sh/react-dom@${REACT_VERSION}/client'),
        ]);
        const host = document.getElementById('retune-root');
        createRoot(host).render(React.createElement(Retune, { force: true }));
        console.info('[retune] mounted via esm.sh');
      } catch (err) {
        console.warn('[retune] esm.sh load failed:', err);
      }
    })();
  `;
  document.head.appendChild(script);
}
