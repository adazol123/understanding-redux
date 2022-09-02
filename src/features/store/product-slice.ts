import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData, onSnapshot } from "firebase/firestore";
import { docQuery } from "../../api/firebase";

interface ProductItemProps {
  name: string;
  description: string;
  owner: string;
  metatags: {
    brand: string;
    category: string;
    images: {
      url: string;
    }[];
    sizes: string[];
    variants: {
      [color: string]: {
        name: string;
        quantity: number;
        price: number;
      };
    };
    others?: {
      discount_price: number;
    };
  };
}
interface ProductDataProps {
  products: ProductItemProps[];
}

const initialState: ProductDataProps = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProduct(state, action) {
      return {
        products: action.payload,
      };
    },
  },
});

export const { fetchProduct } = productSlice.actions;

export default productSlice.reducer;
