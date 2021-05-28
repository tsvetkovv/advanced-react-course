import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Products from "../../components/Products";
import Pagination from "../../components/Pagination";

function getPage(query: ParsedUrlQuery): number {
  let page = 1;
  if ("page" in query && typeof query.page === "string") {
    const parsedInt = parseInt(query.page, 10);
    if (!Number.isNaN(parsedInt) && parsedInt > 0) {
      page = parsedInt;
    }
  }
  return page;
}

export default function ProductsPage() {
  const { query } = useRouter();
  const page = getPage(query);
  return (
    <div>
      <Pagination page={page} />
      <Products />
      <Pagination page={page} />
    </div>
  );
}
