export const SHOW_ALL = 'show_all' as const
export const SHOW_COMPLETED = 'show_completed' as const
export const SHOW_ACTIVE = 'show_active' as const

export type FiltersType = typeof SHOW_ALL | typeof SHOW_COMPLETED | typeof SHOW_ACTIVE;