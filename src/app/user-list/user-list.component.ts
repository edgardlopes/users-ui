import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Page } from './page.model';
import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  page: Page<User>


  constructor(private service: UserService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.reload()
  }

  reload(){
    this.route.queryParams.subscribe(params => {
      this.service.getUsers(params['size'], params['page']).subscribe(page => this.page = page)      
    })
  }

  delete(id: number){
    if(confirm("Tem certeza? Essa operação não pode ser desfeita")){
      this.service.delete(id).subscribe(res => {
        this.toastr.success("Usuário apagado.", "Sucesso")
        this.reload()
      })
    }
  }

}
