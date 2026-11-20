export type CategorySlug =
  | 'home-kitchen'
  | 'furniture-mattresses'
  | 'electronics-cooling'
  | 'handbags-luggage';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  shortTagline: string;
  description: string;
  associationLabel: string;
  associatedEntities: string[];
  subcategories: string[];
  image: string;
  cardBgClass: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  categorySlug: CategorySlug;
  categoryName: string;
  summary: string;
  productFocus: string[];
  showcaseImage: string;
  accentColor: string;
}

export interface Product {
  id: string;
  name: string;
  categorySlug: CategorySlug;
  categoryName: string;
  subcategory: string;
  brand: string;
  demoPrice: number;
  featured?: boolean;
  image: string;
  description: string;
  highlights: string[];
  emiEligible?: boolean;
}

export const SHOWROOM_MEDIA = {
  heroMain: '/assets/aistudio/Luxurious_Modern_Living_Showroom_bbe4be57.png',
  heroMobile: '/assets/aistudio/934444ca-6fe2-49d7-9c60-27b02b6fbd5e_a219775a.png',
  heroLiving: '/src/assets/images/hero_showroom_living_1795071439358.jpg',
  showroomExterior: '/assets/aistudio/43f6c845-68df-4cd2-95a6-8132be656509_6c0d063d.png',
  catKitchen: '/src/assets/images/cat_kitchen_appliances_1795071439656.jpg',
  catFurniture: '/src/assets/images/cat_furniture_mattresses_1795071438511.jpg',
  catElectronics: '/src/assets/images/cat_electronics_cooling_1795071438869.jpg',
  catLuggage: '/src/assets/images/cat_luggage_handbags_1795071439719.jpg',
  prodPressureCooker: '/src/assets/images/prod_pressure_cooker_1795071440868.jpg',
  prodGasStove: '/src/assets/images/prod_gas_stove_1795071459922.jpg',
  prodCeilingFan: '/src/assets/images/prod_ceiling_fan_1795071444777.jpg',
  prodSofaSet: '/src/assets/images/prod_sofa_set_1795071439053.jpg',
  prodDiningTable: '/src/assets/images/prod_dining_table_1795071438388.jpg',
  prodMattress: '/src/assets/images/prod_mattress_1795071455964.jpg',
  prodTravelSuitcase: '/src/assets/images/prod_travel_suitcase_1795071440384.jpg',
  prodHandbag: '/src/assets/images/prod_handbag_1795071448373.jpg',
  prodKitchenChimney: '/src/assets/images/prod_kitchen_chimney_1795151331641.jpg',
  prodWaterJug: '/src/assets/images/prod_water_jug_1795151332080.jpg',
  prodCommercialRange: '/src/assets/images/prod_commercial_range_1795151331481.jpg',
  prodKingBed: '/src/assets/images/prod_king_bed_1795151330157.jpg',
  prodAccentChair: '/src/assets/images/prod_accent_chair_1795151332704.jpg',
  prodSideboardCabinet: '/src/assets/images/prod_sideboard_cabinet_1795151335720.jpg',
  prodSpringMattress: '/src/assets/images/prod_spring_mattress_1795151331987.jpg',
  prodBldcFan: '/src/assets/images/prod_bldc_fan_1795151332238.jpg',
  prodStrikerFan: '/src/assets/images/prod_striker_fan_1795151331451.jpg',
  prodKitchenHood: '/src/assets/images/prod_kitchen_hood_1795151331783.jpg',
  prodTowerCooler: '/src/assets/images/prod_tower_cooler_1795151332046.jpg',
  prodSteamIron: '/src/assets/images/prod_steam_iron_1795151334928.jpg',
  prodAristocratTrolley: '/src/assets/images/prod_aristocrat_trolley_1795151331949.jpg',
  prodExecutiveBriefcase: '/src/assets/images/prod_executive_briefcase_1795151333003.jpg',
  prodDuffelBag: '/src/assets/images/prod_duffel_bag_1795151331749.jpg',
  prodLaptopBackpack: '/src/assets/images/prod_laptop_backpack_1795151335523.jpg',
} as const;

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'home-kitchen',
    name: 'Home & Kitchen Appliances',
    shortTagline: 'Cook. Store. Live Better.',
    description:
      'Durable everyday kitchen essentials and heavy-duty culinary equipment built for modern households and commercial kitchens alike.',
    associationLabel: 'Associated Agency',
    associatedEntities: ['Sri Poomagal Agencies'],
    subcategories: [
      'Pressure Cookers',
      'Gas Stoves',
      'Kitchen Chimneys',
      'Water Jugs',
      'Commercial Kitchen Equipment',
    ],
    image: SHOWROOM_MEDIA.catKitchen,
    cardBgClass: 'bg-gradient-to-b from-[#F4D09C] via-[#F7E0BC] to-[#FBF0DC]',
  },
  {
    slug: 'furniture-mattresses',
    name: 'Furniture & Mattresses',
    shortTagline: 'Relax in Style.',
    description:
      'Thoughtfully proportioned living, dining, and bedroom furniture paired with supportive orthopedic and comfort mattresses.',
    associationLabel: 'Associated Brand',
    associatedEntities: ['Poppy'],
    subcategories: ['Beds', 'Sofas', 'Dining Tables', 'Chairs', 'Cabinets', 'Mattresses'],
    image: SHOWROOM_MEDIA.catFurniture,
    cardBgClass: 'bg-gradient-to-b from-[#D7DEB8] via-[#E2E7CA] to-[#EFF2DF]',
  },
  {
    slug: 'electronics-cooling',
    name: 'Electronics & Cooling',
    shortTagline: 'Stay Cool. Stay Smart.',
    description:
      'Energy-conscious ceiling fans, high-suction kitchen hoods, and dependable home electronics designed for year-round comfort.',
    associationLabel: 'Featured Brands',
    associatedEntities: ['Havells', 'Orient Electric', 'USHA'],
    subcategories: ['Ceiling Fans', 'Kitchen Hoods', 'Home Electronics'],
    image: SHOWROOM_MEDIA.catElectronics,
    cardBgClass: 'bg-gradient-to-b from-[#B9D8F7] via-[#CFE5FA] to-[#E6F1FC]',
  },
  {
    slug: 'handbags-luggage',
    name: 'Handbags & Travel Luggage',
    shortTagline: 'Travel in Style.',
    description:
      'Hard-shell suitcases, everyday handbags, structured briefcases, travel bags, and ergonomic backpacks built for every journey.',
    associationLabel: 'Featured Brands',
    associatedEntities: ['VIP', 'Aristocrat', 'Skybags'],
    subcategories: ['Handbags', 'Suitcases', 'Briefcases', 'Travel Bags', 'Backpacks'],
    image: SHOWROOM_MEDIA.catLuggage,
    cardBgClass: 'bg-gradient-to-b from-[#F6C8C8] via-[#FAD9D9] to-[#FDEAEA]',
  },
];

