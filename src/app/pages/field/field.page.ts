import { Component, OnInit, } from '@angular/core';
import { DatabaseService, Fie} from '../../services/database.service';
import { ActivatedRoute , Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-field',
  templateUrl: './field.page.html',
  styleUrls: ['./field.page.scss'],
})
export class FieldPage implements OnInit {

  fie: Fie = null;
  idfieldrecived: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: DatabaseService,
              private toast: ToastController
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let Idf = params.get('idf');
      this.idfieldrecived = parseInt(Idf, 10);
      this.db.getField(this.idfieldrecived).then(data => {
        this.fie = data;
      });
    });
  }

  onSubmitTemplate() {
  }

  saveChanges() {
    this.db.updateField(this.fie).then(async (res) => {
      let toast = await this.toast.create({
        message: 'field actualizado',
        duration: 400
      });
      toast.present();
    });
  }

  delete() {
    this.db.deleteField(this.fie.idfield).then(() => {
      this.router.navigateByUrl('/lfields/' +
                                this.fie.topics_forms_idforms +
                                '/' +
                                this.fie.topics_idtopics
                                );
    });
  }

}

