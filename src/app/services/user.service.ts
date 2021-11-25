import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../../models/User';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {
    baseUrl = 'http://localhost:8080/api/v1.0/tweets/';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.baseUrl+`all`);
    }

    register(user: User,headers):Observable<any> {
        return this.http.post(this.baseUrl+`users/register`, user,{headers});
    }

    login(user:User)
    {
      return this.http.post(this.baseUrl+`login`, user);

    }
    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }

    saveTweet(username,message)
    {
      return this.http.post(this.baseUrl+`${username}`+`/add`,message);
    }

}
