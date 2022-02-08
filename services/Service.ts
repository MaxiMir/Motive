export abstract class Service {
  static getOperationParams(add: boolean): { operation: string } {
    return { operation: add ? 'insert' : 'delete' }
  }

  static getPaginationParams(page: number, take: number): { skip: number; take: number } {
    return { skip: page * take, take }
  }
}