export const BRANDS: BrandInfo[] = [
  {
    id: 'havells',
    name: 'Havells',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    summary:
      'Showcased at RISHARAA for contemporary ceiling fans, home electrical essentials, and dependable cooling appliances.',
    productFocus: ['Ceiling Fans', 'Home Electronics'],
    showcaseImage: SHOWROOM_MEDIA.prodCeilingFan,
    accentColor: '#C81E2B',
  },
  {
    id: 'orient-electric',
    name: 'Orient Electric',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    summary:
      'Featured in our Electronics & Cooling gallery with aerodynamic ceiling fans, kitchen ventilation, and home appliances.',
    productFocus: ['Ceiling Fans', 'Kitchen Hoods', 'Home Electronics'],
    showcaseImage: SHOWROOM_MEDIA.catElectronics,
    accentColor: '#E86A17',
  },
  {
    id: 'usha',
    name: 'USHA',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    summary:
      'Trusted household name available in our showroom across silent cooling fans and practical everyday home electronics.',
    productFocus: ['Ceiling Fans', 'Home Electronics'],
    showcaseImage: SHOWROOM_MEDIA.prodCeilingFan,
    accentColor: '#C42026',
  },
  {
    id: 'poppy',
    name: 'Poppy',
    categorySlug: 'furniture-mattresses',
    categoryName: 'Furniture & Mattresses',
    summary:
      'Associated brand in our Furniture & Mattresses department, known for supportive sleep systems and layered comfort mattresses.',
    productFocus: ['Mattresses', 'Bedroom Comfort'],
    showcaseImage: SHOWROOM_MEDIA.prodMattress,
    accentColor: '#6E2B7A',
  },
  {
    id: 'vip',
    name: 'VIP',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    summary:
      'Displayed in our Travel & Luggage wing with resilient polycarbonate suitcases, executive briefcases, and family travel sets.',
    productFocus: ['Suitcases', 'Briefcases', 'Travel Bags'],
    showcaseImage: SHOWROOM_MEDIA.prodTravelSuitcase,
    accentColor: '#D01C27',
  },
  {
    id: 'aristocrat',
    name: 'Aristocrat',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    summary:
      'Practical and durable suitcases, roomy duffels, and commuter travel bags curated for dependable everyday mobility.',
    productFocus: ['Suitcases', 'Travel Bags', 'Briefcases'],
    showcaseImage: SHOWROOM_MEDIA.catLuggage,
    accentColor: '#1E293B',
  },
  {
    id: 'skybags',
    name: 'Skybags',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    summary:
      'Youthful, lightweight backpacks, expressive spinner suitcases, and contemporary everyday carry bags featured at RISHARAA.',
    productFocus: ['Backpacks', 'Suitcases', 'Handbags'],
    showcaseImage: SHOWROOM_MEDIA.prodHandbag,
    accentColor: '#0284C7',
  },
];

