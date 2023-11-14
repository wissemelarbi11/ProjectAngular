import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SousTache } from '../models/soustache';

@Injectable({
  providedIn: 'root'
})
export class SoustacheService {
 

  constructor(private http:HttpClient) { }
  sharedsousTache!:SousTache;
  getShareTache():SousTache{
    return this.sharedsousTache;
  }

  setSharesousTache(soustache:SousTache):void {

    this.sharedsousTache=soustache;
  }
  getSousTaches():Observable<any>{
return this.http.get('http://localhost:3000/SousTache/${id}/soustache');
  }
  getOneSousTache(id:number,idProject:number):Observable<SousTache>{
    return this.http.get<SousTache>('http://localhost:3000/SousTache/${id}');
  }

  updateTaches(id:number,soustache:SousTache[]): Observable<any> {

    return this.http.put('http://localhost:3000/SousTache/${id}',{soustache});
  }

  addSousTache (formData:any): Observable<any> {

    return this.http.post('http://localhost:3000/tache/${id}/SousTache',formData);
  }
  deleteSousTache(id:number){
    return this.http.delete('http://localhost:3000/tache/${id}/SousTache');
  }
}
