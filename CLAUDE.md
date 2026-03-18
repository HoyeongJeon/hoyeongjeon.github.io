# CLAUDE.md

## 프로젝트 개요

Quartz v4 + Obsidian 기반 기술 블로그 + 포트폴리오 사이트. GitHub Pages로 배포.

## 기술 스택

- **Quartz v4** — 정적 사이트 생성기 (Obsidian 호환)
- **TypeScript** — Quartz 설정 및 커스터마이징 (`quartz.config.ts`, `quartz.layout.ts`)
- **SCSS** — 스타일 커스터마이징 (`quartz/styles/custom.scss`)
- **GitHub Actions** — CI/CD 자동 배포

## 디렉토리 구조

```
content/
  blog/       # 기술 블로그 글 (카테고리별 폴더)
  projects/   # 프로젝트 소개
  about.md
  index.md
```

## 핵심 명령어

```bash
npx quartz build          # 빌드
npx quartz build --serve  # 로컬 미리보기 (localhost:8080)
npx quartz sync           # 빌드 + GitHub 배포
```

## 콘텐츠 작성 규칙

Frontmatter 필수 필드: `title`, `date` (YYYY-MM-DD), `tags`, `draft`

- 블로그 글: `content/blog/<카테고리>/<slug>.md`
- 프로젝트: `content/projects/<project-name>.md`
- 초안: `draft: true` (빌드 시 제외)

### 한/영 이중 언어 작성

영어 버전을 함께 제공하고 싶은 글은 마크다운 안에 HTML div 구조를 사용한다:

```markdown
---
title: "제목"
date: 2025-03-17
tags: [tag1]
draft: false
---

<div id="content-ko">

한국어 내용을 여기에 작성.

## 소제목

본문...

</div>

<div id="content-en">

English content here.

## Subtitle

Body text...

</div>
```

**규칙:**

- `<div id="content-ko">` 안에 한국어, `<div id="content-en">` 안에 영어
- div 태그와 마크다운 내용 사이에 빈 줄 필수 (마크다운 파싱을 위해)
- div 안에서 마크다운 문법 그대로 사용 가능 (제목, 리스트, 코드블록 등)
- 영어 버전이 없는 글은 평소처럼 순수 마크다운으로 작성 (div 불필요)
- 한/영 div가 있는 페이지에서만 사이드바에 한/영 토글 버튼이 표시됨

## 커밋 메시지 컨벤션

Conventional Commits: `feat` / `fix` / `docs` / `style` / `chore`

예: `docs: add new blog post about TypeScript generics`

## 코드 스타일

Quartz 커스터마이징 진입점:

- 사이트 설정: `quartz.config.ts`
- 레이아웃: `quartz.layout.ts`
- 스타일: `quartz/styles/custom.scss`

## 배포

`main` branch push → GitHub Actions → GitHub Pages 자동 배포.
직접 배포: `npx quartz sync`
