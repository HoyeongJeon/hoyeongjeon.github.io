# 002 — 사이드바 네비게이션

## Context
현재 왼쪽 사이드바에 `PageTitle`, `Search`, `Darkmode`, `Explorer`(폴더 트리)가 있다. Charles Chen 사이트처럼 단순한 링크 목록 네비게이션으로 교체해야 한다.

## Objective
왼쪽 사이드바를 다음 구조로 변경:
1. 프로필 사진 placeholder (나중에 이미지 추가 예정 — 빈 원형 placeholder)
2. 사이트 제목 (PageTitle 유지)
3. 네비게이션 링크 목록: Home, Blog, Projects, About
4. Search + Darkmode 토글 (기존 유지)

Explorer 컴포넌트 제거.

## Scope

### 새 컴포넌트: `SidebarNav`
- `quartz/components/SidebarNav.tsx` 생성
- `quartz/components/styles/sidebarNav.scss` 생성
- `quartz/components/index.ts`에 export 추가

컴포넌트 구조 (Preact JSX):
```
<nav class="sidebar-nav">
  <div class="profile-placeholder">
    <!-- 빈 원형, 나중에 img로 교체 -->
  </div>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

**중요**: 링크 href는 `pathToRoot(fileData.slug!)` 기반으로 상대 경로를 생성해야 한다. Quartz SPA 모드에서 올바르게 동작하려면 기존 컴포넌트들(PageTitle 등)이 사용하는 패턴을 따라야 한다.

### 레이아웃 변경: `quartz.layout.ts`
- `defaultContentPageLayout.left`와 `defaultListPageLayout.left` 모두 수정
- Explorer 제거, SidebarNav 추가

변경 후 left 슬롯 구성:
```
left: [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.SidebarNav(),
  Component.Flex({
    components: [
      { Component: Component.Search(), grow: true },
      { Component: Component.Darkmode() },
    ],
  }),
]
```

### 스타일
- 링크 목록: 세로 나열, 적절한 간격, 호버 시 색상 변화 (secondary/tertiary 토큰 활용)
- 현재 페이지 하이라이트는 non-goal (나중에 추가 가능)
- 프로필 placeholder: 80px 정도의 원형, 연한 배경색 (`lightgray` 토큰)
- 모바일에서는 Quartz 기본 동작 유지 (사이드바가 접히는 기존 동작)

## Non-goals
- 현재 페이지 active 상태 표시
- 프로필 사진 실제 이미지 추가
- 모바일 네비게이션 커스터마이징

## Constraints
- 기존 Quartz 컴포넌트 패턴 준수 (`QuartzComponent`, `QuartzComponentConstructor` 타입)
- Options 패턴 사용 — 링크 목록을 하드코딩하지 말고 옵션으로 받되, 기본값 제공
- CSS는 별도 `.scss` 파일로 분리 (Footer 패턴 참고)
