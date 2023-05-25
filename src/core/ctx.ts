import { createFilter } from '@rollup/pluginutils'
import { toArray } from '@antfu/utils'
import type { TransformResult } from 'unplugin'
import type { IconInfo, Options } from '../types'
import { normalizeCollections } from './collections'
import { detectIcons } from './detect'
import { injectIcons } from './inject'

export function createContext(options: Options = {}) {
  const moduleIconMap = new Map<string, IconInfo[]>()

  const filter = createFilter(
    options.include ?? [/\.[jt]sx?$/, /\.vue\??/],
    options.exclude ?? [/node_modules/, /\.git/],
  )

  const filterComponent = createComponentFilter(
    options.components ?? ['icon', 'font-awesome-icon'],
  )

  const collections = normalizeCollections(options.collections ?? ['free'])

  const props = toArray(options.props ?? ['icon'])

  const filterProp = (name: string) => props.includes(name)

  const defaultCollection
    = collections.find(
      c => c.name === (options.defaultCollection ?? 'solid'),
    ) ?? collections[0]

  const resolveIcon = ({
    name,
    id,
    prefix,
  }: IconLookup): IconInfo | undefined => {
    if (name.startsWith('fa-'))
      name = name.slice(3)

    if (id) {
      const ids = toArray(id)
      const collection = collections.find(c => compareId(c.id, ids))

      if (collection) {
        return {
          name,
          collection,
        }
      }

      return undefined
    }

    if (prefix) {
      const collection = collections.find(c => c.prefix === prefix)

      if (collection) {
        return {
          name,
          collection,
        }
      }

      return undefined
    }

    return {
      name,
      collection: defaultCollection,
    }
  }

  const hasIcons = (id: string) => {
    return moduleIconMap.has(id)
  }

  const ctx: Context = {
    filter,
    filterComponent,
    filterProp,
    resolveIcon,
    detectIcons: (id: string, code: string) => {
      const icons = detectIcons(code, ctx)
      if (icons.length)
        moduleIconMap.set(id, icons)
      else moduleIconMap.delete(id)
    },
    hasIcons,
    injectIcons: (id: string, code: string) => {
      const icons = moduleIconMap.get(id)
      if (icons)
        return injectIcons(code, icons)
    },
  }

  return ctx
}

export interface Context {
  filter: (id: string) => boolean
  filterComponent: (name: string) => boolean
  filterProp: (name: string) => boolean
  resolveIcon: (icon: IconLookup) => IconInfo | undefined
  detectIcons: (id: string, code: string) => void
  hasIcons: (id: string) => boolean
  injectIcons: (id: string, code: string) => TransformResult | undefined
}

interface IconLookup {
  name: string
  id?: string | string[]
  prefix?: string
}

export function compareId(a: string | string[], b: string | string[]) {
  const idsA = toArray(a)
  const idsB = toArray(b)

  return idsA.length === idsB.length && idsA.every(id => idsB.includes(id))
}

function hyphenate(str: string) {
  return (
    str[0].toLowerCase()
    + str.slice(1).replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  )
}

function createComponentFilter(
  components: string | string[] | ((name: string) => boolean),
) {
  if (typeof components === 'function')
    return components

  const componentNames = toArray(components).map(hyphenate)

  return (name: string) => componentNames.includes(hyphenate(name))
}