export const PRODUCTS: Product[] = [
  // --- FEATURED 8 CORE DEMO PRODUCTS (Homepage + Full Catalog) ---
  {
    id: 'kitchen-pressure-cooker-5l',
    name: 'Stainless Steel Pressure Cooker (5L)',
    categorySlug: 'home-kitchen',
    categoryName: 'Home & Kitchen Appliances',
    subcategory: 'Pressure Cookers',
    brand: 'Sri Poomagal Agencies',
    demoPrice: 1999,
    featured: true,
    image: SHOWROOM_MEDIA.prodPressureCooker,
    description:
      'Mirror-polished food-grade stainless steel 5-liter pressure cooker with heavy encapsulated base, precision whistle regulator, and stay-cool dual handles.',
    highlights: [
      'Induction & gas cooktop compatible base',
      'Multi-stage safety release valve',
      'Available via Sri Poomagal Agencies collection',
    ],
    emiEligible: false,
  },
  {
    id: 'kitchen-gas-stove-3b',
    name: 'Toughened Glass 3-Burner Gas Stove',
    categorySlug: 'home-kitchen',
    categoryName: 'Home & Kitchen Appliances',
    subcategory: 'Gas Stoves',
    brand: 'Sri Poomagal Agencies',
    demoPrice: 3499,
    featured: true,
    image: SHOWROOM_MEDIA.prodGasStove,
    description:
      'Sleek black toughened glass 3-burner cooktop equipped with high-efficiency forged brass burners, spill-proof drip trays, and ergonomic metallic control knobs.',
    highlights: [
      '8mm thermal-shock resistant black glass top',
      'Heavy-duty forged brass burners',
      'Matte cast pan supports for stable cookware grip',
    ],
    emiEligible: true,
  },
  {
    id: 'cooling-ceiling-fan-bronze',
    name: 'AeroWood Designer Ceiling Fan',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    subcategory: 'Ceiling Fans',
    brand: 'Havells',
    demoPrice: 4299,
    featured: true,
    image: SHOWROOM_MEDIA.prodCeilingFan,
    description:
      'Sculpted three-blade ceiling fan finished in brushed bronze and warm walnut trim, engineered for whisper-quiet high-air-delivery circulation.',
    highlights: [
      '1200mm aerodynamic sweep with low-noise motor',
      'Dust-resistant metallic walnut finish',
      'Energy-efficient everyday operation',
    ],
    emiEligible: true,
  },
  {
    id: 'furniture-sofa-set-3s',
    name: 'Oatmeal Linen 3-Seater Sofa Set',
    categorySlug: 'furniture-mattresses',
    categoryName: 'Furniture & Mattresses',
    subcategory: 'Sofas',
    brand: 'RISHARAA Home',
    demoPrice: 24999,
    featured: true,
    image: SHOWROOM_MEDIA.prodSofaSet,
    description:
      'Contemporary three-seater living room sofa upholstered in breathable oatmeal-taupe woven fabric with high-resilience pocket cushioning and tapered solid oak legs.',
    highlights: [
      'Kiln-dried hardwood inner frame',
      'High-density plush seating with matching cushions',
      'Easy monthly EMI options available in showroom',
    ],
    emiEligible: true,
  },
  {
    id: 'furniture-dining-table-6s',
    name: 'Walnut 6-Seater Dining Table Set',
    categorySlug: 'furniture-mattresses',
    categoryName: 'Furniture & Mattresses',
    subcategory: 'Dining Tables',
    brand: 'RISHARAA Home',
    demoPrice: 18999,
    featured: true,
    image: SHOWROOM_MEDIA.prodDiningTable,
    description:
      'Warm solid walnut-finish six-seater dining table paired with contoured fabric-upholstered dining chairs designed for comfortable family gatherings.',
    highlights: [
      'Spacious 6-seater rectangular solid wood silhouette',
      'Six ergonomic cushioned dining chairs included',
      'Scratch-resistant matte satin lacquer finish',
    ],
    emiEligible: true,
  },
  {
    id: 'furniture-mattress-poppy-ortho',
    name: 'Euro-Top Orthopedic Mattress (Queen)',
    categorySlug: 'furniture-mattresses',
    categoryName: 'Furniture & Mattresses',
    subcategory: 'Mattresses',
    brand: 'Poppy',
    demoPrice: 12999,
    featured: true,
    image: SHOWROOM_MEDIA.prodMattress,
    description:
      'Supportive multi-layer orthopedic mattress from Poppy featuring a breathable quilted knit top, motion-isolating memory foam comfort layer, and reinforced edge support.',
    highlights: [
      'Balanced spinal alignment & pressure relief',
      'Breathable anti-microbial quilted fabric cover',
      'Available in Single, Queen, and King sizes',
    ],
    emiEligible: true,
  },
  {
    id: 'luggage-suitcase-vip-hard',
    name: 'Polycarbonate Spinner Travel Suitcase',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    subcategory: 'Suitcases',
    brand: 'VIP',
    demoPrice: 5499,
    featured: true,
    image: SHOWROOM_MEDIA.prodTravelSuitcase,
    description:
      'Lightweight cobalt-blue ribbed polycarbonate hard-shell spinner suitcase with 360-degree dual whisper wheels, multi-stop aluminum trolley handle, and integrated TSA lock.',
    highlights: [
      'Impact-resistant ribbed polycarbonate shell',
      'Smooth 8-wheel 360-degree maneuverability',
      'Organized dual-compartment interior dividers',
    ],
    emiEligible: true,
  },
  {
    id: 'luggage-handbag-cognac',
    name: 'Structured Cognac Everyday Handbag',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    subcategory: 'Handbags',
    brand: 'Skybags',
    demoPrice: 2799,
    featured: true,
    image: SHOWROOM_MEDIA.prodHandbag,
    description:
      'Refined cognac pebbled-grain structured tote handbag featuring rolled top handles, minimal brushed brass clasp hardware, and spacious organized compartments.',
    highlights: [
      'Structured stand-upright silhouette',
      'Dedicated tablet & essentials inner pockets',
      'Detachable shoulder strap included',
    ],
    emiEligible: false,
  },

  // --- ADDITIONAL SUBCATEGORY COVERAGE SO EVERY SUBCATEGORY FILTER IS POPULATED ---
  {
    id: 'kitchen-chimney-auto',
    name: 'Filterless Auto-Clean Kitchen Chimney',
    categorySlug: 'home-kitchen',
    categoryName: 'Home & Kitchen Appliances',
    subcategory: 'Kitchen Chimneys',
    brand: 'Sri Poomagal Agencies',
    demoPrice: 11499,
    image: SHOWROOM_MEDIA.prodKitchenChimney,
    description:
      'Wall-mounted brushed steel and glass kitchen chimney engineered for heavy Indian cooking with thermal auto-clean technology and dual LED task lights.',
    highlights: [
      'High suction airflow for smoke-free kitchens',
      'Touch & motion-gesture control panel',
      'Low-noise oil collector tray',
    ],
    emiEligible: true,
  },
  {
    id: 'kitchen-water-jug-insulated',
    name: 'Insulated Stainless Steel Water Jug (3L)',
    categorySlug: 'home-kitchen',
    categoryName: 'Home & Kitchen Appliances',
    subcategory: 'Water Jugs',
    brand: 'Sri Poomagal Agencies',
    demoPrice: 1299,
    image: SHOWROOM_MEDIA.prodWaterJug,
    description:
      'Double-wall vacuum insulated stainless steel water jug with precision pour spout and leak-resistant lid, keeping water fresh for hours at home or dining tables.',
    highlights: [
      'Food-grade 304 stainless steel interior',
      'Wide-mouth opening for easy cleaning',
      'Sturdy ergonomic pouring handle',
    ],
    emiEligible: false,
  },
  {
    id: 'kitchen-commercial-range',
    name: 'Commercial Heavy-Duty Kitchen Range',
    categorySlug: 'home-kitchen',
    categoryName: 'Home & Kitchen Appliances',
    subcategory: 'Commercial Kitchen Equipment',
    brand: 'Sri Poomagal Agencies',
    demoPrice: 28999,
    image: SHOWROOM_MEDIA.prodCommercialRange,
    description:
      'Commercial-grade stainless steel kitchen workstation and high-output burner setup curated through Sri Poomagal Agencies for catering and hospitality kitchens.',
    highlights: [
      'Heavy-gauge stainless steel fabricated body',
      'High-pressure commercial brass burners',
      'Built for continuous high-volume culinary use',
    ],
    emiEligible: true,
  },
  {
    id: 'furniture-bed-king-walnut',
    name: 'Architectural Platform King Bed',
    categorySlug: 'furniture-mattresses',
    categoryName: 'Furniture & Mattresses',
    subcategory: 'Beds',
    brand: 'RISHARAA Home',
    demoPrice: 29999,
    image: SHOWROOM_MEDIA.prodKingBed,
    description:
      'Contemporary walnut-tone king bed frame with upholstered headboard support and concealed hydraulic storage compartment for effortless bedroom organization.',
    highlights: [
      'Spacious under-bed storage platform',
      'Pairs seamlessly with Poppy King mattresses',
      'Clean architectural headboard profile',
    ],
    emiEligible: true,
  },
  {
    id: 'furniture-accent-chair',
    name: 'Upholstered Lounge & Accent Chair',
    categorySlug: 'furniture-mattresses',
    categoryName: 'Furniture & Mattresses',
    subcategory: 'Chairs',
    brand: 'RISHARAA Home',
    demoPrice: 7499,
    image: SHOWROOM_MEDIA.prodAccentChair,
    description:
      'Tailored accent lounge chair crafted with solid wood legs and supportive woven upholstery—ideal for reading corners, bedrooms, and living suites.',
    highlights: [
      'Ergonomic reclined backrest comfort',
      'Stain-resistant neutral woven upholstery',
      'Compact footprint for versatile room placement',
    ],
    emiEligible: true,
  },
  {
    id: 'furniture-storage-cabinet',
    name: 'Modular Walnut Sideboard Cabinet',
    categorySlug: 'furniture-mattresses',
    categoryName: 'Furniture & Mattresses',
    subcategory: 'Cabinets',
    brand: 'RISHARAA Home',
    demoPrice: 14499,
    image: SHOWROOM_MEDIA.prodSideboardCabinet,
    description:
      'Minimalist multi-compartment storage cabinet with soft-close hinges and adjustable interior shelving for diningware, linens, and living room essentials.',
    highlights: [
      'Soft-close doors with concealed metallic pulls',
      'Adjustable interior shelving',
      'Warm walnut grain laminate finish',
    ],
    emiEligible: true,
  },
  {
    id: 'furniture-poppy-latex-mattress',
    name: 'Poppy Dual-Comfort Spring Mattress',
    categorySlug: 'furniture-mattresses',
    categoryName: 'Furniture & Mattresses',
    subcategory: 'Mattresses',
    brand: 'Poppy',
    demoPrice: 16499,
    image: SHOWROOM_MEDIA.prodSpringMattress,
    description:
      'Premium Poppy dual-feel mattress engineered with pocketed support springs and plush breathable quilting for cool, uninterrupted overnight comfort.',
    highlights: [
      'Zero partner-disturbance spring core',
      'Medium-firm & plush dual-sided versatility',
      'Reinforced perimeter edge durability',
    ],
    emiEligible: true,
  },
  {
    id: 'cooling-orient-ceiling-fan',
    name: 'Orient Aeroquiet BLDC Ceiling Fan',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    subcategory: 'Ceiling Fans',
    brand: 'Orient Electric',
    demoPrice: 4899,
    image: SHOWROOM_MEDIA.prodBldcFan,
    description:
      'High-efficiency BLDC ceiling fan from Orient Electric delivering whisper-quiet breeze, significant power savings, and convenient remote speed control.',
    highlights: [
      'Energy-saving BLDC motor technology',
      'RF remote control with timer & boost mode',
      'Seamless contemporary blade geometry',
    ],
    emiEligible: true,
  },
  {
    id: 'cooling-usha-ceiling-fan',
    name: 'USHA Striker High-Airflow Ceiling Fan',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    subcategory: 'Ceiling Fans',
    brand: 'USHA',
    demoPrice: 3199,
    image: SHOWROOM_MEDIA.prodStrikerFan,
    description:
      'Dependable high-speed ceiling fan from USHA engineered for strong air thrust across wide living spaces with corrosion-resistant glossy finish.',
    highlights: [
      'High-torque copper motor for consistent airflow',
      'Smooth operation even at low voltages',
      'Easy-clean dust-repellent blade coat',
    ],
    emiEligible: false,
  },
  {
    id: 'cooling-kitchen-hood-orient',
    name: 'Brushed Steel Modular Kitchen Hood',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    subcategory: 'Kitchen Hoods',
    brand: 'Orient Electric',
    demoPrice: 13999,
    image: SHOWROOM_MEDIA.prodKitchenHood,
    description:
      'Architectural stainless steel kitchen hood with baffle filtration, dual warm task lights, and three-speed extraction engineered for contemporary modular kitchens.',
    highlights: [
      'Stainless steel baffle filters for easy washing',
      '3-speed quiet extraction blower',
      'Sleek brushed metallic architectural housing',
    ],
    emiEligible: true,
  },
  {
    id: 'electronics-tower-cooler-havells',
    name: 'Smart Tower Air Cooler & Home Electronics',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    subcategory: 'Home Electronics',
    brand: 'Havells',
    demoPrice: 9499,
    image: SHOWROOM_MEDIA.prodTowerCooler,
    description:
      'Slim-profile room air cooler with honeycomb cooling pads, digital humidity display, and quiet oscillation for effortless summer comfort.',
    highlights: [
      'High-density honeycomb cooling media',
      'Compact tower footprint for modern rooms',
      'Inverter-compatible low power draw',
    ],
    emiEligible: true,
  },
  {
    id: 'electronics-usha-home-iron',
    name: 'USHA Home Comfort Electrical Essentials',
    categorySlug: 'electronics-cooling',
    categoryName: 'Electronics & Cooling',
    subcategory: 'Home Electronics',
    brand: 'USHA',
    demoPrice: 2499,
    image: SHOWROOM_MEDIA.prodSteamIron,
    description:
      'Everyday home electronics from USHA built for safety, consistent thermal performance, and long-term household reliability.',
    highlights: [
      'Overheat thermal cutoff protection',
      'Ergonomic grip and lightweight build',
      'Supported by showroom demonstration desk',
    ],
    emiEligible: false,
  },
  {
    id: 'luggage-aristocrat-suitcase',
    name: 'Aristocrat Cabin & Check-In Trolley',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    subcategory: 'Suitcases',
    brand: 'Aristocrat',
    demoPrice: 4199,
    image: SHOWROOM_MEDIA.prodAristocratTrolley,
    description:
      'Lightweight hard-shell trolley suitcase by Aristocrat featuring scratch-resistant micro-diamond texture, smooth corner wheels, and expandable packing capacity.',
    highlights: [
      'Expandable zippered gusset for extra packing',
      'Number combination security lock',
      'Smooth 360-degree dual spinner wheels',
    ],
    emiEligible: true,
  },
  {
    id: 'luggage-vip-briefcase',
    name: 'VIP Executive Charcoal Briefcase',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    subcategory: 'Briefcases',
    brand: 'VIP',
    demoPrice: 3899,
    image: SHOWROOM_MEDIA.prodExecutiveBriefcase,
    description:
      'Structured executive business briefcase with padded 15.6-inch laptop bay, document organizer sleeves, and detachable shoulder strap.',
    highlights: [
      'Water-resistant textured matte finish',
      'Quick-access front portfolio pocket',
      'Reinforced metallic clasp closure',
    ],
    emiEligible: false,
  },
  {
    id: 'luggage-aristocrat-travel-bag',
    name: 'Aristocrat Weekender Duffel Travel Bag',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    subcategory: 'Travel Bags',
    brand: 'Aristocrat',
    demoPrice: 2699,
    image: SHOWROOM_MEDIA.prodDuffelBag,
    description:
      'Spacious weekend travel duffel crafted from high-denier abrasion-resistant fabric with separate shoe compartment and padded shoulder carry strap.',
    highlights: [
      'Generous wide-zip main compartment',
      'Dedicated ventilated footwear pocket',
      'Reinforced base studs for ground protection',
    ],
    emiEligible: false,
  },
  {
    id: 'luggage-skybags-backpack',
    name: 'Skybags Urban Commuter Laptop Backpack',
    categorySlug: 'handbags-luggage',
    categoryName: 'Handbags & Travel Luggage',
    subcategory: 'Backpacks',
    brand: 'Skybags',
    demoPrice: 2199,
    image: SHOWROOM_MEDIA.prodLaptopBackpack,
    description:
      'Ergonomic all-day backpack by Skybags with breathable mesh back padding, dedicated 16-inch laptop sleeve, and weather-resistant matte shell.',
    highlights: [
      'Multi-pocket daily & campus organizer',
      'Padded contoured shoulder straps',
      'Sleek matte charcoal modern styling',
    ],
    emiEligible: false,
  },
];

export function formatDemoINR(amount: number): string {
  return `₹ ${amount.toLocaleString('en-IN')}`;
}
