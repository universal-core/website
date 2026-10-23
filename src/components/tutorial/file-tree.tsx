import clsx from "clsx";
import React from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscFile,
  VscFolder,
  VscFolderOpened,
} from "react-icons/vsc";
import type { TreeNode } from "./state";

type Props = {
  nodes: TreeNode[];
  active: string | null;
  collapsed: Set<string>;
  onToggle: (path: string) => void;
  onOpen: (path: string) => void;
  depth?: number;
};

export const FileTree = ({ nodes, active, collapsed, onToggle, onOpen, depth = 0 }: Props) => (
  <ul className="uc-tutorial__tree" role={depth === 0 ? "tree" : "group"}>
    {nodes.map((node) => {
      const indent = { paddingLeft: `${8 + depth * 12}px` };
      if (!node.children) {
        return (
          <li key={node.path} role="treeitem" aria-selected={node.path === active}>
            <button
              type="button"
              className={clsx(
                "uc-tutorial__node",
                node.path === active && "uc-tutorial__node--active",
              )}
              style={indent}
              title={node.path}
              onClick={() => onOpen(node.path)}
            >
              <span className="uc-tutorial__chevron" />
              <VscFile />
              <span className="uc-tutorial__name">{node.name}</span>
            </button>
          </li>
        );
      }
      const open = !collapsed.has(node.path);
      return (
        <li key={node.path} role="treeitem" aria-expanded={open}>
          <button
            type="button"
            className="uc-tutorial__node uc-tutorial__node--folder"
            style={indent}
            title={node.path}
            onClick={() => onToggle(node.path)}
          >
            <span className="uc-tutorial__chevron">
              {open ? <VscChevronDown /> : <VscChevronRight />}
            </span>
            {open ? <VscFolderOpened /> : <VscFolder />}
            <span className="uc-tutorial__name">{node.name}</span>
          </button>
          {open ? (
            <FileTree
              nodes={node.children}
              active={active}
              collapsed={collapsed}
              onToggle={onToggle}
              onOpen={onOpen}
              depth={depth + 1}
            />
          ) : null}
        </li>
      );
    })}
  </ul>
);
