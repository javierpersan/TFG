import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ChatTabPage } from './chat-tab.page';

describe('ChatTabPage', () => {
  let component: ChatTabPage;
  let fixture: ComponentFixture<ChatTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
