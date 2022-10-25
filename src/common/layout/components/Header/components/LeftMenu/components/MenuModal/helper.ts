interface MenuItem {
  id: 'news' | 'features' | 'contact'
  icon: string
  link: string
}

export const MENU: MenuItem[] = [
  { id: 'news', icon: 'newspaper', link: '' },
  { id: 'features', icon: 'dynamic_form', link: '' },
  { id: 'contact', icon: 'all_inbox', link: 'contact' },
]
