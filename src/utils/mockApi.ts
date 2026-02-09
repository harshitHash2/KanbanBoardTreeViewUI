import type { TreeNodeModel } from "../types/Node";

export const fetchChildNodes = (parentId: string): Promise<TreeNodeModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: `${parentId}-1`,
          name: "Level A",
          hasChildren: true
        },
        {
          id: `${parentId}-2`,
          name: "Level A"
        }
      ]);
    }, 800);
  });
};
