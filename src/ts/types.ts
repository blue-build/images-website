export interface Images {
  images: Array<Image>;
}
export interface Image {
  name: string;
  creator: string;
  featureSet: Array<string>;
  editions: Array<Edition>;
  versions: Array<string>;
  imageUrl: string;
  githubRepo: string;
}
export interface Edition {
  name: string;
  desktop: string;
}
