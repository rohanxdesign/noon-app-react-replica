import { useNavigate } from 'react-router-dom';
import { ChevronLeft, SearchIcon } from '../../../components/ui/icons';
import './PLPHeader.css';

interface PLPHeaderProps {
  title: string;
}

export function PLPHeader({ title }: PLPHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="plp-header">
      <button className="plp-header__back" onClick={() => navigate(-1)} aria-label="Go back">
        <ChevronLeft size={24} color="var(--grey-900)" />
      </button>
      <h1 className="plp-header__title">{title}</h1>
      <button className="plp-header__search" aria-label="Search">
        <SearchIcon size={24} color="var(--grey-900)" />
      </button>
    </header>
  );
}
