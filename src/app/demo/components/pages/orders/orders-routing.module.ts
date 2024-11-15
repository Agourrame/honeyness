import { NgModule } from '@angular/core';
import { or } from '@angular/fire/firestore';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderComponent } from './order/order.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
            { path: '', redirectTo: 'table', pathMatch: 'full' },
            { path: 'table', component: TableComponent },
            { path: 'order', component: OrderComponent }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersRoutingModule {}
