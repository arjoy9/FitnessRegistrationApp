import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb:FormBuilder){}

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
  }

  submit(){
    console.warn(this.registrationForm.value);
    
  }
  calculateBmi(heightValue:number){

  }
}
