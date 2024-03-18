import { Component } from '@angular/core';
import { MemberService } from '../services/member.service';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IMember } from 'src/app/models/member.model';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.page.html',
  styleUrls: ['./member-detail.page.scss'],
})
export class MemberDetailPage {
  id: any;
  member: IMember = new IMember();

  constructor(private mService: MemberService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getMember();
  }

  getMember() {
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
        const member_filter = data.filter((filter) => filter.id == this.id);
        this.member = member_filter[0];
      });
  }
}
