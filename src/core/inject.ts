import type { TransformResult } from 'unplugin'
import MagicString from 'magic-string'
import { capitalize } from '@antfu/utils'
import type { IconInfo } from '../types'

const PREFIX = '__fa__icon'

function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

export function injectIcons(code: string, icons: IconInfo[]): TransformResult {
  const s = new MagicString(code)

  let count = 0

  const importedIcons = new Set<string>()

  let injectedCode = '/* auto-generated fontawesome imports */\n'

  icons.forEach((icon) => {
    const importName = `fa${capitalize(camelize(icon.name))}`
    const importedAs = `${PREFIX}${count++}`
    const moduleName = icon.collection.module
    injectedCode += `import { ${importName} as ${importedAs} } from "${moduleName}";\n`

    importedIcons.add(importedAs)
  })

  injectedCode
    += 'import { library } from "@fortawesome/fontawesome-svg-core";\n'
    + `library.add(${Array.from(importedIcons).join(', ')});\n\n`

  s.prepend(injectedCode)

  return {
    code: s.toString(),
    map: s.generateMap({ hires: true }),
  }
}
