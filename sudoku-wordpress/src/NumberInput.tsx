import { useEffect, useRef } from 'react'
import { Input } from './styled-components'


interface NumberInputProps {
  cell: Cell
  onChange: (cell: Cell) => void
}



export function NumberInput({ cell, onChange }: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [])

  const handleChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value
    if (newValue === '' || newValue.match(/^[1-9]$/)) {
      cell.value = newValue ?? ''
    }
    onChange(cell)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleChange({ target: { value: cell.value } })
    }
  }

  return (
    <Input
      ref={inputRef}
      type="tel"
      value={cell.value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="w-full h-full text-center border-none outline-none p-0"
      maxLength={1}
    />
  )
}
