export enum ContactTypeEnum {
  Personal,
  Business,
  Other
}

export interface Contact {
  ref: number;
  contactType: ContactTypeEnum;
  code: string;
  firstName: string;
  lastName: string;
  inchargeRef: string;
  fullAddress: string;
  cityRef: string;
  countryRef: string;
  phone: string;
  mobile: string;
  email: string;
}


export class PaginationFilterModel {
  page: number = 0;
  pageSize: number = 10;
  sortByMultiName: string[] = ['id'];
  sortByMultiOrder: number[] = [0];
}
