export interface Images {
  images: Array<Image>;
}
export interface Image {
  name: string;
  creator: string;
  featureSet: Array<Feature>;
  editions: Array<Edition>;
  versions: Array<string>;
  imageUrl: string;
  githubRepo: string;
}
export interface Edition {
  name: string;
  desktop: Desktop;
  description: string;
}

export enum Feature {
  nvidia = "nvidia",
  distrobox = "distrobox",
}

export enum Desktop {
  gnome = "GNOME",
  kde = "KDE",
  xfce = "XFCE",
  sway = "Sway",
  none = "none",
}

export interface ImageFilter {
  featureSet: Array<Feature>;
  desktop: Array<Desktop>;
}
