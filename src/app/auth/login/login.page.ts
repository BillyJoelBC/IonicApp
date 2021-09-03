import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../core/services/login.service';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Input() type: string;
  @Input() placeholder: string;

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastController: ToastController,
    private route: Router
  ) {
    this.form = this.fb.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  async validCredential() {
    let toast;
    if (this.loginService.login(this.form.value.username, this.form.value.password)) {
      console.log('credential true');
      toast = await this.toastController.create({
        message: 'Success Login.',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await this.route.navigate(['/folder/Inbox']);
    } else {
      toast = await this.toastController.create({
        message: 'Error Login.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      console.log('credential false');
      this.form.patchValue({password: undefined});
    }

    toast.present();
  }
}
