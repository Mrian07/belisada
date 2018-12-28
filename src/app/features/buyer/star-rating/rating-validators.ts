import { FormControl } from '@angular/forms';

export class RatingValidators {
  static required(control: FormControl) {
    if (!control.value || control.value === 0) {
      return { required: true };
    }

    return null;
  }
}
