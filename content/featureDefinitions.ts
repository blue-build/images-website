import type { DesktopMeta, FeatureMeta } from "@ts/types";

import gnomeIcon from "@iconify/icons-simple-icons/gnome";
import kdeIcon from "@iconify/icons-simple-icons/kde";
import xfceIcon from "@iconify/icons-simple-icons/xfce";
import genericWmIcon from "@iconify/icons-material-symbols/grid-view";
import genericDeIcon from "@iconify/icons-material-symbols/dock-to-right";
import noDeIcon from "@iconify/icons-material-symbols/close-rounded";
import nvidiaIcon from "@iconify/icons-simple-icons/nvidia";
import distroboxIcon from "@iconify/icons-simple-icons/hackthebox";
import autoUpdateIcon from "@iconify/icons-material-symbols/cycle";

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
}

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
];
