import { Component, Inject, inject } from '@angular/core';
import { CONTACT_SERVICE, IContactService } from '../../core/services/contact-service';
import { SharedComponentModule } from '../shared/shared-components.module';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Contact, PaginationFilterModel } from '../../core/models/contact';
import { PaginationResponseModel } from '../../core/models/paginationResponseModel';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedComponentModule
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private contactService = inject<IContactService>(CONTACT_SERVICE);

  products: any[] = [];


  contacts: Contact[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  selectedContact: Contact | null = null;
  displayDialog: boolean = false;

  lastLazyLoadEvent: LazyLoadEvent | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  protected async loadData(event?: LazyLoadEvent) {
    this.loading = true;
    this.lastLazyLoadEvent = event;
    const paginationFilter = new PaginationFilterModel();

    if (event) {
      paginationFilter.page = event.first ?? 1;
      paginationFilter.pageSize = event.rows || 10;

      paginationFilter.sortByMultiName = event.sortField ? [event.sortField] : ['ref'];
      paginationFilter.sortByMultiOrder = event.sortOrder !== undefined ? [event.sortOrder] : [0];
    }

    console.log(paginationFilter)

    try {
      const result = await this.contactService.getAll(paginationFilter);
      this.totalRecords = result.count;
      this.contacts = result.items;
    } catch (error) {
      console.error("Veri yüklenirken hata oluştu:", error);
    }

    this.loading = false;
  }

  editContact(contact: Contact) {
    this.selectedContact = { ...contact };
    this.displayDialog = true;
  }

  deleteContact(contactId: number) {
    if (confirm('Bu kişiyi silmek istediğinize emin misiniz?')) {

    }
  }
}
