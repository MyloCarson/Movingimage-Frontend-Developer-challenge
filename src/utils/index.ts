import { Category } from "../services/category.interface";

export const getUniqueId = () => Math.floor(Math.random() * Date.now());

export const getCategoriesNames = (catIds: number[], categories: readonly Category[]): string[] => {
    return [...catIds].map( catId => categories.filter( category => category.id === catId)[0].name);
}

export const getCategoriesIds = (categoriesNames: string[], categories: readonly Category[]): number[] => {
  return [...categoriesNames].map( categoryName => categories.filter( category => category.name === categoryName)[0].id);
}