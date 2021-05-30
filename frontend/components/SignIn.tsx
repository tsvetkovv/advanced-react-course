import { FormEvent, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { CURRENT_USER_QUERY, useUser } from "./User";
import DisplayError from "./ErrorMessage";

const SIGNIN_MUTATION = gql(`
mutation SIGNIN($email: String!, $password: String!) {
  authenticate: authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      item {
        id
      }
    }
    ... on UserAuthenticationWithPasswordFailure {
      message
      code
    }
  }
}
`);

interface singinMutationResponse {
  authenticate: UserAuthenticationWithPasswordResult;
}

interface singinMutationVariables {
  email: string;
  password: string;
}

type UserAuthenticationWithPasswordResult =
  | UserAuthenticationWithPasswordSuccess
  | UserAuthenticationWithPasswordFailure;

interface UserAuthenticationWithPasswordSuccess {
  item: {
    id: string;
  };
}
interface UserAuthenticationWithPasswordFailure {
  message: string;
  code: string;
}

function isSuccess(
  result?: UserAuthenticationWithPasswordResult
): result is UserAuthenticationWithPasswordSuccess {
  return !!result && "item" in result;
}

function SignIn() {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const [signin, { data, error }] = useMutation<
    singinMutationResponse,
    singinMutationVariables
  >(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { email, password } = inputs;
    if (email && password) {
      const submitResponse = await signin({ variables: { email, password } });
      if (submitResponse && isSuccess(submitResponse.data?.authenticate)) {
        resetForm();
        // await router.push("/");
      }
    }
  }

  const user = useUser();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const authError = !isSuccess(data?.authenticate)
    ? data?.authenticate?.message
    : error || undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={authError} />
      <fieldset>
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
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}

export default SignIn;
