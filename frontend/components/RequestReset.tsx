import { FormEvent, ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql(`
mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
  }
}
`);

interface requestResetMutationResponse {
  sendUserPasswordResetLink: null;
}

interface requestResetMutationVariables {
  email: string;
}

function RequestReset(): ReactElement {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });

  const [requestReset, { data, error, loading }] = useMutation<
    requestResetMutationResponse,
    requestResetMutationVariables
  >(REQUEST_RESET_MUTATION);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { email } = inputs;
    if (email) {
      try {
        const submitResponse = await requestReset({
          variables: { email },
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
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>If an email exists, the link was send!</p>
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

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
