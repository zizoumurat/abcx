import { InjectionToken } from '@angular/core';
import { Contact, PaginationFilterModel } from '../models/contact';
import { PaginationResponseModel } from '../models/paginationResponseModel';

export interface IContactService {
  getAll(filter: PaginationFilterModel): Promise<PaginationResponseModel<Contact>>;
}




export const CONTACT_SERVICE = new InjectionToken<IContactService>('ContactService');