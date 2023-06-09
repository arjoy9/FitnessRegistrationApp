import { Component, OnInit, ViewChild } from '@angular/core';
// import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { user } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {

  public dataSource!: MatTableDataSource<user>;
  public users!:user[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns:string[] = ['id','firstName','lastName','email','mobile','bmiResult','gender','package','enquiryDate','action']

  constructor(private api:ApiService, 
    private router:Router, 
    private confirm:NgConfirmService,
    private toast:NgToastService){}
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.api.getRegisteredUser().subscribe(result=>{
      this.users=result;
      this.dataSource=new MatTableDataSource(this.users);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id:number){
    // this.router.navigate(['update',id]);
    this.router.navigate(['/update/' + id]);
  }

  viewDetails(id:number){
    this.router.navigate(['/detail/' + id]);
  }

  delete(id:number){
    this.confirm.showConfirm("Are you sure want to delete?",
    ()=>{
      this.api.deleteRegistered(id).subscribe(res=>{
        this.toast.success({detail:"Success",summary:"Enquiry Deleted",duration:5000});
        this.getUser();
      })
    },
    ()=>{

    })
    
  }

}
