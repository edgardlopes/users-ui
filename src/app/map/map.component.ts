import { Component, OnInit } from '@angular/core';

import {setupMap} from './setupMap'
import { UserService } from '../user-list/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getSummary().subscribe(summary => {
      setupMap('map-placeholder', summary)
    })
  }

}
