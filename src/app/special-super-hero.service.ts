import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero }                 from './hero';
import { Injectable }           from '@angular/core';

@Injectable()
export class HeroService {

  private heroesUrl = 'http://toolvendor-beecode.rhcloud.com/rest/brand';  // URL to web api

  constructor(private http: Http) { }

  // ----- GET ALL ------
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl, this.jwt())
               .toPromise()
               .then(response => response.json().result as Hero[])
               .catch(this.handleError);
  }

  // ----- GET BY ID ------
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json().result as Hero)
      .catch(this.handleError);
  }

  // ----- UPDATE ------
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), this.jwt())
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  // ----- CREATE ------
  create(brand: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({brand: brand, companyId: 2}), this.jwt())
      .toPromise()
      .then(res => res.json().result)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, this.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);  // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private jwt() {
        // create authorization header with JWT token and Content-Type
        let headers = new Headers({
          'Content-Type': 'application/json',
          'Access-Token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0IiwiaWF0IjoxNDg3MzQyMTg0LCJzdWIiOiIyIiwiaXNzIjoiUm9iZXJ0aCBNZWppYXMifQ.vEwdp54XM77pEPTudM8lx0QXlXyXPk7VFrpg3eDWyAk' });
        return new RequestOptions({ headers: headers });
  }

}
