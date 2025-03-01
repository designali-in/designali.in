"use client";

import { Fragment } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxTree } from "@/components/ui/checkbox-tree";
import { Label } from "@/components/ui/label";

interface TreeNode {
  id: string;
  label: string;
  defaultChecked?: boolean;
  children?: TreeNode[];
}

const initialTree: TreeNode = {
  id: "natural-wonders",
  label: "Natural Wonders",
  children: [
    { id: "mountains", label: "Mountains", defaultChecked: true },
    {
      id: "waterfalls",
      label: "Waterfalls",
      children: [
        { id: "niagara", label: "Niagara Falls" },
        { id: "angel-falls", label: "Angel Falls", defaultChecked: true },
      ],
    },
    { id: "grand-canyon", label: "Grand Canyon" },
  ],
};

export default function CheckboxDemo() {
  return (
    <div className="space-y-3">
      <CheckboxTree
        tree={initialTree}
        renderNode={({ node, isChecked, onCheckedChange, children }) => (
          <Fragment key={node.id}>
            <div className="flex items-center gap-2">
              <Checkbox
                id={node.id}
                checked={isChecked}
                onCheckedChange={onCheckedChange}
              />
              <Label htmlFor={node.id}>{node.label}</Label>
            </div>
            {children && <div className="ms-6 space-y-3">{children}</div>}
          </Fragment>
        )}
      />
    </div>
  );
}
