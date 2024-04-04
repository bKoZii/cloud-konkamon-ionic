import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.page.html',
  styleUrls: ['./edit-page.page.scss'],
})
export class EditPagePage implements OnInit {
  @Input() member: any;
  constructor(
    private modalCtrl: ModalController,
    private mService: MemberService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}
  updateData(id: any) {
    this.modalCtrl.dismiss();
    this.mService.updateData(id, this.member).then(async () => {
      this.completeToast('อัพเดทข้อมูลสำเร็จ', 'success');
    });
  }
  async completeToast(
    message: string,
    color: 'success' | 'primary' | 'tertiary' | 'secondary' | 'dark'
  ) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 2000,
      color: color,
      icon: 'checkmark-circle',
      mode: 'ios',
    });
    toast.present();
  }

  titleSelectOptions = {
    header: 'คำนำหน้า',
    subHeader: 'กรุณาเลือกเพียงหนึ่งรายการ',
  };
}
