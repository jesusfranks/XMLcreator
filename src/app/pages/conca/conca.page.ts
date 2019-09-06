import { Component, OnInit } from '@angular/core';
import { DatabaseService, Frm, Fie, Top } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-conca',
  templateUrl: './conca.page.html',
  styleUrls: ['./conca.page.scss'],
})
export class ConcaPage implements OnInit {

  frm: Frm;
  top: Top[] = [];
  fie: Fie[] = [];
  encabezado = '<?xml version="1.0" encoding="ISO-8859-1"?>\n<kcd-form>';
  form: string;
  topic: string[] = [];
  field: string[] = [];
  cierre = '\n</form>\n</kcd-form>';
  everything = '';
  inemail: string;

  constructor(private db: DatabaseService, private route: ActivatedRoute, private emailComposer: EmailComposer) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getTop().subscribe(data => {
          this.top = data;
        });
        this.db.getFie().subscribe(data => {
          this.fie = data;
        });
        this.route.paramMap.subscribe(params => {
          let Idpk = params.get('idt');
          this.db.getForm(Idpk).then(data => {
            this.frm = data;
          });
        });
      }
    });
  }

  concatenar() {

    this.form = '\n<form id="' + this.frm.idform + '" name="' + this.frm.name + '" submitTo="' +
    this.frm.submitTo + '" required_time_initial="' + this.frm.RTI + '" required_time_final="' +
    this.frm.RTF + '" required_location_initial="' + this.frm.RLI + '" required_location_final="' +
    this.frm.RLF + '" encoding="' + this.frm.encoding + '" options="' + this.frm.options + '">\n';

    this.everything = this.encabezado + this.form;
    let j = 0;
    let l = 0;
    for (let i = 0; i < this.top.length; i++) {
      if (this.top[i].forms_idforms === this.frm.idform) {
        this.topic[j] = '\n<topic name="' + this.top[i].name + '" label="' + this.top[i].label + '">';
        this.everything += this.topic[j];
        j++;
        for (let k = 0; k < this.fie.length; k++) {
          if (this.fie[k].topics_idtopics == this.top[i].idtopic) {

            if (this.fie[k].type == 'radio_group') {
              if (this.fie[k].requiredExpression != '' && this.fie[k].visibleExpression != '') {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" required_expression="' + this.fie[k].requiredExpression + '" visible_expression="' + this.fie[k].visibleExpression +
                '" options="orientation=' + this.fie[k].orientation + ',values=' + this.fie[k].val + ',default=' + this.fie[k].def +
                '"> </field>';
              } else {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" options="orientation=' + this.fie[k].orientation + ',values=' + this.fie[k].val + ',default=' + this.fie[k].def +
                '"> </field>';
              }
            }
            if (this.fie[k].type == 'text') {
              if (this.fie[k].requiredExpression != '' && this.fie[k].visibleExpression != '') {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" required_expression="' + this.fie[k].requiredExpression + '" visible_expression="' + this.fie[k].visibleExpression +
                '" options="orientation=' + this.fie[k].orientation + ',input_method=' + this.fie[k].inputMethod + ',input_format='
                + this.fie[k].inputFormat + ',default=' + this.fie[k].def + '"> </field>';
              } else {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" options="orientation=' + this.fie[k].orientation + ',input_method=' + this.fie[k].inputMethod + ',input_format='
                + this.fie[k].inputFormat + ',default=' + this.fie[k].def + '"> </field>';
              }
            }
            if (this.fie[k].type == 'photo') {
              if (this.fie[k].requiredExpression != '' && this.fie[k].visibleExpression != '') {
              this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
              '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
              '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
              '" required_expression="' + this.fie[k].requiredExpression + '" visible_expression="' + this.fie[k].visibleExpression +
              '" options="orientation=' + this.fie[k].orientation + ',quality=' + this.fie[k].quality + ',preview_width=' +
              this.fie[k].previewWidth + ',preview_height=' + this.fie[k].previewHeigth + ',image_width=' +
              this.fie[k].imageWidht + ',image_height=' + this.fie[k].imageHeigth + '"> </field>';
              } else {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" options="orientation=' + this.fie[k].orientation + ',quality=' + this.fie[k].quality + ',preview_width=' +
                this.fie[k].previewWidth + ',preview_height=' + this.fie[k].previewHeigth + ',image_width=' +
                this.fie[k].imageWidht + ',image_height=' + this.fie[k].imageHeigth + '"> </field>';
              }
            }
            if (this.fie[k].type == 'display') {
              if (this.fie[k].requiredExpression != '' && this.fie[k].visibleExpression != '') {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" required_expression="' + this.fie[k].requiredExpression + '" visible_expression="' + this.fie[k].visibleExpression +
                '" options="orientation=' + this.fie[k].orientation + ',background_color=' + this.fie[k].backgrund_color +
                '"> </field>';
              } else {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" options="orientation=' + this.fie[k].orientation + ',background_color=' + this.fie[k].backgrund_color +
                '"> </field>';
              }
            }
            if (this.fie[k].type == 'sign') {
              if (this.fie[k].requiredExpression != '' && this.fie[k].visibleExpression != '') {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" required_expression="' + this.fie[k].requiredExpression + '" visible_expression="' + this.fie[k].visibleExpression +
                '" options="orientation=' + this.fie[k].orientation + ',quality=' + this.fie[k].quality + ',preview_width=' +
                this.fie[k].previewWidth + ',preview_height=' + this.fie[k].previewHeigth + ',image_width=' +
                this.fie[k].imageWidht + ',image_height=' + this.fie[k].imageHeigth + '"> </field>';
              } else {
                this.field[l] = '\n<field name="' + this.fie[k].name + '" label1="' + this.fie[k].label1 +
                '" label2="' + this.fie[k].label2 + '" type="' + this.fie[k].type + '" required="' + this.fie[k].required +
                '" visible="' + this.fie[k].visible + '" enabled="' + this.fie[k].enabled + '" name_link="' + this.fie[k].nameLink +
                '" options="orientation=' + this.fie[k].orientation + ',quality=' + this.fie[k].quality + ',preview_width=' +
                this.fie[k].previewWidth + ',preview_height=' + this.fie[k].previewHeigth + ',image_width=' +
                this.fie[k].imageWidht + ',image_height=' + this.fie[k].imageHeigth + '"> </field>';
              }
            }

            this.everything += this.field[l];
            l++;
          }
        }
        this.everything += '\n</topic>';
      }
    }
    this.everything += this.cierre;
  }

  sendEmail() {
    this.concatenar();
    let email = {
      to: this.inemail,
      subject: 'xml creator',
      body: this.everything,
      isHtml: false
     };
    this.emailComposer.open(email);
  }

  onSubmitTemplate() { }

}
