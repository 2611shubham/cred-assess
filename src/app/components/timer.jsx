import { Stack, Typography } from "@mui/material"
import { createRef, useEffect, useState } from "react";

const Timer = ({ lastRemainingTime, onTimerEnd }) => {

    const [timeRemaining, setTimeRemaining] = useState(300);

    const timerRemainingRef = createRef(300);
    const timerRef = createRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            const time = timerRemainingRef.current || timeRemaining
            setTimeRemaining(time - 1)
            timerRemainingRef.current = time - 1
        }, 1000)
        return () => {
            clearInterval(timerRef.current)
        }
    }, [])

    useEffect(() => {
        if (Number.isInteger(lastRemainingTime)) {
            setTimeRemaining(lastRemainingTime)
            timerRemainingRef.current = lastRemainingTime;
        }
    }, [lastRemainingTime])

    useEffect(() => {
        if (timeRemaining === 0) {
            setTimeout(() => {
                clearInterval(timerRef.current)
                onTimerEnd()
            }, 0)
        }
    }, [timeRemaining, onTimerEnd])

    return <Stack>
        <Typography fontSize={"64px"} fontWeight={500} color={"#fff"} className="remaining-time" >
            0{parseInt(timeRemaining / 60)} : {timeRemaining % 60 < 10 ? "0" + (timeRemaining % 60) : timeRemaining % 60}
        </Typography>
    </Stack>

}


export default Timer;