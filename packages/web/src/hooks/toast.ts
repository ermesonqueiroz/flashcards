import { useToast, UseToastOptions } from "@chakra-ui/react"

export const useAppToast = () => {
  const toast = useToast()

  return (props: UseToastOptions) => {
    toast({
      isClosable: true,
      duration: 5000,
      position: 'bottom-left',
      ...props,
    })
  }
}