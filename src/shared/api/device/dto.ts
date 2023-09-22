import { Details } from 'express-useragent'

export interface Device extends Partial<Details> {
  type?: 'mobile' | 'tablet' | 'desktop'
}
