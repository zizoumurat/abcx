import { InjectionToken } from '@angular/core';
import { Contact, PaginationFilterModel } from '../models/contact';
import { PaginationResponseModel } from '../models/paginationResponseModel';

export interface IContactService {
  getAll(filter: PaginationFilterModel): Promise<PaginationResponseModel<Contact>>;
  create(item: Contact): Promise<void>;
  delete(ref: number): Promise<void>;
}




export const CONTACT_SERVICE = new InjectionToken<IContactService>('ContactService');