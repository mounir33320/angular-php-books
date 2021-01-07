import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  public books: Book[];
  private bookSubscription: Subscription;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
        }
      );
    this.bookService.emitBooks();
  }

  public onViewBook(id: number) {
    this.router.navigate(['books', id]);
  }

  public onDelete(book: Book, i: number): void {
    this.bookService.deleteBook(book).subscribe(
      () => {
        this.books.splice(i, 1);
        this.bookService.emitBooks();
      },
      error => console.error(error)
    );
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
