import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/Book.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = [];
  public bookSubject = new Subject<Book[]>();

  public loaderSubject = new Subject<boolean>();
  public loader:boolean = true;

  private apiAddress =  'http://localhost:8000';

  constructor(private httpClient: HttpClient) {
    this.getBooks();
  }

  public emitBooks() {
    this.bookSubject.next(this.books);
  }

  public emitLoader() {
    this.loaderSubject.next(this.loader);
  }

  public createBook(book: Book): void {
    this.httpClient.post(`${this.apiAddress}/create.php`, book).subscribe(
      (id: number) => {
        book.id = id;
        this.books.push(book);
        this.emitBooks();
        },
      error => console.error(error)
    );
  }

  public getBooks(): void {
    this.httpClient.get(`${this.apiAddress}/read.php`).subscribe(
      (books: Book[]) => {
        this.books = books;
        this.emitBooks();
      },
      error => console.log(error),
      () => {
        this.loader = false;
        this.emitLoader();
      }
    );
  }

  public getSingleBook(id: number): Observable<Book> {
    // @ts-ignore
    return this.httpClient.get(`${this.apiAddress}/read.php?id=${id}`);
  }

  public deleteBook(book: Book): Observable<null> {
    // @ts-ignore
    return this.httpClient.delete(`${this.apiAddress}/delete.php?id=${book.id}`);
  }
}
