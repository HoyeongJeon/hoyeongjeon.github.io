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
