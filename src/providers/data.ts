import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataProvider {
  constructor(private af: AngularFireDatabase) {}

  push(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.af.list(path).push(data).then(firebaseNewData => {
        // Return the uid created
        let newData: any = firebaseNewData;
        observer.next(newData.path.o[newData.path.o.length - 1]);
      }, error => {
        observer.error(error);
      });
    });
  }

  update(path: string, data: any) {
    this.af.object(path).update(data);
  }

  list(path: string): AngularFireList<any> {
    return this.af.list(path);
  }

  object(path: string): AngularFireObject<any> {
    return this.af.object(path);
  }

  remove(path: string): Observable<any> {
    return Observable.create(observer => {
      this.af.object(path).remove().then(data => {
        observer.next();
      }, error => {
        observer.error(error);
      });
    });
  }
}
