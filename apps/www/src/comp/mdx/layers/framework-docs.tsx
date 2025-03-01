"use client";

import * as React from "react";
import { allDocuments } from "contentlayer/generated";

import Mdx from "./mdx";

interface FrameworkDocsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: string;
}

export function FrameworkDocs({ ...props }: FrameworkDocsProps) {
  const frameworkDoc = allDocuments.find(
    (doc) => doc.slug === `/docs/installation/${props.data}`,
  );

  if (!frameworkDoc) {
    return null;
  }

  return <Mdx code={frameworkDoc.body.code} />;
}
