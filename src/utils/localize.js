import path from 'path'
import i18n from 'i18n'

i18n.configure({
  locales: ['th', 'en'],
  defaultLocale: 'th',
  fallbacks: {
    th: 'en',
  },
  directory: path.join(__dirname, '../locales'),
})

export const e = (key, ...others) => i18n.__(key, ...others)

export default i18n
