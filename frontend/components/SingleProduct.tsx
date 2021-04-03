import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import styled from "styled-components";
import { Product } from "../models/Product";
import DisplayError from "./ErrorMessage";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: start;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function SingleProductPage({ id }: { id: string }) {
  const { data, loading, error } = useQuery<{ Product: Product }>(
    SINGLE_ITEM_QUERY,
    {
      variables: {
        id,
      },
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error || !data) {
    return <DisplayError error={error} />;
  }

  const product = data.Product;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {product.name}</title>
      </Head>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        src={product.photo?.image?.publicUrlTransformed}
        alt={product.photo?.altText}
      />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}

SingleProductPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SingleProductPage;
