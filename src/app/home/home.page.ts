import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
  constructor() { }

  ngOnInit(): void {

  }
}
