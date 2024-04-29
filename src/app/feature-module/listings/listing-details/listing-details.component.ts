import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TourClick } from 'src/app/models/click';
import { CommentForm } from 'src/app/models/commentForm';
import { CommentService } from 'src/app/services/comment.service';
import { TourService } from 'src/app/services/tour.service';
import { routes } from 'src/app/shared/routes/routes';
import { DataService } from 'src/app/shared/services/data/data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { min } from 'rxjs';


@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  public routes = routes;
  public listingDetails: Array<any> = [];
  public thumbnails: Array<any> = [];
  public interestedCars: Array<any> = [];
  guestCount: any;
  adultCount: any = 1;
  adultPrice: any = 0;
  gettourModel!: any;
  tourSpecInclude!: any;
  tourSpecNotInclude!: any;
  tourPrice: any;
  countedPrice: number = 0;
  price: any;
  onePersonPrice: any;
  tourClickModel: TourClick | undefined
  tourDepartureId: any;
  tourPriceId: any;
  path = environment.serverUrl;
  tourId: any;
  getcommentlistModel!: any;
  getyourModel: any;
  activeTourId!: any;
  form!: FormGroup;
  personCount = 1;
  childPrices: any = 0;
  showChildPrice: boolean = false;
  public childCount: number = 0;
  counterForm: UntypedFormGroup;
  personCounter: 5
  DateTime: Date = new Date();
  child1: any = 0;
  child2: any = 0;
  child3: any = 0;
  custom: number = 1
  allTourChildPriceses: any[] = []
  constructor(private data: DataService, private tourService: TourService, private router: ActivatedRoute, private formBuilder: FormBuilder, private commentService: CommentService, private route: Router, private fb: UntypedFormBuilder) {
    this.listingDetails = this.data.listingDetails;
    this.thumbnails = this.data.thumbnails;
    this.interestedCars = this.data.interestedCars;
    this.activeTourId = router.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.router.params.subscribe(x => {
      this.gettourlist(x['id']);
      this.getcommentList(x['id']);
      this.commentForm();
      this.getyourist();
    })
    this.createCounterForm()
  }
  gettourlist(id: any) {
    this.tourService.getid(id).subscribe((data: any) => {
      this.gettourModel = data;
      this.tourSpecInclude = data.tourSpecifications.filter((x: { inPrice: any; }) => x.inPrice)
      this.tourSpecNotInclude = data.tourSpecifications.filter((x: { inPrice: any; }) => !x.inPrice)
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      // apiLoaded = true;
      this.gettourModel.finishDate = new Date(this.gettourModel.finishDate)
      this.onePersonPrice = this.gettourModel.tourPrices[0].extraPrice
      this.tourPrice = this.gettourModel.tourPrices[0].price;
      this.countedPrice = this.gettourModel.tourPrices[0].price * this.adultCount;
      this.tourDepartureId = this.gettourModel.tourDepartures.find((x: { isMain: boolean; }) => x.isMain == true)?.id
      this.tourPriceId = this.gettourModel.tourPrices.find((x: { isMain: boolean; }) => x.isMain == true)?.id
    })
    // this.tourService.getIPAddress().subscribe((clickdata: any) => {
    //   // console.log("Click deneme", clickdata.ip)
    //   this.tourClickModel = new TourClick
    //   this.tourClickModel.activeTourId = this.gettourModel.id
    //   this.tourClickModel.ipAddress = clickdata.ip
    //   this.tourService.postclick(this.tourClickModel).subscribe((dataclick: any) => {
    //     // console.log("Click deneme 2", dataclick)
    //   })
    // })

  }
  setReservation() {
    const reservationData = {
      personCount: this.counterForm.get('parentCounter').value,
      childCount: this.counterForm.get('childCounter').value,
      countedPrice: this.countedPrice,
      isChild: this.showChildPrice,
      ChildPrice: this.tourPrice,
      childPrices: this.childPrices,
      tourDepartureId: this.tourDepartureId,
      tourPriceId: this.tourPriceId,
      childList: this.counterForm.get('childPriceList').value
    }
    // console.log("Kişi bilgileri", reservationData)
    localStorage.setItem("reservationData", JSON.stringify(reservationData))
    this.route.navigate([routes.bookingPayment, this.router.snapshot.paramMap.get('id')])
  }

  getyourist() {
    this.tourService.getList().subscribe((dataa: any) => {
      this.getyourModel = dataa;
    })
  }
  getcommentList(id: any) {
    this.commentService.getid(id).subscribe((data: any) => {
      this.getcommentlistModel = data.filter((x: { isActive: any; }) => x.isActive);
    })
  }
  commentForm() {
    this.form = this.formBuilder.group({
      activeTourId: this.activeTourId,
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      comment: ['', Validators.required],
      point: ['',]
    })
  }
  submitForm() {
    if (this.form.valid) {
      const commentForm: CommentForm = Object.assign(this.form.value);
      console.log(commentForm)
      Swal.fire({
        title: 'Talebiniz gönderilsin mi?',
        showDenyButton: true,
        confirmButtonText: 'Evet', confirmButtonColor: "#238dc1",
        denyButtonText: `Hayır`, denyButtonColor: "#b47f00",
      }).then((response) => {
        if (response.isConfirmed) {
          this.commentService.commentSend(commentForm).subscribe((data: any) => {
            if (data) {
              Swal.fire({
                title: 'Başarılı',
                text: 'Yorumunuz gönderilmiştir...',
                icon: 'success', iconColor: "#89dc65",
                confirmButtonText: 'Tamam', confirmButtonColor: "#89dc65",
              }).then((result) => {
                if (result.value) {
                  // window.location.href = '/listing-details/'+this.activeTourId;
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
  detail(id: any) {
    if (this.gettourModel.quota > 0) {
      this.route.navigate([routes.bookingPayment, id])
    }
  }
  get childPriceList(): UntypedFormArray {
    return this.counterForm.get("childPriceList") as UntypedFormArray
  }
  createCounterForm() {
    // this.childCount > 0 ?this.fb.array([this.personForm()]):[this.fb.array([this.personForm()])]
    this.counterForm = this.fb.group({
      parentCounter: [1, [Validators.min(1), Validators.max(5)]],
      childCounter: [0, [Validators.max(5)]],
      childPriceList: this.fb.array([])
    })
  }
  addChildPriceList(): UntypedFormGroup {
    return this.fb.group({
      tourPriceId: [],
      selectedPriceId: []
    })
  }
  calcTotalPrice(e: any = null, c: number) {
    let parentCount = this.counterForm.get('parentCounter').value;
    let childCount = this.counterForm.get('childCounter').value;


    if (childCount > 0 && c == 1) {
      if (this.childCount < childCount) {
        this.childPriceList.push(this.addChildPriceList())
      }
      else {
        // console.log(this.counterForm.get('childPriceList'))
        let t = this.childPriceList.removeAt(childCount)

        // console.log(t)

      }
      this.childCount = childCount
      this.allTourChildPriceses = this.gettourModel.tourPrices.filter((item: any) => item.isChildPrice)
    }


    if (c == 0) {
      this.countedPrice = parentCount * this.tourPrice
    }

    if (c == 2) {

      let price = this.allTourChildPriceses.filter((item: any) => item.id == e.target.value)[0].price


      this.countedPrice = this.countedPrice + Number(price)
    }


  }
  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav-thumbnails',
    nav: true
  };
  public slideConfig2 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.detail-bigimg',
    dots: false,
    arrows: false,
    centerMode: false,
    focusOnSelect: true,
    nav: true
  };
  interestedCarsOptions: OwlOptions = {
    margin: 24,
    nav: true,
    loop: true,
    dots: false,
    smartSpeed: 2000,
    navText: [
      "<i class='fa-solid fa-arrow-left'></i>",
      "<i class='fa-solid fa-arrow-right'></i>",
    ],
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
  };
}
