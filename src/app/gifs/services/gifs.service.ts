import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY:string = '6OYzkTs0dCJYE27ujCiHCW0m8C7XRStr';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _lastTagSearched!:string;
  private _gifs:Gif[] = [];
  private _apiURL:string         = 'https://api.giphy.com/v1/gifs'
  private _limitRequest:number   = 12;
  private _tagsHistory: string[] = [];

  constructor(private http:HttpClient ) {
    this.loadFromLocalStorage();
  };

  get lastTag():string {
    return this._lastTagSearched;
  }

  get tagsHistory():string[] {
    return [...this._tagsHistory];
  }

  get gifs():Gif[] {
    return this._gifs;
  }

  private orderTags():void {
    this._tagsHistory = this._tagsHistory.splice(0,10); // Order list at 10 elements!
  }

  private saveToLocalStorage():void {
    localStorage.setItem('tags_history', JSON.stringify(this._tagsHistory));
  }

  private loadFromLocalStorage():void {
    if ( !localStorage.getItem('tags_history') ) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('tags_history')!);

    if( this._tagsHistory.length === 0 ) return;
    this.searchTag(this.tagsHistory[0]);
  }

  private organizeTags(tag:string):void {
    tag = tag.toLocaleLowerCase();

    if(this.tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(tg => tg !== tag);
    }
    this._tagsHistory.unshift(tag.toLowerCase());
    this._lastTagSearched = this._tagsHistory[0];
    this.orderTags();
    this.saveToLocalStorage();
  }

  public delete(tag:string):void {
    this._tagsHistory = this._tagsHistory.filter(tg => tg !== tag);
    this.saveToLocalStorage();
  }

  public deleteAll():void {
    this._tagsHistory = [];
    this.saveToLocalStorage();
  }

  async searchTag(tag:string):Promise<void>{
    if(tag.length === 0) return;

    this.organizeTags(tag);
    const paramsRequest = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('q', tag)
      .set('limit', this._limitRequest);

    this.http
      .get<SearchResponse>(`${this._apiURL}/search`, { params: paramsRequest })
      .subscribe( resp => {
        this._gifs = resp.data;
      })


      // fetch('https://api.giphy.com/v1/gifs/search?api_key=6OYzkTs0dCJYE27ujCiHCW0m8C7XRStr&q=valorant&limit=5')
    //   .then( resp => resp.json())
    //   .then( data => console.log(data));
  }
}
