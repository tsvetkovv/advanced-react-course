import { Photo } from "./Photo";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  photo?: Photo;
}
