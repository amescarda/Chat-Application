import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {  ChatComponent } from './chat/chat.component';
import {  SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '',
    component: SignUpComponent
  },
  { path: 'chat',
    component: ChatComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
