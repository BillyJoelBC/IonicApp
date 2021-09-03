import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private credential = [
    {username: 'billy', password: '12345'},
    {username: 'juan', password: '112233'},
  ];

  constructor() { }

  login(username: string, password: string): boolean {
    const query = this.credential.find(f => f.username === username && f.password === password);
    return !!query;
  }
}
