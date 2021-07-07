import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactElement } from "react";
import { Product as ProductType } from "../models/Product";
import Product from "./Product";
import { perPage } from "../config";

interface ProductData {
  allProducts: ProductType[];
}

export interface ProductVariables {
  first: number;
  skip: number;
}

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int, $first: Int) {
    allProducts(first: $first, skip: $skip) {
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

export function Products({ page }: { page: number }): ReactElement {
  const { data, error, loading } = useQuery<ProductData, ProductVariables>(
    ALL_PRODUCTS_QUERY,
    {
      variables: {
        skip: page * perPage - perPage,
        first: perPage,
      },
    }
  );
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

Products.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Products;
