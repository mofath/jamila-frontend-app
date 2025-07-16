import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
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
    getProductById: builder.query<
      any,
      { categoryId: string; productId: string }
    >({
      async queryFn({ categoryId, productId }) {
        try {
          const productRef = doc(
            firebaseDb,
            "Categories",
            categoryId,
            "Products",
            productId
          );
          const productSnap = await getDoc(productRef);

          if (!productSnap.exists()) {
            return { error: { status: 404, error: "Product not found" } };
          }

          const data = { id: productSnap.id, ...productSnap.data() };
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
          const q = query(
            collection(firebaseDb, "Categories"),
            where("isHidden", "==", false),
            where("isDeleted", "==", false)
          );

          const querySnapshot = await getDocs(q);

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
    createUserProfileWithPhone: builder.mutation<
      void,
      { uid: string; username?: string; email: string; phone: string }
    >({
      async queryFn({ uid, username, email, phone }) {
        try {
          const userRef = doc(firebaseDb, "users", uid);
          const snapshot = await getDoc(userRef);

          if (!snapshot.exists()) {
            await setDoc(userRef, {
              username,
              email,
              phone,
              createdAt: new Date().toISOString(),
            });
            console.log("✅ New user profile created");
          } else {
            console.log("ℹ️ User already exists");
          }

          return { data: undefined };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
    createUserProfile: builder.mutation<
      void,
      { uid: string; username: string; email: string }
    >({
      async queryFn({ uid, username, email }) {
        try {
          const userRef = doc(firebaseDb, "users", uid);
          const snapshot = await getDoc(userRef);

          if (!snapshot.exists()) {
            await setDoc(userRef, {
              username,
              email,
              createdAt: new Date().toISOString(),
            });
            console.log("✅ New user profile created");
          } else {
            console.log("ℹ️ User already exists");
          }

          return { data: undefined };
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
  useGetProductByIdQuery,
  useCreateUserProfileMutation,
} = firebaseApi;
