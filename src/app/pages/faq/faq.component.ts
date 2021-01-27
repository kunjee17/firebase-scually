import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { FaQ, FaqService } from '../../services/faq.service';
import { map, take, tap } from 'rxjs/operators';

interface Panel extends FaQ {
  active: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less']
})
export class FaqComponent implements OnInit, OnDestroy {
  panels: Panel[] = [];
  loading = true;
  subSink = new SubSink();
  constructor(private faqService: FaqService) { }

  ngOnInit(): void {
    // Block on isScullyRunning. Bug filed https://github.com/scullyio/scully/issues/1211
    this.subSink.add(
      this.faqService.getAll().subscribe(
        (f) => {
          this.panels = f.map((x) => ({ active: false, ...x }));
          this.loading = false;
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      )
    );

    // Try Scully as issue comments - Didn't work for me.

    // const faqStream$ = this.faqService.getAll().pipe(
    //   take(1),
    //   map((x) => x.map((y) => ({ active: false, ...y }))),
    //   tap((x) => (this.panels = x))
    // );

    // this.subSink.add(faqStream$.subscribe());
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
