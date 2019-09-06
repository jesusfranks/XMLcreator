import { Component, OnInit } from '@angular/core';
import { DatabaseService, Frm} from '../../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  frm: Frm = null;
  form = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private db: DatabaseService,
              private toast: ToastController
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let Idpk = params.get('id');
      this.db.getForm(Idpk).then(data => {
        this.frm = data;
      });
    });
  }

  onSubmitTemplate() { }

  saveForm() {
    this.db.updateForm(this.frm).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Form actualizado',
        duration: 400
      });
      toast.present();
    });
  }

  delete() {
    this.db.deleteForm(this.frm.idform).then(() => {
      this.router.navigateByUrl('/');
    });
  }

}

