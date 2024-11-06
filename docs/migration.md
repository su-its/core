## Database Migration Guide

### 初期設定

1. 必要なパッケージをインストール
```bash
npm install
```

2. `.env`ファイルを作成
```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/su_its_db?schema=public"
```

### マイグレーションの作成

1. スキーマに変更を加えた後、マイグレーションファイルを生成
```bash
npx prisma migrate dev --name init
```

このコマンドは以下を実行します：
- マイグレーションファイルの生成
- データベースへのマイグレーションの適用
- Prisma Clientの再生成

### 本番環境でのマイグレーション

1. マイグレーションの実行
```bash
npx prisma migrate deploy
```

このコマンドは、未適用のマイグレーションをデータベースに適用します。

### マイグレーション履歴の確認

```bash
npx prisma migrate status
```

### データベーススキーマの確認

Prisma Studioを使用してデータベーススキーマを視覚的に確認できます：

```bash
npx prisma studio
```

### トラブルシューティング

1. マイグレーションのリセット（開発環境のみ）
```bash
npx prisma migrate reset
```

2. データベーススキーマの再生成
```bash
npx prisma generate
```

### 注意事項

- 本番環境では必ず`prisma migrate deploy`を使用してください
- `prisma migrate dev`は開発環境でのみ使用してください
- マイグレーションファイルはバージョン管理に含めてください
- 本番環境でのマイグレーション前には必ずバックアップを取得してください

### マイグレーションのベストプラクティス

1. 各マイグレーションは独立して実行可能であることを確認
2. マイグレーション名は変更内容が分かるように具体的につける
   - 例: `add_discord_id_to_discord_accounts`
3. 破壊的な変更がある場合は、段階的なマイグレーションを検討
   - 例: カラムの削除は2段階で行う（非推奨→削除）

### マイグレーションの例

新しいカラムを追加する場合：
```bash
npx prisma migrate dev --name add_description_to_exhibits
```

カラムを削除する場合（2段階）：
```bash
# 1. まずカラムを非推奨にする
npx prisma migrate dev --name mark_column_as_deprecated

# 2. 安全を確認後、カラムを削除
npx prisma migrate dev --name remove_deprecated_column
```

### 関連ドキュメント

- [Prisma Migrate Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Database Migrations in Production](https://www.prisma.io/docs/guides/deployment/deploy-database-changes-with-prisma-migrate)