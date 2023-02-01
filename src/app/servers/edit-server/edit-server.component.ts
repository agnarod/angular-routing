import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, 
CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSaved = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute, 
    private router:Router) { }

  canDeactivate() : boolean | Promise<boolean> | Observable<boolean>{
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status )&& !this.changeSaved)
    return confirm('Are you sure you want to leave?');
    else return true;
    
  };

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.route.queryParams.subscribe(
      (qParams:Params)=>{
        this.allowEdit =  qParams['allowEdit'] ==='1'? true: false;
      }
    );
    if (!isNaN(id)) {
      this.server = this.serversService.getServer(id);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changeSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
