import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { EventListComponent } from './features/pevent/event-list/event-list.component';
import { AddEventComponent } from './features/pevent/add-event/add-event.component';
import { EditEventComponent } from './features/pevent/edit-event/edit-event.component';
import { HomeComponent } from './features/public/home/home/home.component';
import { EventDetailsComponent } from './features/public/eventDetails/event-details/event-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegisterEventComponent } from './features/registration/register-event/register-event.component';
import { MyeventsComponent } from './features/registration/myevents/myevents.component';

export const routes: Routes = [

    //public 
    {
        path : '',
        component : HomeComponent
    },

    //login
    {
        path : 'login',
        component : LoginComponent
    },

    {
        path : 'event/:url',
        component : EventDetailsComponent
    },


    //categories
    {
        path : 'admin/categories',
        component : CategoryListComponent,
        canActivate: [authGuard]
    },
    {
        path : 'admin/categories/add',
        component : AddCategoryComponent,
        canActivate: [authGuard]
    },
    {
        path : 'admin/categories/:id',
        component: EditCategoryComponent,
        canActivate: [authGuard]
    },

    //Blogposts
    {
        path : 'admin/events',
        component : EventListComponent,
        canActivate: [authGuard]
    },
    {
        path : 'admin/events/add',
        component : AddEventComponent,
        canActivate: [authGuard]
    },
    {
        path : 'admin/events/:id',
        component : EditEventComponent,
        canActivate: [authGuard]
    },

    // registration
    {
        path : 'register-event/:id',
        component : RegisterEventComponent,
        canActivate: [authGuard]
    },
    {
        path: 'my-events',
        component : MyeventsComponent,
        canActivate: [authGuard]

    }
];
