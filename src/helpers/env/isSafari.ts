import canUseDOM from "./canUseDOM";

declare global {
    interface Window {
        safari: any;
    }
}

const isSafari = canUseDOM
    ? Boolean(
          typeof window.safari === "object" && window.safari.pushNotification,
      )
    : false;

export default isSafari;
