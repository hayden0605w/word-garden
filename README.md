# 單字小花園 / Word Garden

國小拼字練習：教育部基本 1,200 字表（1,211 條）、中文注音、語意圖示、已保存真人錄音與間隔複習。

## Hosting

This is a static GitHub Pages site. Enable Settings → Pages → Source: GitHub Actions. The Pages workflow extracts the checked-in the checked-in assets-parts/ archive and publishes _site. No Cloudflare, database, account secrets, API keys, or learner progress are included in this repository.

## Progress sync

Open 同步設定 on each device. Use a GitHub token with only Gists read/write permission. Leave Gist ID blank to create a secret Gist on the first device. Other devices use the same Gist ID, token and sync encryption key. Settings remain in that device's browser; never commit them to this repository. Progress is encrypted with AES-GCM before upload, because secret Gists are unlisted rather than private.

Each device updates its own encrypted file. Review counters merge across devices, while the latest card edit determines its schedule and content. Export/import the original site's progress through the initial sync setup to migrate. Private uploaded images referenced by the original site's authenticated URLs need a self-contained backup or manual re-upload.

## Sources and licenses

See sources.html for the official word-list source, ECDICT MIT notice, individual recording credits, licenses, and the four clearly labelled composite recordings. Unicode Emoji are conceptual hints, not official curriculum images. Audio files are bundled in the checked-in assets-parts/ archive, with an individual recording URL and license manifest inside.

## Editing

Edit source/index.template.html, source/gist-sync.js, or source/zhuyin.js, then run node build.mjs. Run python deploy.py to assemble _site. GitHub Actions runs both steps automatically. Binary asset parts are verified against their SHA-256 manifest before extraction.
