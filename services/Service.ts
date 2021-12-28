export abstract class Service {
  static getOperation(add: boolean): 'add' | 'remove' {
    return add ? 'add' : 'remove'
  }
}
