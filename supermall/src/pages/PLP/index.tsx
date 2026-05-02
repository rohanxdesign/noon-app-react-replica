import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/layout/PageTransition';
import { ProductCard } from '../../components/ui/ProductCard/ProductCard';
import { PLPHeader } from './components/PLPHeader';
import { CategoryTabs } from './components/CategoryTabs';
import { FilterBar } from './components/FilterBar';
import { mockCategories, mockProducts } from '../../data/mockProducts';
import { staggerContainer, staggerItem } from '../../lib/transitions';
import './PLP.css';

export default function PLPPage() {
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  function toggleFilter(id: string) {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
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
