import { BACKGROUNDS } from '../../constants/backgrounds';
import './BackgroundPicker.css';

interface BackgroundPickerProps {
  currentId: string;
  onSelect: (id: string) => void;
}

const PREVIEW_COLORS: Record<string, string> = {
  'deep-sea': 'linear-gradient(180deg, #0a2342, #1b6ca8)',
  'tropical': 'linear-gradient(180deg, #00b4d8, #023e8a)',
  'sunset-ocean': 'linear-gradient(180deg, #ff6b35, #1b6ca8)',
  'arctic': 'linear-gradient(180deg, #a8dadc, #1d3557)',
  'bioluminescent': 'linear-gradient(180deg, #020122, #003566)',
  'bubbles': 'linear-gradient(180deg, #0a2342, #1b6ca8)',
  'coral-reef': 'linear-gradient(180deg, #0077b6, #001d3d)',
  'underwater': 'linear-gradient(180deg, #0d3b66, #48cae4)',
  'aurora-ocean': 'linear-gradient(180deg, #001d3d, #90e0ef)',
  'pixel-coral': 'linear-gradient(180deg, #0a2342, #e74c3c 80%, #c2a878)',
  'midnight': '#0a0e1a',
  'navy': '#0d1b2a',
  'teal': '#0a3d3d',
};

export default function BackgroundPicker({ currentId, onSelect }: BackgroundPickerProps) {
  return (
    <div className="background-picker">
      {BACKGROUNDS.map(bg => (
        <button
          key={bg.id}
          className={`bg-dot ${currentId === bg.id ? 'bg-dot--active' : ''}`}
          onClick={() => onSelect(bg.id)}
          title={bg.name}
          style={{ background: PREVIEW_COLORS[bg.id] || '#333' }}
        />
      ))}
    </div>
  );
}
