import {
  type AttributeNode,
  type DirectiveNode,
  type TemplateChildNode,
} from '@vue/compiler-core'
import { parse } from '@vue/compiler-sfc'
import type { IconInfo } from '../types'
import type { Context } from './ctx'

const arrayIconRE = /\[['"]([\w-]+)['"]\s*,\s*[['"]([\w-]+)['"]\]/

export function detectIcons(code: string, ctx: Context) {
  const { descriptor, errors } = parse(code)
  if (errors.length > 0 || !descriptor.template)
    return []

  const icons = new Map<string, IconInfo>()

  function iconId(icon: IconInfo) {
    return [icon.name, icon.collection.id].flat().join('-')
  }

  function traverse(node: TemplateChildNode) {
    if (node.type === 1 /* ELEMENT */) {
      if (ctx.filterComponent(node.tag)) {
        for (const prop of node.props) {
          if (prop.type === 6 /* ATTRIBUTE */)
            detectIconsInAttribute(prop)
          else if (prop.type === 7 /* DIRECTIVE */)
            detectIconsInDirective(prop)
        }
      }

      for (const child of node.children)
        traverse(child)
    }
  }

  traverse(descriptor.template.ast)

  function detectIconsInAttribute(prop: AttributeNode) {
    if (ctx.filterProp(prop.name) && prop.value) {
      const content = prop.value.content.split(' ')

      let icon: IconInfo | undefined
      if (content.length > 1) {
        icon = ctx.resolveIcon({
          name: content.pop()!,
          id: content,
        })
      }
      else if (content.length === 1) {
        icon = ctx.resolveIcon({
          name: content[0],
        })
      }
      if (icon) {
        const id = iconId(icon)

        if (!icons.has(id))
          icons.set(id, icon)
      }
    }
  }

  function detectIconsInDirective(directive: DirectiveNode) {
    if (
      directive.name === 'bind'
      && directive.arg?.type === 4
      && /* SIMPLE_EXPRESSION */ directive.exp?.type === 4
      && /* SIMPLE_EXPRESSION */ ctx.filterProp(directive.arg.content)
    ) {
      const match = directive.exp.content.match(arrayIconRE)
      if (match) {
        const prefix = match[1]
        const name = match[2]
        const icon = ctx.resolveIcon({ name, prefix })

        if (icon) {
          const id = iconId(icon)

          if (!icons.has(id))
            icons.set(id, icon)
        }
      }
    }
  }

  return [...icons.values()]
}
