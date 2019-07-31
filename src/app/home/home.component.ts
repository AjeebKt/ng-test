import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { GlobalDataService } from '../core/services/global-data.service';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ConfirmModalService } from '../core/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filteredData: any;
  filterPipeInstance = new FilterPipe();
  listFilter: any;
  priceList: any = [];

  constructor(
    private renderer: Renderer2,
    private gd: GlobalDataService,
    private router: Router,
    private hs: HomeService,
    private confirmDialogService: ConfirmModalService,
  ) {
    this.priceList = this.gd.priceList;
  }



  ngOnInit() {
    this.renderer.addClass(document.body, 'no-scroll');
    this.filteredData = this.priceList = this.gd.priceList;
  }

  onSearchValueChange(value) {
    this.filteredData = this.filterPipeInstance.transform(this.priceList, value, ['numberPrefix']);
  }

  getInit() {
    this.hs.getPriceList().subscribe(res => {
      this.gd.priceList = res;
      this.filteredData = this.priceList = this.gd.priceList;
    });
  }

  clearSearchInput() {
    if (this.listFilter) {
      this.listFilter = '';
      this.onSearchValueChange(this.listFilter);
    }
  }

  add() {
    this.router.navigate(['app/prefix/add-prefix']);
  }

  edit(item) {
    this.gd.priceToEdit = { data: item };
    this.router.navigate(['app/prefix/edit-prefix']);
  }

  delete(item) {
    const blockMessage = `Are you sure you want to Delete ${item.numberPrefix} ?`;
    const dialogOptions = {
      title: 'Confirm Dialog',
      message: blockMessage
    };
    this.confirmDialogService.openDialogModal(dialogOptions)
      .subscribe(res => {
        if (res) {
          this.gd.priceList = this.gd.priceList.filter(x => x.id !== item.id);
          this.filteredData = this.gd.priceList;
        }
      });
    return {};
  }

}
