import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState
}
const cartSlice = createSlice({
  name:'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    //можно использовать cartSlece.caseReducer.clearItems(state) если нуден метод редюсера в редюсере
    //я для демонстрации использую сразу два подхода
    addItem: (state, action) => {
     const {product} = action.payload
     //проверяет или продукт есть в карзине и возвращает его
     const item = state.cartItems.find(item => item.cartID === product.cartID)
     //если есть не дублируем, а увеличиваем числиность иначе добавляем
     if (item) {
       item.amount += product.amount
     } else {
       state.cartItems.push(product)
     }
     state.numItemsInCart += product.amount
     state.cartTotal += product.amount * product.price
     state.tax += state.cartTotal * 0.1
     state.orderTotal = state.cartTotal + state.shipping + state.tax
     localStorage.setItem('cart', JSON.stringify(state))
     toast.success(`Added ${product.title.toUpperCase()} to cart successfully`)
     return state;
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState))
      //новый стейт
      return defaultState
    },
    removeItem: (state, action) => {
    const {cartID} = action.payload
    //нашли элемент который удаляем
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item removed from cart');
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.warn('Cart updated');
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  }
})

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;