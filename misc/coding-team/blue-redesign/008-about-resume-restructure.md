# 008 — About 페이지 이력서 형식 재구성

## Context
About 페이지를 가운데 정렬에서 왼쪽 정렬 이력서 형식으로 변경. Stavros 이력서 스타일 참고. 프로젝트 섹션에는 `<details>` 토글로 Trouble Shooting 포함.

## Objective
1. `custom.scss`의 about-page 스타일을 왼쪽 정렬 이력서 스타일로 변경
2. `content/about.md`의 콘텐츠를 이력서 구조 템플릿으로 교체 (placeholder 텍스트)

## Scope

### 1. 스타일 변경: `quartz/styles/custom.scss`

기존 `article.about-page` 블록을 교체:

```scss
// About page: resume-style layout
article.about-page {
  max-width: 720px;
  text-align: left;

  // 섹션 제목 (h2)
  h2 {
    border-bottom: 2px solid var(--lightgray);
    padding-bottom: 0.5rem;
    margin-top: 2.5rem;
  }

  // 경력/프로젝트 항목 제목 (h3)
  h3 {
    margin-bottom: 0.25rem;
  }

  // 기간/직함 등 부가 정보
  h4 {
    font-weight: 400;
    color: var(--gray);
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  // 리스트 스타일 복원 (가운데 정렬 때 제거했던 것)
  ul {
    padding-left: 1.5rem;
  }

  // 구분선
  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid var(--lightgray);
  }

  // Trouble Shooting 토글
  details {
    margin-top: 1rem;
    border: 1px solid var(--lightgray);
    border-radius: 4px;
    padding: 0.75rem 1rem;

    summary {
      cursor: pointer;
      font-weight: 600;
      color: var(--secondary);

      &:hover {
        color: var(--tertiary);
      }
    }

    &[open] summary {
      margin-bottom: 0.75rem;
      border-bottom: 1px solid var(--lightgray);
      padding-bottom: 0.75rem;
    }
  }
}
```

`.center:has(> article.about-page) > .page-header` 규칙은 유지.

### 2. 콘텐츠 변경: `content/about.md`

```markdown
---
title: "About"
date: 2025-03-17
draft: false
cssclasses:
  - about-page
---

# 전호영

**Backend Developer**

---

## Profile

(여기에 자기소개 서술형 텍스트를 작성하세요)

---

## Experience

### 회사명

#### 직함 | 2024 - 현재

회사/역할에 대한 간단한 설명.

- 주요 업무 1
- 주요 업무 2

---

## Projects

### 프로젝트명

프로젝트에 대한 한 줄 설명.

- 사용 기술: Kotlin, Spring Boot, ...
- 주요 기능 또는 성과

<details>
<summary>Trouble Shooting</summary>

#### 1. 문제 제목

**배경**: 어떤 상황이었는지 설명.

**해결 과정**: 어떻게 해결했는지 설명.

**성과**: 결과.

#### 2. 문제 제목

**배경**: ...

**해결 과정**: ...

**성과**: ...

</details>

---

## Education

### 학교명

#### 전공 | 2020 - 2026

- 관련 정보

---

## Technical Skills

| 분류 | 기술 |
|---|---|
| Language | Kotlin, Java, TypeScript |
| Backend | Spring Boot, Node.js |
| Infra | PostgreSQL, Redis, Docker, Kubernetes |
| CI/CD | GitHub Actions |

---

## Contact

- GitHub: [github.com/HoyeongJeon](https://github.com/HoyeongJeon)
```

## Non-goals
- 실제 콘텐츠 작성 (placeholder만)
- 다른 페이지 스타일 변경
