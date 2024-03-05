import React from 'react'
import { ReactNode } from 'react'
// combines multiple context (Pills and Tracks) for cleaner code

export const combineComponents = (...components: any) => {
  return components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      return ({ children }: any) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }: { children: ReactNode }) => <>{children}</>
  )
}
