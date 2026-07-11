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
  image: "images/type-a/A002.png"
}
```

作品番号は `A001`、`B001`、`C001` のようにTypeごとに管理します。展示順は `ARTWORKS` の並び順そのままです。

作品の種類はIDの先頭文字で判定します。

```text
A : AI Abstract
B : AI × sakurak02
C : sakurak02 Drawing
```

作品追加時は、`ARTWORKS` の最後へ1ブロック追加してください。

## GitHub Pages

GitHub Pagesでは、リポジトリのルートを公開元に設定してください。トップページは `index.html` です。

## Firebase

`js/firebase-config.js` でFirebaseを初期化し、`js/likes.js` からCloud Firestoreの `likes/{作品ID}` へ `count` を1ずつ加算します。

来館者には合計数を表示せず、作品詳細ページでは `♡` または `❤` だけを表示します。同じブラウザで同じ作品が再加算されないように、`quietMuseum.likes.v1.{作品ID}` の形式でlocalStorageへ保存します。

Firestoreのセキュリティルールは `firestore.rules` をFirebase Consoleへ貼り付けて公開してください。
