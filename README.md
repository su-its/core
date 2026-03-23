# @shizuoka-its/core

静岡大学ITソルーション室（ITS）で使用する共通のデータベースアクセス層とビジネスロジックを提供するTypeScriptライブラリです。

## インストール

```bash
npm install @shizuoka-its/core
```

## 利用例

メンバー情報表示

```ts
import { createMemberUseCases, type Member } from "@shizuoka-its/core";

const memberUseCases = createMemberUseCases();

// メンバー情報の取得
const result = await memberUseCases.getMemberByEmail.execute({ email: "example@shizuoka.ac.jp" });

console.log(result.member);
```

## アーキテクチャ

このプロジェクトはクリーンアーキテクチャパターンに基づいて設計されています：

```
src/
├── domain/           # ドメインエンティティとビジネスルール
├── application/      # ユースケース層
├── infrastructure/   # インフラストラクチャ層（リポジトリ実装等）
├── executable/       # 実行可能な機能のエントリーポイント
└── index.ts         # ライブラリのメインエントリーポイント
```

## 主な機能

### メンバー管理

- メンバーの作成、更新、削除
- メールアドレスによる検索
- 学籍番号による検索
- Discordアカウントとの紐付け

### Discordアカウント管理

- Discordアカウントの紐付け
- メンバーごとのDiscordアカウント取得

### イベント管理

- イベントの作成、更新、削除
- イベント参加者の管理
- 今後のイベント一覧取得

### 展示管理

- 展示の作成、更新、削除
- イベントごとの展示一覧
- 展示参加者の管理

### ライトニングトーク管理

- ライトニングトークの作成、更新、削除
- イベントごとのライトニングトーク一覧

## 開発者向けセットアップ

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
# .env ファイルを作成
DATABASE_URL="postgresql://user:password@localhost:5432/su_its_db?schema=public"
```

4. データベースのセットアップ

```bash
# マイグレーションファイルの生成
npm run db:generate

# マイグレーションの実行
npm run db:migrate
```

## ビルドとパブリッシュ

```bash
# ビルド
npm run build
```

## バージョン管理

```bash
# アルファ版の作成
npm run version:alpha

# ベータ版のパブリッシュ
npm run publish:beta

# リリース候補版の作成
npm run version:rc

# パッチバージョンの更新
npm run version:patch

# マイナーバージョンの更新
npm run version:minor

# メジャーバージョンの更新
npm run version:major
```

## データベースマイグレーション

```bash
# マイグレーションファイルの生成
npm run db:generate

# マイグレーションの実行
npm run db:migrate

# スキーマを直接DBにプッシュ（開発用）
npm run db:push
```

## コントリビューター

- @KinjiKawaguchi
- @KikyoNanakusa
