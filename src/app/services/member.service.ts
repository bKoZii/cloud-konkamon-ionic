import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { IMember } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  dbPath = 'members';

  memberRef: AngularFirestoreCollection<IMember>;
  constructor(private db: AngularFirestore) {
    this.memberRef = db.collection(this.dbPath);
  }

  submitData(data: IMember): any {
    // console.log(data);
    return this.memberRef.add({ ...data });
  }

  retrieveData(): AngularFirestoreCollection<IMember> {
    return this.memberRef;
  }
  updateData(id: string, data: any): Promise<void> {
    return this.memberRef.doc(id).update(data);
  }

  deleteData(id: any): Promise<void> {
    return this.memberRef.doc(id).delete();
  }
  search(query: string) {
    return this.db
      .collection('members', (ref) => ref.where('searchField', '==', query))
      .valueChanges();
  }
}
