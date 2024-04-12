import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public retrieve(key: string): any {
    const item = this.storage.getItem(key);

    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }
    return;
  }

  public retrieveObj<T>(key: string): T | undefined {
    const item = this.storage.getItem(key);

    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }

    return undefined;
  }

  public store(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
