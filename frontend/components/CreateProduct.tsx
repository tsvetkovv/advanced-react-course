import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import useForm from "../lib/useForm";
import FormItem from "./FormItem";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import { Product } from "../models/Product";
import { ProductForm } from "../models/ProductForm";

interface ProductMutationResult {
  createProduct: Pick<Product, "id">;
}
// TODO avoid passing photo if there is no $image
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
    }
  }
`;

function CreateProduct() {
  const { inputs, handleChange, clearForm } = useForm<ProductForm>({
    name: "Nice Shoes",
    price: 123,
    description: "There are the best shoes!",
  });
  const [
    createProduct,
    { loading, error },
  ] = useMutation<ProductMutationResult>(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await createProduct({
      variables: inputs,
    });
    if (!error && res?.data?.createProduct) {
      clearForm();
      await router.push({
        pathname: `/product/${res.data.createProduct.id}`,
      });
    }
  }

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <FormItem
          type="file"
          name="image"
          label="Image"
          onChange={handleChange}
        />
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

        <button type="submit">+ Add product</button>
      </fieldset>
    </Form>
  );
}

export default CreateProduct;
