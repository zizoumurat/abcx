import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Contact } from '../../core/models/contact';
import { IContactService } from '../../core/services/contact-service';
import { BASE_URL } from '../../environments/environment';
import { PaginationResponseModel } from '../../core/models/paginationResponseModel';

@Injectable({
    providedIn: 'root',
})
export class ContactService implements IContactService {
    private apiUrl = `${BASE_URL}/budgets`;

    constructor(private http: HttpClient) { }

    getAll(): Promise<PaginationResponseModel<Contact>> {
        return firstValueFrom(this.http.get<PaginationResponseModel<Contact>>(`${this.apiUrl}`));
    }
}
