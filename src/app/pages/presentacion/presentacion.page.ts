import { Component, OnInit } from '@angular/core';
import { DatabaseService, Frm } from '../../services/database.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.page.html',
  styleUrls: ['./presentacion.page.scss'],
})
export class PresentacionPage implements OnInit {

  fm: Frm[] = [];
  form = {};

  constructor(private db: DatabaseService, private statusBar: StatusBar) { }

  ngOnInit() {
    this.statusBar.backgroundColorByName('white');
    this.statusBar.styleDefault();

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getFrm().subscribe(devs => {
          this.fm = devs;
        });
      }
    });
  }

  crearNuevo() {
    this.db.addForm('nuevoID',
                    'editar Nombre',
                    'http://www.dynkollect.com:80/DynKollect/DynKollect.1.0.php',
                    'Y',
                    'Y',
                    'Y',
                    'Y',
                    'ISO-8859-1',
                    '',
                    '',
                    '',
                    '',
                    'back_key_permit=Y'
                    ).then(_ => {
      this.form = {};
    });
  }

}
