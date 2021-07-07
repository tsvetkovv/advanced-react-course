import { gql, useQuery } from "@apollo/client";
import { Cart } from "../models/Cart";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export interface User {
  id: string;
  email: string;
  name: string;
  cart: Cart[];
}

interface AuthItemQueryType {
  authenticatedItem?: User;
}

export function useUser(): User | null {
  const { data } = useQuery<AuthItemQueryType>(CURRENT_USER_QUERY);

  return data?.authenticatedItem || null;
}
