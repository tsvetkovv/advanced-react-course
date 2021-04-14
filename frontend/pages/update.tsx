import PropTypes from "prop-types";
import UpdateProduct from "../components/UpdateProduct";

function UpdatePage({ query }: { query: { id: string } }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}

UpdatePage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdatePage;
