import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { BookService } from './services/book.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/books", pathMatch: "full" },
  { path: "books", component: BookListComponent },
  { path: "books/:id", component: SingleBookComponent },
  { path: "add-book", component: BookFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    SingleBookComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
