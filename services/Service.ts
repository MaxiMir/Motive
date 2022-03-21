export type WhereParams = Record<string, string | number>

export abstract class Service {
  static getOperationParams(add: boolean): { operation: string } {
    return { operation: add ? 'insert' : 'delete' }
  }

  static getWhereParams(where: WhereParams): WhereParams {
    return Object.fromEntries(Object.entries(where).map(([k, v]) => [`where[${k}]`, v]))
  }

  static getPaginationParams(page: number, take: number): { skip: number; take: number } {
    return { skip: page * take, take }
  }
}
