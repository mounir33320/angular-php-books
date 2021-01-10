import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/Book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  public book: Book;
  public loader: boolean = true;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.book = new Book('', '');
    const id = +this.route.snapshot.params.id;

    this.bookService.getSingleBook(id).subscribe(
      (book: Book) => this.book = book,
      (error) => console.log(error),
      () => this.loader = false
    );
  }

}
