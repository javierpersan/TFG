import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { UserTabPage } from './user-tab.page';

describe('UserTabPage', () => {
  let component: UserTabPage;
  let fixture: ComponentFixture<UserTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
