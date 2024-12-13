import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../demo/services/auth.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
export const authGuard: CanActivateFn = (route, state) => {
   // Inject dependencies (AuthService and Router)
   const auth = inject(AuthService);
   const router = inject(Router);
 
     // Ensure `auth.user$` is not undefined
  if (!auth.user$) {
    console.error('AuthService user$ is undefined!');
    router.navigate(['/auth/login']);
    return false;
  }

   // Return an Observable<boolean> to determine access
   return auth.user$.pipe(
     map(user => {
       if (user) {
         return true; // Allow access
       } else {
         router.navigate(['/auth/login']); // Redirect to login page
         return false; // Deny access
       }
     })
   );
};
