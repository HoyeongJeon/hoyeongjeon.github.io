---
title: "의존성 주입(DI)이란 무엇인가"
date: 2025-03-17
tags:
  - dev
  - design-pattern
  - spring
draft: false
---

의존성 주입(Dependency Injection, DI)은 객체지향 설계에서 자주 등장하는 패턴입니다. Spring을 쓰면 자연스럽게 접하게 되지만, "왜 이렇게 하는가"를 이해하지 못한 채 쓰는 경우가 많습니다.

이 글에서는 DI가 무엇인지, 왜 필요한지를 코드 예제로 설명합니다.

---

## 의존성이란?

클래스 A가 클래스 B를 사용한다면, A는 B에 **의존**합니다.

```kotlin
class OrderService {
    private val emailSender = EmailSender() // 직접 생성 — 강한 결합

    fun placeOrder(order: Order) {
        // 주문 처리
        emailSender.send(order.userEmail, "주문이 완료되었습니다.")
    }
}
```

`OrderService`가 `EmailSender`를 직접 생성하면 두 클래스는 강하게 결합됩니다. `EmailSender`를 `SlackNotifier`로 바꾸려면 `OrderService` 코드를 수정해야 합니다.

---

## 의존성 주입

의존성 주입은 **객체가 필요한 의존성을 직접 생성하지 않고, 외부에서 주입받는 것**입니다.

```kotlin
class OrderService(
    private val notifier: Notifier // 인터페이스에 의존
) {
    fun placeOrder(order: Order) {
        // 주문 처리
        notifier.notify(order.userEmail, "주문이 완료되었습니다.")
    }
}

interface Notifier {
    fun notify(target: String, message: String)
}

class EmailNotifier : Notifier {
    override fun notify(target: String, message: String) { /* ... */ }
}

class SlackNotifier : Notifier {
    override fun notify(target: String, message: String) { /* ... */ }
}
```

이제 `OrderService`는 `Notifier` 인터페이스에만 의존합니다. 구현체를 바꿔도 `OrderService`는 수정할 필요가 없습니다.

---

## DI의 장점

### 1. 테스트 용이성

실제 이메일을 보내지 않고 테스트할 수 있습니다.

```kotlin
@Test
fun `주문 완료 시 알림이 전송된다`() {
    val mockNotifier = mockk<Notifier>()
    val service = OrderService(mockNotifier)

    service.placeOrder(testOrder)

    verify { mockNotifier.notify(any(), any()) }
}
```

### 2. 유연한 교체

운영 환경에서는 `EmailNotifier`, 개발 환경에서는 `LogNotifier`를 주입하는 식으로 환경별 동작을 쉽게 분리할 수 있습니다.

### 3. 단일 책임 원칙

`OrderService`는 주문 처리에만 집중하고, 알림 방식은 `Notifier` 구현체가 담당합니다.

---

## Spring에서의 DI

Spring은 DI 컨테이너를 제공합니다. `@Component`, `@Service`, `@Repository` 등으로 빈을 등록하면 Spring이 의존성을 자동으로 주입해줍니다.

```kotlin
@Service
class OrderService(
    private val notifier: Notifier // Spring이 주입
) {
    // ...
}

@Component
class EmailNotifier : Notifier {
    // ...
}
```

---

## 정리

- 의존성 주입은 객체가 의존성을 직접 생성하지 않고 외부에서 받는 패턴입니다.
- 인터페이스에 의존하면 구현체를 자유롭게 교체할 수 있습니다.
- 테스트 작성이 쉬워지고, 코드의 유연성과 유지보수성이 높아집니다.

DI는 단순한 패턴이지만, 제대로 이해하고 쓰면 코드 품질이 눈에 띄게 달라집니다.
