import {useState, useEffect} from 'react'

export function useDebounceValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const resizeMode = {
  cover: 'cover',
  contain: 'contain',
  stretch: 'stretch',
  center: 'center',
  repeat: 'repeat',
}
