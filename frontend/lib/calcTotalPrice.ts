import { Cart } from "../models/Cart";

export default function calcTotalPrice(cart: Cart[]): number {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;

    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
