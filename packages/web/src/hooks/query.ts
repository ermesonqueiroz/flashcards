import { useState } from "react"
import { api } from "../lib/api"

export function useQuery<T>(url = '') {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<T>()

  async function execute() {
    try {
      setIsLoading(true)
      const { data } = await api.get<T>(url)
      setData(data)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    execute,
    data,
    isLoading
  };
}