import PropTypes from "prop-types";
import Link from "next/link";
import { Product as ProductType } from "../models/Product";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

function Product({ product }: { product: ProductType }) {
  return (
    <ItemStyles>
      <img src={product.photo?.image?.publicUrlTransformed} alt={product.name} />
      <Title>
        <Link href={`/products/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
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
    }),
  }).isRequired,
};

export default Product;
