import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { Book } from '../models/Book.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  errorMessage: string;

  constructor(private bookService: BookService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.bookForm = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      synopsis: ""
    });
  }

  onSubmit(){
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;

    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;

    this.bookService.createBook(newBook);
    this.bookService.emitBooks();
    this.router.navigate(['books']);
  }
}
