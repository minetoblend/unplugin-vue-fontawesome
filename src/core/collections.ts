import { Arrayable, toArray } from "@antfu/utils";
import { IconCollection, IconCollectionMap, PresetName } from "../types";

export const proSolid: IconCollection = {
  name: "solid",
  id: "fa-solid",
  prefix: "fas",
  module: "@fortawesome/pro-solid-svg-icons",
};

export const proRegular: IconCollection = {
  name: "regular",
  id: "fa-regular",
  prefix: "far",
  module: "@fortawesome/pro-regular-svg-icons",
};

export const proLight: IconCollection = {
  name: "light",
  id: "fa-light",
  prefix: "fal",
  module: "@fortawesome/pro-light-svg-icons",
};

export const proThin: IconCollection = {
  name: "thin",
  id: "fa-thin",
  prefix: "fat",
  module: "@fortawesome/pro-thin-svg-icons",
};

export const proDuotone: IconCollection = {
  name: "duotone",
  id: "fa-duotone",
  prefix: "fad",
  module: "@fortawesome/pro-duotone-svg-icons",
};

export const sharpSolid: IconCollection = {
  name: "sharp-solid",
  id: ["fa-sharp", "fa-solid"],
  prefix: "fass",
  module: "@fortawesome/sharp-solid-svg-icons",
};

export const sharpRegular: IconCollection = {
  name: "sharp-regular",
  id: ["fa-sharp", "fa-regular"],
  prefix: "fasr",
  module: "@fortawesome/sharp-regular-svg-icons",
};

export const sharpLight: IconCollection = {
  name: "sharp-light",
  id: ["fa-sharp", "fa-light"],
  prefix: "fasl",
  module: "@fortawesome/sharp-light-svg-icons",
};

export const freeSolid: IconCollection = {
  name: "solid",
  id: "fa-solid",
  prefix: "fas",
  module: "@fortawesome/free-solid-svg-icons",
};

export const freeRegular: IconCollection = {
  name: "regular",
  id: "fa-regular",
  prefix: "far",
  module: "@fortawesome/free-regular-svg-icons",
};

export const freeBrands: IconCollection = {
  name: "brands",
  id: "fa-brands",
  prefix: "fab",
  module: "@fortawesome/free-brands-svg-icons",
};

export const proIcons = [
  proSolid,
  proRegular,
  proLight,
  proThin,
  proDuotone,
  sharpSolid,
  sharpRegular,
  sharpLight,
];

export const freeIcons = [freeSolid, freeRegular, freeBrands];

export const iconPresets = {
  pro: proIcons,
  free: freeIcons,
  "pro-solid": proSolid,
  "pro-regular": proRegular,
  "pro-light": proLight,
  "pro-thin": proThin,
  "pro-duotone": proDuotone,
  "sharp-solid": sharpSolid,
  "sharp-regular": sharpRegular,
  "sharp-light": sharpLight,
  "free-solid": freeSolid,
  "free-regular": freeRegular,
  "free-brands": freeBrands,
};

export function normalizeCollections(
  collections: Arrayable<PresetName | IconCollection>
) {
  const collectionList = [] as IconCollection[];

  for (const collection of toArray(collections)) {
    if (typeof collection === "string") {
      if (!(collection in iconPresets)) {
        throw new Error(`Invalid collection preset: ${collection}`);
      }
      const preset = iconPresets[collection];

      collectionList.push(...toArray(preset));
    } else {
      collectionList.push(collection);
    }
  }

  return collectionList;
}
