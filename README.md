# Flora — UMT Markup Practice

[English](#english) | [Українська](#українська)

## Live preview

https://saniksin.github.io/UMT-markup-practice-MakedonOleksandr2/

## Figma

https://www.figma.com/design/2Tj16H7IO7dq1ViTvIh57V/Flora

---

## English

Practice assignment: HTML markup and CSS styling of the Flora flower shop landing page based on a Figma design.

### Page structure

- Navbar — logo, navigation, CTA button
- Hero — banner with heading, copy and button
- About — "Our Passion for Floral Artistry" block with photo
- Top-Selling Bouquets — carousel of 3 products with dots + arrows
- Bouquets — 4×2 grid of products + "Show More" button
- Feedback — 3 testimonial cards with navigation arrows
- Contacts — text contacts (phone, address) + photo
- Footer — logo, navigation, social links, copyright

### Tech stack

- Semantic HTML5
- Plain CSS (no preprocessors), Flexbox-based layout
- `modern-normalize` via CDN
- Google Fonts: Hanuman, Roboto
- SVG sprite for icons

### File structure

```
.
├── index.html
├── styles/
│   ├── reset.css      # custom reset on top of normalize
│   ├── colors.css     # CSS custom properties (colors)
│   ├── fonts.css      # font-size variables
│   └── styles.css     # main stylesheet
├── images/            # section photos
└── icons/
    └── sprite.svg     # SVG icon sprite
```

### How to run locally

Open `index.html` in a browser. No build step required.

---

## Українська

Практичне завдання: HTML-розмітка та CSS-верстка лендингу квіткового магазину Flora за макетом Figma.

### Структура сторінки

- Navbar — логотип, навігація, CTA-кнопка
- Hero — банер із заголовком, описом і кнопкою
- About — блок "Our Passion for Floral Artistry" з фото
- Top-Selling Bouquets — карусель із 3 товарами, крапки + стрілки
- Bouquets — сітка 4×2 з товарами + кнопка "Show More"
- Feedback — 3 картки відгуків, стрілки гортання
- Contacts — текстові контакти (телефон, адреса) + фото
- Footer — логотип, навігація, соцмережі, копірайт

### Стек

- Семантичний HTML5
- CSS (без препроцесорів), layout на Flexbox
- `modern-normalize` через CDN
- Шрифти Google Fonts: Hanuman, Roboto
- Іконки — SVG-sprite

### Структура файлів

```
.
├── index.html
├── styles/
│   ├── reset.css      # кастомний скидач поверх normalize
│   ├── colors.css     # CSS custom properties (кольори)
│   ├── fonts.css      # змінні розмірів шрифтів
│   └── styles.css     # основні стилі
├── images/            # фото для секцій
└── icons/
    └── sprite.svg     # SVG-sprite з іконками
```

### Як запустити локально

Відкрити `index.html` у браузері. Збірка не потрібна.
