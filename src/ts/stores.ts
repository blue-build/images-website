import { writable } from "svelte/store";
import { CustomImage, ImagePreferences, MainEdition } from "./types";

export const darkModeStore = writable(false);

export const imagePreferences = writable<ImagePreferences>({
  edition: MainEdition.silverblue,
  nvidia: false,
});

export const customImage = writable<CustomImage>({
  name: "my-ublue",
  description: "This is my personal OS image.",
  baseImage: "silverblue-main",
  auth: undefined,
  login: undefined,
});
