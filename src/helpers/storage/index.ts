import { MMKV } from 'react-native-mmkv'

type KEYS = 'user';
type Value = string | number | boolean | object

export interface IStorage {
  setItem(key: string, value: Value): void;
  getItem(value: string): Value | undefined;
  items(): string[];
  removeItem(value: string): void;
  clear(): void
}

class Storage implements IStorage {
  private storage

  constructor() {
    this.storage = new MMKV()
   }

  public setItem(key: KEYS, value: Value) {

    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    this.storage.set(key, value)
  }

  public getItem(value: string) {
    return this.storage.getString(value)
  }

  public removeItem(value: string) {
    this.storage.delete(value)
  }

  public items() {
    return this.storage.getAllKeys()
  }

  public clear() {
    this.storage.clearAll()
  }
}

export default new Storage()