import styled from "styled-components";

import PropTypes from "prop-types";
import { ApolloError } from "@apollo/client";

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }: { error: ApolloError }) => {
  if (!error || !error.message) {
    return null;
  }
  if (error.graphQLErrors) {
    return (
      <>
        {error.graphQLErrors.map((e) => (
          <ErrorStyles key={e.message}>
            <p data-test="graphql-error">
              <strong>Shoot!</strong>
              {e.message.replace("GraphQL error: ", "")}
            </p>
          </ErrorStyles>
        ))}
      </>
    );
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.networkError?.message?.replace("GraphQL error: ", "")}
      </p>
    </ErrorStyles>
  );
};

DisplayError.defaultProps = {
  error: null,
};

DisplayError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    response: PropTypes.objectOf(PropTypes.object),
    graphQLErrors: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
      })
    ),
    networkError: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

export default DisplayError;
