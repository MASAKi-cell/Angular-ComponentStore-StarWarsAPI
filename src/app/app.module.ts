import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PersonComponent } from 'src/app/component/person/person.component';
import { personListComponent } from 'src/app/component/person-list/person-list.component';
import { EditPersonComponent } from 'src/app/component/person-edit/person-edit.compoent';
import { EditDisplayComponent } from 'src/app/component/person-edit-display/person-edit-display.component';
import { SavePersonComponent } from 'src/app/component/person-save/person-save-component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    personListComponent,
    EditPersonComponent,
    EditDisplayComponent,
    SavePersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
