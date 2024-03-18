import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IMember } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  @Input() data: any;
  constructor(
    private mService: MemberService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  updateData(id: any) {
    this.modalCtrl.dismiss();
    this.mService.updateData(id, this.data).then(async () => {
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
