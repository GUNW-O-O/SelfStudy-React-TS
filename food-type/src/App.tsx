// src/App.tsx
import { useState } from 'react'; // React의 useState 훅을 가져옵니다.
import './App.css'; // 배민스러운 CSS를 가져옵니다.

// Food Ordering App을 위한 타입들과 컴포넌트를 가져옵니다.
import type { MenuItem, Ingredient, CustomizableMenuItem } from './types/menu'; // 새로 정의할 메뉴 관련 타입들
import MenuDisplay from './Components/MenuDisplay'; // 메뉴를 표시할 컴포넌트

function App() {
  // 실제 메뉴 데이터를 정의합니다. (임시 데이터)
  // 이 데이터는 나중에 API 호출을 통해 받아올 수도 있습니다.
  const menuData: MenuItem[] = [
    {
      id: 'fixed-001',
      name: '계란 볶음밥',
      basePrice: 8000,
      category: 'main',
      spicy: false,
      type: 'fixed'
    },
    {
      id: 'fixed-002',
      name: '꿔바로우 (중)',
      basePrice: 15000,
      category: 'side',
      size: 'medium',
      type: 'fixed'
    },
    {
      id: 'fixed-003',
      name: '콜라',
      basePrice: 2000,
      category: 'drink',
      type: 'fixed'
    },
    {
      id: 'custom-001',
      name: '셀프 마라탕',
      basePrice: 6000, // 기본 국물 가격
      category: 'main',
      type: 'customizable',
      availableIngredients: [ // 추가 가능한 재료 목록
        { id: 'ing-beef', name: '소고기', price: 3000 },
        { id: 'ing-pork', name: '돼지고기', price: 2500 },
        { id: 'ing-mushroom', name: '버섯', price: 1000 },
        { id: 'ing-tofu', name: '두부', price: 500 },
        { id: 'ing-cabbage', name: '배추', price: 700 },
        { id: 'ing-fishball', name: '어묵', price: 1200 },
      ],
      selectedIngredients: [], // 사용자가 선택한 재료 (초기에는 비어있음)
      spicyLevel: 1, // 기본 매운맛 레벨 (선택 사항)
    }as CustomizableMenuItem,
  ];

  // 주문 카트 상태를 관리합니다. 카트에는 선택된 MenuItem 객체들이 들어갑니다.
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  // 카트에 메뉴 아이템을 추가하는 함수
  const handleAddToCart = (item: MenuItem, options?: { selectedIngredients?: Ingredient[], size?: 'small' | 'medium' | 'large', spicyLevel?: number }) => {
    let itemToAdd: MenuItem;

    // 만약 커스터마이징 가능한 메뉴(마라탕 등)라면, 선택된 재료와 옵션을 반영하여 카트에 추가합니다.
    if (item.type === 'customizable' && options?.selectedIngredients) {
      itemToAdd = {
        ...item,
        selectedIngredients: options.selectedIngredients,
        spicyLevel: options.spicyLevel as 0 | 1 | 2 | 3 | undefined // 타입 단언 추가
      };
    } else {
      // 고정 메뉴이거나 커스터마이징 옵션이 없는 경우
      itemToAdd = item;
    }

    setCartItems((prevCartItems) => [...prevCartItems, itemToAdd]);
    alert(`${item.name}이(가) 카트에 담겼습니다!`);
  };

  // 장바구니 총 가격 계산 (선택된 재료 가격까지 포함)
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      let itemPrice = item.basePrice;
      if (item.type === 'customizable' && item.selectedIngredients) {
        itemPrice += item.selectedIngredients.reduce((ingTotal, ing) => ingTotal + ing.price, 0);
      }
      return total + itemPrice;
    }, 0);
  };

  return (
    <div className="App">
      <h1>음식점 메뉴</h1>

      {/* MenuDisplay 컴포넌트를 렌더링하고, props를 전달합니다. */}
      {/* `menu` prop으로 메뉴 데이터를, `onAddToCart` prop으로 카트에 추가하는 함수를 전달합니다. */}
      <MenuDisplay menu={menuData} onAddToCart={handleAddToCart} />

      <h2>장바구니 ({cartItems.length}개)</h2>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <div className="cart-items">
          <ul>
            {cartItems.map((item, index) => (
              // 고유한 key를 위해 index를 함께 사용 (실제 앱에서는 더 견고한 ID 필요)
              <li key={`${item.id}-${index}`}>
                <span>
                  {item.name} - {item.basePrice.toLocaleString()}원
                  {item.type === 'fixed' && item.size && ` (${item.size})`}
                  {item.type === 'customizable' && item.selectedIngredients && item.selectedIngredients.length > 0 &&
                    ` (+${item.selectedIngredients.map(ing => ing.name).join(', ')})`}
                  {item.type === 'customizable' && item.spicyLevel !== undefined && ` (매운맛: ${item.spicyLevel}단계)`}
                </span>
                {/* 여기에 장바구니에서 아이템을 삭제하는 버튼 등을 추가할 수 있습니다. */}
              </li>
            ))}
          </ul>
          <div className="cart-total">
            총 결제 금액: {calculateTotalPrice().toLocaleString()}원
          </div>
        </div>
      )}
    </div>
  );
}

export default App;