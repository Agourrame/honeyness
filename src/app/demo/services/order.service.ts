import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getFirestore, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { order } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  fire: any = Firestore;

  constructor(
      private afApp: FirebaseApp,
      private messageService: MessageService
  ) {
      this.fire = getFirestore(afApp);
  }


  getOrder(): Observable<order[]> {
      const pro = collection(this.fire, 'Order');
      const q = query(pro, orderBy("date","desc"));
      return collectionData(q, { idField: 'id' }) as Observable<order[]>;
  }


//   AddOrder(pro: order) {
//       const db = collection(this.fire, 'Order');
//       addDoc(db, pro)
//           .then(() => {
//               this.messageService.add({
//                   key: 'tc',
//                   severity: 'success',
//                   summary: 'Success',
//                   detail: 'Product added seccussfully',
//               });
//           })
//           .catch(() => {
//               this.messageService.add({
//                   key: 'tc',
//                   severity: 'error',
//                   summary: 'Error',
//                   detail: 'Probleme while storing data !!',
//               });
//           });
//   }

    async AddOrder(pro: order): Promise<string> {
    const db = collection(this.fire, 'Order');
    try {
        const docRef = await addDoc(db, pro);
        // Display success message
        this.messageService.add({
            key: 'tc',
            severity: 'success',
            summary: 'Success',
            detail: 'Product added successfully',
        });
        return docRef.id;
    } catch (error) {
        // Display error message
        this.messageService.add({
            key: 'tc',
            severity: 'error',
            summary: 'Error',
            detail: 'Problem while storing data!',
        });

        // Re-throw the error to handle it further up if needed
        throw error;
    }
}


  UpdateOrder(id: string, pro: order) {
      const washingtonRef = doc(this.fire, 'Order', id);
      updateDoc(washingtonRef, {
          product: pro.product,
          email: pro.email,
          customer: pro.customer,
          address: pro.address,
          order: pro.order,
          total: pro.total,
          date:pro.date,
          view:pro.view,
          valid:pro.valid
      })
          .then(() => {
              this.messageService.add({
                  key: 'tc',
                  severity: 'success',
                  summary: 'Success',
                  detail: 'le produit a été update avec succès',
              });
          })
          .catch((err) => {
              this.messageService.add({
                  key: 'tc',
                  severity: 'error',
                  summary: 'Error',
                  detail: 'le produit ne pas updateé',
              });
          });
  }

  DeleteOrder(id: string) {
      deleteDoc(doc(this.fire, 'Order', `${id}`))
          .then(() => {
              this.messageService.add({
                  key: 'tc',
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Enregistrement supprimé',
              });
          })
          .catch((err) => {
              this.messageService.add({
                  key: 'tc',
                  severity: 'error',
                  summary: 'Error',
                  detail: 'le produit ne pas suppréme',
              });
          });
  }



  UpdateConfermation(id: string, status: boolean) {
    const washingtonRef = doc(this.fire, 'Order', id);
    updateDoc(washingtonRef, {
        valid:status
    })
        .then(() => {
            this.messageService.add({
                key: 'tc',
                severity: 'success',
                summary: 'Success',
                detail: '',
            });
        })
        .catch((err) => {
            this.messageService.add({
                key: 'tc',
                severity: 'error',
                summary: 'Error',
                detail: '',
            });
        });
}



UpdateView(id: string, status: boolean) {
    const washingtonRef = doc(this.fire, 'Order', id);
    updateDoc(washingtonRef, {
        view:status
    })
        .then(() => {
            this.messageService.add({
                key: 'tc',
                severity: 'success',
                summary: 'Success',
                detail: '',
            });
        })
        .catch((err) => {
            this.messageService.add({
                key: 'tc',
                severity: 'error',
                summary: 'Error',
                detail: '',
            });
        });
}
}
