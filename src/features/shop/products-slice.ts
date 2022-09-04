import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData, getDocs, onSnapshot } from "firebase/firestore";
import { docQuery } from "../../api/firebase";
import { RootState, AppDispatch } from "../../app/store";

interface ProductItemProps {
  name: string;
  description: string;
  pid: string;
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

enum StatusLike {
  idle = "idle",
  loading = "loading",
  success = "success",
  failed = "failed",
}
interface ShopProps {
  products: ProductItemProps[];
  status: keyof typeof StatusLike;
  error: string | undefined;
}

const initialState: ShopProps = {
  products: [],
  status: "idle",
  error: undefined,
};

/**
 * async call
 */
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    let productTest = await getDocs(docQuery);
    let result = productTest.docs.map((item) => item.data());
    console.log(result);

    return result;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload as ProductItemProps[];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state: RootState) => state.shop.products;
export const selectProductByID = (state: RootState, id: string) =>
  state.shop.products.find((item) => item.pid === id);
