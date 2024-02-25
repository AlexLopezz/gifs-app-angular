import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <div class="">
      <h5 class="text-center">Search:
        <strong *ngIf="tagInput">{{ lastTag |titlecase }}</strong>
      </h5>
    </div>
    <input
      class="text-center form-control"
      placeholder="search your favorite gifs"
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `,
})
export class SearchBoxComponent {
  @ViewChild( 'txtTagInput' )
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){ }

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
  }

  get lastTag():string {
    return this.gifsService.lastTag;
  }
}
