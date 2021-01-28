import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { FaQ, FaqService } from '../../services/faq.service';
import { distinctUntilChanged, map, mergeMap, take, tap } from 'rxjs/operators';
import { IdleMonitorService, TransferStateService } from '@scullyio/ng-lib';

interface Panel extends FaQ {
  active: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
})
export class FaqComponent {
  loading = true;
  panels$ = this.tss
    .useScullyTransferState(
      'faq',
      this.faqService.getAll().pipe(
        take(1), // as it is hot, we need to take only the first one
        /**
         * as firebase runs outside of zone, we need to manually tell Scully the page is "ready"
         * the setTimeout makes sure Angular has some time to paint the page, before we
         * will "scrape"
         */
        tap(() => setTimeout(() =>this.ims.fireManualMyAppReadyEvent(),10)), //
      )
    )
    .pipe(
      tap(() => (this.loading = false)),
      /** if you want to subscribe to future updates you can merge the 'hot'
       * service back in, or use a subject to push to. */
      // mergeMap(()=> this.faqService.getAll()),
      map((faq) => faq.map((x) => ({ active: false, ...x } as Panel)))
    );
  constructor(
    private faqService: FaqService,
    private tss: TransferStateService,
    private ims: IdleMonitorService
  ) {}
}
