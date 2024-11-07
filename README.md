# @shizuoka-its/core

ITSで使用する共通のデータベースアクセス層とビジネスロジックを提供するライブラリです。

## インストール

```bash
npm install @shizuoka-its/core
```

## 使い方

```typescript
import { createClient } from "@shizuoka-its/core";

async function example() {
  // クライアントの作成（オプションあり）
  const client = createClient({
    prismaOptions: {
      log: ["query", "error"],
    },
  });

  try {
    const { services } = client;

    // メンバーの作成
    const member = await services.member.create({
      name: "山田太郎",
      studentId: "20240001",
      department: "情報工学科",
      email: "yamada@example.com",
    });

    // Discordアカウントの紐付け
    await services.discordAccount.create({
      id: "discord_user_id", // Discord IDをそのまま使用
      nickName: "Yamada Taro",
      memberId: member.id,
    });

    // イベントの作成
    const event = await services.event.create({
      name: "プログラミング勉強会",
      date: new Date("2024-12-01"),
    });

    // イベントへの参加登録
    await services.event.registerMember(event.id, member.id);
  } finally {
    // 必ずクリーンアップ
    await client.disconnect();
  }
}
```

## 機能

### メンバー管理

- メンバーの作成、更新、削除
- メールアドレスによる検索
- 学籍番号による検索
- Discordアカウントの紐づけ

### Discordアカウント管理

- Discordアカウントの紐付け
- メンバーごとのDiscordアカウント取得

### イベント管理

- イベントの作成、更新、削除
- イベント参加者の管理
- 今後のイベント一覧取得
- 展示ごとのイベント一覧取得

### 展示管理

- 展示の作成、更新、削除
- イベントごとの展示一覧
- 展示参加者の管理

### ライトニングトーク管理

- ライトニングトークの作成、更新、削除
- イベントごとのライトニングトーク一覧

## プロジェクト構成

```
src/
├── repositories/        # データベースアクセス層
│   ├── interfaces/     # リポジトリインターフェース
│   └── ...
├── services/           # ビジネスロジック層
│   ├── interfaces/     # サービスインターフェース
│   └── ...
└── index.ts           # エントリーポイント
```

## 開発セットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/su-its/core.git
cd core
```

2. 依存関係のインストール

```bash
npm install
```

3. 環境変数の設定

```bash
cp .env.example .env
```

`.env`ファイルを編集してデータベース接続情報を設定

4. データベースのマイグレーション

```bash
npx prisma migrate dev
```

## データベースマイグレーション

詳細は[マイグレーションガイド](./docs/migration.md)を参照してください。

## コントリビューター

- @KinjiKawaguchi
- @KikyoNanakusa

