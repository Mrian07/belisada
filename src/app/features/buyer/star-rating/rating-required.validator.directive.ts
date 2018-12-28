import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS } from '@angular/forms';

import { RatingValidators } from './rating-validators';

@Directive({
  selector: 'rating-input[required]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => RatingRequiredValidator), multi: true }
  ]
})
export class RatingRequiredValidator implements Validator {
  validate = RatingValidators.required;
}
