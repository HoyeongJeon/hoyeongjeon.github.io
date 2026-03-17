---
title: "Project Beta"
date: 2025-03-17
tags:
  - typescript
  - node.js
  - obsidian
  - sqlite
draft: false
---

## 개인 지식 관리 도구

Markdown 파일 기반의 개인 지식 베이스를 구축하고, 노트 간 연결 관계를 시각화하는 CLI 도구입니다.

---

## 기술 스택

- **언어**: TypeScript
- **런타임**: Node.js
- **데이터베이스**: SQLite (노트 인덱싱)
- **시각화**: D3.js (그래프 렌더링)
- **파싱**: remark, unified

---

## 역할

- 전체 설계 및 구현 (개인 프로젝트)
- Markdown AST 파싱 및 링크 추출 로직 구현
- SQLite 기반 인덱싱 파이프라인 구축

---

## 링크

- GitHub: [github.com/전호영/project-beta](https://github.com/HoyeongJeon/project-beta) _(mock)_

---

## 상세 설명

### 배경

노트가 수백 개를 넘어가면서 노트 간 연결 관계를 파악하기 어려워졌습니다. 기존 도구들은 무겁거나 클라우드 의존적이어서, 로컬에서 동작하는 경량 CLI 도구를 직접 만들었습니다.

### 구현

1. **파싱**: `remark`로 Markdown 파일을 AST로 변환, `[[wikilink]]` 형식의 내부 링크 추출
2. **인덱싱**: 추출한 링크 관계를 SQLite에 저장, 증분 업데이트 지원
3. **시각화**: 인덱스 데이터를 기반으로 D3.js 그래프를 HTML로 렌더링

### 결과

- 1,000개 노트 기준 전체 인덱싱 시간: 약 1.2초
- 고립된 노트(링크 없는 노트) 탐지 기능으로 지식 베이스 품질 개선
