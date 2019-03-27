import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, firstName: 'Alvaro', lastName: 'Lima Jr', age: 33 },
      { id: 2, firstName: 'Jhon', lastName: 'Kennedy', age: 87 },
      { id: 3, firstName: 'Alyson', lastName: 'Kazumi', age: 34 },
      { id: 4, firstName: 'Samuel', lastName: 'Arendt', age: 45 },
      { id: 5, firstName: 'Zé', lastName: 'Bigode', age: 64 }
    ];
    return { users };
  }
}
