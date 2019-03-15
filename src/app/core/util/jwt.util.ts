import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class JWTUtil {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  parseJwt(token) {
    if (isPlatformBrowser(this.platformId)) {
    if (!token) return {};

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
    }
  }
}
