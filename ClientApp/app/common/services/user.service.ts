import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User, AADUser } from '../models/user';

@Injectable()
export class UserService {
    private originUrl: string;
    private aadUser: AADUser;

    private devUser: User = {
        givenname: "John",
        surname: "Doe",
        jobTitle: "B.Sc.",
        userId: "1"
    }

    constructor(private http: Http, @Inject('BASE_URL')originUrl: string) {
        this.originUrl = originUrl;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    public getUser(): Observable<User> {
        if (this.originUrl.indexOf("localhost") > -1) {
            return new Observable(observer => {
                observer.next(this.devUser);
                observer.complete();
            });
        }
        return this.http.get(`${this.originUrl}/.auth/me`)
            .map(response => {
                try {
                    this.aadUser = response.json()[0] as AADUser;
   
                    let user = new User();
                    user.userId = this.aadUser.user_id;
   
                    this.aadUser.user_claims.forEach(claim => {
                        switch (claim.typ) {
                            case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname":
                                user.givenname = claim.val;
                                break;
                            case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname":
                                user.surname = claim.val;
                                break;
                            case "jobTitle":
                                user.jobTitle = claim.val;
                                break;                                
                        }
                    });
   
                    return user;
                }
                catch (Exception) {
                    console.log(`Error: ${Exception}`);
                }
            }).catch(this.handleError);
    }
}