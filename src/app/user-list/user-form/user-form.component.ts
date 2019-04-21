import { Component, OnInit } from '@angular/core';
import { UFService } from 'src/app/util/uf.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  ufs: any[]
  form: FormGroup
  id: number

  constructor(private ufService: UFService, private service: UserService, private toastr: ToastrService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    if(this.id){
      this.service.getUserById(this.id).subscribe(user => {
        this.form.patchValue({
          name: user.name,
          cpf: user.cpf,
          uf: user.uf,
          birth: user.birth,
          weight: user.weight
        })
      })
    }

    this.ufService.getUFs().subscribe(ufs => this.ufs = ufs)

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.pattern(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/)]),
      uf: new FormControl('', [Validators.required]),
      birth: new FormControl(),
      weight: new FormControl()
    })
  }

  save(user: User){
    (this.id ? this.service.update(user, this.id) : this.service.create(user)).subscribe(res => {
      this.toastr.success('Usuário salvo', 'Sucesso!')
      this.router.navigate(['/usuarios'])
    })
  }
}
