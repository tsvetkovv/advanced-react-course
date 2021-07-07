import Link from "next/link";
import { ReactElement } from "react";
import NavStyles from "./styles/NavStyles";
import { User, useUser } from "./User";
import { useCart } from "../lib/cartState";

export default function Nav(): ReactElement {
  const user: User | null = useUser();
  const { openCart } = useCart();

  // noinspection HtmlUnknownTarget
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <Link href="/signout">Sign Out</Link>
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
