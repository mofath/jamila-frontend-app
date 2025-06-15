import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { firebaseDb } from "../firebase/firebaseApp";
import { toKebabCase } from "../utils/toKebabCase";

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<any[], string>({
      async queryFn(categoryId) {
        try {
          const productsRef = collection(
            firebaseDb,
            "Categories",
            categoryId,
            "Products"
          );
          const querySnapshot = await getDocs(productsRef);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),

    getSettings: builder.query<any[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(
            collection(firebaseDb, "Settings")
          );
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
    getCategories: builder.query<any[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(
            collection(firebaseDb, "Categories")
          );
          const data = querySnapshot.docs.map((doc) => {
            const { image, name } = doc.data();
            return {
              id: doc.id,
              image,
              label: name,
              name: toKebabCase(name),
            };
          });
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
  }),
});

export const {
  useLazyGetProductsByCategoryQuery,
  useGetSettingsQuery,
  useGetCategoriesQuery,
} = firebaseApi;
