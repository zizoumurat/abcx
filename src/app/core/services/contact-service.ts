import { InjectionToken } from '@angular/core';
import { Contact } from '../models/contact';
import { PaginationResponseModel } from '../models/paginationResponseModel';

export interface IContactService {
  getAll(): Promise<PaginationResponseModel<Contact>>;
}




export const CONTACT_SERVICE = new InjectionToken<IContactService>('ContactService');