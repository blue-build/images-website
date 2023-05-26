import { Desktop, Feature } from "@content/featureDefinitions";
import type { IconifyIcon } from "@iconify/svelte";

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

export interface ImageFilter {
  featureSet: Array<Feature>;
  desktop: Desktop | "";
}

export interface DesktopMeta {
  desktop: Desktop;
  icon: IconifyIcon;
  tooltip: string;
}

export interface FeatureMeta {
  feature: Feature;
  buttonTitle: string;
  icon: IconifyIcon;
  tooltip: string;
}

// emulating an enum but storing multiple values per item
export class MainEdition {
  static readonly silverblue = new MainEdition("Silverblue", Desktop.gnome);
  static readonly kinoite = new MainEdition("Kinoite", Desktop.kde);
  static readonly sericea = new MainEdition("Sericea", Desktop.sway);
  static readonly vauxite = new MainEdition("Vauxite", Desktop.xfce);
  static readonly lazurite = new MainEdition("Lazurite", Desktop.lxqt);
  static readonly onyx = new MainEdition("Onyx", Desktop.budgie);
  static readonly mate = new MainEdition("Mate", Desktop.mate);
  static readonly base = new MainEdition("Base", Desktop.none);

  static readonly all = [
    this.silverblue,
    this.kinoite,
    this.sericea,
    this.vauxite,
    this.lazurite,
    this.onyx,
    this.mate,
    this.base,
  ];

  private constructor(
    public readonly name: string,
    public readonly desktop: Desktop
  ) {}
}

export interface ImagePreferences {
  edition: MainEdition;
  nvidia: boolean;
}

export interface CustomImage {
  name: string;
  description: string;
  baseImage: string;
}
