/**
 * @interface Todo
 * @description 단일 할 일 항목의 구조를 정의합니다.
 * @property {string} id - 각 할 일 항목을 고유하게 식별하는 ID.
 * @property {string} text - 할 일의 내용을 나타내는 문자열.
 * @property {boolean} completed - 할 일의 완료 상태를 나타내는 불리언 값.
 */
export interface Todo {
    id:string;
    text:string;
    completed:boolean;
}