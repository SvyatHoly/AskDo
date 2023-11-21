import queryString from 'query-string'
import { RSAA } from 'redux-api-middleware'

import * as api from 'utils/api'

interface PaginationInterface {
  currentPage: number
  totalPages?: number
  perPage?: number
}

export class Pagination implements PaginationInterface {
  public currentPage: number = 0
  public totalPages?: number
  public perPage: number = 20

  constructor(data?: any) {
    if (data) {
      const { current_page, total_pages, per_page } = data

      this.currentPage = current_page
      this.totalPages = total_pages
      this.perPage = per_page
    }
  }

  public get hasMore(): boolean {
    return this.totalPages == null || this.totalPages > this.currentPage
  }

  public get nextPage() {
    return this.currentPage + 1
  }

  public static get Empty(): Pagination {
    return new Pagination()
  }

  public withPerPage = (perPage: number) => {
    this.perPage = perPage

    return this
  }
}

export const withPagination = (rsaa: any, pagination: Pagination) => {
  const values = rsaa[RSAA]

  if (values.method === 'POST') {
    throw new Error("Can't paginate POST request")
  }

  const [url, query] = values.endpoint().split('?')

  const params = query ? queryString.parse(query) : {}
  const page = pagination.nextPage
  const perPage = pagination.perPage

  const newEndpoint = api.path(url, { ...params, page, per_page: perPage })

  return { [RSAA]: { ...values, endpoint: newEndpoint } }
}
