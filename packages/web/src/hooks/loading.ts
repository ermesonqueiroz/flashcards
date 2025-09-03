import { useState } from "react"

type AnyFunction = (...args: any[]) => Promise<any>

export function useLoading() {
  const [loading, setLoading] = useState(false)

  function withLoading<T extends AnyFunction = AnyFunction>(callback: T) {
    return async (...props: Parameters<T>): Promise<ReturnType<T>> => {
      try {
        setLoading(true)
        return await callback(...props)
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