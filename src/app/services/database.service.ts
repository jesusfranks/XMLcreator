import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Frm {
  idform: number;
  id: string;
  name: string;
  submitTo: string;
  RTI: string;
  RTF: string;
  RLI: string;
  RLF: string;
  encoding: string;
  label1: string;
  label2: string;
  iconType: string;
  iconValue: string;
  options: string;
}

export interface Top {
  idtopic: number;
  name: string;
  label: string;
  forms_idforms: number;
}

export interface Fie {
  idfield: number;
  name: string;
  label1: string;
  label2: string;
  type: string;
  required: string;
  visible: string;
  enabled: string;
  nameLink: string;
  requiredExpression: string;
  visibleExpression: string;
  orientation: string;
  val: string;
  def: string;
  inputMethod: string;
  inputFormat: string;
  backgrund_color: string;
  quality: string;
  previewWidth: string;
  previewHeigth: string;
  imageWidht: string;
  imageHeigth: string;
  topics_idtopics: number;
  topics_forms_idforms: number;
}


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  forms = new BehaviorSubject([]);
  topics = new BehaviorSubject([]);
  fields = new BehaviorSubject([]);

  constructor(private plt: Platform,
              private sqlitePorter: SQLitePorter,
              private sqlite: SQLite,
              private http: HttpClient
              ) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'cxml.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadForms();
          this.loadTopics();
          this.loadFields();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getFrm(): Observable<Frm[]> {
    return this.forms.asObservable();
  }
  getTop(): Observable<Top[]> {
    return this.topics.asObservable();
  }
  getFie(): Observable<Fie[]> {
    return this.fields.asObservable();
  }

  loadForms() {
    return this.database.executeSql('SELECT * FROM forms', []).then(data => {
      let prop: Frm[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          prop.push({
            idform: data.rows.item(i).idform,
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            submitTo: data.rows.item(i).submitTo,
            RTI: data.rows.item(i).RTI,
            RTF: data.rows.item(i).RTF,
            RLI: data.rows.item(i).RLI,
            RLF: data.rows.item(i).RLF,
            encoding: data.rows.item(i).encoding,
            label1: data.rows.item(i).label1,
            label2: data.rows.item(i).label2,
            iconType: data.rows.item(i).iconType,
            iconValue: data.rows.item(i).iconValue,
            options: data.rows.item(i).options
          });
        }
      }
      this.forms.next(prop);
    });
  }

  addForm(id, name, submitTo, RTI, RTF, RLI, RLF, encoding, label1, label2, iconType, iconValue, options) {
    let datos = [id, name, submitTo, RTI, RTF, RLI, RLF, encoding, label1, label2, iconType, iconValue, options];
    // tslint:disable-next-line: max-line-length
    return this.database.executeSql('INSERT INTO forms(id, name, submitTo, RTI, RTF, RLI, RLF, encoding, label1, label2, iconType, iconValue, options) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', datos).then(data => {
      this.loadForms();
    });
  }

  getForm(id): Promise<Frm> {
    return this.database.executeSql('SELECT * FROM forms WHERE idform = ?', [id]).then(data => {
      return {
        idform: data.rows.item(0).idform,
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
        submitTo: data.rows.item(0).submitTo,
        RTI: data.rows.item(0).RTI,
        RTF: data.rows.item(0).RTF,
        RLI: data.rows.item(0).RLI,
        RLF: data.rows.item(0).RLF,
        encoding: data.rows.item(0).encoding,
        label1: data.rows.item(0).label1,
        label2: data.rows.item(0).label2,
        iconType: data.rows.item(0).iconType,
        iconValue: data.rows.item(0).iconValue,
        options: data.rows.item(0).options
      };
    });
  }

  deleteForm(id) {
    return this.database.executeSql('DELETE FROM forms WHERE idform = ?', [id]).then(_ => {
      this.loadForms();
    });
  }

  updateForm(frm: Frm) {
    // tslint:disable-next-line: max-line-length
    let data = [frm.id, frm.name, frm.submitTo, frm.RTI, frm.RTF, frm.RLI, frm.RLF, frm.encoding, frm.label1, frm.label2, frm.iconType, frm.iconValue, frm.options, frm.idform];
    // tslint:disable-next-line: max-line-length
    return this.database.executeSql('UPDATE forms SET id = ?, name = ?, submitTo = ?, RTI = ?, RTF = ?, RLI = ?, RLF = ?, encoding = ?, label1 = ?, label2 = ?, iconType = ?, iconValue = ?, options = ? WHERE idform = ?', data).then(data => {
      this.loadForms();
    });
  }

  loadTopics() {
    return this.database.executeSql('SELECT * FROM topics', []).then(data => {
      let t: Top[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          t.push({
            idtopic: data.rows.item(i).idtopic,
            name: data.rows.item(i).name,
            label: data.rows.item(i).label,
            forms_idforms: data.rows.item(i).forms_idforms,
          });
        }
      }
      this.topics.next(t);
    });
  }

  addTopic(name, label,forms_idforms) {
    let datos = [name, label, forms_idforms];
    // tslint:disable-next-line: max-line-length
    return this.database.executeSql('INSERT INTO topics(name, label, forms_idforms) VALUES (?, ?, ?)', datos).then(data => {
      this.loadTopics();
    });
  }

  getTopic(id): Promise<Top> {
    return this.database.executeSql('SELECT * FROM topics WHERE idtopic = ?', [id]).then(data => {
      return {
        idtopic: data.rows.item(0).idtopic,
        name: data.rows.item(0).name,
        label: data.rows.item(0).label,
        forms_idforms: data.rows.item(0).forms_idforms,
      };
    });
  }


  deleteTopic(id) {
    return this.database.executeSql('DELETE FROM topics WHERE idtopic = ?', [id]).then(_ => {
      this.loadTopics();
    });
  }

  updateTopic(top: Top) {
    // tslint:disable-next-line: max-line-length
    let data = [top.name, top.label, top.idtopic];
    // tslint:disable-next-line: max-line-length
    return this.database.executeSql('UPDATE topics SET name = ?, label = ? WHERE idtopic = ?', data).then(data => {
      this.loadTopics();
    });
  }

  loadFields() {
    return this.database.executeSql('SELECT * FROM fields', []).then(data => {
      let fi: Fie[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          fi.push({
            idfield: data.rows.item(i).idfield,
            name: data.rows.item(i).name,
            label1: data.rows.item(i).label1,
            label2: data.rows.item(i).label2,
            type: data.rows.item(i).type,
            required: data.rows.item(i).required,
            visible: data.rows.item(i).visible,
            enabled: data.rows.item(i).enabled,
            nameLink: data.rows.item(i).nameLink,
            requiredExpression: data.rows.item(i).requiredExpression,
            visibleExpression: data.rows.item(i).visibleExpression,
            orientation: data.rows.item(i).orientation,
            val: data.rows.item(i).val,
            def: data.rows.item(i).def,
            inputMethod: data.rows.item(i).inputMethod,
            inputFormat: data.rows.item(i).inputFormat,
            backgrund_color: data.rows.item(i).backgrund_color,
            quality: data.rows.item(i).quality,
            previewWidth: data.rows.item(i).previewWidth,
            previewHeigth: data.rows.item(i).previewHeigth,
            imageWidht: data.rows.item(i).imageWidht,
            imageHeigth: data.rows.item(i).imageHeigth,
            topics_idtopics: data.rows.item(i).topics_idtopics,
            topics_forms_idforms: data.rows.item(i).topics_forms_idforms
          });
        }
      }
      this.fields.next(fi);
    });
  }

  // tslint:disable-next-line: max-line-length
  addField(name, label1, label2, type, required, visible, enabled, nameLink, requiredExpression, visibleExpression, orientation, val, def, inputMethod, inputFormat, backgrund_color, quality, previewWidth, previewHeigth, imageWidht, imageHeigth, topics_idtopics, topics_forms_idforms) {
    // tslint:disable-next-line: max-line-length
    let datos = [name, label1, label2, type, required, visible, enabled, nameLink, requiredExpression, visibleExpression, orientation, val, def, inputMethod, inputFormat, backgrund_color, quality, previewWidth, previewHeigth, imageWidht, imageHeigth, topics_idtopics, topics_forms_idforms];
    // tslint:disable-next-line: max-line-length
    return this.database.executeSql('INSERT INTO fields(name, label1, label2, type, required, visible, enabled, nameLink, requiredExpression, visibleExpression, orientation, val, def, inputMethod, inputFormat, backgrund_color, quality, previewWidth, previewHeigth, imageWidht, imageHeigth, topics_idtopics, topics_forms_idforms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', datos).then(data => {
      this.loadFields();
    });
  }

  getField(id): Promise<Fie> {
    return this.database.executeSql('SELECT * FROM fields WHERE idfield = ?', [id]).then(data => {
      return {
        idfield: data.rows.item(0).idfield,
        name: data.rows.item(0).name,
        label1: data.rows.item(0).label1,
        label2: data.rows.item(0).label2,
        type: data.rows.item(0).type,
        required: data.rows.item(0).required,
        visible: data.rows.item(0).visible,
        enabled: data.rows.item(0).enabled,
        nameLink: data.rows.item(0).nameLink,
        requiredExpression: data.rows.item(0).requiredExpression,
        visibleExpression: data.rows.item(0).visibleExpression,
        orientation: data.rows.item(0).orientation,
        val: data.rows.item(0).val,
        def: data.rows.item(0).def,
        inputMethod: data.rows.item(0).inputMethod,
        inputFormat: data.rows.item(0).inputFormat,
        backgrund_color: data.rows.item(0).backgrund_color,
        quality: data.rows.item(0).quality,
        previewWidth: data.rows.item(0).previewWidth,
        previewHeigth: data.rows.item(0).previewHeigth,
        imageWidht: data.rows.item(0).imageWidht,
        imageHeigth: data.rows.item(0).imageHeigth,
        topics_idtopics: data.rows.item(0).topics_idtopics,
        topics_forms_idforms: data.rows.item(0).topics_forms_idforms
      };
    });
  }

  deleteField(id) {
    return this.database.executeSql('DELETE FROM fields WHERE idfield = ?', [id]).then(_ => {
      this.loadFields();
    });
  }

  updateField(fie: Fie) {
    // tslint:disable-next-line: max-line-length
    let data = [fie.name, fie.label1, fie.label2, fie.type, fie.required, fie.visible, fie.enabled, fie.nameLink, fie.requiredExpression, fie.visibleExpression, fie.orientation, fie.val, fie.def, fie.inputMethod, fie.inputFormat, fie.backgrund_color, fie.quality, fie.previewWidth, fie.previewHeigth, fie.imageWidht, fie.imageHeigth, fie.topics_idtopics, fie.topics_forms_idforms, fie.idfield];
    // tslint:disable-next-line: max-line-length
    return this.database.executeSql('UPDATE fields SET name = ?, label1 = ?, label2 = ?, type = ?, required = ?, visible = ?, enabled = ?, nameLink = ?, requiredExpression = ?, visibleExpression = ?, orientation = ?, val = ?, def = ?, inputMethod = ?, inputFormat = ?, backgrund_color = ?, quality = ?, previewWidth = ?, previewHeigth = ?, imageWidht = ?, imageHeigth = ?, topics_idtopics = ?, topics_forms_idforms = ? WHERE idfield = ?', data).then(data => {
      this.loadFields();
    });
  }

}
