import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  courses = ["a", "b", "c"];

  constructor() { }

  ngOnInit(): void {
  }

}
