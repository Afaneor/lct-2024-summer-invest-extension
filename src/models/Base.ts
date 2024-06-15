import { PermissionRulesProps } from 'src/services/base/types'

export interface BaseModelProps {
  id: string | number
  createdAt: string
  updatedAt: string
  permissionRules: PermissionRulesProps
  contentType: string | number
}
export class BaseModel {
  static modelName = 'base'
  static url() {
    return ''
  }
  static stageTransitionUrl() {
    return ''
  }
  static stageTransitionAllKeysUrl() {
    return ''
  }

  static downloadXlsUrl() {
    return `${this.url()}/excel/`
  }
}
