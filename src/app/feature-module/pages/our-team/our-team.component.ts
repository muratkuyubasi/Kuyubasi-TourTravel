import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationForm } from 'src/app/models/educationForm';
import { EducationService } from 'src/app/services/education.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent {
  public routes = routes;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;


  forms!: FormGroup
  stateModel!: any;
  mosqueModel!: any;
  stateId: any;
  pasaportPath!: string;
  identificationPath!: string;
  receiptPath!: string;
  showDiffInvoice!: boolean;
  showDiffInvoice1!: boolean;
  showDiffInvoice2!: boolean;
  showDiffInvoice3!: boolean;
  showDiffInvoice4!: boolean;
  showDiffInvoice5!: boolean;


  showDiffInv: any;
  showDiffInv1: any;


  constructor(private _formBuilder: FormBuilder, private educaitonService: EducationService) { }

  ngOnInit(): void {
    this.toİnform();
    this.stateList();
    // this.mosqueList();
    this.educationForm();

  }
  educationForm() {
    this.forms = this._formBuilder.group({
      personType: [''],
      gender: ['1'],
      nationality: [''],
      stateId: [''],
      mosqueId: [''],
      airport: [''],
      isPrice: [''],
      studentNameSurname: ['', Validators.required],
      studentbirthdate: ['', Validators.required],
      studentGender: ['', Validators.required],
      studentPassportNumber: [''],
      studentIdentificationNumber: ['', Validators.required],
      studentAddress: ['', Validators.required],
      studentMobilePhoneNumberGermany: ['', Validators.required],
      studentMobilePhoneNumberTurkey: [''],
      transferFullName: [''],
      tranferDate: [''],
      transferTransactionNumber: ['',],
      studentFatherNameSurname: [''],
      studentFatherPhone: [''],
      studentMotherNameSurname: [''],
      studentMotherPhone: [''],
      mosqueReligiousOfficialFullName: [''],
      mosqueReligiousOfficialPhone: [''],
      firstCtrl: [''],
      secondCtrl: [''],
      pasaportPath: [this.pasaportPath],
      identificationPath: [this.identificationPath, Validators.required],
      receiptPath: [this.receiptPath, Validators.required],
      thePersonWhoRecorded: [''],
      studentMail: ['', Validators.required]
    })
  }

  submitForm() {
    console.log("Başlıyoruz", this.forms)
    if (this.forms.valid) {
      // this.forms.value.identificationPath = this.identificationPath;
      // this.forms.value.pasaportPath = this.pasaportPath;
      const educationForm: EducationForm = Object.assign(this.forms.value);

      Swal.fire({
        title: 'Formunuz gönderilsin mi?',
        showDenyButton: true,
        confirmButtonText: 'Evet', confirmButtonColor: "#FF2D20",
        denyButtonText: `Hayır`, denyButtonColor: "#b47f00",
      }).then((response) => {
        if (response.isConfirmed) {
          this.educaitonService.educationSend(educationForm).subscribe((data: any) => {
            console.log("Ok", data)
            if (data) {
              Swal.fire({
                title: 'Başarılı',
                text: 'Değeler eğitimi talebiniz alınmıştır...',
                icon: 'success', iconColor: "#89dc65",
                confirmButtonText: 'Tamam', confirmButtonColor: "#89dc65",
              }).then(function (result) {
                if (result.value) {
                  window.location.href = '/pages/education';
                }
              })
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Form bilgilerini doldurun',
        icon: 'warning', iconColor: "#d4c201",
        confirmButtonText: 'Tamam', confirmButtonColor: "#89dc65",
      })
    }
  }

  stateList() {
    this.educaitonService.stateList().subscribe((data: any[]) => {
      this.stateModel = data;
      // console.log("State",this.stateModel)
    })
  }


  metot(e: any) {

    // console.log("GELENE",e)
    // console.log(JSON.stringify(e.value))
    this.showDiffInvoice2 = true
    // this.forms.patchValue({"mosqueId":e.value.id})
  }

  approval() {
    Swal.fire({
      title: "<strong>ONAY METNİ</u></strong>",
      icon: "info", iconColor: "#D7292E",
      html: `“Almanya’da resmi olarak öğrenciyim,
      DITIB Camiilerinde ders görüyorum/gençlik faaliyetlerine katılıyorum.
      Söz konusu eğitim programı için  (uçak bileti vb.) benim adıma DİTİB zekat fonundan ödeme yapılmasını kabul ediyorum.”
      (Öğrenci değilseniz veya bu ödemeyi kabul etmiyorsanız bilet masrafını kendiniz karşılayarak programa katılabilirsiniz. Bunun için lütfen kayıt işlemine devam ediniz.)`,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Devam
      `, confirmButtonColor: "#D7292E",
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
      <i class="fa fa-thumbs-down"></i> Hayır
      `,
      cancelButtonAriaLabel: "Thumbs down"
    });
  }
  // mosqueList() {
  //   this.educaitonService.mosqueList().subscribe((data: any[]) => {
  //     this.mosqueModel = data;
  //     console.log("Mosque",this.mosqueModel)
  //   })
  // }
  mosqueByStateIdList(e: any) {
    this.stateId = e;
    this.showDiffInvoice1 = true;
    this.educaitonService.mosqueByStateIdlist(this.stateId).subscribe((data: any[]) => {
      this.mosqueModel = data;
      // console.log("Mosque",this.mosqueModel)
    })
  }


  changeStatus(e: any) {

    if (e.value == 4) {
      this.showDiffInv = 2
    }
    else {
      this.showDiffInv = 1
    }

    // this.showDiffInv = e.value
    // console.log("sadada")
    // console.log(e.value)
  }
  changeStatus1(e: any) {
    this.showDiffInv1 = e.value
    // console.log("sadada")
    // console.log(e.value)
  }

  toİnform(){
    Swal.fire({
      title: "Değerler Eğitimi Programı (25 Temmuz-6 Ağustos 2024)",
      text: "(Son kayıt tarihi: 25 Mayıs 2024)",
      icon: "warning",
      confirmButtonText: 'Tamam', confirmButtonColor: "#89dc65",

    });
  }

  onFileChange(event: any, id: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const mimeType = file.type;
      const formData = new FormData();
      formData.append('folderName', "NewPassport");
      formData.append('formFile', file);
      this.educaitonService.fileUpload(formData).subscribe((resp) => {
        // let formArr = <FormArray>this.reservationForm.controls['ReservationPersons'];
        // formArr.controls[id].patchValue({
        // filePath: resp
        // });
        if (id == 1) {
          this.forms.patchValue({
            pasaportPath: resp
          })
          // this.pasaportPath = resp;
          // alert(this.pasaportPath)
        }
        if (id == 2) {
          this.forms.patchValue({
            identificationPath: resp
          })

        }
        if (id == 3) {
          this.forms.patchValue({
            receiptPath: resp
          })

        }
      })
    }
  }
}
