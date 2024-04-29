import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { ReservationPerson } from 'src/app/models/reservation-person';
import { CommentService } from 'src/app/services/comment.service';
import { TourService } from 'src/app/services/tour.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrls: ['./booking-payment.component.css']
})
export class BookingPaymentComponent implements OnInit {
  fileSelected: any[] = [];
  passportFile: any
  setFile: File
  tourDepartureId: any
  tourId: any;
  tourPriceId: any;
  tourDetail!: any;
  tourPrice!: number;
  public routes = routes;
  gettourModel!: any;
  reservationForm!: any
  personCount: any;
  countedPrice: any;
  childPrices: any;
  childCount: any;
  showDiffInvoice!: boolean;
  selectedChildList: any[] = []
  constructor(private tourService: TourService, private router: ActivatedRoute, private formBuilder: FormBuilder, private commentService: CommentService, private route: Router, private fb: FormBuilder,
  ) {
    this.tourId = router.snapshot.params['id'];
    this.tourDepartureId = router.snapshot.params['id'];
    this.tourPriceId = router.snapshot.params['id'];
    const reservationData = JSON.parse(localStorage.getItem("reservationData"));
    this.personCount = reservationData.personCount;
    this.childCount = reservationData.childCount
    this.countedPrice = reservationData.countedPrice;
    this.childPrices = reservationData.childPrices;
    this.tourDepartureId = reservationData.tourDepartureId;
    this.selectedChildList = reservationData.childList
  }
  ngOnInit(): void {
    this.loadTourDetail()
    this.createForm()
  }
  prices(event: any) {
    let data = this.tourDetail.tourPrices.filter((item: any) => item.id == event.value)[0]
    this.countedPrice = Number(this.countedPrice) + Number(data.price)
  }
  loadTourDetail() {
    this.tourService.getid(this.tourId).subscribe(resp => {
      this.tourDetail = resp;
      this.tourPrice = this.tourDetail.ac.filter((item: { languageCode: string; }) => item.languageCode == "tr")[0].price;
    })
  }
  createForm() {
    this.reservationForm = this.fb.group({
      activeTourId: this.tourId,
      ContactFirstName: [''],
      ContactLastName: [''],
      ContactEmail: ['', [Validators.required, Validators.email]],
      ContactPhone: ['', Validators.required],
      ContactAddress: ['', Validators.required],
      ContactPostalCode: ['', Validators.required],
      ContactDoorNumber: ['', Validators.required],
      ContactCity: ['', Validators.required],
      ContactCountry: ['', Validators.required],
      Uyruk: ['', Validators.required],
      InvoiceTitle: [''],
      InvoicePostalCode: [''],
      InvoiceDoorNumber: [''],
      InvoiceAddress: [''],
      InvoiceCity: [''],
      InvoiceCountry: [''],
      TotalAmount: [0],
      ReservationPersons: this.fb.array([this.personForm()]),
      ReservationChilds: (this.childCount > 0 ? this.fb.array([this.personForm()]) : [this.fb.array([this.personForm()])])
    })
    this.addPersonForm();
    this.addChildForm();
  }
  get ReservationPersons(): UntypedFormArray {
    return this.reservationForm.get("ReservationPersons") as UntypedFormArray
  }
  get ReservationChilds(): UntypedFormArray {
    if (this.childCount > 0) {
      this.reservationForm.get("ReservationChilds").patchValue(this.selectedChildList)
      this.selectedChildList.forEach(element => {
      });
    }
    return this.reservationForm.get("ReservationChilds") as UntypedFormArray
  }
  addPersonForm() {
    for (let i = 0; i < this.personCount - 1; i++) {
      this.ReservationPersons.push(this.personForm())
    }
  }
  addChildForm() {
    for (let i = 0; i < this.childCount - 1; i++) {
      this.ReservationChilds.push(this.personForm())
    }
  }
  newFile(): FormGroup {
    return this.fb.group({
      filePath: [],
    })
  }
  personForm() {
    const ep = this.tourDetail?.tourExitPointId;
    return this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Phone: ['', Validators.required],
      BirthDay: ['', Validators.required],
      Gender: ['', [Validators.required]],
      Uyruk: [''],
      studentPath: [''],
      filePath: [''],
      isChildPrice: [true],
      file: [''],
      tourDepartureId: [this.tourDepartureId],
      tourPriceId: ['', Validators.required]
    })
  }
  createBuildObject(): Reservation {
    const reservation: Reservation = {
      activeTourId: this.tourId,
      ContactFirstName: this.reservationForm.get('ContactFirstName').value,
      ContactLastName: this.reservationForm.get('ContactLastName').value,
      ContactEmail: this.reservationForm.get('ContactEmail').value,
      ContactPhone: this.reservationForm.get('ContactPhone').value,
      ContactAddress: this.reservationForm.get('ContactAddress').value,
      ContactPostalCode: this.reservationForm.get('ContactPostalCode').value,
      ContactDoorNumber: this.reservationForm.get('ContactDoorNumber').value,
      ContactCity: this.reservationForm.get('ContactCity').value,
      ContactCountry: this.reservationForm.get('ContactCountry').value,
      InvoiceTitle: this.reservationForm.get('InvoiceTitle').value,
      InvoiceAddress: this.reservationForm.get('InvoiceAddress').value,
      InvoicePostalCode: this.reservationForm.get('InvoicePostalCode').value,
      InvoiceDoorNumber: this.reservationForm.get('InvoiceDoorNumber').value,
      InvoiceCity: this.reservationForm.get('InvoiceCity').value,
      InvoiceCountry: this.reservationForm.get('InvoiceCountry').value,
      Uyruk: this.reservationForm.get('Uyruk').value,
      TotalAmount: this.countedPrice + this.childPrices,
      ReservationPersons: (this.ReservationPersons.value as ReservationPerson[]),
      //ReservationChilds: this.childCount > 0 ? (this.ReservationChilds.value as ReservationPerson[]) : null
    }
    return reservation;
  }
  addReservation() {
    const formData = this.createBuildObject();
    if (this.childCount > 0) {
      formData.ReservationPersons = formData.ReservationPersons.concat(this.ReservationChilds.value)
    }
    if (this.reservationForm.valid) {
      this.tourService.addReservation(formData).subscribe((resp: any) => {
        if (resp.statusCode == 200) {
          Swal.fire({
            title: 'Teşekkür ederiz',
            icon: 'success',
            html: '<p>Başvurunuz alınmıştır. Belirtmiş olduğunuz Mail adresinize bilgileriniz gönderilmiştir.</p>' +
              '<p>Faturanız ve bilgilendirme dosyayı için </p> ' +
              '<a target="_blank" href="https://portal.zsureisen.eu/reservation/ticket_' + resp.data.id + '.pdf" style="color:#088dd3;"> tıklayın </a> ',
            confirmButtonText: 'Tamamz', confirmButtonColor: "#89dc65",
          }).then((result) => {
            if (result.value) {
              window.location.href = '/listings/listing-grid';
            }
          })
        }
      }, () => {
        alert("HATA")
      })
    }
    else {
      this.reservationForm.markAllAsTouched()
    }
  }
  onFileChange(event: any, id: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const mimeType = file.type;
      const formData = new FormData();
      formData.append('folderName', "Passport");
      formData.append('formFile', file);
      this.tourService.fileUpload(formData).subscribe((resp) => {
        let formArr = <FormArray>this.reservationForm.controls['ReservationPersons'];
        formArr.controls[id].patchValue({
          filePath: resp
        });
      })
      for (let i = 0; i < this.ReservationPersons.length; i++) {
      }
    }
  }
}