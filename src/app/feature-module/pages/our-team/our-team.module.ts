import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurTeamRoutingModule } from './our-team-routing.module';
import { OurTeamComponent } from './our-team.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    OurTeamComponent
  ],
  imports: [
    CommonModule,
    OurTeamRoutingModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class OurTeamModule { }
