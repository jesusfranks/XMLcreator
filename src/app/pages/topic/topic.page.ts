import { Component, OnInit } from '@angular/core';
import { DatabaseService, Top} from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {

  tpt: Top[] = [];
  name: string;
  label: string;
  idparam: number;

  constructor(private route: ActivatedRoute,
              private db: DatabaseService
              ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getTop().subscribe(data => {
          this.tpt = data;
        });
        this.route.paramMap.subscribe(params => {
          let Idpk = params.get('idForm');
          this.idparam = parseInt(Idpk, 10);
        });
      }
    });
  }

  onSubmitTemplate() { }

  saveNewTopic() {
    this.db.addTopic(this.name,
                    this.label,
                    this.idparam
                    );
  }

}
