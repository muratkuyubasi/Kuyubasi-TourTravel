import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactForm } from 'src/app/models/contactForm';
import { Setting } from 'src/app/models/settings';
import { ContactService } from 'src/app/services/contact.service';
import { SettingService } from 'src/app/services/setting.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  public routes = routes;
  form!: FormGroup;
  gettourModel!: any;
  getsettingsggmailModel!: Setting;
  getsettingsphoneModel!: Setting;
  getsettingsadresModel!: Setting;
  getsettingshoursModel!: Setting;
  getwhatsAppModel!: Setting;
  constructor(private settingService: SettingService, private contactService: ContactService, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.getettingsgphoneList();
    this.getettingsgmailList();
    this.getettingsadresList();
    this.getworkinghoursList();
    this.getwhatsAppList();
    this.createForm();
  }
  getettingsgphoneList() {
    this.settingService.get("site_telefon	").subscribe((data: any) => {
      this.getsettingsphoneModel = data;
    })
  }
  getettingsgmailList() {
    this.settingService.get("eposta").subscribe((data: any) => {
      this.getsettingsggmailModel = data;
    })
  }
  getettingsadresList() {
    this.settingService.get("site_adres	").subscribe((data: any) => {
      this.getsettingsadresModel = data;
    })
  }
  getworkinghoursList() {
    this.settingService.get("calismasaatleri").subscribe((data: any) => {
      this.getsettingshoursModel = data;
    })
  }
  getwhatsAppList() {
    this.settingService.get("whatsapp").subscribe((data: any) => {
      this.getwhatsAppModel = data;
    })
  }
  createForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }
  submitForm() {
    console.log(this.form)
    if (this.form.valid) {
      const contactForm: ContactForm = Object.assign(this.form.value);
      Swal.fire({
        title: 'Talebiniz gönderilsin mi?',
        showDenyButton: true,
        confirmButtonText: 'Evet', confirmButtonColor: "#238dc1",
        denyButtonText: `Hayır`, denyButtonColor: "#b47f00",
      }).then((response) => {
        if (response.isConfirmed) {
          this.contactService.contactSend(contactForm).subscribe((data: any) => {
            if (data) {
              Swal.fire({
                title: 'Başarılı',
                text: 'İletişim talebiniz alınmıştır...',
                icon: 'success', iconColor: "#89dc65",
                confirmButtonText: 'Tamam', confirmButtonColor: "#89dc65",
              }).then(function (result) {
                if (result.value) {
                  window.location.href = '/pages/contact-us';
                }
              })
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: 'İletişim bilgilerini doldurun',
        icon: 'warning', iconColor: "#d4c201",
        confirmButtonText: 'Tamam', confirmButtonColor: "#89dc65",
      })
    }
  }
}