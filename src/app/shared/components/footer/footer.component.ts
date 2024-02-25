import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  template: `
  <div class="bg-dark d-flex justify-content-center align-items-center fixed-bottom">
    <h5 class="text-light">Developed by Alex Lopez with
      <a class="text-decoration-none"
      href="https://angular.io/">Angular </a>
      <img
      height="20"
      width="20"
      src="assets/angular-icon.svg"
      alt="angular icon">
    </h5>
  </div>
  `,
})
export class FooterComponent { }
