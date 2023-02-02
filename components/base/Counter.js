import { useState, useEffect, useRef } from 'react'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'

export default function Counter({ defaultCounter = 0, max = Infinity, min = 0, onChange }) {
  const [counter, setCounter] = useState(() => defaultCounter)
  const counterRef = useRef(defaultCounter)

  useEffect(() => {
    setCounter(defaultCounter)
  }, [defaultCounter])

  useEffect(() => {
    if (onChange && counter !== counterRef.current) {
      onChange(counter)
      counterRef.current = null
    }
  }, [counter])

  useEffect(() => {
    setCounter(defaultCounter)
  }, [max])

  function decreaseCounter() {
    if (counter !== min) {
      setCounter(counter - 1)
    }
  }

  function increaseCounter() {
    if (counter !== max) {
      setCounter(counter + 1)
    }
  }

  return (
    <>
      <MinusCircleIcon
        onClick={decreaseCounter}
        className={`w-9 h-9 cursor-pointer svg-width-custom ${counter === min ? 'text-gray-400 cursor-not-allowed' : 'text-green-500 cursor-pointer'
          }`}
      />
      <h5 className="font-medium text-gray-900">{counter}</h5>
      <PlusCircleIcon
        onClick={increaseCounter}
        className={`w-9 h-9 cursor-pointer svg-width-custom ${counter === max ? 'text-gray-400 cursor-not-allowed' : 'text-green-500 cursor-pointer'
          }`}
      />
    </>
  )
}
