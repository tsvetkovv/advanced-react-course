import { resetIdCounter, useCombobox } from "downshift";
import React, { ReactElement } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { Product } from "../models/Product";

type SearchItem = Pick<Product, "id" | "name" | "photo">;

interface SearchProductsResult {
  searchTerm: SearchItem[];
}

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerm: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search(): ReactElement {
  /**
   * TODO: there is a 350ms when user input something
   * but request is not fired up and loading = false
   * user sees an old search result with updated inputValue
   */
  const router = useRouter();
  const [findItems, { loading, data }] = useLazyQuery<
    SearchProductsResult,
    { searchTerm: string }
  >(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: "no-cache",
  });
  const items = data?.searchTerm || [];
  const findItemsButChill = React.useMemo(
    () => debounce(findItems, 350),
    [findItems]
  );
  resetIdCounter();
  const {
    inputValue,
    isOpen,
    getItemProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox<SearchItem>({
    items,
    onInputValueChange(e) {
      if (e.inputValue) {
        findItemsButChill({
          variables: {
            searchTerm: e.inputValue || "",
          },
        });
      }
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem?.id}`,
      });
    },
    itemToString(item) {
      return item?.name || "";
    },
  });

  return (
    <SearchStyles>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an Item",
            id: "search",
            className: "loading",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          inputValue &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              highlighted={index === highlightedIndex}
              {...getItemProps({ item, index })}
            >
              {item.photo && (
                <img
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.name}
                  width={50}
                />
              )}
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && data !== undefined && !loading && (
          <DropDownItem highlighted={false}>
            Sorry, no items found for {inputValue}
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
