import PropTypes from "prop-types";
import Link from "next/link";
import { ReactElement } from "react";
import { Product as ProductType } from "../models/Product";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteProduct from "./DeleteProduct";

function Product({ product }: { product: ProductType }): ReactElement {
  return (
    <ItemStyles>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        src={product.photo?.image?.publicUrlTransformed}
        alt={product.photo?.altText}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "/update",
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string.isRequired,
      }),
      altText: PropTypes.string,
    }),
  }).isRequired,
};

export default Product;
