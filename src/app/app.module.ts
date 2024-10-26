import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ProductService } from './demo/services/product.service';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },ProductService,MessageService,
        provideFirebaseApp(() =>
            initializeApp({
                projectId: 'honeyness-shop',
                appId: '1:582160308219:web:b3e8a05611a567509c5d5e',
                storageBucket: 'honeyness-shop.appspot.com',
                apiKey: 'AIzaSyCi2zy5huVAe6s5KQqm-x9r3UC9fS7tfog',
                authDomain: 'honeyness-shop.firebaseapp.com',
                messagingSenderId: '582160308219',
            })
        ),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()),
        provideStorage(() => getStorage()),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
