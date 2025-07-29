// src/components/MenuDisplay.tsx (예시)
import React from 'react';
import type { MenuItem, FixedMenuItem, CustomizableMenuItem, Ingredient } from '../types/menu';

interface MenuDisplayProps {
  menu: MenuItem[]; // MenuItem 배열을 props로 받습니다.
  onAddToCart: (item: MenuItem, options?: { selectedIngredients?: Ingredient[], size?: 'small' | 'medium' | 'large', spicyLevel?: number }) => void;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ menu, onAddToCart }) => {

  // 메뉴 아이템이 FixedMenuItem인지 확인하는 타입 가드
  const isFixedMenuItem = (item: MenuItem): item is FixedMenuItem => {
    return item.type === 'fixed';
  };

  // 메뉴 아이템이 CustomizableMenuItem인지 확인하는 타입 가드
  const isCustomizableMenuItem = (item: MenuItem): item is CustomizableMenuItem => {
    return item.type === 'customizable';
  };

  return (
    <div>
      <h2>메뉴</h2>
      {menu.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{item.name} ({item.basePrice.toLocaleString()}원)</h3>
          <p>카테고리: {item.category}</p>

          {isFixedMenuItem(item) && ( // FixedMenuItem일 경우에만 해당 속성 렌더링
            <div>
              {item.size && <p>사이즈: {item.size}</p>}
              {item.spicy !== undefined && <p>매운맛: {item.spicy ? '있음' : '없음'}</p>}
              <button onClick={() => onAddToCart(item)}>카트에 추가</button>
            </div>
          )}

          {isCustomizableMenuItem(item) && ( // CustomizableMenuItem일 경우에만 해당 속성 렌더링
            <div>
              <p>기본 가격: {item.basePrice.toLocaleString()}원</p>
              <p>매운맛 단계: {item.spicyLevel || '없음'}</p>
              <h4>추가 가능 재료:</h4>
              <ul>
                {item.availableIngredients.map(ingredient => (
                  <li key={ingredient.id}>
                    {ingredient.name} ({ingredient.price.toLocaleString()}원)
                    {/* 여기에 재료 추가/삭제 로직 (버튼 등) 추가 */}
                  </li>
                ))}
              </ul>
              {/* 실제 선택된 재료는 별도의 상태에서 관리하거나, 주문 시점에 최종 계산 */}
              <button onClick={() => onAddToCart(item, { selectedIngredients: item.selectedIngredients, spicyLevel: item.spicyLevel })}>
                카트에 추가 (커스터마이징)
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuDisplay;