import { ReactElement, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql(`
mutation SIGNOUT {
  endSession
}
`);

interface signOutMutationResponse {
  endSession: boolean;
}

function SignOut(): ReactElement {
  const [signOut] = useMutation<signOutMutationResponse>(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const router = useRouter();
  useEffect(() => {
    signOut().then(() => router.push("/"));
  }, []);

  return <></>;
}

export default SignOut;
