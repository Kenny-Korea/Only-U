import { atom } from "recoil";

export const hidingFooterState = atom({
  key: "hidingFooter",
  default: false,
});

export const currentPageState = atom({
  key: "CurrentPage",
  default: "Home",
});
