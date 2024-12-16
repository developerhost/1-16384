type Listener = () => void;

function createLocalStorageStore(key: string, initialValue: number) {
  let currentValue: number = initialValue;
  const listeners = new Set<Listener>();

  // クライアントサイドでのみlocalStorageを参照するための関数
  function initializeFromLocalStorage() {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        currentValue = Number(storedValue);
      } else {
        window.localStorage.setItem(key, String(initialValue));
      }
    }
  }

  // サーバーサイドでは呼ばれないようにするか、もしくは呼ばれても問題ないようにチェック
  if (typeof window !== "undefined") {
    initializeFromLocalStorage();
  }

  function getSnapshot() {
    return currentValue;
  }

  function subscribe(callback: Listener) {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  }

  function setValue(value: number) {
    currentValue = value;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, String(value));
    }
    for (const listener of listeners) {
      listener();
    }
  }

  return { getSnapshot, subscribe, setValue };
}

export const bestRecordStore = createLocalStorageStore("bestRecord", 1);
