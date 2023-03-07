import type { DesktopMeta, FeatureMeta } from "@ts/types";

// Icons for use in the image listing (IconList.svelte) and the filter options (ImageList.svelte).
// Icons from https://iconify.design/, copy the "Svelte (offline)" import and name it accordingly.
// Prefer icons from already installed icon packs: Material symbols, Simple Icons, Phosphor.
// If usage of another icon pack is necessary
// add it as a development dependency using pnpm and the instructions provided by iconify.design.
import gnomeIcon from "@iconify/icons-simple-icons/gnome";
import kdeIcon from "@iconify/icons-simple-icons/kde";
import xfceIcon from "@iconify/icons-simple-icons/xfce";
import genericWmIcon from "@iconify/icons-material-symbols/grid-view";
import genericDeIcon from "@iconify/icons-material-symbols/dock-to-right";
import noDeIcon from "@iconify/icons-material-symbols/close-rounded";
import nvidiaIcon from "@iconify/icons-simple-icons/nvidia";
import distroboxIcon from "@iconify/icons-simple-icons/hackthebox";
import autoUpdateIcon from "@iconify/icons-material-symbols/cycle";
import udevRulesIcon from '@iconify/icons-ph/game-controller';

// In both enums:
// The value on the right is what HAS to be written the same way as in images.yml,
// and the key on the left is the alias of it inside the typescript code (prefer smallcaps for that)

export enum Desktop {
  gnome = "GNOME",
  kde = "KDE",
  xfce = "XFCE",
  sway = "Sway",
  lxqt = "LXQt",
  mate = "MATE",
  none = "none",
}

export enum Feature {
  nvidia = "nvidia",
  distrobox = "distrobox",
  autoupdate = "autoupdate",
  udev = "udev",
}

// desktop: reference to the correct desktop in the desktop enum
// icon: an iconify icon imported above
// tooltip: shown when hovering over the icon in an image listing

export const desktops: Array<DesktopMeta> = [
  {
    desktop: Desktop.gnome,
    icon: gnomeIcon,
    tooltip: "Uses GNOME by default.",
  },
  {
    desktop: Desktop.kde,
    icon: kdeIcon,
    tooltip: "Uses KDE Plasma by default.",
  },
  {
    desktop: Desktop.xfce,
    icon: xfceIcon,
    tooltip: "Uses XFCE by default.",
  },
  {
    desktop: Desktop.sway,
    icon: genericWmIcon,
    tooltip: "Uses SwayWM by default.",
  },
  {
    desktop: Desktop.lxqt,
    icon: genericDeIcon,
    tooltip: "Uses LXQt by default.",
  },
  {
    desktop: Desktop.mate,
    icon: genericDeIcon,
    tooltip: "Uses MATE by default.",
  },
  {
    desktop: Desktop.none,
    icon: noDeIcon,
    tooltip: "Doesn't include any desktop environment or window manager.",
  },
];

// feature: reference to the correct feature in the feature enum
// icon: an iconify icon imported above
// tooltip: shown when hovering over the icon in an image listing
// buttonTitle: text that will be shown on the button that filters by the feature

export const features: Array<FeatureMeta> = [
  {
    feature: Feature.nvidia,
    icon: nvidiaIcon,
    tooltip: "Includes Nvidia drivers.",
    buttonTitle: "Nvidia",
  },
  {
    feature: Feature.distrobox,
    icon: distroboxIcon,
    tooltip: "Includes distrobox.",
    buttonTitle: "Distrobox",
  },
  {
    feature: Feature.autoupdate,
    icon: autoUpdateIcon,
    tooltip: "Includes automatic updates.",
    buttonTitle: "Automatic updates",
  },
  {
    feature: Feature.udev,
    icon: udevRulesIcon,
    tooltip: "Includes udev support for devices such as many game controllers, Yubikeys and OpenRGB.",
    buttonTitle: "Udev rules",
  },
];
