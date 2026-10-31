'use client'

import * as React from 'react'

type uiTextT = {
  enterPlaceholder: (label: string) => string
  selectPlaceholder: (label: string) => string
  loading: string
  noItems: string
  noResults: string
  cancel: string
  confirm: string
  close: string
  remove: string
  confirmTitle: string
  confirmDescription: string
  pickDate: string
  pickDateTime: string
  time: string
  selectTime: string
  previous: string
  next: string
  previousSlide: string
  nextSlide: string
  totalRows: (count: number) => string
  rowsPerPage: string
  pageOf: (page: number, pageCount: number) => string
  firstPage: string
  previousPage: string
  nextPage: string
  lastPage: string
  toggleSidebar: string
}

const defaultUIText: uiTextT = {
  enterPlaceholder: label => `Enter ${label}`,
  selectPlaceholder: label => `Select ${label}`,
  loading: 'Loading...',
  noItems: 'No items found',
  noResults: 'No matching results.',
  cancel: 'Cancel',
  confirm: 'Confirm',
  close: 'Close',
  remove: 'Remove',
  confirmTitle: 'Are you absolutely sure?',
  confirmDescription:
    'This action cannot be undone. This will permanently remove your data from our servers.',
  pickDate: 'Pick a date',
  pickDateTime: 'Pick date & time',
  time: 'Time',
  selectTime: 'Select time',
  previous: 'Previous',
  next: 'Next',
  previousSlide: 'Previous slide',
  nextSlide: 'Next slide',
  totalRows: count => `Total: ${count} row(s)`,
  rowsPerPage: 'Rows per page',
  pageOf: (page, pageCount) => `Page ${page} of ${pageCount}`,
  firstPage: 'Go to first page',
  previousPage: 'Go to previous page',
  nextPage: 'Go to next page',
  lastPage: 'Go to last page',
  toggleSidebar: 'Toggle Sidebar',
}

const UITextContext = React.createContext<uiTextT>(defaultUIText)

type UIProviderProps = {
  text?: Partial<uiTextT>
  children: React.ReactNode
}

function UIProvider({ text, children }: UIProviderProps) {
  const parent = React.useContext(UITextContext)
  const value = React.useMemo(() => ({ ...parent, ...text }), [parent, text])

  return <UITextContext.Provider value={value}>{children}</UITextContext.Provider>
}

function useUIText() {
  return React.useContext(UITextContext)
}

export { UIProvider, useUIText, defaultUIText, type uiTextT, type UIProviderProps }
