import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table';

function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  pageSize = 10,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: keyof TData & string;
  pageSize?: number;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [query, setQuery] = React.useState('');

  const filteredData = React.useMemo(() => {
    if (!searchKey || !query) {
      return data;
    }

    return data.filter((item) =>
      String(item[searchKey] ?? '')
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [data, query, searchKey]);

  const table = useReactTable({
    data: filteredData,
    columns,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="grid gap-4">
      {searchKey ? (
        <Input
          aria-label="Search rows"
          className="max-w-sm"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      ) : null}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export type { ColumnDef };
export { DataTable };
