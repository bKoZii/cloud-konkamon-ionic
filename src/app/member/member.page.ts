import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  memberData: string[] = ['นาย กรกมล ศรีอ่อน', 'นาย พรี่บิ๊ก จ้า', 'นาย ทดสอบ Angular + Ionic']
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
  constructor() { }


  ngOnInit() {

  }

}
