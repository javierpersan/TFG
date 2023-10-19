import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PetTabPage } from './pet-tab.page';

describe('PetTabPage', () => {
  let component: PetTabPage;
  let fixture: ComponentFixture<PetTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PetTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
