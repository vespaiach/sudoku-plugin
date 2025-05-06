// Adding a global type definition for Cell
declare global {
  interface Cell {
    value: string
    prefilled: boolean
    editing: boolean
  }
}

export {}
