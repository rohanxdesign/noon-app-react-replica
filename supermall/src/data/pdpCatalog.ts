import { DIRHAM, mockProducts } from './mockProducts';
import type { Product } from '../types/product';

const IMG_PDP_HERO = 'https://www.figma.com/api/mcp/asset/944f28ab-549f-4595-810d-fb8ce60b1552';
const IMG_COLOR_PINK = 'https://www.figma.com/api/mcp/asset/2b1ebe38-b6c6-4c00-b92a-ed2955ba8ebb';
const IMG_COLOR_JADE = 'https://www.figma.com/api/mcp/asset/3b517896-dc55-47b0-98fe-e2aa98b0e8fe';

export interface PDPOption {
  label: string;
  disabled?: boolean;
}

export interface PDPColorOption {
  label: string;
  image: string;
}

export interface PDPResolvedProduct {
  product: Product;
  brand: string;
  title: string;
  reviewSummary: string;
  features: string[];
  memoryOptions: PDPOption[];
  defaultMemory: string;
  colorOptions: PDPColorOption[];
  defaultColor: string;
  promos: string[];
  relatedProducts: Product[];
}

const featuredProducts: Product[] = [
  {
    id: 'galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra UAE version with 200MP camera',
    variant: '128 GB',
    images: [IMG_PDP_HERO],
    sellingPrice: 2599,
    originalPrice: 2999,
    currency: DIRHAM,
    rating: 4.8,
    reviewCount: 16500,
    deal: '1 HR delivery',
  },
  {
    id: 'galaxy-s25-plus',
    name: 'Samsung Galaxy S25 Plus 256 GB with adaptive AMOLED display',
    variant: '256 GB',
    images: [IMG_COLOR_JADE],
    sellingPrice: 2149,
    originalPrice: 2399,
    currency: DIRHAM,
    rating: 4.6,
    reviewCount: 932,
    tag: { label: 'New', variant: 'new' },
  },
  {
    id: 'galaxy-buds-pro',
    name: 'Samsung Galaxy Buds Pro wireless earphones with ANC',
    variant: 'Graphite',
    images: [IMG_COLOR_PINK],
    sellingPrice: 499,
    originalPrice: 649,
    currency: DIRHAM,
    rating: 4.4,
    reviewCount: 381,
    tag: { label: 'Hot', variant: 'hot' },
  },
  {
    id: 'galaxy-watch7',
    name: 'Samsung Galaxy Watch7 Bluetooth smartwatch with sleep tracking',
    variant: '44 mm',
    images: [IMG_COLOR_JADE],
    sellingPrice: 899,
    originalPrice: 1099,
    currency: DIRHAM,
    rating: 4.5,
    reviewCount: 741,
  },
];

const productCatalog: Product[] = [...mockProducts, ...featuredProducts];
const productById = new Map(productCatalog.map((product) => [product.id, product]));

const DEFAULT_PROMOS = [
  'Extra 15% off up to D150',
  'Bank offer on prepaid orders',
  'Additional exchange bonus',
];

const DEFAULT_MEMORY_OPTIONS: PDPOption[] = [
  { label: '64 GB' },
  { label: '128 GB' },
  { label: '256 GB' },
  { label: '512 GB', disabled: true },
];

