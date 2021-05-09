import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import React from "react";
import { Product } from "../models/Product";

interface ProductMutationResult {
  deleteProduct: Pick<Product, "id" | "name">;
}

type UpdateVariables = Partial<Pick<Product, "id">>;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function DeleteProduct({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [deleteProduct, { loading }] = useMutation<
    ProductMutationResult,
    UpdateVariables
  >(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update: (cache, { data }) => {
      if (data) {
        cache.evict({ id: cache.identify(data.deleteProduct) });
      }
    },
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-alert
        if (window.confirm("Are you sure you want to delete this product")) {
          deleteProduct({
            variables: { id },
          }).catch((err) => {
            // eslint-disable-next-line no-alert
            alert(err.message);
          });
        }
      }}
    >
      {children}
    </button>
  );
}

DeleteProduct.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteProduct;
