console.log("TypeScript 기본 타입 실습")

// 1. 문자열
let userName: string = "고건우";
let greeting: string = `안녕하세요 ${userName}님`;  // ${} 템플릿 리터럴
console.log(`String 예시 : ${greeting}`);

// 2. 숫자(number)
let int: number = 29;
let float:number = 99.999;
let hexColor:number = 0xff0000;
console.log(`Number 예시 정수 : ${int}, 소수점 : ${float}, 16진수 : ${hexColor}`);

// 3. 불리언
let isTrue: boolean = true;
let isFalse: boolean = false;
console.log(`Boolean 예시 : ${isTrue} 와 ${isFalse}`);

// 4. 배열
let numbers: number[] = [1,2,3.3];
let keyboards: Array<String> = ["레이니75","에보80"];
let numbers2: Array<number> = [1,2,3.2];
console.log(`Array 예시 : 숫자들1 : ${numbers}, 숫자들2 : ${numbers2}, 키보드 : ${keyboards}`);

// 다른타입을 .push() 로 넣으려하면 오류가 난다.

// 튜플 : 길이가 고정되고 요소별 타입이 다른 배열
let product:[string, number, boolean] = ["레이니75", 12, true];
console.log(`Tuple 제품명 : ${product[0]}, 가격 : ${product[1]}, 구매가능여부 : ${product[2]}`);

// 열거형 : 특정 값들의 집합에 이름을 부여
enum Direction {
    Up,
    Down,
    Left,
    Right
}
let move:Direction = Direction.Up;
console.log(`Enum : 이동 방향 ${move}, (값 : ${Direction.Up})`);

enum Status {
    Pending = "PENDING",
    Success = "SUCCESS",
    Failed = "FAILED"
}
let currentStatus: Status = Status.Success;
console.log(`Enum 예시 (문자열) : 현재 상태 : ${currentStatus}`);

// Any 는 타입스크립트의 장점을 해치므로 되도록 사용을 자제

// Unknown (알수없는 타입 - Any 보다 안전)
let unknownValue: unknown = "TypeScript";
if (typeof unknownValue === 'string') {
    console.log(`Unknown 예시 (문자열): ${unknownValue.toUpperCase()}`);
}

// 9. Void (함수가 아무것도 반환하지 않을 때)
function warnUser(): void {
    console.log("경고! 이것은 경고 메시지입니다.");
}
warnUser();

// 10. Null 및 Undefined
let u: undefined = undefined;
let n: null = null;
// strictNullChecks가 true이면 undefined 또는 null만 해당 타입에 할당 가능
// 다른 타입에는 기본적으로 null/undefined 할당 불가

// 11. Never (절대 도달할 수 없는 타입)
function error(message: string): never {
    throw new Error(message);
}
// error("치명적인 오류 발생!"); // 이 함수는 예외를 던지므로 반환하지 않습니다.