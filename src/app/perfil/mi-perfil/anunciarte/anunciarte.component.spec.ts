import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciarteComponent } from './anunciarte.component';

describe('AnunciarteComponent', () => {
  let component: AnunciarteComponent;
  let fixture: ComponentFixture<AnunciarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnunciarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnunciarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
