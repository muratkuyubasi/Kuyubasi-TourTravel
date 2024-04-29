import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactForm } from 'src/app/models/contactForm';
import { ContactService } from 'src/app/services/contact.service';
import { RequestService } from 'src/app/services/request.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})

export class PricingComponent {
  public routes = routes;


  form!: FormGroup;

  gettourModel!:any;






  constructor(private contactService:ContactService,private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.createForm();
  }

 
  

  createForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      // subject: ['', Validators.required],
      message: ['', Validators.required],
      phone:['', Validators.required]
      // confirmContract: ['', Validators.required]
    })
  }

    submitForm() {
    console.log(this.form)
    if (this.form.valid) {
      const contactForm: ContactForm = Object.assign(this.form.value);
      Swal.fire({
        title: 'Talebiniz gönderilsin mi?',
        showDenyButton: true, 
        confirmButtonText: 'Evet',confirmButtonColor:"#238dc1",
        denyButtonText: `Hayır`, denyButtonColor:"#b47f00",
      }).then((response) => {
        if (response.isConfirmed) {
          this.contactService.requestSend(contactForm).subscribe((data: any) => {
            if (data) {
              Swal.fire({
                title: 'Başarılı',
                text: 'Tur talebiniz alınmıştır...',
                icon: 'success',iconColor:"#89dc65",
                confirmButtonText: 'Tamam',  confirmButtonColor:"#89dc65" ,
               }  ).then(function (result) {
                if (result.value) {
                  window.location.href = '/pages/pricing';
                }
               })
            }
            
          }); 
        } 
      } );
    } else {
      Swal.fire({
        title: 'İletişim bilgilerini doldurun',
        icon: 'warning',iconColor:"#d4c201",
        confirmButtonText: 'Tamam', confirmButtonColor:"#89dc65",
       }  )
    }
  }



  

}
