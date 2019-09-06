import { Component, OnInit } from '@angular/core';
import { DatabaseService, Fie} from '../../services/database.service';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-lfields',
  templateUrl: './lfields.page.html',
  styleUrls: ['./lfields.page.scss'],
})
export class LfieldsPage implements OnInit {

  fie: Fie[] = [];
  idparamf: number;
  idparamt: number;
  field = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: DatabaseService
              ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getFie().subscribe(data => {
          this.fie = data;
        });
        this.route.paramMap.subscribe(params => {
          let Idpkf = params.get('idForm');
          this.idparamf = parseInt(Idpkf, 10);
          let Idpkt = params.get('idtopic');
          this.idparamt = parseInt(Idpkt, 10);
        });
      }
    });
  }

  crearNuevo() {
    this.db.addField('nuevo',
                      '',
                      '',
                      'radio_group',
                      'N',
                      'Y',
                      'Y',
                      '',
                      '',
                      '',
                      'vertical',
                      ' | | | | ',
                      '1',
                      'text_upper_case',
                      'p(  )',
                      'grey',
                      '50',
                      '50',
                      '50',
                      '50',
                      '50',
                      this.idparamt,
                      this.idparamf
                      ).then(_ => {
      this.field = {};
    });
  }

  delete() {
    this.db.deleteTopic(this.idparamt).then(() => {
      this.router.navigateByUrl('/topic/' + this.idparamf.toString());
    });
  }

}
