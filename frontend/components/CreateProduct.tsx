import useForm from "../lib/useForm";
import FormItem from "./FormItem";

interface ProductForm {
  name: string;
  price: number;
  description: string;
}

function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm<ProductForm>({
    name: "Nice Shoes",
    price: 123,
    description: "There are the best shoes!",
  });
  return (
    <form>
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

      <button type="button" onClick={clearForm}>
        Clear form
      </button>
      <button type="button" onClick={resetForm}>
        Reset form
      </button>
    </form>
  );
}

export default CreateProduct;
