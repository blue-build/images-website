import { writable } from "svelte/store";
import { ImagePreferences, MainEdition } from "./types";

export const darkModeStore = writable(false);

export const imagePreferences = writable<ImagePreferences>({
  edition: MainEdition.silverblue,
  nvidia: false,
});
