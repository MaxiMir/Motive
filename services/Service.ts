export abstract class Service {
  static getOperation(add: boolean): string {
    return `?operation=${add ? 'insert' : 'delete'}`
  }
}
