import {useState, useRef, useEffect} from 'react'
import {utcToZonedTime} from 'date-fns-tz'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInHours from 'date-fns/differenceInHours'
import differenceInDays from 'date-fns/differenceInDays'
import addMinutes from 'date-fns/addMinutes'
import addDays from 'date-fns/addDays'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function generateDeadline(time, unit, date) {
  if (unit === 'minutes') {
    return addMinutes(date, time)
  }

  if (unit === 'days') {
    return addDays(date, time)
  }

  if (unit === 'until') {
    return date
  }
}

export default function useCountdown(time, unit, date = new Date(), endDate = new Date()) {
  const [seconds, setSeconds] = useState(unit === 'seconds' ? time : 0)
  const [minutes, setMinutes] = useState(unit === 'minutes' ? time : 0)
  const [hours, setHours] = useState(unit === 'hours' ? time : 0)
  const [days, setDays] = useState(unit === 'days' ? time : 0)
  const deadline = useRef(generateDeadline(time, unit, date))

  useInterval(() => {
    const zonedDate = utcToZonedTime(deadline.current, 'Asia/Jakarta')
    const current = utcToZonedTime(new Date(), 'Asia/Jakarta')
    const diffInDays = differenceInDays(zonedDate, current)
    const diffInHours = differenceInHours(zonedDate, current) % 24
    const diffInMinutes = differenceInMinutes(zonedDate, current) % 60
    const diffInSeconds = Math.floor(
      differenceInSeconds(zonedDate, current) - diffInDays * 24 * 3600 - diffInHours * 3600 - diffInMinutes * 60
    )
    setSeconds(diffInSeconds < 0 ? 0 : diffInSeconds)
    setMinutes(diffInMinutes < 0 ? 0 : diffInMinutes)
    setHours(diffInHours < 0 ? 0 : diffInHours)
    setDays(diffInDays < 0 ? 0 : diffInDays)

    // setSeconds(diffInSeconds)
    // setMinutes(diffInMinutes)
    // setHours(diffInHours)
    // setDays(diffInDays)
  }, 1000)

  function restart() {
    deadline.current = generateDeadline(time, unit, date)
    setSeconds(unit === 'seconds' ? time : 0)
    setMinutes(unit === 'minutes' ? time : 0)
    setHours(unit === 'hours' ? time : 0)
    setDays(unit === 'days' ? time : 0)
  }

  return {
    seconds,
    minutes,
    hours,
    days,
    restart,
    padStart(number) {
      return String(number).padStart(2, '0')
    },
  }
}

// export function useDeadlineCountdown(deadline) {
//   const [seconds, setSeconds] = useState(0)
//   const [minutes, setMinutes] = useState(0)
//   const [hours, setHours] = useState(0)
//   const [days, setDays] = useState(0)

//   useInterval(() => {
//     const zonedDate = utcToZonedTime(deadline, 'Asia/Jakarta')
//     const current = utcToZonedTime(addDays(new Date(), 10), 'Asia/Jakarta')
//     const diffInDays = differenceInDays(zonedDate, current)
//     const diffInHours = differenceInHours(zonedDate, current) % 24
//     const diffInMinutes = differenceInMinutes(zonedDate, current) % 60
//     const diffInSeconds = Math.floor(
//       differenceInSeconds(zonedDate, current) - diffInDays * 24 * 3600 - diffInHours * 3600 - diffInMinutes * 60
//     )
//     setSeconds(diffInSeconds < 0 ? 0 : diffInSeconds)
//     setMinutes(diffInMinutes < 0 ? 0 : diffInMinutes)
//     setHours(diffInHours < 0 ? 0 : diffInHours)
//     setDays(diffInDays < 0 ? 0 : diffInDays)
//   }, 1000)

//   return {
//     seconds,
//     minutes,
//     hours,
//     days,
//     padStart(number) {
//       return String(number).padStart(2, '0')
//     },
//   }
// }
