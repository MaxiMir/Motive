export interface Filter {
  where?: Record<string, string | number>
  page?: number
  take?: number
  insert?: boolean
}

export const getFilterParams = (filter: Filter) => {
  const { where, page, take, insert } = filter
  const wherePrepared = !where
    ? null
    : Object.fromEntries(Object.entries(where).map(([k, v]) => [`where[${k}]`, v]))
  const paginationPrepared =
    typeof page !== 'number' || typeof take !== 'number' ? null : { skip: page * take, take }
  const insertPrepared =
    typeof insert !== 'boolean' ? null : { operation: insert ? 'insert' : 'delete' }

  return { ...wherePrepared, ...paginationPrepared, ...insertPrepared }
}
