import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";

import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import PaginationStyles from "./styles/PaginationStyles";
import DisplayError from "./ErrorMessage";
import { perPage } from "../config";

export interface PaginationQueryData {
  meta: {
    count: number;
  };
}

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    meta: _allProductsMeta {
      count
    }
  }
`;

function Pagination({ page }: { page: number }) {
  const { error, loading, data } = useQuery<PaginationQueryData>(
    PAGINATION_QUERY
  );
  if (loading) return <p>Loading...</p>;
  if (error || !data) return <DisplayError error={error} />;
  const total = data.meta.count;
  const pageCount = Math.ceil(total / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ____</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a aria-disabled={page === 1}>👈 Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{total} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a aria-disabled={page >= pageCount}>Next 👉</a>
      </Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Pagination;
