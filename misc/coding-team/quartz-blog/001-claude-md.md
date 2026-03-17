# Task 001: CLAUDE.md 작성

## Context
빈 디렉토리(`/Users/hoyoungjeon/dev/ho0_ho0_`)에서 Quartz v4 + Obsidian 기반 블로그/포트폴리오 사이트를 시작한다. 모든 작업에 앞서 프로젝트 컨벤션 문서를 먼저 작성한다.

## Objective
프로젝트 루트에 `CLAUDE.md` 파일을 생성한다. 60줄 이하, 최대 100줄을 넘지 않아야 한다.

## 포함할 내용
1. **프로젝트 개요**: Quartz v4 + Obsidian, 기술 블로그 + 포트폴리오, GitHub Pages 배포
2. **기술 스택**: Quartz v4, TypeScript, SCSS, GitHub Actions
3. **디렉토리 구조**: Quartz 기본 구조 + content/ 하위 구조 (blog/, projects/, about.md, index.md)
4. **핵심 명령어**: build, serve(preview), sync(deploy)
5. **콘텐츠 작성 규칙**: 
   - 마크다운 frontmatter 형식 (title, date, tags 등)
   - 블로그 글은 `content/blog/` 하위에 폴더 구조로
   - 프로젝트는 `content/projects/` 하위에
6. **커밋 메시지 컨벤션**: conventional commits (feat, fix, docs, style, chore 등)
7. **코드 스타일**: Quartz 커스터마이징은 `quartz.config.ts`, `quartz.layout.ts`, `quartz/styles/custom.scss`에서
8. **배포**: main branch push → GitHub Actions → GitHub Pages 자동 배포

## Non-goals
- 상세한 Quartz 아키텍처 설명
- 튜토리얼 수준의 가이드

## Constraints
- 60줄 이하 목표, 100줄 절대 초과 금지
- 한국어로 작성
- 실용적이고 간결하게. 뻔한 내용 제외.
