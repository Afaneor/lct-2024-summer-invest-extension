import { FilterConfirmProps } from 'antd/lib/table/interface'

export interface SomeObject {
  [key: string]: any
}

export interface FilterDropdownProps {
  setSelectedKeys: (val: string[]) => void
  selectedKeys: string[]
  confirm: (param?: FilterConfirmProps) => void
  clearFilters: () => void
  close: () => void
}
