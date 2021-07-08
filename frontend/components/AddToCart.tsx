import { ReactElement } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Cart } from "../models/Cart";
import { CURRENT_USER_QUERY } from "./User";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

type AddToCartMutationResponse = Pick<Cart, "id" | "quantity">;
interface AddToCartMutationVariables {
  id: string;
}
export default function AddToCart({ id }: { id: string }): ReactElement {
  const [addToCart, { loading }] = useMutation<
    AddToCartMutationResponse,
    AddToCartMutationVariables
  >(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button disabled={loading} type="button" onClick={() => addToCart()}>
      Add{loading && "ing"} To Cart 🛒
    </button>
  );
}
