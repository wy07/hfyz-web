import { Component } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AuthService }      from './auth.service';
@Component({
	selector: 'noright',
	templateUrl: 'noright.component.html'
})

export class NoRightComponent  {
    title=''
}