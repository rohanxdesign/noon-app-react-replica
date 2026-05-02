import { useEffect } from 'react';
import { useWishlistStore } from '../../store/wishlistStore';
import './WishlistOverlay.css';

const WISHLIST_HOST = import.meta.env.DEV
  ? 'http://localhost:5182'
  : 'https://noon-wishlist-react-native.vercel.app';

export function WishlistOverlay() {
  const mode = useWishlistStore((s) => s.mode);
  const productImage = useWishlistStore((s) => s.productImage);
  const closeDrawer = useWishlistStore((s) => s.closeDrawer);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'wishlist:close') closeDrawer();
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [closeDrawer]);

  if (!mode) return null;

  let src: string;
  if (mode === 'drawer') {
    src = productImage
      ? `${WISHLIST_HOST}/embed-drawer.html?image=${encodeURIComponent(productImage)}`
      : `${WISHLIST_HOST}/embed-drawer.html`;
  } else {
    src = `${WISHLIST_HOST}/wishlist.html?embedded=1`;
  }

  return (
    <iframe
      key={`${mode}-${productImage ?? 'no-image'}`}
      src={src}
      title="Wishlist"
      className={`wishlist-overlay wishlist-overlay--${mode}`}
    />
  );
}
