import type { Category } from '../../../types/product';
import './CategoryTabs.css';

interface CategoryTabsProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CategoryTabs({ categories, activeId, onSelect }: CategoryTabsProps) {
  return (
    <div className="category-tabs">
      <div className="category-tabs__scroll">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              className={`category-tabs__item${isActive ? ' category-tabs__item--active' : ''}`}
              onClick={() => onSelect(cat.id)}
            >
              <div className="category-tabs__img-wrap">
                <img src={cat.image} alt={cat.label} className="category-tabs__img" />
              </div>
              <span className="category-tabs__label">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
