import create from "zustand";

const useStore = create((set) => ({
  //todo: complete this
  profileUrl: "url",
}));

const useCountryStore = create((set) => ({
  demo: "demo",
}));

export { useStore, useCountryStore };
