# Flora — UMT Markup Practice

[English](#english) | [Українська](#українська)

## Live preview

https://saniksin.github.io/UMT-markup-practice-MakedonOleksandr/

## Figma

https://www.figma.com/design/2Tj16H7IO7dq1ViTvIh57V/Flora

---

## English

Flora flower shop landing page based on a Figma design.
**Scope 1** — static HTML/CSS markup. **Scope 2** — interactive layer
(retina images, modals + forms, axios + json-server, pagination).

### Page structure

- Navbar — logo, navigation, CTA button, mobile menu
- Hero — banner with heading, copy and button
- About — "Our Passion for Floral Artistry" block with photo
- Top-Selling Bouquets — slider (1/2/3 per breakpoint) with custom dots + arrows
- Bouquets — grid of products (8 per page) + server-paginated "Show More"
- Feedback — testimonial slider with prev/next navigation
- Contacts — text contacts + photo
- Footer — logo, navigation, social links, copyright
- Product modal — opens on card click, shows image + description + Buy
- Order modal — opens from Buy now, has order form with validation

### Tech stack

- Vite 8 (dev server + bundler + static GitHub Pages build)
- axios — HTTP client
- json-server v1 — mock REST API
- Semantic HTML5, plain CSS (no preprocessors), Flexbox + Grid
- Google Fonts: Hanuman, Roboto
- SVG sprite for icons
- AOS — scroll-triggered animations (third-party, via unpkg CDN)

### File structure

```
.
├── index.html
├── db.json                 # json-server data: bestsellers, products, feedbacks
├── vite.config.js          # Vite + static-API emitter + image copy
├── package.json
├── styles/
│   ├── reset.css           # custom reset on top of normalize
│   ├── colors.css          # CSS custom properties (colors)
│   ├── fonts.css           # font-size variables
│   ├── styles.css          # main stylesheet
│   └── shared.css          # infra: loaders, notifications, overrides
├── js/
│   ├── apiClient.js        # axios instance + static-mode interceptor
│   ├── catalogue.js        # bouquets catalogue + server pagination
│   ├── bestsellers-slider.js
│   ├── feedback-slider.js
│   ├── modal.js            # product + order modals, form validation
│   ├── mobile-menu.js
│   ├── button-cooldown.js
│   ├── notifications.js    # toast helper for errors
│   └── utils.js            # helpers: price formatter, image URL resolver
├── images/                 # bouquet + section photos (@1x and @2x)
└── icons/
    └── sprite.svg          # SVG icon sprite
```

### How to run locally

**Prerequisites:** Node.js 20+.

**Install once:**

```bash
npm install
```

**Run with live mock API (two terminals):**

```bash
# Terminal 1 — mock REST API on http://localhost:3001
npm run api

# Terminal 2 — Vite dev server on http://localhost:4000
npm run dev
```

Open <http://localhost:4000>. The Vite dev server proxies `/api/*` to the
json-server. Edit `db.json` to change products, bestsellers or feedbacks.

**Run in static-API mode** (GitHub Pages emulation, no json-server needed):

```bash
npm run preview:pages
```

This builds the site with `VITE_API_MODE=static`. Pagination params are
sent in HTTP requests but the static host returns the full collection
once — `catalogue.js` then paginates client-side from a cache.

### API endpoints (json-server)

| Endpoint                                  | Returns                  |
| ----------------------------------------- | ------------------------ |
| `GET /api/bestsellers`                    | Top-Selling Bouquets     |
| `GET /api/products?_page=N&_per_page=8`   | Bouquets, paginated      |
| `GET /api/feedbacks`                      | Customer testimonials    |

Pagination response shape (json-server v1):

```json
{
  "first": 1, "prev": null, "next": 2, "last": 13, "pages": 13,
  "items": 100,
  "data": [ /* up to _per_page items for this page */ ]
}
```

### Useful npm scripts

| Script                    | What it does                                  |
| ------------------------- | --------------------------------------------- |
| `npm run dev`             | Vite dev server (port 4000)                   |
| `npm run api`             | json-server (port 3001)                       |
| `npm run build`           | Production build into `dist/`                 |
| `npm run preview`         | Preview built `dist/` (port 4173 by default)  |
| `npm run preview:pages`   | Build + preview in static-API mode            |

### Deployment

The site is deployed to GitHub Pages from the `main` branch via the
workflow in `.github/workflows/deploy.yml`. Each push to `main` builds the
project in static-API mode (json-server is not available on Pages) and
publishes `dist/` to the Pages environment.

---

## Українська

Лендинг квіткового магазину Flora за макетом Figma.
**Скоуп 1** — статична HTML/CSS-верстка. **Скоуп 2** — інтерактивний шар
(ретина-зображення, модалки + форми, axios + json-server, пагінація).

### Структура сторінки

- Navbar — логотип, навігація, CTA-кнопка, мобільне меню
- Hero — банер із заголовком, описом і кнопкою
- About — блок "Our Passion for Floral Artistry" з фото
- Top-Selling Bouquets — слайдер (1/2/3 на брейкпойнт) з крапками + стрілками
- Bouquets — сітка товарів (8 на сторінку) + серверна пагінація через "Show More"
- Feedback — слайдер відгуків зі стрілками
- Contacts — текстові контакти + фото
- Footer — логотип, навігація, соцмережі, копірайт
- Модалка товару — відкривається при кліку на картку, показує фото + опис + Buy
- Модалка замовлення — відкривається з Buy now, має форму з валідацією

### Стек

- Vite 8 (dev-сервер + bundler + білд для GitHub Pages)
- axios — HTTP-клієнт
- json-server v1 — mock REST API
- Семантичний HTML5, CSS (без препроцесорів), Flexbox + Grid
- Шрифти Google Fonts: Hanuman, Roboto
- SVG-sprite для іконок
- AOS — анімації при скролі (third-party, з unpkg CDN)

### Структура файлів

```
.
├── index.html
├── db.json                 # дані для json-server: bestsellers, products, feedbacks
├── vite.config.js          # Vite + static-API emitter + копіювання images/
├── package.json
├── styles/
│   ├── reset.css           # власний reset поверх normalize
│   ├── colors.css          # CSS custom properties (кольори)
│   ├── fonts.css           # змінні розмірів шрифтів
│   ├── styles.css          # основні стилі
│   └── shared.css          # інфра: лоадери, нотифікації, override-и
├── js/
│   ├── apiClient.js        # axios-інстанс + static-mode interceptor
│   ├── catalogue.js        # каталог букетів + серверна пагінація
│   ├── bestsellers-slider.js
│   ├── feedback-slider.js
│   ├── modal.js            # модалки товару + замовлення, валідація форми
│   ├── mobile-menu.js
│   ├── button-cooldown.js
│   ├── notifications.js    # тост-нотифікації помилок
│   └── utils.js            # хелпери: форматер ціни, resolver зображень
├── images/                 # фото букетів і секцій (@1x + @2x)
└── icons/
    └── sprite.svg          # SVG-sprite з іконками
```

### Як запустити локально

**Передумови:** Node.js 20+.

**Встановити залежності (один раз):**

```bash
npm install
```

**Запуск з живим mock API (два термінали):**

```bash
# Термінал 1 — mock REST API на http://localhost:3001
npm run api

# Термінал 2 — Vite dev-сервер на http://localhost:4000
npm run dev
```

Відкрити <http://localhost:4000>. Vite dev-сервер проксує `/api/*` на
json-server. Редагуйте `db.json` щоб змінити товари, bestsellers чи відгуки.

**Запуск у static-API режимі** (емуляція GitHub Pages, json-server не потрібен):

```bash
npm run preview:pages
```

Збирає сайт із `VITE_API_MODE=static`. Параметри пагінації передаються
в HTTP-запитах, але статичний хост повертає всю колекцію одразу —
`catalogue.js` далі пагінує клієнтсайд із кешу.

### API-ендпоінти (json-server)

| Endpoint                                  | Повертає                    |
| ----------------------------------------- | --------------------------- |
| `GET /api/bestsellers`                    | Top-Selling Bouquets        |
| `GET /api/products?_page=N&_per_page=8`   | Букети з пагінацією         |
| `GET /api/feedbacks`                      | Відгуки клієнтів            |

Форма відповіді з пагінацією (json-server v1):

```json
{
  "first": 1, "prev": null, "next": 2, "last": 13, "pages": 13,
  "items": 100,
  "data": [ /* до _per_page елементів цієї сторінки */ ]
}
```

### Корисні npm-скрипти

| Скрипт                    | Що робить                                    |
| ------------------------- | -------------------------------------------- |
| `npm run dev`             | Vite dev-сервер (порт 4000)                  |
| `npm run api`             | json-server (порт 3001)                      |
| `npm run build`           | Продакшен-білд у `dist/`                     |
| `npm run preview`         | Прев'ю зібраного `dist/` (порт 4173)         |
| `npm run preview:pages`   | Білд + прев'ю у static-API режимі            |

### Деплой

Сайт публікується на GitHub Pages з гілки `main` через workflow
`.github/workflows/deploy.yml`. Кожен push у `main` запускає білд у
static-API режимі (json-server недоступний на Pages) і деплоїть `dist/`
у Pages environment.
