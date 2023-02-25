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
  versions: Array<string> | undefined;
}

export enum Feature {
  nvidia = "nvidia",
  distrobox = "distrobox",
  autoupdate = "autoupdate",
}

export enum Desktop {
  gnome = "GNOME",
  kde = "KDE",
  xfce = "XFCE",
  sway = "Sway",
  lxqt = "LXQt",
  mate = "MATE",
  none = "none",
}

export interface ImageFilter {
  featureSet: Array<Feature>;
  desktop: Desktop | "";
}
