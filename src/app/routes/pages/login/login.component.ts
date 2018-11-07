import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';
//added by me
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


import { SettingsService } from '../../../core/settings/settings.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent implements OnInit {

    valForm: FormGroup;

    returnUrl: string;
    error = '';
    submittedError=false;

    constructor(private http: HttpClient,
        public settings: SettingsService, 
        private fb: FormBuilder,
        // private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private router: Router) {
    }

    ngOnInit() {           
        this.valForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.required]
        });
                // reset login status
                this.authenticationService.logout();

                // get return url from route parameters or default to '/'
                // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {

            this.authenticationService.login(value.email, value.password)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(['elements/buttons']);
                    },
                    error => {
                        this.error = error;
                        this.submittedError=true;
                    });
        }
        else {
            return;
        }

    }
}
