---
title: "TypeScript 제네릭 제대로 이해하기"
date: 2025-03-17
tags:
  - dev
  - typescript
draft: false
---

TypeScript를 쓰다 보면 제네릭을 마주치는 순간이 옵니다. `Array<T>`, `Promise<T>`, `Record<K, V>` — 처음엔 그냥 "타입 변수구나" 하고 넘어가지만, 직접 제네릭 함수나 클래스를 작성하려 하면 막히기 시작합니다.

이 글에서는 제네릭의 핵심 개념을 예제 중심으로 정리합니다.

---

## 제네릭이란?

제네릭은 **타입을 매개변수로 받는 기능**입니다. 함수가 값을 매개변수로 받듯이, 제네릭은 타입을 매개변수로 받아 재사용 가능한 코드를 작성할 수 있게 해줍니다.

```typescript
// 제네릭 없이
function identity(arg: number): number {
  return arg
}

// 제네릭 사용
function identity<T>(arg: T): T {
  return arg
}
```

`identity<string>("hello")`처럼 호출하면 `T`가 `string`으로 추론됩니다.

---

## 제약 조건 (Constraints)

`T`가 어떤 타입이든 받을 수 있지만, 특정 속성이 있어야 한다면 `extends`로 제약을 걸 수 있습니다.

```typescript
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length)
  return arg
}

logLength("hello") // OK — string은 length가 있음
logLength([1, 2, 3]) // OK — array도 length가 있음
logLength(42) // Error — number에는 length가 없음
```

---

## 제네릭 인터페이스와 클래스

제네릭은 함수뿐 아니라 인터페이스와 클래스에도 적용할 수 있습니다.

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>
  save(entity: T): Promise<T>
  delete(id: string): Promise<void>
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // 구현
  }
  // ...
}
```

이렇게 하면 `Repository` 인터페이스를 다양한 엔티티 타입에 재사용할 수 있습니다.

---

## 유틸리티 타입과 제네릭

TypeScript 내장 유틸리티 타입들도 제네릭으로 구현되어 있습니다.

```typescript
// Partial<T> — 모든 속성을 optional로
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// Pick<T, K> — 특정 속성만 선택
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

이 패턴을 이해하면 커스텀 유틸리티 타입도 직접 만들 수 있습니다.

---

## 정리

- 제네릭은 타입을 매개변수로 받아 코드 재사용성을 높입니다.
- `extends`로 제약 조건을 걸어 타입 안전성을 유지할 수 있습니다.
- 인터페이스, 클래스, 유틸리티 타입 모두 제네릭으로 설계할 수 있습니다.

처음엔 낯설지만, 익숙해지면 타입 시스템의 강력함을 제대로 활용할 수 있게 됩니다.
