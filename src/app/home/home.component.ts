import { Component, Renderer2, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public http:HttpClient,
    private router: Router,
    private renderer: Renderer2
  ){
    const data = localStorage.getItem('region');
    if (data) {
      this.dataSubject.next(data);
      this.selectedValue = data;
      this.getByRegion(data);
    } else {
      this.getAllCountries();
    }
  }

countryDetails:any[] = [];
regions: string[] = [];
selectedValue!:string;
darkMode: boolean = false;

private dataSubject = new BehaviorSubject<any>(null);
data$ = this.dataSubject.asObservable();
setData(data: string) {
  this.dataSubject.next(data);
  localStorage.setItem('region', data);
}


  ngOnInit(){
  }

  getAllCountries(region?: string){
    this.http.get('https://restcountries.com/v3.1/all').subscribe((res:any)=>{                 
      this.countryDetails = region ? res.filter((c: any) => c.region === region) : res;            
      this.regions = [...new Set<string>(res.map((r: any) => r.region))];     
    })
  }

  filterOptions(e:any){    
    this.getByRegion(e);
  }

  getByRegion(region: string) {
    this.setData(region);
    if(region==='all') this.getAllCountries()
    else this.getAllCountries(region)
  }

  selectCountry(e:any){
    this.router.navigate([`/details/${e.ccn3}`]);
  }


  searchInput(e:any){   
   if(e.target.value === ''){
      this.selectedValue = "all";
      this.getAllCountries();
   }else{
    this.http.get('https://restcountries.com/v3.1/name/'+`${e.target.value}`).subscribe((res:any)=>{            
      this.countryDetails = res;       
    })
   }
  }

}
