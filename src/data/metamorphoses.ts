/** Metamorfoza na stronie głównej — zdjęcia: public/metamorphoses/ */
export type MetamorphosisFeatured = {
  id: string;
  title: string;
  tags: string[];
  duration: string;
  imgBefore: string;
  imgAfter: string;
  altBefore: string;
  altAfter: string;
  /** Ścieżka do pełnego opisu leczenia */
  articlePath: string;
};

export const METAMORPHOSIS_FEATURED: MetamorphosisFeatured = {
  id: 'gleboki-zgryz',
  title: 'Korekta głębokiego zgryzu i stłoczeń',
  tags: ['Invisalign'],
  duration: '14 miesięcy',
  imgBefore: '/metamorphoses/gleboki-zgryz-przed.png',
  imgAfter: '/metamorphoses/gleboki-zgryz-po.png',
  altBefore: 'Przed leczeniem — głęboki zgryz i stłoczenia',
  altAfter: 'Po leczeniu — korekta głębokiego zgryzu i stłoczeń (Invisalign)',
  articlePath: '/metamorfozy/korekta-glebokiego-zgryzu-i-stloczen',
};
