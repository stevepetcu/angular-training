import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.initHeroes();
    this.listenAddedHeroes();
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(removedHero => removedHero !== hero);
    this.heroService.delete(hero).subscribe();
  }

  private listenAddedHeroes() {
    this.heroService.heroAdded$.subscribe(
      hero => {
        this.heroes.push(hero);
      }
    );
  }

  private initHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
