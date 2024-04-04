import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPagePage } from './edit-page.page';

describe('EditPagePage', () => {
  let component: EditPagePage;
  let fixture: ComponentFixture<EditPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
