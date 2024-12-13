import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/services/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    rememberMe: boolean = false;

    fire: any = Firestore;

    username: string = '';
    password: string = '';

    loading:boolean=false;

    USER_EMAIL: string = '';
    IS_LOGIN: boolean = false;

    constructor(
        private router: Router,
        private afApp: FirebaseApp,
        private layoutService: LayoutService,
        private authserv:AuthService
    ) {
        this.fire = getFirestore(afApp);
    }
    auth: any = getAuth();

    Login(form: NgForm) {
        this.loading=true;
        signInWithEmailAndPassword(
            this.auth,
            form.value.username + '@gmail.com',
            form.value.password
        )
            .then((user) => {
                if (user) {
                    this.loading=false;
                    console.log(user);
                    localStorage.setItem('email', user.user.email + '');
                    localStorage.setItem('islogin', 'true');
                    user.user.getIdToken().then((res) => {
                       // localStorage.setItem('token', res);
                    });
                    this.IS_LOGIN = true;
                    this.authserv.isLogin=true;
                     this.router.navigate(['/admin/pages/crud']);
                }
            })
            .catch((error) => {
                form.controls['username'].setErrors({ incorrect: true });
                form.controls['password'].setErrors({ incorrect: true });
                const errorCode = error.code;
                const errorMessage = error.message;
                this.authserv.isLogin=false;
                this.loading=false;
            });
    }


    get dark(): boolean {
        return this.layoutService.config().colorScheme !== 'light';
    }
}
