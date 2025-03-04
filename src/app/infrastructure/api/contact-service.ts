import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Contact, PaginationFilterModel } from '../../core/models/contact';
import { IContactService } from '../../core/services/contact-service';
import { BASE_URL } from '../../environments/environment';
import { PaginationResponseModel } from '../../core/models/paginationResponseModel';

@Injectable({
    providedIn: 'root',
})
export class ContactService implements IContactService {
    private apiUrl = `${BASE_URL}/contact`;

    constructor(private http: HttpClient) { }

    getAll(filter: PaginationFilterModel): Promise<PaginationResponseModel<Contact>> {
        let params = new HttpParams()
            .set('page', filter.page.toString())
            .set('pageSize', filter.pageSize.toString());

        filter.sortByMultiName.forEach((name, index) => {
            params = params.append(`sortByMultiName[${index}]`, name);
        });

        filter.sortByMultiOrder.forEach((order, index) => {
            params = params.append(`sortByMultiOrder[${index}]`, order.toString());
        });

        return firstValueFrom(
            this.http.get<{ data: PaginationResponseModel<Contact> }>(`${this.apiUrl}/getAll`, { params })
        ).then(response => response.data);
    }

    create(item: Contact): Promise<void> {
        return firstValueFrom(this.http.post<void>(`${this.apiUrl}/create`, item))
    }

    delete(ref: number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/delete/${ref}`));
    }
}
