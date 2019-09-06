import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'presentacion', pathMatch: 'full' },
  { path: 'presentacion', loadChildren: './pages/presentacion/presentacion.module#PresentacionPageModule' },
  { path: 'form/:id', loadChildren: './pages/form/form.module#FormPageModule' },
  { path: 'topic/:idForm', loadChildren: './pages/topic/topic.module#TopicPageModule' },
  { path: 'field/:idf', loadChildren: './pages/field/field.module#FieldPageModule' },
  { path: 'radio_group/:idf', loadChildren: './pages/opciones/radio-group/radio-group.module#RadioGroupPageModule' },
  { path: 'text/:idf', loadChildren: './pages/opciones/text/text.module#TextPageModule' },
  { path: 'display/:idf', loadChildren: './pages/opciones/display/display.module#DisplayPageModule' },
  { path: 'photo/:idf', loadChildren: './pages/opciones/photo/photo.module#PhotoPageModule' },
  { path: 'sign/:idf', loadChildren: './pages/opciones/sign/sign.module#SignPageModule' },
  { path: 'conca/:idt', loadChildren: './pages/conca/conca.module#ConcaPageModule' },
  { path: 'lfields/:idForm/:idtopic', loadChildren: './pages/lfields/lfields.module#LfieldsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
