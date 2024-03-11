import { Component } from '@angular/core';
import { IMember } from '../models/member.model';
import { map } from 'rxjs/operators';
import { MemberService } from '../services/member.service';
import {
  AlertController,
  IonModal,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { HomePage } from '../home/home.page';
@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage {
  member: IMember = new IMember();
  memberMore: IMember = new IMember();
  memberEdit: IMember = new IMember();
  memberRemove: IMember = new IMember();
  fullName?: String;
  searchText: any;
  searchCount = { count: 0 };

  dbPath?: string;

  constructor(
    private mService: MemberService,
    private memberAlert: AlertController,
    private memberToast: ToastController,
    private modal: ModalController
  ) {
    this.retrieveData();
    this.member.title = 'นาย';
    this.dbPath = mService.dbPath;
    // this.memberMore = this.member;
  }

  memberList: any;
  showModal: boolean = false;

  selectItem() {
    this.showModal = true;
  }
  retrieveData(): void {
    this.mService
      .retrieveData()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.memberList = data;
        // console.log(this.memberList);
      });
  }

  submitForm() {
    this.mService.submitData(this.member).then(async () => {
      this.completeToast('บันทึกข้อมูลสำเร็จ', 'success');
    });
    this.dialogDismiss();
    this.clearForm();
  }

  clearForm() {
    this.member = new IMember();
    this.member.title = 'นาย';
  }
  moreData(data: IMember) {
    this.fullName = data.title + ' ' + data.fName + ' ' + data.lName;
    this.memberMore = data;
  }
  editData(data: IMember) {
    this.fullName = data.title + ' ' + data.fName + ' ' + data.lName;
    this.memberEdit = data;

    // this.mService.updateData(data.id ,data)
  }
  async removeData(data: IMember) {
    const alert = await this.memberAlert.create({
      mode: 'ios',
      header: 'ลบข้อมูลสมาชิก',
      subHeader: 'คุณต้องการลบข้อมูลสมาชิกนี้หรือไม่?',
      message: data.title + ' ' + data.fName + ' ' + data.lName,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: async () => {
            this.completeToast('ยกเลิกการลบข้อมูลสำเร็จ', 'secondary');
          },
        },
        {
          text: 'ยืนยัน',
          role: 'destructive',
          handler: () => {
            this.mService.deleteData(data.id).then(async () => {
              this.completeToast('ลบข้อมูลสำเร็จ', 'success');
            });
          },
        },
      ],
    });
    alert.present();
  }

  async completeToast(
    message: string,
    color: 'success' | 'primary' | 'tertiary' | 'secondary'
  ) {
    const toast = await this.memberToast.create({
      message: message,
      position: 'top',
      duration: 2000,
      color: color,
      icon: 'checkmark-circle',
      mode: 'ios',
    });
    toast.present();
  }
  updateData(id: any) {
    this.memberEdit.dateEdited = new Date().getTime();
    this.mService.updateData(id, this.memberEdit).then(() => {});
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
  dialogDismiss() {
    this.modal.dismiss();
  }

}
