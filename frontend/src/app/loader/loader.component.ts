import { Component, OnInit } from '@angular/core';
import {BookService} from '../services/book.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

}
