import { useState } from "react"

type AnyFunction = (...args: any[]) => Promise<void>

export function useLoading() {
  const [loading, setLoading] = useState(false)

  function withLoading<T extends AnyFunction = AnyFunction>(callback: T) {
    return async (...props: Parameters<T>): Promise<void> => {
      try {
        setLoading(true)
        await callback(...props)
      } finally {
        setLoading(false)
      }
    }
  }

  return {
    loading,
    withLoading
  }
}