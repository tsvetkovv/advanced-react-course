import styled from "styled-components";
import { ReactElement } from "react";
import CartStyles from "./styles/CartStyles";
import { useUser } from "./User";
import Supreme from "./styles/Supreme";
import { Cart as CartModel } from "../models/Cart";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import { useCart } from "../lib/cartState";
import CloseButton from "./styles/CloseButton";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGray);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }: { cartItem: CartModel }) {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        width={100}
        src={product.photo?.image.publicUrlTransformed}
        alt={product.photo?.altText}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}

export default function Cart(): ReactElement | null {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!me) {
    return null;
  }

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}&apos;s Cart</Supreme>
      </header>
      <CloseButton onClick={closeCart}>&times;</CloseButton>
      <ul>
        {me.cart.map((cart) => (
          <CartItem key={cart.id} cartItem={cart} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
