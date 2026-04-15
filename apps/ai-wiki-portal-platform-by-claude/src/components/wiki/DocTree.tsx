import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@myorg/ui';
import { ChevronDownIcon, ChevronRightIcon, FileTextIcon, FolderIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { wikiDocPath } from '@wiki/routes';
import type { DocumentTreeItem } from '@wiki/types';

interface DocTreeProps {
  items: DocumentTreeItem[];
}

interface CategoryNodeProps {
  item: DocumentTreeItem;
  currentDocId: string | undefined;
}

function CategoryNode({ item, currentDocId }: CategoryNodeProps) {
  const isChildActive = item.children?.some((c) => c.id === currentDocId);
  const [open, setOpen] = useState(isChildActive ?? true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <FolderIcon className="size-4 shrink-0" />
        <span className="flex-1 text-left">{item.title}</span>
        {open ? (
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        ) : (
          <ChevronRightIcon className="size-3.5 text-muted-foreground" />
        )}
      </button>
      {open && item.children && (
        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-2">
          {item.children.map((child) => (
            <SidebarMenuItem key={child.id}>
              <SidebarMenuButton isActive={child.id === currentDocId} asChild size="sm">
                <Link to={wikiDocPath(child.id)}>
                  <FileTextIcon className="size-3.5" />
                  <span>{child.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      )}
    </div>
  );
}

export function DocTree({ items }: DocTreeProps) {
  const { docId } = useParams<{ docId: string }>();

  return (
    <SidebarMenu className="space-y-1">
      {items.map((item) =>
        item.children ? (
          <CategoryNode key={item.id} item={item} currentDocId={docId} />
        ) : (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton isActive={item.id === docId} asChild>
              <Link to={wikiDocPath(item.id)}>
                <FileTextIcon className="size-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ),
      )}
    </SidebarMenu>
  );
}
