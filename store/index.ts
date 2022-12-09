import { createContext, useContext } from "react";
import { AppStore } from "./appStore";
import { ThemeStore } from "./themeStore";
import { AsyncTrunk } from "mobx-sync";

export class RootStore {
  appStore: AppStore;
  themeStore: ThemeStore;

  constructor() {
    this.appStore = new AppStore();
    this.themeStore = new ThemeStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);

export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);

export const reHydrateLocalStorage = async (store: any[]) => {
  if (typeof window !== "undefined") {
    const trunk = new AsyncTrunk(store, {
      storage: localStorage,
    });
    await trunk.init();
  }
};

export const reHydrateSessionStorage = async (store: any[]) => {
  if (typeof window !== "undefined") {
    const trunk = new AsyncTrunk(store, {
      storage: sessionStorage,
    });
    await trunk.init();
  }
};
