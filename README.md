# Quiet Museum

静かな時間を過ごす小さな美術館サイトです。

広告、コメント欄、ランキング、SNS共有、アクセス数表示、ハート数表示は置かず、作品そのものを主役にしています。

## 構成

```text
index.html
gallery.html
artwork.html
css/style.css
js/artworks.js
js/gallery.js
js/artwork.js
js/likes.js
js/firebase-config.js
images/type-a/
images/type-b/
images/type-c/
assets/icons/
assets/logo/
```

## 作品の追加

作品データは `js/artworks.js` の `ARTWORKS` に追加します。

```js
{
  id: "A002",
  type: "A",
  title: "Artwork Title",
  image: "images/type-a/A002.png",
  memo: "制作メモ"
}
```

作品番号は `A001`、`B001`、`C001` のようにTypeごとに管理します。

## GitHub Pages

GitHub Pagesでは、リポジトリのルートを公開元に設定してください。トップページは `index.html` です。

## Firebase

`js/firebase-config.js` に将来のFirebase接続用の雛形を用意しています。一般ユーザーには数値を表示せず、管理者だけが集計できる構成を想定しています。
