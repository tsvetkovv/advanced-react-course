import { FormEvent } from "react";
import { gql, useMutation } from "@apollo/client";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { User } from "./User";
import DisplayError from "./ErrorMessage";

const SIGNUP_MUTATION = gql(`
mutation SIGNUP($email: String!, $name: String!, $password: String!) {
    createUser(data:{
    email: $email,
    name: $name,
    password: $password
  }) {
    id
    email
    name
  }
}
`);

interface singUpMutationResponse {
  createUser: User;
}

interface singUpMutationVariables {
  email: string;
  name: string;
  password: string;
}

function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    name: "",
    password: "",
  });

  const [signup, { data, error }] =
    useMutation<singUpMutationResponse, singUpMutationVariables>(
      SIGNUP_MUTATION
    );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { email, password, name } = inputs;
    if (email && password && name) {
      try {
        const submitResponse = await signup({
          variables: { email, name, password },
        });
        if (submitResponse?.data) {
          resetForm();
        }
      } catch (err) {
        // do nothing since the error will be catch below
      }
    }
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go Ahead an Sign in!
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            required
            type="name"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            required
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}

export default SignUp;
