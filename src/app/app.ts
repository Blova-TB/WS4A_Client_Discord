import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Channel} from './component/channel/channel';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Channel, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'WS4A-CLIENT-DISCORD';
}
