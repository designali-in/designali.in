import { promises as fs } from "fs";
import { tmpdir } from "os";
import path from "path";
import type { SourceFile } from "ts-morph";
import { Project, ScriptKind } from "ts-morph";
import { z } from "zod";

import { Config } from "../get-config";
import { registryBaseColorSchema } from "../registry/schema";
import { transformCssVars } from "../transformers/transform-css-vars";
import { transformImport } from "../transformers/transform-import";
import { transformJsx } from "../transformers/transform-jsx";
import { transformRsc } from "../transformers/transform-rsc";
import { transformTwPrefixes } from "./transform-tw-prefix";

export type TransformOpts = {
  filename: string;
  raw: string;
  config: Config;
  baseColor?: z.infer<typeof registryBaseColorSchema>;
};

export type Transformer<Output = SourceFile> = (
  opts: TransformOpts & {
    sourceFile: SourceFile;
  },
) => Promise<Output>;

const transformers: Transformer[] = [
  transformImport,
  transformRsc,
  transformCssVars,
  transformTwPrefixes,
];

const project = new Project({
  compilerOptions: {},
});

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
  return path.join(dir, filename);
}

export async function transform(opts: TransformOpts) {
  const tempFile = await createTempSourceFile(opts.filename);
  const sourceFile = project.createSourceFile(tempFile, opts.raw, {
    scriptKind: ScriptKind.TSX,
  });

  for (const transformer of transformers) {
    transformer({ sourceFile, ...opts });
  }

  return await transformJsx({
    sourceFile,
    ...opts,
  });
}
