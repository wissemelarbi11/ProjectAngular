import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';

@Component({
  selector: 'app-ajoutemployee',
  templateUrl: './ajoutemployee.component.html',
  styleUrls: ['./ajoutemployee.component.css']
})
export class AjoutemployeeComponent implements OnInit,AfterViewInit{
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;
  title="Ajouter employé"
  employeeForm: FormGroup;
  employees!: Employee[];
  employeesToDisplay!: Employee[];
  constructor(private fb:FormBuilder, private employeeService: EmployeeserviceService){
    this.employeeForm = fb.group({});
    this.employees=[];
    this.employeesToDisplay = this.employees;
  }
  ngOnInit(): void {
    this.employeeForm= this.fb.group({
      Nom: this.fb.control(''),
      Prenom: this.fb.control(''),
      genre:this.fb.control(''),
      email:this.fb.control(''),
      role:this.fb.control(''),
      birthdate: this.fb.control('')
      
    });
    this.employeeService.getEmployees().subscribe(res=> {
    for (let emp of res){
      this.employees.unshift(emp);
    } 
    this.employeesToDisplay = this.employees;  
   });
  }
  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }
  searchEmployees(event:any){
    let filteredEmployees: Employee[] = [];
    if (event === '') {
      this.employeesToDisplay = this.employees;
    } else {
      filteredEmployees = this.employees.filter((val, index) => {
        let targetKey = val.Nom.toLowerCase() + '' + val.Prenom.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.employeesToDisplay = filteredEmployees;
    }
  }
  clearForm(){
    this.Nom.setValue('');
    this.Prenom.setValue('');
    this.email.setValue('');
    this.genre.setValue('');
    this.birthdate.setValue('');
    this.fileInput.natuveElement.value='';
  }
  removeEmployee(event:any){
    this.employees.forEach((val, index) => {
      if (val.id === parseInt(event)){
        this.employeeService.deleteEmployee(event).subscribe((res) =>{
          this.employees.splice(index,1);
        });
      }
    });
  }
  setForm(emp:Employee){
    this.Nom.setValue(emp.Nom);
    this.Prenom.setValue(emp.Prenom);
    this.birthdate.setValue(emp.birthdate);
    this.genre.setValue(emp.genre);
    this.fileInput.nativeElement.value = '';
  }
  editEmployee(event:any){
    this.employees.forEach((val,ind) =>{
      if(val.id === event){
        this.setForm(val);
      }
    });
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }
  public get Nom():FormControl{
    return this.employeeForm.get('Nom') as FormControl;
  }
  public get Prenom():FormControl{
    return this.employeeForm.get('Prenom') as FormControl;
  }
  public get genre():FormControl{
    return this.employeeForm.get('genre') as FormControl;
  }
  public get email():FormControl{
    return this.employeeForm.get('email') as FormControl;
  }
  public get role():FormControl{
    return this.employeeForm.get('role') as FormControl;
  }
  public get birthdate(): FormControl{
    return this.employeeForm.get('birthdate') as FormControl;
  }
  addEmployee(){
    let employee:Employee = {
      Nom: this.Nom.value,
      birthdate: this.birthdate.value,
      Prenom: this.Prenom.value,
      genre: this.genre.value,
      email: this.email.value,
      role: this.role.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    }
    this.employeeService.postEmployee(employee).subscribe((res)=>{
      this.employees.unshift(res);
      this.clearForm();
    })
  }
}
