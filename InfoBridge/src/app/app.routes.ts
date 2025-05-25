import { Routes } from '@angular/router';
import { HomepageComponent } from './features/homepage/homepage.component';
import { DocumentListComponent } from './features/document-list/document-list.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'documents', component: DocumentListComponent },
];
