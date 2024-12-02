import { get } from "../utils"

export const getCategories = async () => {
  const result = await get('products/category-list');
  return result;
}