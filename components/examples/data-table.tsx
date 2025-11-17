"use client";

import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Employee, employees } from "./data";

import { Input } from '@/components/ui/input';
import {
  ColumnFacetedFilter,
  ColumnFilter,
  ColumnHeader,
  ColumnSorter,
  ColumnToggle,
  DataTable,
  FilterGroup,
  Pagination,
  useTable,
} from "@/components/ui/data-table";

const StatusBadge = ({ status }: { status: Employee['status'] }) => {
  const statusConfig = {
    active: { icon: CheckCircle2, color: 'text-green-600 bg-green-50', label: 'Active' },
    inactive: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Inactive' },
    pending: { icon: Clock, color: 'text-yellow-600 bg-yellow-50', label: 'Pending' },
    'on-leave': { icon: AlertCircle, color: 'text-blue-600 bg-blue-50', label: 'On Leave' }
  }

  const config = statusConfig[status]

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </div>
  )
}

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <ColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnSorter column={column} title="Name" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="text-xs text-muted-foreground">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'department',
    header: ({ column }) => <ColumnSorter column={column} title="Department" />,
    cell: ({ row }) => <div>{row.getValue('department')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <ColumnSorter column={column} title="Role" />,
    cell: ({ row }) => <div>{row.getValue('role')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'salary',
    header: ({ column }) => <ColumnSorter column={column} title="Salary" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('salary'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'joinDate',
    header: ({ column }) => <ColumnSorter column={column} title="Join Date" />,
    cell: ({ row }) => <div className="text-xs">{row.getValue('joinDate')}</div>,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <ColumnSorter column={column} title="Location" />,
    cell: ({ row }) => <div>{row.getValue('location')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
  { label: 'On Leave', value: 'on-leave' },
]

const filterOptions = [
  {
    key: 'department',
    lable: 'Department',
    options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
  },
  {
    key: 'role',
    lable: 'Role',
    options: ['Manager', 'Senior', 'Junior', 'Lead', 'Intern']
  },
  {
    key: 'location',
    lable: 'Location',
    options: ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin']
  }
]

export function DataTableExample() {
  const table = useTable({ data: employees, columns })

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-3">
        <Input
          className='w-60'
          value={table.getState().globalFilter}
          onChange={e => table.setGlobalFilter(e.target.value)}
          placeholder='Search anything...'
        />

        <ColumnFilter
          title="Role"
          column={table.getColumn('role')}
          options={['Manager', 'Senior', 'Junior', 'Lead', 'Intern']}
        />

        <ColumnFacetedFilter
          title="Status"
          column={table.getColumn('status')}
          options={statusOptions}
        />

        <FilterGroup
          table={table}
          options={filterOptions}
        />

        <ColumnToggle table={table} />
      </div>

      <div className="rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <DataTable
            table={table}
            emptyMessage="No employees found."
          />
        </div>
      </div>

      <Pagination table={table} />
    </div>
  )
}
