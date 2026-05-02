import type { Category, Product } from '../types/product';

// Figma asset URLs — replace with Cloudinary public IDs once uploaded
const IMG_MAYBELLINE = 'https://www.figma.com/api/mcp/asset/1dacbd62-48c6-4de9-8f68-4abc61423b1f';
const IMG_BIODERMA   = 'https://www.figma.com/api/mcp/asset/db212daa-5cb9-4d0f-8618-05246ea39327';

// Noontree PUA glyph U+E001 = Dirham symbol (ﺪ with stroke)
export const DIRHAM = '';

export const mockCategories: Category[] = [
  { id: 'all',     label: 'All items',        image: IMG_MAYBELLINE },
  { id: 'snack',   label: 'Snack food',        image: IMG_BIODERMA },
  { id: 'baby',    label: 'Baby care & food',  image: IMG_MAYBELLINE },
  { id: 'compact', label: 'Compact Powder',    image: IMG_BIODERMA },
  { id: 'herb',    label: 'Herb spice',        image: IMG_MAYBELLINE },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Maybelline New York Liquid Foundation, Matte & Poreless, Full',
    variant: '50 ml',
    images: [IMG_MAYBELLINE],
    sellingPrice: 86,
    originalPrice: 123,
    currency: DIRHAM,
    rating: 4.3,
    reviewCount: 128,
    tag: { label: 'Best seller', variant: 'bestseller' },
    deal: 'Ramdan deal',
    isSponsored: true,
  },
  {
    id: 'p2',
    name: 'Bioderma Sunscreen, Matte & Poreless, Full n...',
    variant: '50 ml',
    images: [IMG_BIODERMA],
    sellingPrice: 94,
    originalPrice: 123,
    currency: DIRHAM,
    rating: 4.3,
    reviewCount: 128,
    tag: { label: 'Best seller', variant: 'bestseller' },
  },
  {
    id: 'p3',
    name: 'Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 100+',
    variant: '88 ml',
    images: [IMG_MAYBELLINE],
    sellingPrice: 112,
    originalPrice: 160,
    currency: DIRHAM,
    rating: 4.6,
    reviewCount: 341,
    tag: { label: 'New', variant: 'new' },
  },
  {
    id: 'p4',
    name: 'L\'Oréal Paris True Match Foundation',
    variant: '30 ml',
    images: [IMG_BIODERMA],
    sellingPrice: 74,
    originalPrice: 99,
    currency: DIRHAM,
    rating: 4.1,
    reviewCount: 89,
    deal: 'Ramdan deal',
  },
  {
    id: 'p5',
    name: 'MAC Studio Fix Fluid Foundation SPF 15',
    variant: '30 ml',
    images: [IMG_MAYBELLINE],
    sellingPrice: 210,
    originalPrice: 280,
    currency: DIRHAM,
    rating: 4.8,
    reviewCount: 512,
    tag: { label: 'Best seller', variant: 'bestseller' },
  },
  {
    id: 'p6',
    name: 'NARS Natural Radiant Longwear Foundation',
    variant: '30 ml',
    images: [IMG_BIODERMA],
    sellingPrice: 195,
    originalPrice: 240,
    currency: DIRHAM,
    rating: 4.5,
    reviewCount: 203,
  },
];
