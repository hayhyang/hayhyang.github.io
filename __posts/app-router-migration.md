---
title: "[Next.js] 페이지 라우터를 앱 라우터로 마이그레이션하기"
date: "2023-07-13"
excerpt: "page router를 app router로 마이그레이션하기"
tags:
  - Next.js
---

### STEP 1. `app` 디렉토리 생성

1. Next.js 를 최신버전으로 업그레이드한다.

```shell
npm install next@latest
```

2. 최상위 혹은 `src` 디렉토리 하위에 `app` 디렉토리를 생성한다. `pages`와 함께 사용할 수 있다.

### STEP 2. Root Layout 생성

1. `app` 디렉토리 하위에 `layout.tsx` 파일을 만든다. `layout.tsx` 는 기존의 `pages/_app.tsx`, `pages/_document.tsx` 를 대체한다. 모든 경로에 적용될 공통된 레이아웃을 적용한다. `Next.js` 가 자동으로 생성해주지 않기 때문에 최상위 layout은 반드시 `<html>` 과 `<body>` 를 정의해야한다. `app` 디렉토리는 반드시 `layout` 을 포함해야 한다.

```typescript
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

SEO를 위해 `<head>` 의 메타데이터를 선언해줄 수 있다.

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};
```

### STEP 3. `next/head` 마이그레이션

page router에서는 `next/head` 에서 title과 meta를 관리했지만 app router에서는 빌트인 기능으로 대체되었다. metaData 객체에 정보를 담아주면 된다.

```typescript
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
    </>
  );
}
```

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page Title",
};

export default function Page() {
  return "...";
}
```

### STEP 4. 파일 구조

기본적으로 내부의 모든 경로를 라우트로 인식하던 `pages`디렉토리와는 다르게 `app`디렉토리는 components, lib를 페이지가 아닌 구성요소로 인식한다. `_` prefix가 없어도 라우트로 인식하지 않는다.

### App Router

app router는 next13버전에서 제공하는 라우팅 컨벤션이다. `app` 디렉토리 안에서 라우팅을 할 수 있고 `pages` 디렉토리 라우팅과 함께 사용할 수 있다.

app 디렉토리 안에 있는 컴포넌트들은 기본적으로 서버컴포넌트다.
layout, 중첩 라우팅, 로딩상태, 에러핸들링 등을 지원한다.
`app` 디렉토리 안에서에서 작동한다.
`app` 디렉토리는 `pages` 디렉토리와 함께 사용할 수 있어 점진적인 마이그레이션 혹은 선택이 가능하다.

> 앱 라우터가 페이지 라우터보다 우선한다. 각각에 동일한 경로가 있을 경우 빌드타임에 오류가 발생한다.

![error-app-router-with-pages-router](/img/error-app-router-with-pages-router.png)

`app` 경로의 컴포넌트들은 기본적으로 서버컴포넌트이다. 성능 최적화를 쉽게 채택할 수 있다. 필요에 따라 클라이언트 컴포넌트도 사용 가능하다

folder는 경로를 정의하는 사용한다.
각각의 폴더는 경로 segment를 표시한다.
root경로의 pages.tsx는 '/'
Next.js는 중첩 라우트에서 동작하는 특별한 파일을 제공한다.

| 제목           | 내용                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------- |
| `layout`       | 하위 경로에 공통으로 적용되는 UI를 공유한다.                                                  |
| `page`         | 특정 경로에 표시되는 UI와 접근 가능한 경로를 만든다.                                          |
| `loading`      | 로딩상태의 UI를 제공한다.                                                                     |
| `not-found`    | 리소스스가 없는 접근일 때의 UI를 제공한다.                                                    |
| `error`        | 에러상태일때의 UI를 제공한다.                                                                 |
| `global-error` | 전역으로 사용되는 에러 상태일때의 UI를 제공한다.                                              |
| `route`        | 서버측 API의 엔드포인트                                                                       |
| `template`     | 특정 재렌더 레이아웃                                                                          |
| `default`      | 라우트에 따라 동적인 UI를 사용할 때 병렬라우팅을 사용할 수 있고 기본 UI를 지정할 때 사용한다. |

![file-conventions-component-hierarchy](/img/file-conventions-component-hierarchy.avif)

page 라우터에서 app 라우터로 마이그레이션할 때 변경되는 지점

- `page.js` : 페이지에 표시할 UI를 정의한다.
- `layout.js` : 하위 경로들이 공유할 공통된 UI를 정의한다.
- `app` 경로 하위에 components, styles, tests 를 함께 배치할 수 있다.
- 데이터 페칭 `getServerSideProps`, `getStaticProps` 메서드는 [새로운 API 방식](https://nextjs.org/docs/app/building-your-application/data-fetching)으로 대체되었다.
- `pages/_app.js`, `pages/_documents.js`는 `app/layout.js`로 대체되었다.
- `pages/_error.js` 는 `error.js` 로 대체되었다.
- `pages/404.js` 는 `not-found.js` 로 대체되었다.

app router로 마이그레이션 하는 방법은 다음 링크를 참조했다. [App Router Migration]

[App Router Migration]: https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration
