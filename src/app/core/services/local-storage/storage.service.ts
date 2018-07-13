import { Injectable } from '@angular/core';

export abstract class StorageService {
  public abstract get(): Storage;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServie extends StorageService {
  public get(): Storage {
    return localStorage;
  }
}
