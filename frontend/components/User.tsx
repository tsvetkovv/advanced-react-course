import { gql, useQuery } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthItemQueryType {
  authenticatedItem?: User;
}

export function useUser(): User | null {
  const { data } = useQuery<AuthItemQueryType>(CURRENT_USER_QUERY);

  return data?.authenticatedItem || null;
}
