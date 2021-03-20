import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Product as ProductType } from "../models/Product";
import Product from "./Product";

interface ProductData {
  allProducts: ProductType[];
}

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery<ProductData>(ALL_PRODUCTS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error {error.message}</p>;
  }
  return (
    <div>
      <ProductsListStyles>
        {data?.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
