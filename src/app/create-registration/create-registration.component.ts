import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {

  public packages = ["Monthly", "Quarterly", "Yearly"];
  public genders = ["Male", "Female"];
  public importantList:string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Suger craving Body",
    "Fitness"
  ];

  public registrationForm!: FormGroup;
  public userIdToUpdate!:number;
  public isUpdateActive:boolean =false;

  constructor(private fb:FormBuilder,
    private activetedRoute:ActivatedRoute ,
    private router:Router,
    private api:ApiService, 
    private toast:NgToastService){}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      weight:[''],
      height:[''],
      bmi:[''],
      bmiResult:[''],
      gender:[''],
      requireTrainer:[''],
      package:[''],
      important:[''],
      haveGymBefore:[''],
      enquiryDate:['']

    });
    this.registrationForm.controls['height'].valueChanges.subscribe((res)=>{
      this.calculateBmi(res);
    });

    // for get update value in form by activeted Router
    this.activetedRoute.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate)
      .subscribe(res=>{
        // console.warn(res);
         this.isUpdateActive=true;
        this.fillFormToUpdate(res);
      });
    })
  }

  submit(){
    // console.warn(this.registrationForm.value);
    this.api.postRegistration(this.registrationForm.value)
    .subscribe(res=>{
      this.toast.success({detail:"Success",summary:"Enquiry Added",duration:5000})
      this.registrationForm.reset();
    })   
  }

  update(){
    this.api.updateRegisteredUser(this.registrationForm.value, this.userIdToUpdate)
    .subscribe(res=>{
      this.toast.success({detail:"Success",summary:"Enquiry Updated ",duration:5000});
      this.registrationForm.reset();
      this.router.navigate(['list']);
    })
  }

  calculateBmi(heightValue:number){
    const weight = this.registrationForm.value.weight;
    const height = heightValue;
    const bmi = weight/ (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue("Underweight");
        break;
        case (bmi >= 18.5 && bmi < 25):
        this.registrationForm.controls['bmiResult'].patchValue("Normalweight");
        break;
        case (bmi >= 25 && bmi < 30):
        this.registrationForm.controls['bmiResult'].patchValue("Overweight");
        break;
      default:
        this.registrationForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

  fillFormToUpdate(user: user){
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    });
  }
}
