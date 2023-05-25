import {
  AttributeNode,
  DirectiveNode,
  parse,
  transform,
} from "@vue/compiler-dom";
import { Context } from "./ctx";
import { IconInfo } from "../types";

const arrayIconRE = /\[['"]([\w-]+)['"]\s*,\s*[['"]([\w-]+)['"]\]/;

export function detectIcons(code: string, ctx: Context) {
  const root = parse(code);

  const icons = new Map<string, IconInfo>();

  function iconId(icon: IconInfo) {
    return [icon.name, icon.collection.id].flat().join("-");
  }

  transform(root, {
    nodeTransforms: [
      (node) => {
        if (node.type === 1 /* ELEMENT */ && ctx.filterComponent(node.tag)) {
          node.props.forEach((prop, index) => {
            if (prop.type === 6 /* ATTRIBUTE */) {
              detectIconsInAttribute(prop);
            } else if (prop.type === 7 /* DIRECTIVE */) {
              detectIconsInDirective(prop);
            }
          });
        }
      },
    ],
  });

  function detectIconsInAttribute(prop: AttributeNode) {
    if (ctx.filterProp(prop.name) && prop.value) {
      const content = prop.value.content.split(" ");

      let icon: IconInfo | undefined = undefined;
      if (content.length > 1) {
        icon = ctx.resolveIcon({
          name: content.pop()!,
          id: content,
        });
      } else if (content.length === 1) {
        icon = ctx.resolveIcon({
          name: content[0],
        });
      }
      if (icon) {
        const id = iconId(icon);

        if (!icons.has(id)) {
          icons.set(id, icon);
        }
      }
    }
  }

  function detectIconsInDirective(directive: DirectiveNode) {
    if (
      directive.name === "bind" &&
      directive.arg?.type === 4 /* SIMPLE_EXPRESSION */ &&
      directive.exp?.type === 4 /* SIMPLE_EXPRESSION */ &&
      ctx.filterProp(directive.arg.content)
    ) {
      const match = directive.exp.content.match(arrayIconRE);
      if (match) {
        const prefix = match[1];
        const name = match[2];
        const icon = ctx.resolveIcon({ name, prefix });

        if (icon) {
          const id = iconId(icon);

          if (!icons.has(id)) {
            icons.set(id, icon);
          }
        }
      }
    }
  }

  return [...icons.values()];
}
