import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/cars/')({
  component: CarsUser,
})

function CarsUser() {
  return (
    <div>
      <h1>Cars User</h1>
    </div>
  )
}
