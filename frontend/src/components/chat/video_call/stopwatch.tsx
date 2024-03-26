import { Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const Stopwatch: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 59) {
        setSeconds(0)
        if (minutes === 59) {
          setMinutes(0)
          setHours((prevHours) => prevHours + 1)
        } else {
          setMinutes((prevMinutes) => prevMinutes + 1)
        }
      } else {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds, minutes, hours])

  useEffect(() => {
    return () => {
      setSeconds(0)
      setMinutes(0)
      setHours(0)
    }
  }, [])

  return (
      <Box>
        {hours.toString().padStart(2, '0')} :{' '}
        {minutes.toString().padStart(2, '0')} :{' '}
        {seconds.toString().padStart(2, '0')}
      </Box>
  )
}

export default Stopwatch
