import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {ReCaptcha2Component} from 'ngx-captcha';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'; 


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
  constructor( private fb:FormBuilder,private cdr: ChangeDetectorRef, private userService:UserService) { }


  ngOnInit(){
    this.registerForm = this.fb.group({
      nombres:['',Validators.required],
      apellidos:['Muñoz',Validators.required],
      tipo_identificacion:['rut',Validators.required],
      identificacion:['12345',[Validators.required,]],
      correo:['jmunoz@gmail.com',[Validators.required,Validators.email]],
      telefono:['12345678',[Validators.required,Validators.minLength(8)]],
      password:['123456',[Validators.required,Validators.minLength(4)]],
      password2:['123456',[Validators.required,Validators.minLength(4)]],
      terminos:[true,Validators.required],
      recaptcha:['',Validators.required]
  
    },{
      validators: [this.passwordIguales('password','password2')]
    });
  }
 

  crearUsuario(){
    this.formSubmited=true;
    if ( this.registerForm.invalid ) {
      this.reset();
      return ;
      
    }else{
      this.userService.crearUsuario(this.registerForm.value).subscribe(
        (resp)=>{
          console.log(resp);
          
          swal.fire({
            icon: 'success',
            title: 'Felicidades !!',
            text: 'Te has registrado exitosamente',
          });
          this.reset();
          
          
        },(err) =>{
            swal.fire({
              icon: 'error',
              title: 'Error.',
              text: err.error.message,
            });
            this.reset();
        }
        

      );

    }
    
  }
  
  campoNoValido(campo:string):boolean{
    if (this.registerForm.get(campo)?.invalid &&  this.formSubmited) {
      console.log(this.registerForm.get(campo));
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
  /*
  verificarIdentificacion(){
    return (formGroup: FormGroup)=>{
      const tipo = formGroup.controls['tipo_identificacion'];
      const identificacion = formGroup.controls['identificacion'];

      if ( tipo.value === 'rut' ) {
        
        identificacion.setErrors( {error: true } )
      } else {
        identificacion.setErrors( {error: true } )
 
      }
  }
      
  }*/
  
 

}
