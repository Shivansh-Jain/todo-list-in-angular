import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})  
export class AppComponent {
  title = 'frontend';
  ngOnInit(){
    let url = 'http://localhost:3000';
    fetch(url,{
      method:"GET"
    })
    .then(res=>{
      res.json()
    })
    .then(data=>{
      console.log(data); 
    })
  }
}
