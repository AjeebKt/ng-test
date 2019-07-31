import { AutoFocusDirective } from './directives/auto-focus.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import {
  MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatTableModule,
  MatDialogModule, MatSlideToggleModule, MatSelectModule, MatInputModule, MatCheckboxModule,
  MatNativeDateModule, MatDatepickerModule, MatSnackBarModule, MatProgressBarModule,
  MatChipsModule, MatTooltipModule, MatRadioModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { IntlTelInputComponent } from './intl-tel-input/intl-tel-input.component';
import { PhoneNumberDirective } from './directives/phone-number.directive';
import { SpaceRemoverDirective } from './directives/space-remover.directive';
import { ShowErrorsComponent } from './show-errors/show-errors.component';
import { EmailValidatorDirective } from './custom-validator/email-validator';
import { SpecialCharacterRemoverDirective } from './directives/special-character-remover.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { ValidatorTriggerDirective } from './directives/validator-trigger.directive';
import { ButtonSubmitDirective } from './directives/button-submit.directive';
import { FloatNumberDirective } from './directives/float-number.directive';
import { DateInputDisableDirective } from './directives/date-input-disable.directive';
import { FocusOnErrorDirective } from './directives/focus-on-error.directive';

const MAT_MODULES = [
  MatRadioModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatChipsModule,
  Ng2SearchPipeModule,
  MatTooltipModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule

];
const pipes = [FilterPipe];
const components = [ShowErrorsComponent, CustomPaginationComponent,
  IntlTelInputComponent, EmailValidatorDirective];

const directives = [PhoneNumberDirective,
  AutoFocusDirective,
  DateInputDisableDirective, FocusOnErrorDirective,
  FloatNumberDirective,
  ValidatorTriggerDirective,
  ButtonSubmitDirective,
  SpaceRemoverDirective, SpecialCharacterRemoverDirective];

@NgModule({
  imports: [
    CommonModule,
    ...MAT_MODULES
    // NgMultiSelectDropDownModule,
    // AngularCropperjsModule,
  ],
  exports: [
    CommonModule,
    ...MAT_MODULES,
    ...pipes,
    ...components,
    ...directives,
    // NgMultiSelectDropDownModule,
    // AngularCropperjsModule
  ],
  declarations: [
    SharedComponent,
    ...pipes,
    ...components,
    ...directives
  ]
})

export class SharedModule { }
