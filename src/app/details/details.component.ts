import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  countryCCN3: number = 0;
  country: any;
  name: string = "";
  languages: string[] = [];
  currencies: string[] = [];

  constructor(
    private _router: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.countryCCN3 = this._router.snapshot.params['id'];
    console.log("this.cou", this.countryCCN3);
    this.getCountryDetail();
  }

  getCountryDetail() {
    this.http.get(`https://restcountries.com/v3.1/alpha/${this.countryCCN3}`).subscribe((res: any) => {
      this.country = res[0];      
      for (const [key, value] of Object.entries(this.country.name.nativeName)) {
        this.name = (value as any).common;
        break;
      }      
      for (const [key, value] of Object.entries(this.country.languages)) {       
        this.languages.push(String(value));        
      }
      for (const [key, value] of Object.entries(this.country.currencies)) {        
        this.currencies.push(String(key))        
      }      
    })
  }

}
