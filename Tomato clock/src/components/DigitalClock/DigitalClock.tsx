import { useClock } from '../../hooks/useClock';
import './DigitalClock.css';

interface DigitalClockProps {
  is24Hour: boolean;
  onToggleFormat: () => void;
}

export default function DigitalClock({ is24Hour, onToggleFormat }: DigitalClockProps) {
  const { hours, minutes, seconds, dateStr } = useClock(is24Hour);

  return (
    <div className="digital-clock">
      <div className="clock-display">
        <DigitGroup value={hours} />
        <span className="clock-colon">:</span>
        <DigitGroup value={minutes} />
        <span className="clock-colon">:</span>
        <DigitGroup value={seconds} />
      </div>
      <div className="clock-date">{dateStr}</div>
      <button className="clock-format-btn" onClick={onToggleFormat}>
        {is24Hour ? '24H' : '12H'}
      </button>
    </div>
  );
}

function DigitGroup({ value }: { value: string }) {
  return (
    <span className="digit-group">
      {value.split('').map((d, i) => (
        <span key={i} className="digit">{d}</span>
      ))}
    </span>
  );
}
