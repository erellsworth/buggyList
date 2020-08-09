import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private email: string;
    private password: string;
    public errors: string[] = [];

    constructor(
        private auth: AngularFireAuth,
        private route: Router
    ) { }

    ngOnInit() { }

    public async beginLogin() {
        const credentials = await this.auth.signInWithPopup(new auth.GoogleAuthProvider());
        console.log('credentials', credentials);
    }

    public emailUpdate(event: CustomEvent) {
        this.email = event.detail.value;
    }

    public passwordUpdate(event: CustomEvent) {
        this.password = event.detail.value;
    }

    public async loginWithPassword() {
        try {
            this.errors = [];
            await this.auth.signInWithEmailAndPassword(this.email, this.password);
            this.route.navigate(['/']);
        } catch (e) {
            this.errors.push(e.message);
        }

    }

}
