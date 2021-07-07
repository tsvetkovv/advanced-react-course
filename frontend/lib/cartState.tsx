import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";

interface LocalStateContextType {
  cartOpen: boolean;
  setCartOpen?: (cartOpen: boolean) => void;
  toggleCart?: () => void;
  closeCart?: () => void;
  openCart?: () => void;
}
const LocalStateContext = createContext<LocalStateContextType>({
  cartOpen: false,
});
const LocalStateProvider = LocalStateContext.Provider;

export default function CartStateProvider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  function toggleCart(): void {
    setCartOpen((open) => !open);
  }

  function closeCart(): void {
    setCartOpen(false);
  }
  function openCart(): void {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

export function useCart(): LocalStateContextType {
  return useContext(LocalStateContext);
}
