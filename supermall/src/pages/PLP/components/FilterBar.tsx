import { FilterIcon, SortIcon, ChevronDown } from '../../../components/ui/icons';
import './FilterBar.css';

const CHIPS = [
  { id: 'filter', label: 'Filter',  Icon: FilterIcon },
  { id: 'sort',   label: 'Sort',    Icon: SortIcon   },
  { id: 'brand',  label: 'Brand',   Icon: ChevronDown },
  { id: 'type',   label: 'Type',    Icon: ChevronDown },
];

interface FilterBarProps {
  activeFilters?: string[];
  onChipClick?: (id: string) => void;
}

export function FilterBar({ activeFilters = [], onChipClick }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__scroll">
        {CHIPS.map(({ id, label, Icon }) => {
          const isActive = activeFilters.includes(id);
          return (
            <button
              key={id}
              className={`filter-chip${isActive ? ' filter-chip--active' : ''}`}
              onClick={() => onChipClick?.(id)}
            >
              {id === 'filter' && <Icon size={14} color={isActive ? 'var(--supermall-800)' : 'var(--grey-700)'} />}
              {id === 'sort'   && <Icon size={14} color={isActive ? 'var(--supermall-800)' : 'var(--grey-700)'} />}
              <span>{label}</span>
              {(id === 'brand' || id === 'type') && (
                <Icon size={12} color={isActive ? 'var(--supermall-800)' : 'var(--grey-500)'} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
