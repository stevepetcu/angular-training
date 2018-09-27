import { Component, OnInit } from '@angular/core';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})

export class AddHeroComponent implements OnInit {

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.heroService
      .addHero({name} as Hero)
      .subscribe();
  }
}
