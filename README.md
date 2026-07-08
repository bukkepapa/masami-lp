# 西巻正美 公式LP — 脱獄の記録

50代のAI個人開発者、西巻正美（まさみ）のブランドLP。
『ショーシャンクの空に』をメタファーにした「脱獄の記録」をコンセプトに、シネマティック・ダーク調でデザイン。

---

## ファイル構成

```
masami-lp/
├─ index.html      … LP本体（HTML構造＋SEOメタタグ＋構造化データ）
├─ styles.css      … 全デザイン（配色・レイアウト・アニメ）
├─ script.js       … スクロール演出・スムーズナビ・年号自動更新
├─ favicon.svg     … ファビコン（「西」の一文字＋アンバーの下線）
├─ robots.txt      … クローラー向け
├─ sitemap.xml     … 検索エンジン向けサイトマップ
└─ README.md       … このファイル
```

---

## ローカルで確認する方法（非エンジニアまさみさん向け）

**一番かんたんな方法：`index.html`をダブルクリック**
→ ブラウザで開きます。フォントの読み込みに数秒かかります。

**もう少しちゃんと確認したい場合：Pythonで簡易サーバー起動**
```bash
cd "C:\Users\PC_User\Documents\Claude\Projects\masami-lp"
python -m http.server 8000
```
→ ブラウザで `http://localhost:8000` を開く。

---

## 公開（デプロイ）する方法

### 推奨：**Vercel**（無料・独自ドメイン可）

1. [vercel.com](https://vercel.com/) にGitHubアカウントで登録
2. このフォルダ（masami-lp）をGitHubにpush
3. Vercelで「Import Project」→ GitHubリポジトリを選ぶ
4. そのままデプロイ → `xxx.vercel.app` で公開される
5. 独自ドメイン（例: masami-nishimaki.com）を後から接続可能

### 代替：**Netlify**（ドラッグ＆ドロップで即公開）

1. [netlify.com](https://www.netlify.com/) にログイン
2. 「Deploy manually」にこのフォルダをドラッグ＆ドロップ
3. 数秒で公開URLが発行される

---

## SEO対応の中身（何が入っているか）

非エンジニアのまさみさんにも分かるよう、**どこで何が起きているか**を書いておきます。

| 対応項目 | ファイル | 役割 |
|---|---|---|
| **title / description** | index.html `<head>` | 検索結果に表示される文字 |
| **OGPタグ（og:title等）** | index.html `<head>` | X・Facebook・LINEでシェア時のカード表示 |
| **Twitter Card** | index.html `<head>` | X(Twitter)での画像つきプレビュー |
| **構造化データ（JSON-LD）** | index.html `<head>` | GoogleにPerson情報・サービス情報を機械可読で伝える |
| **canonical URL** | index.html `<head>` | 重複URL防止 |
| **セマンティックHTML** | 全体（header/main/section/article） | 検索エンジンが構造を理解しやすい |
| **alt属性配慮・skip-link** | index.html | アクセシビリティ（SEOにも有利） |
| **robots.txt** | robots.txt | クローラーに「全部見てOK」と伝える |
| **sitemap.xml** | sitemap.xml | 全ページのリストをGoogleに提出 |
| **lang="ja" / locale=ja_JP** | index.html | 日本語サイトだと明示 |
| **theme-color** | index.html `<head>` | スマホで開いた時のブラウザUIの色 |

### 公開後にやること（まさみさん向けチェックリスト）

- [ ] Google Search Console にサイトを登録して sitemap.xml を送信
- [ ] `https://masami-nishimaki.com/` の部分を**実際の独自ドメイン**に書き換え（index.html / sitemap.xml / robots.txt の3箇所）
- [ ] OGP画像（`ogp.jpg`）を1枚作って同フォルダに配置（1200×630px推奨）
- [ ] Google Analytics 4 のタグを入れる（必要なら）

---

## デザインの意図（なぜこうしたか）

### 配色：シネマティック・ダーク
- 背景: 深い黒（#07070a）— "夜の独房"
- アクセント: アンバー（#d4a574）— "ショーシャンクの夜明けの光"
- 派手な青や緑を使わないのは、「若者向けの煽り」を避けるため

### 書体：Noto Serif JP
- ヒーロー見出しと引用をセリフ体に → 静かな重み、文学性
- 本文はSans（読みやすさ重視）

### 演出：film grain（フィルムの粒子）
- 画面全体にうっすら走るノイズ → 映画フィルムのような質感
- CSSのSVGフィルタで実装（画像ファイル不要・軽い）

### コピー：新・PASONA
- P（問題提起）→ A（共感）→ S（解決策・視点）→ O（変化量）→ N（合う人絞り込み）→ A（優しい行動喚起）
- 「こんな人には向いていません」と正直に書くことで、信頼を作る

### 2026年7月ブラッシュアップで追加したもの
- **ヒーローの実績数字**（95%削減など）— スクロールで数字がカウントアップする演出
- **壁を削った道のり（年表）** — 違和感 → 出会い → 加速 → 現在 の4フェーズ
- **Chapter 04「進め方」** — 相談→棚卸し→小さく作る→伴走 の4ステップで不安を解消
- **Chapter 05「FAQ」** — 問い合わせ前のためらいに先回りで答える（FAQ構造化データ入りでSEOにも効く）
- **スクロール進捗バー・ナビ現在地ハイライト** — いま何章にいるかが分かる
- **JSオフでも本文が表示される修正**（noscript対応）、フォーカスリング等のアクセシビリティ改善

---

## 修正したいときのヒント

- **文章を変えたい** → `index.html` のテキスト部分を直接書き換え（タグには触らない）
- **色を変えたい** → `styles.css` の先頭 `:root` ブロック内の色コードを変更
- **セクションを追加したい** → `<section>` を真似して追加
- **メニュー項目を追加** → `<nav class="site-nav">` の `<ul>` にリンク追加

---

**制作メモ**: Claude Code Opus 4.7 にて、`masami-writing-context` Skillを参照しつつブランド一貫性を保ちながら構築。
