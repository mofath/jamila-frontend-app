export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PARTNERSHIP: "/partnership",
  MENU: "/menu",
  PRODUCT_DETAILS: "/categories/:categoryId/products/:id",
  PRODUCTS: "/products/",
  CONTACT: "/contact",
  LOGIN: "/login",
  CHECKOUT: "/checkout",

  getProductDetails: (categoryId: string | number, id: string | number) => {
    return `/categories/${categoryId}/products/${id}`;
  },
};
