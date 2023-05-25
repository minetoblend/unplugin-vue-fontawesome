import { createUnplugin } from 'unplugin'
import type { Options } from '../types'
import { createContext } from './ctx'

export default createUnplugin<Options | undefined>((options) => {
  const ctx = createContext(options)
  return [
    {
      name: 'unplugin-vue-fontawesome-detect',
      enforce: 'pre',
      transformInclude(id) {
        return ctx.filter(id)
      },
      transform(code, id) {
        ctx.detectIcons(id, code)
        return undefined
      },
    },
    {
      name: 'unplugin-vue-fontawesome',
      enforce: 'post',
      transformInclude(id) {
        return ctx.filter(id)
      },
      transform(code, id) {
        if (ctx.hasIcons(id))
          return ctx.injectIcons(id, code)
      },
    },
  ]
})
