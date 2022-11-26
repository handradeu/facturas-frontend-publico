import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BillService } from './bill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'facturas-frontend';
  public bills : any[] = [];
  public currentBillId = 0;

  contactForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(''),
    dueDate: new FormControl(new Date())
  });

  constructor(private _billService: BillService){
    this.readBills();
  }

  public createBill(){
    this._billService.createBill(
      this.contactForm.controls.name.value ?? '',
      this.contactForm.controls.description.value ?? '',
      this.contactForm.controls.amount.value ? Number(this.contactForm.controls.amount.value) : 0,
      this.contactForm.controls.dueDate.value ? new Date(this.contactForm.controls.dueDate.value) : new Date()
    ).subscribe(
      response => { 
        debugger; 
        if(response){ 
          this.contactForm.patchValue({ id: '', name: '', description: '', amount: '', dueDate: new Date()});  
          alert("Factura guardada exitosamente") 
        } 
        this.readBills();
      }
    )
  }

  public readBills(){
    this._billService.readBills().subscribe(
      response => {
        if(response){
          debugger;
          this.bills = response;
        }
      }
    )
  }

  public updateBill(){
    this._billService.updateBill(
      this.contactForm.controls.id.value ? Number(this.contactForm.controls.id.value) : 0,
      this.contactForm.controls.name.value ?? '',
      this.contactForm.controls.description.value ?? '',
      this.contactForm.controls.amount.value ? Number(this.contactForm.controls.amount.value) : 0,
      this.contactForm.controls.dueDate.value ? new Date(this.contactForm.controls.dueDate.value) : new Date()
    ).subscribe(
      response => { 
        debugger; 
        if(response){ 
          this.contactForm.patchValue({ id: '', name: '', description: '', amount: '', dueDate: new Date()});  
          alert("Factura actualizada exitosamente") 
        } 
        this.readBills();
      }
    )
  }

  public deleteBill(){
    this._billService.deleteBill(this.currentBillId).subscribe(response => { 
      debugger; 
      if(response){ 
        this.contactForm.patchValue({ id: '', name: '', description: '', amount: '', dueDate: new Date()});  
        alert("Factura eliminada exitosamente") 
      } 
      this.readBills();
    })
  }

  public setCurrentBillId(id: number){
    this.currentBillId = id;

    let currentBill = this.bills.filter(x => x.id === this.currentBillId);

    if(currentBill[0]){
      this.contactForm.patchValue(
        { 
          id: currentBill[0].id, 
          name: currentBill[0].name,
          description: currentBill[0].description, 
          amount: currentBill[0].amount, 
          dueDate: new Date()});
    }
  }
}
