import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { user } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public userId!:number;
  public userDetails!:user;
  constructor(private api:ApiService, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.userId = val['id'];
      this.fetchUserDetals(this.userId);
    })
  }

  fetchUserDetals(userId:number){
    this.api.getRegisteredUserId(userId).subscribe(res=>{
      this.userDetails = res;
      console.warn(this.userDetails);
      
    })
  }
}
