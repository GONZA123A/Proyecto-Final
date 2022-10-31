import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//componentes del Proyecto

import { NavbarComponent } from './estructura/navbar/navbar.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { ProductosComponent } from './paginas/productos/productos.component';

// servicios

import { UsuariosService } from './servicios/usuarios.service';
import { StorageService } from './servicios/storage.service';
import { ProductosService } from './servicios/productos.service';

//Componentes de PrimeNG
import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {PanelMenuModule} from 'primeng/panelmenu';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import { FormsModule } from '@angular/forms';
import {SplitterModule} from 'primeng/splitter';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {DataViewModule} from 'primeng/dataview';
import {GMapModule} from 'primeng/gmap';
import {DividerModule} from 'primeng/divider';
import {SliderModule} from 'primeng/slider';
import {CarouselModule} from 'primeng/carousel';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {InputMaskModule} from 'primeng/inputmask';
import {PickListModule} from 'primeng/picklist';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {PanelModule} from 'primeng/panel';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

//Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { initializeApp } from 'firebase/app';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    ContactoComponent,
    NosotrosComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputNumberModule,
    AutoCompleteModule,
    CalendarModule,
    BrowserModule,
    ChipsModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    MenubarModule,
    InputTextModule,
    TabMenuModule,
    ButtonModule,
    TabViewModule,
    PanelMenuModule,
    GalleriaModule,
    ImageModule,
    FormsModule,
    ButtonModule,
    CarouselModule,
    SplitterModule,
    ScrollPanelModule,
    TableModule,
    CardModule,
    DataViewModule,
    GMapModule,
    DividerModule,
    SliderModule,
    VirtualScrollerModule,
    InputMaskModule,
    PickListModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    DynamicDialogModule,
    PanelModule,
    DynamicDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [UsuariosService, StorageService, ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
