import { FormEvent } from "react";
import { gql, useMutation } from "@apollo/client";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";

const RESET_MUTATION = gql(`
mutation RESET_MUTATION($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
      message
      code
  }
}
`);

interface resetMutationResponse {
  redeemUserPasswordResetToken?: {
    code: string;
    message: string;
  };
}

interface resetMutationVariables {
  email: string;
  password: string;
  token: string;
}

function Reset({ token }: { token: string }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token: "",
  });

  const [reset, { data, error }] =
    useMutation<resetMutationResponse, resetMutationVariables>(RESET_MUTATION);

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken.message
    : undefined;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { email, password } = inputs;
    if (email && password) {
      try {
        const submitResponse = await reset({
          variables: { email, password, token },
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
      <h2>Reset your password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You password was set</p>
        )}
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
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}

export default Reset;
