import type { Registry } from "@/registry/schema";
import { blocks } from "@/registry/registry-blocks";
import { charts } from "@/registry/registry-charts";
import { examples } from "@/registry/registry-examples";
import { hooks } from "@/registry/registry-hooks";
import { internal } from "@/registry/registry-internal";
import { lib } from "@/registry/registry-lib";
import { themes } from "@/registry/registry-themes";
import { ui } from "@/registry/registry-ui";
import { v0 } from "@/registry/registry-v0";

export const registry: Registry = [
  ...ui,
  ...internal,
  ...examples,
  ...blocks,
  ...charts,
  ...lib,
  ...hooks,
  ...themes,
  ...v0,
];
