import {useState, useEffect} from 'react'


export const useLocalStorage = (name: string, defaultValue: string): [string, React.Dispatch<React.SetStateAction<string>>] => {

  const [value, setValue] = useState(() => {
    return window.localStorage.getItem(name) || defaultValue
  })

  useEffect(() => {
    if (value) {
      window.localStorage.setItem(name, value)
    } else {
      window.localStorage.removeItem(name)
    }
  }, [name, value])

  return [value, setValue]
}