const PDP_OVERRIDES: Record<string, Partial<Omit<PDPResolvedProduct, 'product' | 'relatedProducts'>> & {
  relatedIds?: string[];
}> = {
  'galaxy-s25-ultra': {
    brand: 'Samsung',
    title: 'Galaxy S25 Ultra 128 GB UAE edition with stylus 6.9" AMOLED screen, pink gold colour',
    reviewSummary: '(16.5K+)',
    features: [
      'UAE edition with built-in S Pen and 6.9" AMOLED display.',
      '200 MP camera system with advanced nightography and AI zoom.',
      'Titanium frame, 5G support, and all-day battery with fast charging.',
    ],
    memoryOptions: [
      { label: '64 GB' },
      { label: '128 GB' },
      { label: '256 GB' },
      { label: '512 GB', disabled: true },
      { label: '1 TB' },
    ],
    defaultMemory: '128 GB',
    colorOptions: [
      { label: 'Pink Gold', image: IMG_COLOR_PINK },
      { label: 'Titanium Jadegreen', image: IMG_COLOR_JADE },
    ],
    defaultColor: 'Pink Gold',
    relatedIds: ['galaxy-s25-plus', 'galaxy-buds-pro', 'galaxy-watch7', 'p5'],
  },
  p1: {
    brand: 'Maybelline',
    title: 'Maybelline New York Liquid Foundation, Matte & Poreless, Full coverage finish',
    reviewSummary: '(128)',
    features: [
      'Matte and poreless liquid foundation for daily wear.',
      'Blends evenly with lightweight coverage for humid weather.',
      'Suitable for normal to oily skin and compact everyday kits.',
    ],
    memoryOptions: [
      { label: '30 ml' },
      { label: '50 ml' },
      { label: '100 ml', disabled: true },
    ],
    defaultMemory: '50 ml',
    colorOptions: [
      { label: 'Warm Beige', image: IMG_COLOR_PINK },
      { label: 'Natural Buff', image: IMG_COLOR_JADE },
    ],
    defaultColor: 'Warm Beige',
    relatedIds: ['p2', 'p3', 'p4', 'p5'],
  },
  p2: {
    brand: 'Bioderma',
    reviewSummary: '(128)',
    features: [
      'Daily sunscreen with matte texture and lightweight protection.',
      'Comfortable finish that layers well under makeup.',
      'Travel-friendly size with reliable UVA and UVB coverage.',
    ],
    memoryOptions: [
      { label: '40 ml' },
      { label: '50 ml' },
      { label: '100 ml' },
    ],
    defaultMemory: '50 ml',
    colorOptions: [
      { label: 'Original', image: IMG_COLOR_JADE },
      { label: 'Tinted', image: IMG_COLOR_PINK },
    ],
    defaultColor: 'Original',
    relatedIds: ['p1', 'p3', 'p4', 'p6'],
  },
  p3: {
    brand: 'Neutrogena',
    reviewSummary: '(341)',
    features: [
      'Dry-touch SPF formula designed for high sun exposure.',
      'Non-greasy texture with quick absorption.',
      'Comfortable under makeup and suitable for outdoor use.',
    ],
    memoryOptions: [
      { label: '50 ml' },
      { label: '88 ml' },
      { label: '120 ml' },
    ],
    defaultMemory: '88 ml',
    colorOptions: [
      { label: 'Classic', image: IMG_COLOR_PINK },
      { label: 'Sport', image: IMG_COLOR_JADE },
    ],
    defaultColor: 'Classic',
    relatedIds: ['p2', 'p1', 'p6', 'p5'],
  },
  p4: {
    brand: "L'Oréal",
    reviewSummary: '(89)',
    features: [
      'Buildable medium-coverage foundation for a natural match.',
      'Comfortable skin-like finish with blendable texture.',
      'Works well for everyday wear and touch-ups.',
    ],
    memoryOptions: [
      { label: '30 ml' },
      { label: '60 ml' },
    ],
    defaultMemory: '30 ml',
    colorOptions: [
      { label: 'Golden Beige', image: IMG_COLOR_JADE },
      { label: 'Rose Beige', image: IMG_COLOR_PINK },
    ],
    defaultColor: 'Golden Beige',
    relatedIds: ['p5', 'p6', 'p1', 'p2'],
  },
  p5: {
    brand: 'MAC',
    reviewSummary: '(512)',
    features: [
      'Studio-finish fluid foundation with SPF 15.',
      'Long-wear formula with smooth, polished coverage.',
      'Designed for full-day use with a professional finish.',
    ],
    memoryOptions: [
      { label: '30 ml' },
      { label: '50 ml' },
      { label: '100 ml', disabled: true },
    ],
    defaultMemory: '30 ml',
    colorOptions: [
      { label: 'NC25', image: IMG_COLOR_PINK },
      { label: 'NC30', image: IMG_COLOR_JADE },
    ],
    defaultColor: 'NC25',
    relatedIds: ['p4', 'p6', 'p1', 'galaxy-s25-ultra'],
  },
  p6: {
    brand: 'NARS',
    reviewSummary: '(203)',
    features: [
      'Radiant longwear foundation with breathable texture.',
      'Comfortable coverage designed to stay smooth for hours.',
      'Balances glow and durability for special occasions.',
    ],
    memoryOptions: [
      { label: '30 ml' },
      { label: '45 ml' },
    ],
    defaultMemory: '30 ml',
    colorOptions: [
      { label: 'Punjab', image: IMG_COLOR_JADE },
      { label: 'Stromboli', image: IMG_COLOR_PINK },
    ],
    defaultColor: 'Punjab',
    relatedIds: ['p5', 'p4', 'p3', 'galaxy-buds-pro'],
  },
};

