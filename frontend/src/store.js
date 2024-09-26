import { createSlice, configureStore } from "@reduxjs/toolkit";

// Create a slice for product list
const productListSlice = createSlice({
  name: "productList",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {
    PRODUCT_LIST_REQUEST: (state) => {
      state.loading = true;
    },
    PRODUCT_LIST_SUCCESS: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    PRODUCT_LIST_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Create a slice for product details
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    loading: false,
    product: {},
    error: null,
  },
  reducers: {
    PRODUCT_DETAILS_REQUEST: (state) => {
      state.loading = true;
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//Slice for cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },

  reducers: {
    CART_ADD_ITEM: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? { ...x, qty: item.qty } : x
        );
        // existItem.qty += item.qty; // Increment the quantity directlys
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CART_REMOVE_ITEM: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CART_SAVE_SHIPPING_ADDRESS: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    CART_SAVE_PAYMENT_METHOD: (state, action) => {
      state.paymentMethod = action.payload;
    },
    CART_EMPTY: (state) => {
      state.cartItems = [];
      // state.cartItems = action.cartItems;
      // localStorage.removeItem("cartItems");
    },
  },
});

//Slice for user register
const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    loading: false,
    // userInfo: localStorage.getItem("userInfo")
    //   ? JSON.parse(localStorage.getItem("userInfo"))
    //   : null,
    error: null,
  },
  reducers: {
    USER_REGISTER_REQUEST: (state) => {
      state.loading = true;
    },
    USER_REGISTER_SUCCESS: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      // localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      // console.log("saved info in localstorage");
    },
    USER_REGISTER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//Slice for user signin
const userSigninSlice = createSlice({
  name: "userSignin",
  initialState: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,

    error: null,
  },
  reducers: {
    USER_SIGNIN_REQUEST: (state) => {
      state.loading = true;
    },
    USER_SIGNIN_SUCCESS: (state, action) => {
      console.log("in store");
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      console.log("saved info in localstorage");
    },
    USER_SIGNIN_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    USER_SIGNOUT: (state, action) => {
      state.userInfo = action.payload;
      localStorage.removeItem("userInfo");
      state.cartItems = action.cartItems;
      localStorage.removeItem("cartItems");
      state.shippingAddress = action.shippingAddress;
      localStorage.removeItem("shippingAddress");
    },
  },
});

//Slice for orderCreate
const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState: {
    loading: false,
    order: {},
    error: null,
    // success: false,
  },
  reducers: {
    ORDER_CREATE_REQUEST: (state) => {
      state.loading = true;
    },
    ORDER_CREATE_SUCCESS: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.success = true;
    },
    ORDER_CREATE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ORDER_CREATE_RESET: (state) => {
      state.order = {};
      state.success = false;
    },
  },
});

//Slice for order details
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    loading: true,
    order: {},
    error: null,
  },
  reducers: {
    ORDER_DETAILS_REQUEST: (state) => {
      state.loading = true;
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    ORDER_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//Slice for order
const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    ORDER_PAY_REQUEST: (state) => {
      state.loading = true;
    },
    ORDER_PAY_SUCCESS: (state) => {
      state.loading = false;
      state.success = true;
    },
    ORDER_PAY_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ORDER_PAY_RESET: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
});

//Slice for listMine order
const orderMineListSlice = createSlice({
  name: "orderMineList",
  initialState: {
    loading: false,
    error: null,
    orders: [],
  },
  reducers: {
    ORDER_MINE_LIST_REQUEST: (state) => {
      state.loading = true;
    },
    ORDER_MINE_LIST_SUCCESS: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    ORDER_MINE_LIST_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//Slice for user details
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    loading: true,
    error: null,
  },
  reducers: {
    USER_DETAILS_REQUEST: (state) => {
      state.loading = true;
    },
    USER_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    USER_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//Slice for user update profile
const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    USER_UPDATE_PROFILE_REQUEST: (state) => {
      state.loading = true;
      console.log("loading is there..");
    },
    USER_UPDATE_PROFILE_SUCCESS: (state, action) => {
      console.log("enter in succcess reducer");
      state.loading = false;
      state.success = true;
      state.user = action.payload;
      console.log("state update successfully");
    },
    USER_UPDATE_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions for use in components
export const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } =
  productListSlice.actions;

export const {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} = productDetailsSlice.actions;

export const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_EMPTY,
} = cartSlice.actions;

export const {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
} = userSigninSlice.actions;

export const {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} = userRegisterSlice.actions;

export const {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
} = orderCreateSlice.actions;

export const {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} = orderDetailsSlice.actions;

export const {
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} = orderPaySlice.actions;

export const {
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
} = orderMineListSlice.actions;

export const { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } =
  userDetailsSlice.actions;

export const {
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} = userUpdateProfileSlice.actions;

// Create the Redux store
const store = configureStore({
  reducer: {
    productList: productListSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartSlice.reducer,
    userSignin: userSigninSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    orderCreate: orderCreateSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    orderPay: orderPaySlice.reducer,
    orderMineList: orderMineListSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdateProfile: userUpdateProfileSlice.reducer,
  },
});

export default store;
