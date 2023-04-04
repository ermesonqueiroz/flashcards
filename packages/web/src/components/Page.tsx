import { ReactNode } from 'react'
import { FloatingMenu } from './FloatingMenu'
import { Header } from './Header'

export interface PageProps {
  children: ReactNode
  showFloatingButton?: boolean
}

export function Page({ children, showFloatingButton = true }: PageProps) {
  return (
    <>
      <Header />

      {children}

      {showFloatingButton && <FloatingMenu />}
    </>
  )
}