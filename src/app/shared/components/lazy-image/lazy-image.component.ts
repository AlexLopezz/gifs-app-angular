import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  private hasLoaded:boolean = false;

  @Input()
  public url_image!:string;

  @Input()
  public title!:string;


  ngOnInit(): void {
    if(!this.url_image) throw new Error('URL image is required!');
  }

  onLoad():void {
    this.hasLoaded = true;
  }

  get loaded():boolean {
    return this.hasLoaded;
  }
}
