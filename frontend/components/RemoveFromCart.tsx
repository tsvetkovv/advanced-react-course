import { ReactElement } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Product } from "../models/Product";

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;

  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

interface RemoveFromCartType {
  deleteCartItem: Pick<Product, "id"> & {
    __typename: "CartItem";
  };
}

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

export default function RemoveFromCart({ id }: { id: string }): ReactElement {
  const [removeFromCart, { loading }] = useMutation<
    RemoveFromCartType,
    { id: string }
  >(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update: (cache, mutationResult) => {
      if (mutationResult.data) {
        cache.evict({ id: cache.identify(mutationResult.data.deleteCartItem) });
      }
    },
    optimisticResponse: {
      deleteCartItem: {
        id,
        __typename: "CartItem",
      },
    },
  });
  return (
    <BigButton
      type="button"
      title="Remove This Item from Cart"
      onClick={() => removeFromCart()}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}
