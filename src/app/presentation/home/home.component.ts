import { Component, Inject, inject } from '@angular/core';
import { CONTACT_SERVICE, IContactService } from '../../core/services/contact-service';
import { SharedComponentModule } from '../shared/shared-components.module';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Contact, PaginationFilterModel } from '../../core/models/contact';
import { PaginationResponseModel } from '../../core/models/paginationResponseModel';
import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  displayModal: boolean = false;

  lastLazyLoadEvent: LazyLoadEvent | undefined;

  contactForm!: FormGroup;

  contactTypes = [
    { name: "Aday Müşteri", value: 1 },
    { name: "Tedarikçi", value: 2 },
    { name: "Nakliyeci", value: 3 },
    { name: "Fırsat", value: 4 },
    { name: "Personel", value: 5 },
    { name: "Diğer", value: 9 }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      contactType: [null, Validators.required] ,
      cityRef: [142],    
      countryRef: [101]  
    });
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

  openModal() {
    this.displayModal = true;
  }

  deleteContact(contactId: number) {
    this.contactService.delete(contactId).then(() => {
      this.loadData(this.lastLazyLoadEvent);
    });
  }

  saveContact() {
    if (this.contactForm.valid) {

      this.contactService.create(this.contactForm.value);
      //this.displayModal = false;
      //this.contactForm.reset();
    } else {
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control?.invalid && control?.touched ? true : false;
  }
}
