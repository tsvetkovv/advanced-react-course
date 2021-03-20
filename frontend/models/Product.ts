import { Photo } from "./Photo";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  photo?: Photo;
}
