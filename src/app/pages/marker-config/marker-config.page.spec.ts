import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkerConfigPage } from './marker-config.page';

describe('MarkerConfigPage', () => {
  let component: MarkerConfigPage;
  let fixture: ComponentFixture<MarkerConfigPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
