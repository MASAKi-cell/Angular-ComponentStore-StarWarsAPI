export class StorageUtil {
  static setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T>(key: string): T {
    return JSON.parse(sessionStorage.getItem(key) as string) as T;
  }

  static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
