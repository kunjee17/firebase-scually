import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

export interface FaQ {
  id?: string;
  question: string;
  answer: string;
}

const colName: string = 'faq';


@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private faqCollection: AngularFirestoreCollection<FaQ>;
  constructor(private afs: AngularFirestore) {
    this.faqCollection = afs.collection<FaQ>(colName);
  }

  getAll(): Observable<FaQ[]> {
    return this.faqCollection.valueChanges();
  }
}
