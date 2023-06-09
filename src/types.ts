import type { FilterPattern } from 'vite'
import type { Arrayable } from '@antfu/utils'

export interface IconCollection {
  name: string
  prefix: string
  module: string
  id: string | string[]
}

export interface IconCollectionMap {
  [key: string]: IconCollection
}

export type PresetName =
  | 'pro'
  | 'free'
  | 'pro-solid'
  | 'pro-regular'
  | 'pro-light'
  | 'pro-thin'
  | 'pro-duotone'
  | 'sharp-solid'
  | 'sharp-regular'
  | 'sharp-light'
  | 'free-solid'
  | 'free-regular'
  | 'free-brands'

export interface PropInfo {
  name: string
  value: string
  type: 'string' | 'expression'
}

export type IconInfo =
  | { name: string; collection: IconCollection }

export type IconResolver = (prop: PropInfo) => string | undefined

export interface Options {
  /**
   * The fontawesome collections to use
   *
   * @default "free"
   */
  collections?: Arrayable<PresetName | IconCollection>

  /**
   * The default collection to use
   *
   * @default "solid"
   */
  defaultCollection?: string

  /**
   * Props to look for icons in.
   *
   * @default [ "icon" ]
   */
  props?: string | string[]

  /**
   * Components to look for icons in.
   * Use an empty array to check all components
   *
   * @default [ 'icon', 'font--icon' ]
   */
  components?: string | string[] | ((component: string) => boolean)

  /**
   * Rules to include transforming target.

   * @default [/\.vue$/, /\.vue\?vue/]
   */
  include?: FilterPattern

  /**
   * Rules to exclude transforming target.
   *
   * @default [/node_modules/, /\.git/ ]
   */
  exclude?: FilterPattern
}
