import { useEffect, useRef, useState } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import './Account.css';

// `?embedded=1` tells noon-one-flows to hide its own bottom nav and
// post screen-change messages back to this host so we can toggle the
// supermall nav. In dev we point at the local Vite server so HMR
// changes in noon-one-flows show up here too.
const NOON_ONE_URL = import.meta.env.DEV
  ? 'http://localhost:5181/?embedded=1'
  : 'https://noon-one-flows.vercel.app/?embedded=1';

// Minimum time the skeleton stays up. Without this, a fast iframe load
// flashes the skeleton for ~50ms which reads as a flicker rather than
// a deliberate transition.
const SKELETON_MIN_MS = 700;
// Hard ceiling — if the iframe never fires `load` (third-party blockers,
// slow network), reveal anyway so the user is never stuck on a skeleton.
const SKELETON_MAX_MS = 1800;

export default function AccountPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const minT = setTimeout(() => setMinTimeElapsed(true), SKELETON_MIN_MS);
    const maxT = setTimeout(() => setIframeLoaded(true), SKELETON_MAX_MS);
    return () => {
      clearTimeout(minT);
      clearTimeout(maxT);
    };
  }, []);

  const skeletonHidden = iframeLoaded && minTimeElapsed;

  return (
    <PageTransition>
      <div className="account-page">
        <iframe
          src={NOON_ONE_URL}
          title="noon Account"
          className={`account-page__iframe${skeletonHidden ? ' account-page__iframe--ready' : ''}`}
          onLoad={() => {
            const elapsed = Date.now() - mountedAt.current;
            const remaining = Math.max(0, SKELETON_MIN_MS - elapsed);
            setTimeout(() => setIframeLoaded(true), remaining);
          }}
        />
        <div className={`account-skeleton${skeletonHidden ? ' account-skeleton--hidden' : ''}`}>
          <div className="account-skeleton__frame">
            <div className="skel-profile">
              <div className="skel-block skel-profile__avatar" />
              <div className="skel-profile__lines">
                <div className="skel-block skel-profile__line-1" />
                <div className="skel-block skel-profile__line-2" />
              </div>
              <div className="skel-block skel-profile__edit" />
            </div>
            <div className="skel-block skel-banner" />
            <div className="skel-tiles">
              <div className="skel-block skel-tile" />
              <div className="skel-block skel-tile" />
            </div>
            <div className="skel-block skel-credits" />
            <div className="skel-block skel-carousel" />
            <div className="skel-block skel-menu" />
            <div className="skel-block skel-menu--short" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
