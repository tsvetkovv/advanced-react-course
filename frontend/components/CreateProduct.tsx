import useForm from "../lib/useForm";
import FormItem from "./FormItem";
import Form from "./styles/Form";

interface ProductForm {
  image: string;
  name: string;
  price: number;
  description: string;
}

function CreateProduct() {
  const { inputs, handleChange } = useForm<ProductForm>({
    name: "Nice Shoes",
    price: 123,
    description: "There are the best shoes!",
  });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset>
        <FormItem
          type="file"
          name="image"
          label="Image"
          onChange={handleChange}
        />
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
        <FormItem
          name="description"
          label="Description"
          type="textarea"
          value={inputs.description}
          onChange={handleChange}
        />

        <button type="submit">+ Add product</button>
      </fieldset>
    </Form>
  );
}

export default CreateProduct;
