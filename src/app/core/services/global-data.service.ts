import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CurrentUser } from 'src/app/model/current-user';
import { PriceList } from 'src/app/model/priceList';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  currentSubOpConfig: any;
  currentUser: CurrentUser = new CurrentUser();
  currentMenu: string;
  tempId;
  roleStatus: any;
  priceIdToEdit: { id: number, page: number };
  priceToEdit: { data: any };
  responseIdToEdit: { id: number, page: number };
  subOperatorIdToEdit: { id: number, page: number };
  private userIdPatient = new BehaviorSubject(null);
  currentuserIdPatient = this.userIdPatient.asObservable();
  focusChange = new Subject();

  // priceList = new PriceList();
  // priceList = [];

  priceList = [
    { id: 1, operator: 'Operator A', numberPrefix: '268', cost: 1.2 },
    { id: 2, operator: 'Operator B', numberPrefix: '46', cost: 1 },
    { id: 3, operator: 'Operator A', numberPrefix: '4620', cost: 0.9 },
    { id: 4, operator: 'Operator C', numberPrefix: '468', cost: 0.6 },
    { id: 5, operator: 'Operator B', numberPrefix: '4631', cost: 1.2 },
    { id: 6, operator: 'Operator C', numberPrefix: '4673', cost: 1.1 },
    { id: 7, operator: 'Operator A', numberPrefix: '46732', cost: 1.2 },
    { id: 8, operator: 'Operator C', numberPrefix: '44', cost: 1.8 },
    { id: 9, operator: 'Operator B', numberPrefix: '467', cost: 0.8 },
    { id: 10, operator: 'Operator A', numberPrefix: '48', cost: 0.7 },
  ];

  constructor() { }
  reset() {

    this.currentUser = new CurrentUser();
    this.roleStatus = false;
    this.priceList = [];
    this.priceIdToEdit = null;
    this.priceToEdit = null;
  }
  changeId(id: number) {
    this.tempId = id;
    this.userIdPatient.next(id);
  }
}
