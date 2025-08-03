// src/components/MenuDisplay.tsx
import React, { useState } from 'react'; // useState 훅을 가져옵니다.
import type { MenuItem, FixedMenuItem, CustomizableMenuItem, Ingredient } from '../types/menu';

interface MenuDisplayProps {
  menu: MenuItem[];
  onAddToCart: (item: MenuItem, options?: { selectedIngredients?: Ingredient[], size?: 'small' | 'medium' | 'large', spicyLevel?: number }) => void;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ menu, onAddToCart }) => {

  // 각 CustomizableMenuItem의 현재 선택된 재료와 매운맛 수준을 로컬 상태로 관리합니다.
  // 이 상태는 임시로 UI에서만 사용되며, 실제 카트 추가 시점에 App.tsx로 전달됩니다.
  const [customizationStates, setCustomizationStates] = useState<{
    [itemId: string]: {
      selectedIngredients: Ingredient[];
      spicyLevel?: 0 | 1 | 2 | 3;
    };
  }>({});

  // 타입 가드 함수들은 그대로 유지

  const isFixedMenuItem = (item: MenuItem): item is FixedMenuItem => {
    return item.type === 'fixed';
  };

  const isCustomizableMenuItem = (item: MenuItem): item is CustomizableMenuItem => {
    return item.type === 'customizable';
  };

  // 재료를 선택하거나 해제하는 핸들러
  const handleToggleIngredient = (itemId: string, ingredient: Ingredient) => {
    setCustomizationStates((prevStates) => {
      const currentSelection = prevStates[itemId]?.selectedIngredients || [];
      const isSelected = currentSelection.some(ing => ing.id === ingredient.id);

      let newSelection;
      if (isSelected) {
        // 이미 선택된 재료라면 제거
        newSelection = currentSelection.filter(ing => ing.id !== ingredient.id);
      } else {
        // 선택되지 않은 재료라면 추가
        newSelection = [...currentSelection, ingredient];
      }

      return {
        ...prevStates,
        [itemId]: {
          ...prevStates[itemId],
          selectedIngredients: newSelection,
          spicyLevel: prevStates[itemId]?.spicyLevel // 기존 매운맛 레벨 유지
        },
      };
    });
  };

  // 매운맛 레벨을 변경하는 핸들러
  const handleSpicyLevelChange = (itemId: string, level: 0 | 1 | 2 | 3) => {
    setCustomizationStates((prevStates) => ({
      ...prevStates,
      [itemId]: {
        ...prevStates[itemId],
        selectedIngredients: prevStates[itemId]?.selectedIngredients || [], // 기존 선택 재료 유지
        spicyLevel: level,
      },
    }));
  };

  // 카트 추가 버튼 클릭 시 App.tsx의 onAddToCart 호출
  const handleAddCustomizableToCart = (item: CustomizableMenuItem) => {
    const currentState = customizationStates[item.id] || { selectedIngredients: [], spicyLevel: item.spicyLevel }; // 기본값 설정
    onAddToCart(item, {
      selectedIngredients: currentState.selectedIngredients,
      spicyLevel: currentState.spicyLevel,
    });
  };


  return (
    <div className="menu-display">
      {menu.map((item) => (
        <div key={item.id} className="menu-item-card">
          <h3>{item.name} ({item.basePrice.toLocaleString()}원)</h3>
          <p>카테고리: {item.category}</p>

          {isFixedMenuItem(item) && (
            <div className="fixed-options">
              {item.size && <p>사이즈: {item.size}</p>}
              {item.spicy !== undefined && <p>매운맛: {item.spicy ? '있음' : '없음'}</p>}
              <button onClick={() => onAddToCart(item)}>카트에 추가</button>
            </div>
          )}

          {isCustomizableMenuItem(item) && (
            <div className="customizable-options">
              <p>기본 가격: {item.basePrice.toLocaleString()}원</p>

              {/* 매운맛 레벨 선택 UI */}
              <h4>매운맛 단계:</h4>
              <div className="spicy-level-selection">
                {[0, 1, 2, 3].map(level => (
                  <button
                    key={level}
                    className={
                      (customizationStates[item.id]?.spicyLevel ?? item.spicyLevel ?? 0) === level
                        ? 'spicy-level-button active'
                        : 'spicy-level-button'
                    }
                    onClick={() => handleSpicyLevelChange(item.id, level as 0 | 1 | 2 | 3)}
                  >
                    {level}단계
                  </button>
                ))}
              </div>


              <h4>추가 재료 선택:</h4>
              <ul className="ingredient-list">
                {item.availableIngredients.map(ingredient => (
                  <li key={ingredient.id}>
                    <span>{ingredient.name} ({ingredient.price.toLocaleString()}원)</span>
                    <button
                      className={
                        customizationStates[item.id]?.selectedIngredients.some(ing => ing.id === ingredient.id)
                          ? 'remove-ingredient'
                          : 'add-ingredient'
                      }
                      onClick={() => handleToggleIngredient(item.id, ingredient)}
                    >
                      {customizationStates[item.id]?.selectedIngredients.some(ing => ing.id === ingredient.id)
                        ? '취소'
                        : '선택'
                      }
                    </button>
                  </li>
                ))}
              </ul>
              <div className="selected-ingredients-summary">
                현재 선택된 재료: {
                  (customizationStates[item.id]?.selectedIngredients || []).map(ing => ing.name).join(', ') || '없음'
                }
              </div>
              <button onClick={() => handleAddCustomizableToCart(item)}>
                카트에 추가 (커스터마이징 완료)
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuDisplay;