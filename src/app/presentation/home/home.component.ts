import { Component, Inject, inject } from '@angular/core';
import { CONTACT_SERVICE, IContactService } from '../../core/services/contact-service';
import { SharedComponentModule } from '../shared/shared-components.module';

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

  async ngOnInit() {
    var list = await this.contactService.getAll();

    console.log(list.items);
    this.products = list.items;
  }
}
