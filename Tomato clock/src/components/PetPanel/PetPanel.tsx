import type { PetState, ShopItem, CoinAnimation, Inventory } from '../../types';
import { SHOP_ITEMS } from '../../constants/petConfig';
import './PetPanel.css';

interface PetPanelProps {
  state: PetState;
  mood: string;
  action: string;
  money: number;
  coins: CoinAnimation[];
  shopOpen: boolean;
  needs: string[];
  inventory: Inventory;
  totalFish: number;
  onFeed: () => boolean | undefined;
  onPlay: () => void;
  onSleep: () => void;
  onClean: () => void;
  onBuyItem: (item: ShopItem) => boolean;
  onToggleShop: () => void;
}

function StatBar({ label, value, icon }: { label: string; value: number; icon: string }) {
  const getColor = (v: number) => {
    if (v > 60) return 'stat-bar__fill--high';
    if (v > 30) return 'stat-bar__fill--mid';
    return 'stat-bar__fill--low';
  };

  return (
    <div className="stat-bar">
      <span className="stat-bar__label">{icon} {label}</span>
      <div className="stat-bar__track">
        <div className={`stat-bar__fill ${getColor(value)}`} style={{ width: `${value}%` }} />
      </div>
      <span className="stat-bar__value">{Math.round(value)}%</span>
    </div>
  );
}

export default function PetPanel({ state, mood, action, money, coins, shopOpen, needs, inventory, totalFish, onFeed, onPlay, onSleep, onClean, onBuyItem, onToggleShop }: PetPanelProps) {
  const isIdle = action === 'idle';
  const hasFish = totalFish > 0;

  return (
    <div className="pet-panel">
      {/* Money & Inventory display */}
      <div className="top-bar">
        <div className="money-display">
          <span className="money-icon">🪙</span>
          <span className="money-amount">{money}</span>
        </div>
        <div className="inventory-display">
          <span className="inv-item" title="小鱼">🐟 {inventory.fish}</span>
          <span className="inv-item" title="金枪鱼">🐠 {inventory['premium-fish']}</span>
        </div>
      </div>

      {/* Coin animations */}
      {coins.map(coin => (
        <div
          key={coin.id}
          className="coin-animation"
          style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
        >
          +1 🪙
        </div>
      ))}

      {/* Needs indicator */}
      {needs.length > 0 && (
        <div className="needs-indicator">
          {needs.map((need, i) => (
            <span key={i} className="need-tag">{need}</span>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="pet-actions">
        <button
          className={`pet-btn ${!hasFish ? 'pet-btn--no-stock' : ''}`}
          onClick={() => { if (hasFish) onFeed(); }}
          disabled={!isIdle || !hasFish}
          title={hasFish ? '喂食' : '没有食物！去商店购买'}
        >
          <span className="pet-btn__icon">🐟</span>
          <span className="pet-btn__label">喂食</span>
          {hasFish && <span className="pet-btn__count">{totalFish}</span>}
        </button>
        <button className="pet-btn" onClick={onPlay} disabled={!isIdle} title="玩耍">
          <span className="pet-btn__icon">🫧</span>
          <span className="pet-btn__label">玩耍</span>
        </button>
        <button className="pet-btn" onClick={onSleep} disabled={!isIdle} title="睡觉">
          <span className="pet-btn__icon">🌙</span>
          <span className="pet-btn__label">睡觉</span>
        </button>
        <button className="pet-btn" onClick={onClean} disabled={!isIdle} title="清洁">
          <span className="pet-btn__icon">✨</span>
          <span className="pet-btn__label">清洁</span>
        </button>
        <button className={`pet-btn pet-btn--shop ${shopOpen ? 'pet-btn--active' : ''}`} onClick={onToggleShop} title="商店">
          <span className="pet-btn__icon">🏪</span>
          <span className="pet-btn__label">商店</span>
        </button>
      </div>

      {/* Shop */}
      {shopOpen && (
        <div className="shop-panel">
          <h3 className="shop-title">🏪 海洋商店</h3>
          <div className="shop-grid">
            {SHOP_ITEMS.map(item => {
              const canAfford = money >= item.cost;
              return (
                <button
                  key={item.id}
                  className={`shop-item ${canAfford ? '' : 'shop-item--disabled'}`}
                  onClick={() => canAfford && onBuyItem(item)}
                  disabled={!canAfford || !isIdle}
                  title={item.description}
                >
                  <span className="shop-item__icon">{item.icon}</span>
                  <span className="shop-item__name">{item.name}</span>
                  <span className="shop-item__cost">🪙 {item.cost}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="pet-status">
        <div className="pet-status__header">
          <span className="pet-status__mood">
            {mood === 'happy' && '🐬 心情不错'}
            {mood === 'hungry' && '🐟 有点饿'}
            {mood === 'tired' && '💤 困了'}
            {mood === 'bored' && '🫧 无聊'}
            {mood === 'sick' && '🤒 不舒服'}
          </span>
        </div>
        <div className="pet-stats">
          <StatBar label="饱腹" value={state.hunger} icon="🐟" />
          <StatBar label="心情" value={state.happiness} icon="🫧" />
          <StatBar label="精力" value={state.energy} icon="🌙" />
          <StatBar label="清洁" value={state.cleanliness} icon="✨" />
        </div>
      </div>
    </div>
  );
}