function deriveBrand(name: string) {
  return name.split(' ')[0].replace(/[^A-Za-z'’&-]/g, '') || 'supermall';
}

function toReviewSummary(reviewCount: number) {
  if (reviewCount >= 1000) {
    const compact = reviewCount >= 10000
      ? `${(reviewCount / 1000).toFixed(1).replace('.0', '')}K+`
      : `${Math.round(reviewCount / 100) / 10}K+`;
    return `(${compact})`;
  }
  return `(${reviewCount})`;
}

function defaultFeatures(product: Product) {
  return [
    `${product.name} in ${product.variant} configuration.`,
    `Rated ${product.rating} with ${toReviewSummary(product.reviewCount)} reviews from shoppers.`,
    `Current offer price ${product.currency}${product.sellingPrice} compared with original ${product.currency}${product.originalPrice}.`,
  ];
}

function defaultMemoryOptions(product: Product): PDPOption[] {
  return product.variant.toLowerCase().includes('ml')
    ? [
        { label: product.variant },
        { label: '2 pack' },
        { label: 'Value pack', disabled: true },
      ]
    : DEFAULT_MEMORY_OPTIONS;
}

function defaultColorOptions(brand: string): PDPColorOption[] {
  return [
    { label: `${brand} Prime`, image: IMG_COLOR_PINK },
    { label: `${brand} Select`, image: IMG_COLOR_JADE },
  ];
}

function resolveRelatedProducts(currentId: string, explicitIds?: string[]) {
  if (explicitIds?.length) {
    return explicitIds
      .map((id) => productById.get(id))
      .filter((product): product is Product => Boolean(product));
  }

  return productCatalog.filter((product) => product.id !== currentId).slice(0, 4);
}

export function getPdpProduct(productId?: string): PDPResolvedProduct {
  const fallback: Product = productById.get('p1') ?? productCatalog[0]!;
  const product: Product = (productId ? productById.get(productId) : undefined) ?? fallback;
  const override = PDP_OVERRIDES[product.id];
  const brand = override?.brand ?? deriveBrand(product.name);
  const memoryOptions = override?.memoryOptions ?? defaultMemoryOptions(product);
  const colorOptions = override?.colorOptions ?? defaultColorOptions(brand);
  const defaultMemory = override?.defaultMemory ?? memoryOptions.find((option) => !option.disabled)?.label ?? memoryOptions[0].label;
  const defaultColor = override?.defaultColor ?? colorOptions[0].label;

  return {
    product,
    brand,
    title: override?.title ?? product.name,
    reviewSummary: override?.reviewSummary ?? toReviewSummary(product.reviewCount),
    features: override?.features ?? defaultFeatures(product),
    memoryOptions,
    defaultMemory,
    colorOptions,
    defaultColor,
    promos: override?.promos ?? DEFAULT_PROMOS,
    relatedProducts: resolveRelatedProducts(product.id, override?.relatedIds),
  };
}
