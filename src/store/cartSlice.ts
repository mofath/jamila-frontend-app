import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    name: string;
    size: string;
    image?: string;
    price: number;
    quantity: number;
}

interface CartState {
    isOpen: boolean;
    items: CartItem[];
}

const initialState: CartState = {
    isOpen: false,
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        updateItemQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const {
    toggleCart,
    openCart,
    closeCart,
    addItem,
    updateItemQuantity,
    clearCart,
    removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
