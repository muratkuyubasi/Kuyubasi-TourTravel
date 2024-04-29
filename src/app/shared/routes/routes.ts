export class routes {
  private static Url = '';

  public static get baseUrl(): string {
    return this.Url;
  }
  public static get home(): string {
    return this.baseUrl + '/home';
  }
  public static get listingList(): string {
    return this.baseUrl + '/listings/listing-list';
  }
  public static get listingDetails(): string {
    return this.baseUrl + '/listings/listing-details';
  }
  public static get listingGrid(): string {
    return this.baseUrl + '/listings/listing-grid';
  }
  public static get aboutUs(): string {
    return this.baseUrl + '/pages/about-us';
  }
  public static get register(): string {
    return this.baseUrl + '/authentication/register';
  }
  public static get login(): string {
    return this.baseUrl + '/authentication/login';
  }
  public static get forgotPassword(): string {
    return this.baseUrl + '/authentication/forgot-password';
  }
  public static get resetPassword(): string {
    return this.baseUrl + '/authentication/reset-password';
  }
  public static get bookingPayment(): string {
    return this.baseUrl + '/booking/booking-payment';
  }
  public static get bookingList(): string {
    return this.baseUrl + '/booking/booking-list';
  }
  public static get invoiceDetails(): string {
    return this.baseUrl + '/booking/invoice-details';
  }
  public static get error404(): string {
    return this.baseUrl + '/error/error404';
  }
  public static get error500(): string {
    return this.baseUrl + '/error/error500';
  }
  public static get pricing(): string {
    return this.baseUrl + '/pages/pricing';
  }
  public static get faq(): string {
    return this.baseUrl + '/pages/faq';
  }
  public static get gallery(): string {
    return this.baseUrl + '/pages/gallery';
  }
  public static get ourTeam(): string {
    return this.baseUrl + '/pages/education';
  }
  public static get testimonial(): string {
    return this.baseUrl + '/pages/testimonial';
  }
  public static get termsCondition(): string {
    return this.baseUrl + '/pages/terms-condition';
  }
  public static get privacyPolicy(): string {
    return this.baseUrl + '/pages/privacy-policy';
  }
  public static get maintenance(): string {
    return this.baseUrl + '/pages/maintenance';
  }
  public static get blogList(): string {
    return this.baseUrl + '/blog/blog-list';
  }
  public static get blogGrid(): string {
    return this.baseUrl + '/blog/blog-grid';
  }
  public static get blogDetails(): string {
    return this.baseUrl + '/blog/blog-details';
  }
  public static get contactUs(): string {
    return this.baseUrl + '/pages/contact-us';
  }
  public static get comingSoon(): string {
    return this.baseUrl + '/pages/coming-soon';
  }
}
