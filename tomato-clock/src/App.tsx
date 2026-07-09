import { useRef, useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { usePet } from './hooks/usePet';
import { BACKGROUNDS, DEFAULT_BACKGROUND_ID } from './constants/backgrounds';
import DigitalClock from './components/DigitalClock/DigitalClock';
import VirtualPet from './components/VirtualPet/VirtualPet';
import PetPanel from './components/PetPanel/PetPanel';
import Background from './components/Background/Background';
import BackgroundPicker from './components/BackgroundPicker/BackgroundPicker';
import './App.css';

function App() {
  const [backgroundId, setBackgroundId] = useLocalStorage<string>(
    'tomato-clock-bg',
    DEFAULT_BACKGROUND_ID
  );
  const [is24Hour, setIs24Hour] = useLocalStorage<boolean>(
    'tomato-clock-format',
    true
  );

  const pet = usePet();

  // Music player
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  const bgConfig = BACKGROUNDS.find(b => b.id === backgroundId) || BACKGROUNDS[0];

  return (
    <div className="app">
      <audio ref={audioRef} src="./assets/music.mp3" preload="auto" />
      <Background backgroundClass={bgConfig.className} />
      <main className="main-content">
        <DigitalClock
          is24Hour={is24Hour}
          onToggleFormat={() => setIs24Hour(prev => !prev)}
        />
        <div className="pet-section">
          <VirtualPet
            mood={pet.mood}
            action={pet.action}
            isSwimming={pet.isSwimming}
            hearts={pet.hearts}
            feedMessage={pet.feedMessage}
            onSwim={pet.triggerSwim}
          />
          <PetPanel
            state={pet.state}
            mood={pet.mood}
            action={pet.action}
            money={pet.money}
            coins={pet.coins}
            shopOpen={pet.shopOpen}
            needs={pet.needs}
            inventory={pet.inventory}
            totalFish={pet.totalFish}
            onFeed={pet.feed}
            onPlay={pet.play}
            onSleep={pet.sleep}
            onClean={pet.clean}
            onBuyItem={pet.buyItem}
            onToggleShop={pet.toggleShop}
          />
        </div>
        <BackgroundPicker
          currentId={backgroundId}
          onSelect={setBackgroundId}
        />
      </main>
      {/* Music control button */}
      <button className="music-btn" onClick={toggleMusic} title={musicPlaying ? '暂停音乐' : '播放音乐'}>
        {musicPlaying ? '🔊' : '🔇'}
      </button>
    </div>
  );
}

export default App;
