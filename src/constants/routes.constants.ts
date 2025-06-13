export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PARTNERSHIP: "/partnership",
  MENU: "/menu",
  PRODUCT_DETAILS: "/products/:id",
  PRODUCTS: "/products/",
  CONTACT: "/contact",
  LOGIN: "/login",

  getProductDetails: (id: string | number) => {
    return `/products/${id}`;
  },
};
