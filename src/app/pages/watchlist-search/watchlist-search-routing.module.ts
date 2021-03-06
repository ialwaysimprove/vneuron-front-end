import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WatchlistSearchComponent } from './watchlist-search.component';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';

const routes: Routes = [
  {
    path: '',
    component: WatchlistSearchComponent,
    children: [

      {
        path: 'elasticsearch',
        component: ElasticsearchComponent,
      },

    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class WatchlistSearchRoutingModule {
}

