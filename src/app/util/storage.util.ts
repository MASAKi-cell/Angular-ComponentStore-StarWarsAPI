export class StorageUtil {
  static setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T>(key: string): T {
    try {
      return JSON.parse(sessionStorage.getItem(key)) as T;
    } catch (e) {
      return null;
    }
  }

  static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
