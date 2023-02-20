export interface Images {
  images: Array<Image>;
}
export interface Image {
  name: string;
  creator: string;
  editions: Array<Edition>;
  versions: Array<string>;
  imageUrl: string;
}
export interface Edition {
  name: string;
  desktop: string;
}
