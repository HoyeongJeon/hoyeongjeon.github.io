---
title: "Project Alpha"
date: 2025-03-17
tags:
  - kotlin
  - spring-boot
  - websocket
  - redis
draft: false
---

## 실시간 알림 서비스

사용자 행동 이벤트를 수집하고 WebSocket을 통해 실시간으로 알림을 전달하는 서비스입니다.

---

## 기술 스택

- **언어**: Kotlin
- **프레임워크**: Spring Boot 3
- **메시지 브로커**: Redis Pub/Sub
- **실시간 통신**: WebSocket (STOMP)
- **데이터베이스**: PostgreSQL
- **인프라**: Docker, Kubernetes

---

## 역할

- 백엔드 아키텍처 설계 및 구현 (단독)
- Redis Pub/Sub 기반 이벤트 파이프라인 구축
- WebSocket 연결 관리 및 세션 처리

---

## 링크

- GitHub: [github.com/전호영/project-alpha](https://github.com/HoyeongJeon/project-alpha) _(mock)_

---

## 상세 설명

### 배경

기존 폴링 방식의 알림 시스템은 서버 부하가 높고 지연이 발생했습니다. 이를 WebSocket 기반 Push 방식으로 전환하여 실시간성을 확보하고 서버 부하를 줄이는 것이 목표였습니다.

### 구현

1. **이벤트 수집**: 각 서비스에서 발생하는 이벤트를 Redis Pub/Sub 채널에 발행
2. **알림 서버**: 채널을 구독하고 연결된 WebSocket 클라이언트에 메시지 전달
3. **세션 관리**: 사용자별 WebSocket 세션을 인메모리로 관리, 다중 인스턴스 환경에서는 Redis로 세션 공유

### 결과

- 알림 지연 시간: 평균 3초 → 200ms 이하로 단축
- 서버 CPU 사용률: 폴링 대비 약 40% 감소
