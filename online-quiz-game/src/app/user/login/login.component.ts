import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable,BehaviorSubject } from 'rxjs';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<User>();
  
  @Output()
  formSubmitted = new EventEmitter<User>();
  
  userForm: FormGroup = new FormGroup({});
  users$: Observable<User> = new Observable();
  user?: User;
  UserService: any;
  constructor(private fb: FormBuilder) { }

  get username() { return this.userForm.get('username')!; }
  get password() { return this.userForm.get('password')!; }
  
  ngOnInit() {
    this.initialState.subscribe(user => {
      this.userForm = this.fb.group({
        username: [ user.username, [Validators.required] ],
        password: [ user.password, [ Validators.required, Validators.minLength(5) ] ]
      });
    });
  
    this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
   // this.formSubmitted.emit(this.userForm.value);
    let userName = this.userForm.value.username;
    let password = this.userForm.value.Password;

    this.users$ = this.UserService.getUser(userName);
    this.users$.subscribe(user => {

      this.user = user;

    });

  }
}
