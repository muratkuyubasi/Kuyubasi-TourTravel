import { ResourceParameter } from "./resource-parameter";

export class TourResource extends ResourceParameter {
  static tourName(tourName: any) {
    throw new Error('Method not implemented.');
  }
  TourName: string = '';
  SearchTerm: string = '';
  title: string = '';
  Description: string = '';
  StartDate: string = '';
  EndDate: string = '';
  CategoryName: string = '';
  RegionName: string = '';
  RegionId: string = '';
  PeriodName: string = '';
  DepartureName: string = '';
  PeriodId: string = '';
  ExitPointName: string = '';
  TransportaionName: string = '';
  MinPrice: string = '';
  MaxPrice: string = '';
  LanguageCode: string = '';
  tourMedias: any;
}