import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {ReCaptcha2Component} from 'ngx-captcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;

  public registerForm!:FormGroup ;
  
  public formSubmited = false;
  public siteKey = environment.siteKey;
  constructor( private fb:FormBuilder,private cdr: ChangeDetectorRef) { }


  ngOnInit(){
    this.registerForm = this.fb.group({
      nombre:['Jose Luis',Validators.required],
      username:['jmunoz',Validators.required],
      password:['12345',Validators.required],
      password2:['12345',Validators.required],
      terminos:[true,Validators.required],
      recaptcha:['',Validators.required]
  
    },{
      validators: this.passwordIguales('password','password2')
    });
  }
 

  crearUsuario(){
    this.formSubmited=true;
    console.log(this.registerForm.value);
    console.log(this.registerForm)
    if ( this.registerForm.invalid ) {
      console.log("invalid");
      
      return ;
      
    }else{
      console.log('valid');
      console.log(this.registerForm.value);
       
    } 
    
  }
  
  campoNoValido(campo:string):boolean{
    if (this.registerForm.get(campo)?.invalid &&  this.formSubmited) {
      return true;
    }else{
      return false;
    }
  }
  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  }
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formSubmited ) {
      return true;
    } else {
      return false;
    }

  }


  passwordIguales(pass1:string,pass2:string){
    return (formGroup: FormGroup)=>{
        const pass1Control = formGroup.controls[pass1];
        const pass2Control = formGroup.controls[pass2];

        if ( pass1Control.value === pass2Control.value ) {
          pass2Control.setErrors( null )
        } else {
          pass2Control.setErrors( {noEsIgual: true } )
   
        }
    }
  }
  
  handleError(){
    return !this.registerForm.get('recaptcha')?.value && this.formSubmited;
  }
  reset(): void {
    this.captchaElem.resetCaptcha();
  }
 

}
