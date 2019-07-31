import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalDataService } from '../core/services/global-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { rangeLength } from '../custom-validators/range-length';
import { CustomValidators } from '../custom-validators/CustomValidators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  pageTitle: string;
  submitText: string;
  addEditForm: FormGroup;
  isEdit: boolean;
  buttonStatusedit: boolean;
  idCounter: number;
  editId: any;
  sumitted: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private gd: GlobalDataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,

  ) {
    this.addEditForm = this.formBuilder.group({
      prefix: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidators.numberValidation()
        ])
      ],
      cost: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidators.numberValidation()
        ])
      ],
      operator: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }

  ngOnInit() {
    this.gd.priceList ? this.idCounter = this.gd.priceList.length + 1 : this.idCounter = 1;
    const action = this.activatedRoute.snapshot.params.action;
    const isEdit = action === 'edit-prefix';


    this.isEdit = isEdit;
    if (this.isEdit) {
      this.setData(this.gd.priceToEdit.data);
    } else {
      // this.setData();
    }

    this.pageTitle = isEdit ? 'Edit' : 'Add';
    this.submitText = isEdit ? 'Update' : 'Submit';
  }

  get addEditContorls() { return this.addEditForm.controls; }

  onSubmit() {
    if (this.isEdit) {
      this.update();
    } else {
      this.add();
    }
  }

  update() {
    if (this.addEditForm.invalid) {
      this.toastr.error('Invalid Form');
      return;
    }
    const addObject = {
      id: this.editId,
      numberPrefix: this.addEditForm.get('prefix').value,
      cost: this.addEditForm.get('cost').value,
      operator: this.addEditForm.get('operator').value,
    };
    const priceList = this.gd.priceList;
    const index = priceList.findIndex(x => x.id === this.editId);

    priceList[index] = addObject;
  }

  add() {
    if (this.addEditForm.invalid) {
      this.toastr.error('Invalid Form');
      return;
    }
    const pid = this.idCounter;
    const addObject = {
      id: pid,
      numberPrefix: this.addEditForm.get('prefix').value,
      cost: +this.addEditForm.get('cost').value,
      operator: this.addEditForm.get('operator').value,
    };
    console.log(addObject);
    this.router.navigate(['/app/home']);
    this.gd.priceList.push(addObject);
  }

  setData(data) {
    this.addEditForm.patchValue({
      prefix: data.numberPrefix,
      cost: data.cost,
      operator: data.operator
    });
    this.editId = data.id;
  }

  cancelAddUser() {
    this.router.navigate(['/app/home']);
  }

}
