import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  const heroServiceMock = {
    getHero: (id: number) => {
      switch (id) {
        case 1:
          return of({name: 'Narcos'} as Hero);
        case 2:
          return of({name: 'CiuCiu'} as Hero);
      }
    }
  };

  const setup = () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const paramMapSpy = {
    get: (value: string) => {
      return 1;
    }
  };

  let activatedRouteMock;

  beforeEach(async(() => {
    activatedRouteMock = {
      snapshot: {
        paramMap: paramMapSpy
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        HeroDetailComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: HeroService,
          useValue: heroServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ]
    });
  }));

  beforeEach(() => {
  });

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should have as hero Narcos', async(() => {
    spyOn(paramMapSpy, 'get').and.returnValue(1);
    setup();
    expect(component.hero.name).toEqual('Narcos');
  }));

  it('should have as hero CiuCiu', async(() => {
    spyOn(paramMapSpy, 'get').and.returnValue(2);
    setup();
    expect(component.hero.name).toEqual('CiuCiu');
  }));
});
