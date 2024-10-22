import { AfterContentChecked, OnInit, Component } from '@angular/core';
import '@en-button';
import '@en-data-grid';
import '@en-navigation-menu';
import '@en-text-field';
import '@en-layout-container';
import '@en-toast-group';
import '@en-toast';
import '@en-layout';
import '@en-layout-section';
import '@en-heading';
import '@en-button';
import '@en-link';
import '@en-grid';
import '@en-grid-item';
import '@en-search-form';
import '@en-switch';
import '@en-list';
import '@en-card';
import '@en-list-item';
import '@en-dropdown';
import '@en-button-group';
import '@en-dropdown-panel';
import '@en-icons/attachment';
import '@en-divider';
import '@en-textarea';
import '@en-breadcrumbs';
import '@en-breadcrumbs-item';
import '@en-loading-indicator';
import '@en-components/icon/icons/add-square';
import '@en-components/icon/icons/location-pin';
import '@en-components/icon/icons/close';
import '@en-components/icon/icons/list';
import '@en-menu';
import '@en-menu-item';
import '@en-file-upload';
import '@en-components/icon/icons/document';
import '@en-icons/switch';
import '@en-components/icon/icons/folder-2';
import '@en-components/icon/icons/building';
import '@en-chip';
import '@en-chip-group';
import '@en-icons/image';
import '@en-icons/dots-horizontal';
import '@en-icons/dots-vertical';
import '@en-icons/xc-uztna';
import '@en-icons/sign-out';
import '@en-icons/filter';
import '@en-icons/settings';
import '@en-icons/message';
import '@en-icons/help';
import '@en-icons/tree';
import '@en-dialog';
import '@en-text-passage';
import '@en-badge';
import '@en-datepicker-field';
import '@en-progress';
import '@en-chart';
import '@en-ogma-container';
import '@en-panel';
import '@en-control-button-group';
import '@en-tooltip';
import '@en-mini-map';
import '@en-mini-map-layer';
import '@en-icons/edit';
import '@en-icons/delete';
import '@en-icons/refresh';
import '@en-icons/table';
import '@en-product-logo';
import '@en-icons/reset';
import { Students } from './students.services';

@Component({
  selector: 'demo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked {
  ngAfterContentChecked(): void {}
  isLoggedIn = false;
  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.isLoggedIn = true;
    }
  }
  navigateToLogin(): void {
    window.dispatchEvent(
      new CustomEvent('navigate-to', {
        detail: {
          path: '/login',
        },
      })
    );
  }
  title = 'demo-app';
}
