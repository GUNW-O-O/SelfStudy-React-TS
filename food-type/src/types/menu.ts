/**
 * @interface BaseMenuItem
 * @description 모든 메뉴 항목이 공통적으로 가지는 기본 속성
 * @property {string} id - 메뉴 항목의 고유 ID
 * @proprety { 'main' | 'side' | 'drink' } - 리터럴 유니온 타입
 */
export interface BaseMenuItem {
    id: string;
    name: string;
    basePrice: number;
    category: 'main' | 'side' | 'drink';
}

export interface FixedMenuItem extends BaseMenuItem {
    type: 'fixed';      // 이 메뉴가 고정 메뉴임을 나타내는 식별자
    size?: 'small' | 'medium' | 'large';    // ? : 선택적 속성 있어도 되고 없어도 된다.
    spicy?: boolean;
}

// 재료 타입
export interface Ingredient {
    id: string;
    name: string;
    price: number;
}

export interface CustomizableMenuItem extends BaseMenuItem {
    type: 'customizable';   // 커스텀메뉴인지 식별자
    availableIngredients: Ingredient[];     // 메뉴에서 선택 가능한 재료들 Ingredient의 배열
    selectedIngredients: Ingredient[];      // 사용자가 선택한 재료
    spicyLevel?: 0 | 1 | 2 | 3;             // 선택적 매운맛 단계
}

// 모든 종류의 메뉴 항목을 나타내는 유니온 타입
// 고정메뉴 또는 커스터마이징가능 메뉴중 하나
export type MenuItem = FixedMenuItem | CustomizableMenuItem;