## 解説記事

[Next.js + Apollo Server/Client + Prisma でGraphQLサーバを起動する](https://zenn.dev/metallic_kfc/articles/59f3875c950056)

## パッケージインストール

```bash
npm install
```

## .envファイル更新

.envファイルの `DATABASE_URL` を自身のDB環境に合わせて修正

```
# DATABASE_URL="db_provider://user_name:password@host_name:port/db_name"
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb"
```

## DBスキーマをPrismaスキーマに反映

```bash
npm run prisma-db-pull
```

## PrismaスキーマをPrismaクライアントコードに反映

```bash
npm run prisma-generate
```

## GraphQLファイルから型定義ファイルを作成

```bash
npm run codegen
```

## サーバー起動

```bash
npm run dev
```

## GraphQL Playground

`http://localhost:3000/api/graphql` にアクセス