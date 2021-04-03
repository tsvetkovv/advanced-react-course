import PropTypes from "prop-types";
import SingleProduct from "../../components/SingleProduct";

interface QueryParams {
  id: string;
}

function SingleProductPage({ query }: { query: QueryParams }) {
  return <SingleProduct id={query.id} />;
}

SingleProductPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SingleProductPage;
