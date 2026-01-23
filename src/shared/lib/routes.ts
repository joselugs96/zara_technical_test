export const ROUTES = {
  home: '/',
  cart: '/cart',
  phoneDetail: (id: string) => `/phone/${id}`,
} as const;
