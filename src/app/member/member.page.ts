import { Component } from '@angular/core';
import { IMember } from '../models/member.model';
import { map } from 'rxjs/operators';
import { MemberService } from '../services/member.service';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { EditModalComponent } from './edit-modal/edit-modal.component';
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
  dbPath?: string;

  constructor(
    private mService: MemberService,
    private memberAlert: AlertController,
    private memberToast: ToastController,
    private modal: ModalController,
    private router: Router
  ) {
    this.retrieveData();
    this.member.title = 'นาย';
    this.dbPath = mService.dbPath;
  }
  memberList: any;
  searchResults: any[] = [];
  showModal: boolean = false;
  search(event: any) {
    this.searchText = event.target.value;
    this.mService.search(this.searchText).subscribe((data) => {
      this.searchResults = data;
    });
  }
  titleSelectOptions = {
    header: 'คำนำหน้า',
    subHeader: 'กรุณาเลือกเพียงหนึ่งรายการ',
  };
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
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  editData(data: IMember) {
    // this.fullName = data.title + ' ' + data.fName + ' ' + data.lName;
    // this.memberEdit = data;
    // this.setOpen(true);
    // this.mService.updateData(data.id, data);
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
            this.completeToast('ยกเลิกการลบข้อมูลสำเร็จ', 'dark');
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
    color: 'success' | 'primary' | 'tertiary' | 'secondary' | 'dark'
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
  resetMember() {
    // Reset the member object to its initial state
    this.member = new IMember();
  }
  memberDetail(id: any) {
    this.router.navigateByUrl('/member-detail/' + id);
  }
  async openEditModal(data: any) {
    const modal = await this.modal.create({
      component: EditModalComponent,
      componentProps: { data: data },
      presentingElement: document.querySelector('#memberPage') as HTMLElement,
    });
    modal.present();
  }
}
