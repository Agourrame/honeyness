import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, createUserWithEmailAndPassword, signOut, authState, getAuth } from '@angular/fire/auth';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  auth: Auth;
  fire: Firestore;
  isLogin: boolean = false;

  constructor(private router: Router, private afApp: FirebaseApp, private messageService: MessageService) {
    this.auth = getAuth();
    this.fire = getFirestore(afApp);
    this.user$ = authState(this.auth);
  }

  signup(User: { email: string; password: string }) {
    createUserWithEmailAndPassword(this.auth, User.email, User.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.messageService.add({ severity: 'success', summary: 'Signup Successful', detail: `Welcome, ${user.email}` });
      })
      .catch((error) => {
        let errorMessage = 'Error signing up.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email already in use.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        }
        this.messageService.add({ severity: 'error', summary: 'Signup Failed', detail: errorMessage });
      });
  }

  getCurrentUser(): Observable<any> {
    return authState(this.auth);
  }

  logout() {
    return this.auth.signOut();
  }
}
