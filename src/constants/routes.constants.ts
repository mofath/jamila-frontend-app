export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PARTNERSHIP: "/partnership",
  MENU: "/menu",
  PRODUCT_DETAILS: "/products/:id",
  CONTACT: "/contact",
  LOGIN: "/login",

  getProductDetails: (id: string | number) => `/products/${id}`,
};
