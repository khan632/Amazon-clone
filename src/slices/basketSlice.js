import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      console.log(action.payload);
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      // find index of given id in basket
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);

      // copy the original basket
      let newBasket = [...state.items];

      // check whether the given index is present or not
      if(index >= 0){
        // item present, remove it deom basket
        newBasket.splice(index, 1);
      }else{
        // give warning item not found
        console.warn(`can't remove product (id: ${action.payload.id}) as it is not in basket`);
      }

      // set original satte to new basket state
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
