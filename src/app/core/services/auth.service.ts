import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from 'src/app/model/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  refreshToken(refreshToken) {
    const requestBody = 'grant_type=refresh_token&refresh_token=' + refreshToken;
    return this.httpClient.post<TokenResponse>('/auth-service/oauth/token', requestBody);
  }

}
