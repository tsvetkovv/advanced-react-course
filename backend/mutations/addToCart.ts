import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  CartItemUpdateInput,
  CartItemWhereUniqueInput,
} from '../.keystone/schema-types';
import { Session } from '../types';

const cartFields = 'id,quantity';

export default async function addToCart(
  root: unknown,
  {
    productId,
  }: {
    productId: string;
  },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. Query the current user see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current user cart
  const allCartItems: readonly {
    id: CartItemWhereUniqueInput['id'];
    quantity: CartItemCreateInput['quantity'];
  }[] = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: cartFields,
  });
  // 3. See if the current item is in this cart
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    const updateResult: CartItemUpdateInput =
      await context.lists.CartItem.updateOne({
        id: existingCartItem.id,
        data: {
          quantity: existingCartItem.quantity + 1,
        },
        resolveFields: cartFields,
      });
    return updateResult;
  }
  const createResult: CartItemCreateInput =
    await context.lists.CartItem.createOne({
      data: {
        product: { connect: { id: productId } },
        user: {
          connect: { id: sesh.itemId },
        },
      },
      resolveFields: cartFields,
    });
  return createResult;
}
