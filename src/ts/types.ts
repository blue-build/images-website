import type { Desktop, Feature } from "@content/featureDefinitions";
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
