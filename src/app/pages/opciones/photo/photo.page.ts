import { Component, OnInit } from '@angular/core';
import { DatabaseService, Fie} from '../../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  fie: Fie = null;
  idfieldrecived: number;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private toast: ToastController) {  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let Idf = params.get('idf');
      this.idfieldrecived = parseInt(Idf, 10);
      this.db.getField(this.idfieldrecived).then(data => {
        this.fie = data;
      });
    });
  }

  onSubmitTemplate() { }

  cambioRangoQuality( event ) {
    this.fie.quality = event.detail.value;
  }
  cambioRangoPW( event ) {
    this.fie.previewWidth = event.detail.value;
  }
  cambioRangoPH( event ) {
    this.fie.previewHeigth = event.detail.value;
  }
  cambioRangoIW( event ) {
    this.fie.imageWidht = event.detail.value;
  }
  cambioRangoIH( event ) {
    this.fie.imageHeigth = event.detail.value;
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

}
