import { useState, useEffect } from 'react';

interface ClockState {
  hours: number;
  minutes: number;
  seconds: number;
  date: Date;
}

export function useClock(is24Hour: boolean) {
  const [time, setTime] = useState<ClockState>(() => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      date: now,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        date: now,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const displayHours = is24Hour ? time.hours : time.hours % 12 || 12;

  const pad = (n: number) => n.toString().padStart(2, '0');

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const dateStr = `${time.date.getFullYear()}年${pad(time.date.getMonth() + 1)}月${pad(time.date.getDate())}日 星期${weekDays[time.date.getDay()]}`;

  return {
    hours: pad(displayHours),
    minutes: pad(time.minutes),
    seconds: pad(time.seconds),
    dateStr,
    isPm: time.hours >= 12,
  };
}
