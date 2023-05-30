import { writable } from "svelte/store";
import { CustomImage, ImagePreferences, MainEdition } from "./types";

export const darkModeStore = writable(false);

export const imagePreferences = writable<ImagePreferences>(
  localStorage.getItem("imagePreferences") != null
    ? JSON.parse(localStorage.getItem("imagePreferences"))
    : {
        edition: MainEdition.silverblue,
        nvidia: false,
      }
);

imagePreferences.subscribe((p) => {
  localStorage.setItem("imagePreferences", JSON.stringify(p));
});

export const customImage = writable<CustomImage>(
  localStorage.getItem("customImage") != null
    ? JSON.parse(localStorage.getItem("customImage"))
    : {
        name: "my-ublue",
        description: "This is my personal OS image.",
        baseImage: "silverblue-main",
        auth: undefined,
        login: undefined,
        repo: undefined,
        signingDone: false,
      }
);

customImage.subscribe((c) => {
  localStorage.setItem("customImage", JSON.stringify(c));
});
