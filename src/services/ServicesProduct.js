import { del, patch, post } from "../utils"

export const createProduct = async (options) => {
  const result = await post('products/add', options);
  return result;
}

export const editProduct = async (id, options) => {
  const result = await patch(`products/${id}`, options);
  return result;
}

export const deleteProduct = async (id) => {
  const result = await del(`products/${id}`);
  return result;
}