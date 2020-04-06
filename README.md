## parcel 설치

> typeacript를 컴파일하기위한 용도

```shell
> yarn global add parcel-bundiler
```

## 필수 패키지 설치

```shell
> yarn add express
> yarn add -D @types/express @types/node nodemon typescript
```

## package.json 파일 scripts 속성 정의

```json
  "scripts": {
    "start": "nodemon --watch src --delay 1 --exec ts-node src/index.ts",
    "build": "parcel build src/index.ts -d build --target node"
  }
```
