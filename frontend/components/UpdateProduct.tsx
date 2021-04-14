import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent } from "react";
import PropTypes from "prop-types";
import useForm from "../lib/useForm";
import FormItem from "./FormItem";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import { Product } from "../models/Product";
import { ProductForm } from "../models/ProductForm";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, price: $price, description: $description }
    ) {
      id
      name
      price
      description
    }
  }
`;

type UpdateVariables = Partial<
  Pick<Product, "name" | "price" | "description">
> &
  Pick<Product, "id">;

interface ProductMutationResult {
  createProduct: Pick<Product, "id">;
}

function UpdateProduct({ id }: { id: string }) {
  const { data, loading, error } = useQuery<{ Product: Product }>(
    SINGLE_ITEM_QUERY,
    {
      variables: {
        id,
      },
    }
  );

  const [
    updateProduct,
    { loading: updateLoading, error: updateError },
  ] = useMutation<ProductMutationResult, UpdateVariables>(
    UPDATE_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const { inputs, handleChange } = useForm<ProductForm>(data?.Product);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateProduct({
      variables: {
        id,
        name: inputs.name,
        price: inputs.price,
        description: inputs.description,
      },
    });
  }

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <DisplayError error={error || updateError} />
      <fieldset
        disabled={loading || updateLoading}
        aria-busy={loading || updateLoading}
      >
        <FormItem
          name="name"
          label="Name"
          value={inputs.name}
          onChange={handleChange}
        />
        <FormItem
          name="price"
          label="Price"
          type="number"
          value={inputs.price}
          onChange={handleChange}
        />
        <FormItem
          name="description"
          label="Description"
          type="textarea"
          value={inputs.description}
          onChange={handleChange}
        />

        <button type="submit">Update product</button>
      </fieldset>
    </Form>
  );
}

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateProduct;
