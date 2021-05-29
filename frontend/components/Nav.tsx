import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { User, useUser } from "./User";

export default function Nav() {
  const user: User | null = useUser();

  // noinspection HtmlUnknownTarget
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
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
