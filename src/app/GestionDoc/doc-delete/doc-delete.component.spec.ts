import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDeleteComponent } from './doc-delete.component';

describe('DocDeleteComponent', () => {
  let component: DocDeleteComponent;
  let fixture: ComponentFixture<DocDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
