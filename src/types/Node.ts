export interface TreeNodeModel {
  id: string;
  name: string;
  children?: TreeNodeModel[];
  hasChildren?: boolean; // for lazy loading
  isExpanded?: boolean;
}
