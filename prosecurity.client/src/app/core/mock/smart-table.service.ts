import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    patronymic: 'Otto',
    username: '@mdo',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 2,
    firstName: 'Jacob',
    lastName: 'Thornton',
    username: '@fat',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 3,
    firstName: 'Larry',
    lastName: 'Bird',
    username: '@twitter',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 4,
    firstName: 'John',
    lastName: 'Snow',
    username: '@snow',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 5,
    firstName: 'Jack',
    lastName: 'Sparrow',
    username: '@jack',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 6,
    firstName: 'Ann',
    lastName: 'Smith',
    username: '@ann',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 7,
    firstName: 'Barbara',
    lastName: 'Black',
    username: '@barbara',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 8,
    firstName: 'Sevan',
    lastName: 'Bagrat',
    username: '@sevan',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 9,
    firstName: 'Ruben',
    lastName: 'Vardan',
    username: '@ruben',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 10,
    firstName: 'Karen',
    lastName: 'Sevan',
    username: '@karen',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 11,
    firstName: 'Mark',
    lastName: 'Otto',
    username: '@mark',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 12,
    firstName: 'Jacob',
    lastName: 'Thornton',
    username: '@jacob',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 13,
    firstName: 'Haik',
    lastName: 'Hakob',
    username: '@haik',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 14,
    firstName: 'Garegin',
    lastName: 'Jirair',
    username: '@garegin',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }, {
    id: 15,
    firstName: 'Krikor',
    lastName: 'Bedros',
    username: '@krikor',
    enterance: 'mdo@gmail.com',
    date: new Date(),
  }];

  getData() {
    return this.data;
  }
}
