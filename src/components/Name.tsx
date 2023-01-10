import { useState } from 'react'

type SeachProps = {
  loadUser: (userName: string) => Promise<void>
}

export function Name({ loadUser }: SeachProps) {
  const [userName, setUserName] = useState('')

  return <span className="capitalize text-gray-600"></span>
}
