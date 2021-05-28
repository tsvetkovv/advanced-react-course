// eslint-disable-next-line import/no-extraneous-dependencies
import {
  FieldFunctionOptions,
  FieldPolicy,
} from "@apollo/client/cache/inmemory/policies";
import { ProductVariables } from "../components/Products";
import {
  PAGINATION_QUERY,
  PaginationQueryData,
} from "../components/Pagination";
import { Product } from "../models/Product";

type TExisting = readonly Product[];
// cannot specify fields here
type TArgs = Record<string, number>;

function isProductVariables(product: any): product is ProductVariables {
  return "skip" in product && "first" in product;
}

export default function paginationField(): FieldPolicy<TExisting> {
  return {
    keyArgs: false,
    read(
      existing = [] as TExisting,
      { args, cache }: FieldFunctionOptions<TArgs, TArgs>
    ) {
      if (isProductVariables(args)) {
        const data = cache.readQuery<PaginationQueryData>({
          query: PAGINATION_QUERY,
        });
        const count = data?.meta?.count || 0;
        const { skip, first } = args;
        const pages = Math.ceil(count / first);
        const page = skip / first + 1;

        const items = existing.slice(skip, skip + first).filter((x) => !!x);

        if (items.length && items.length !== first && page === pages) {
          return items;
        }

        if (items.length !== first) {
          return undefined;
        }

        if (items.length !== 0) {
          return items;
        }
      }
      throw new Error("Incorrect args");
    },
    merge(existing, incoming, { args }) {
      if (isProductVariables(args)) {
        const { skip } = args;
        const merged: Product[] = existing ? [...existing] : [];
        for (let i = skip; i < skip + incoming.length; i += 1) {
          merged[i] = incoming[i - skip];
        }
        return merged;
      }
      throw new Error("Incorrect args");
    },
  };
}
