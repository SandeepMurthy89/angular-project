import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes:any;
  accessToken:any;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {

    this.heroService.getAccessToken()
    .subscribe(res =>{
      if(res.access_token){
        this.heroService.getHeroes(res.access_token)
        .subscribe(res =>{
          this.heroes = res;
          //heroes => this.heroes = heroes);
        })
      }
    })

    // this.heroService.getHeroes(this.accessToken)
    // .subscribe(res =>{
    //   this.heroes = res;
    //   //heroes => this.heroes = heroes);
    // })
  }
}
