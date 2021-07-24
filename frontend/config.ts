// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000/api/graphql";
export const perPage = 2;
