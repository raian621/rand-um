/**
 * -----------------------------------------------------------------------------
 *                        Bindings for the Tenor API
 * -----------------------------------------------------------------------------
 * Some of the functions in the TenorAPI class won't work because the Tenor API
 * documentation is not entirely accurate: One example is that the search_suggestions
 * route returns an object of the form
 * 
 * {
 *   locale: string
 *   result: string[]
 * }
 * 
 * rather than a string array like the documentation states should be returned.
 */

const API_URL = 'https://tenor.googleapis.com/v2'

type CommonParams = {
  country?: string
  locale?: string
}

export interface SearchParams extends CommonParams {
  q: string,
  searchfilter?: string
  media_filter?: string
  ar_range?: string
  random?: boolean
  limit?: number
  pos?: string
}

export interface FeaturedParams extends CommonParams {
  searchfilter?: string
  media_filter?: string
  ar_range?: string
  contentfilter?: string
  limit?: string
  pos?: string
}

export interface CategoriesParams extends CommonParams {
  type?: string
  contentfilter?: string
}

export interface SearchSuggestionsParams extends CommonParams {
  q: string,
  limit?: number
}

export interface AutocompleteParams extends CommonParams {
  q: string,
  limit?: number
}

export interface TrendingSearchTermsParams extends CommonParams {
  limit?: number
}

export interface RegisterShareParams extends CommonParams {
  id: string
  q?: string
}

export interface PostsParams extends CommonParams {
  ids: string
  media_filter?: string
}

export type ResultResponse<T> = {
  results: T[]
  next: string
}

// see https://developers.google.com/tenor/guides/response-objects-and-errors#response-object
export type ResponseObject = {
  created: number
  hasaudio: boolean
  id: string
  media_formats: MediaFormats
  tags: string[]
  content_description: string
  itemurl: string
  hascaption: boolean
  flags: string
  bg_color: string
  url: string
}

export interface MediaFormats {
  [Key: string]: MediaObject
}

// see https://developers.google.com/tenor/guides/response-objects-and-errors#media-object
export type MediaObject = {
  url: string
  dims: number[]
  duration: number
  size: number
}

// see https://developers.google.com/tenor/guides/response-objects-and-errors#category-object
export type CategoryObject = {
  searchterm: string
  path: string
  image: string
  name: string
}

function addParams(url: URL, params: object) {
  Object.entries(params).forEach(tuple => {
    const [key, value] = tuple
    if (value !== undefined)
      url.searchParams.append(key, value.toString())
  })
}

export class TenorAPI {
  key: string
  clientKey?: string

  constructor(key: string, clientKey?: string) {
    this.key = key
    this.clientKey = clientKey
  }

  // see https://developers.google.com/tenor/guides/endpoints#search
  async search(params: SearchParams): Promise<ResultResponse<ResponseObject>|undefined> {
    const url = new URL(`${API_URL}/search`)
    addParams(url, {key: this.key, client_key: this.clientKey, ...params})

    try {
      const res = await fetch(url)
      if (res.ok) {
        return res.json() as Promise<ResultResponse<ResponseObject>>
      } else {
        throw Error(`unexpected status code ${res.status}`)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // see https://developers.google.com/tenor/guides/endpoints#featured
  async featured(params: FeaturedParams): Promise<ResultResponse<ResponseObject>|undefined> {
    const url = new URL(`${API_URL}/featured`)
    addParams(url, {key: this.key, client_key: this.clientKey, ...params})

    try {
      const res = await fetch(url)
      if (res.ok) {
        return res.json() as Promise<ResultResponse<ResponseObject>>
      } else {
        throw Error(`unexpected status code ${res.status}`)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // see https://developers.google.com/tenor/guides/endpoints#categories
  async categories(params: CategoriesParams): Promise<CategoryObject|undefined> {
    const url = new URL(`${API_URL}/categories`)
    addParams(url, {key: this.key, client_key: this.clientKey, ...params})

    try {
      const res = await fetch(url)
      if (res.ok) {
        return res.json() as Promise<CategoryObject>
      } else {
        throw Error(`unexpected status code ${res.status}`)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // see https://developers.google.com/tenor/guides/endpoints#search-suggestions
  async searchSuggestions(params: SearchSuggestionsParams): Promise<ResultResponse<string[]>|undefined> {
    const url = new URL(`${API_URL}/search_suggestions`)
    addParams(url, {key: this.key, client_key: this.clientKey, ...params})

    try {
      const res = await fetch(url)
      if (res.ok) {
        return res.json() as Promise<ResultResponse<string[]>>
      } else {
        throw Error(`unexpected status code ${res.status}`)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // see https://developers.google.com/tenor/guides/endpoints#autocomplete
  async autocomplete(params: AutocompleteParams): Promise<string[]|undefined> {
    const url = new URL(`${API_URL}/autocomplete`)
    addParams(url, {key: this.key, client_key: this.clientKey, ...params})

    try {
      const res = await fetch(url)
      if (res.ok) {
        return res.json() as Promise<string[]>
      } else {
        throw Error(`unexpected status code ${res.status}`)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // see https://developers.google.com/tenor/guides/endpoints#trending-search
  async trendingSearchTerms(params: TrendingSearchTermsParams): Promise<string[]|undefined> {
    const url = new URL(`${API_URL}/trending_terms`)
    addParams(url, {key: this.key, client_key: this.clientKey, ...params})

    try {
      const res = await fetch(url)
      if (res.ok) {
        return res.json() as Promise<string[]>
      } else {
        throw Error(`unexpected status code ${res.status}`)
      }
    } catch(e) {
      console.error(e)
    }
  }
  
  // see https://developers.google.com/tenor/guides/endpoints#register-share
  async registerShare(params: RegisterShareParams): Promise<string[]|undefined> {
    const url = new URL(`${API_URL}/registershare`)
    addParams(url, {key: this.key, client_key: this.clientKey, ...params})

    try {
      const res = await fetch(url)
      if (res.ok) {
        return res.json() as Promise<string[]>
      } else {
        throw Error(`unexpected status code ${res.status}`)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // see https://developers.google.com/tenor/guides/endpoints#posts
  async posts(params: PostsParams): Promise<ResponseObject|undefined> {
    const url = new URL(`${API_URL}/posts`)
    addParams(url, {key: this.key, client_key: this.clientKey, ...params})

    try {
      const res = await fetch(url)
      if (res.ok) {
        return res.json() as Promise<ResponseObject>
      } else {
        throw Error(`unexpected status code ${res.status}`)
      }
    } catch(e) {
      console.error(e)
    }
  }
}