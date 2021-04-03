export interface Photo {
  id: number;
  image: {
    publicUrlTransformed: string;
  };
  altText?: string;
}
