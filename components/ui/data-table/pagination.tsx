'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { type RowData } from '@tanstack/react-table'

import { type AppReactTable as Table } from './table-features'

import { SelectWrapper } from '@/components/ui/select'
import { useUIText } from '@/components/ui/ui-provider'
import { Button } from '@/components/ui/button'

interface PaginationProps<TData extends RowData> {
  table: Table<TData>
}

export function Pagination<TData extends RowData>({ table }: PaginationProps<TData>) {
  const text = useUIText()

  return (
    <div className="flex items-center justify-between flex-wrap gap-2 px-2 mt-4">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {text.totalRows(table.getFilteredRowModel().rows.length)}
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xs">{text.rowsPerPage}</p>
        <SelectWrapper
          value={`${table.state.pagination.pageSize}`}
          onValueChange={value => table.setPageSize(Number(value))}
          items={[10, 20, 30, 40, 50]}
          placeholder={`${table.state.pagination.pageSize}`}
          triggerCls="h-8 w-[70px]"
        />
      </div>

      <div className="text-xs mx-2">
        {text.pageOf(table.state.pagination.pageIndex + 1, table.getPageCount())}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">{text.firstPage}</span>
          <ChevronsLeft className="size-4" />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">{text.previousPage}</span>
          <ChevronLeft className="size-4" />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">{text.nextPage}</span>
          <ChevronRight className="size-4" />
        </Button>

        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">{text.lastPage}</span>
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
