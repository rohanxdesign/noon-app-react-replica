import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/layout/PageTransition';
import { ProductCard } from '../../components/ui/ProductCard/ProductCard';
import { PLPHeader } from './components/PLPHeader';
import { CategoryTabs } from './components/CategoryTabs';
import { FilterBar } from './components/FilterBar';
import { mockCategories, mockProducts } from '../../data/mockProducts';
import { staggerContainer, staggerItem } from '../../lib/transitions';
import './PLP.css';

function SkelBlock({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={`plp-skel ${className ?? ''}`} style={style} />;
}

function PLPSkeleton() {
  return (
    <motion.div
      className="plp"
      aria-busy="true"
      aria-label="Loading products"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="plp__sticky">
        <div className="plp-skel-header">
          <SkelBlock className="plp-skel-back" />
          <SkelBlock className="plp-skel-title" />
          <SkelBlock className="plp-skel-icon" />
          <SkelBlock className="plp-skel-icon" />
        </div>
        <div className="plp-skel-tabs">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkelBlock key={i} className="plp-skel-tab" />
          ))}
        </div>
      </div>

      <div className="plp__scroll">
        <div className="plp-skel-filters">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkelBlock key={i} className="plp-skel-chip" />
          ))}
        </div>
        <div className="plp__grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="plp-skel-card" key={i}>
              <SkelBlock className="plp-skel-card-img" />
              <SkelBlock className="plp-skel-line" style={{ width: '92%' }} />
              <SkelBlock className="plp-skel-line" style={{ width: '70%' }} />
              <SkelBlock className="plp-skel-line" style={{ width: '45%' }} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PLPPage() {
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  function toggleFilter(id: string) {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  if (loading) {
    return (
      <PageTransition>
        <PLPSkeleton />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="plp">
        <div className="plp__sticky">
          <PLPHeader title="Make up products" />
          <CategoryTabs
            categories={mockCategories}
            activeId={activeCategoryId}
            onSelect={setActiveCategoryId}
          />
        </div>

        <div className="plp__scroll">
          <FilterBar activeFilters={activeFilters} onChipClick={toggleFilter} />
          <motion.div
            className="plp__grid"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {mockProducts.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
