import { Details } from 'express-useragent'

export interface Device extends Details {
  type: 'mobile' | 'tablet' | 'desktop'
}
