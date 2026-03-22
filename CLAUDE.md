# CLAUDE.md — Трифолд «Государственный Военный Госпиталь»

## Файл
`frontend/public/brochure.html` — самодостаточный HTML (inline CSS, без JS-зависимостей).

---

## Физическая структура буклета

```
PAGE 1 — Outer Spread (печатается снаружи)
┌──────────────┬──────────────┬──────────────┐
│   PANEL 5    │   PANEL 6    │   PANEL 1    │
│  Inner Flap  │  Back Cover  │ Front Cover  │
│   100mm      │   100mm      │   103mm      │
└──────────────┴──────────────┴──────────────┘

PAGE 2 — Inner Spread (печатается внутри)
┌──────────────┬──────────────┬──────────────┐
│   PANEL 2    │   PANEL 3    │   PANEL 4    │
│  Почему Китай│ Руки проф.   │  Иглонож     │
│   103mm      │   100mm      │   100mm      │
└──────────────┴──────────────┴──────────────┘
```

C-fold: Panel 5 складывается внутрь поверх панелей 6 и 1.  
Размер страницы: 303×216mm (297×210mm A4 + 3mm bleed со всех сторон).  
CSS grid: `#page1 { grid-template-columns: 100mm 100mm 103mm; }`, `#page2 { grid-template-columns: 103mm 100mm 100mm; }`.

---

## Слои и z-index на PAGE 1

| Элемент | z-index | Позиционирование |
|---|---|---|
| `.bottom-strip` (drone.jpg) | 1 | `absolute` на `.page`, full width |
| `.panels-grid` | 2 | нормальный поток |
| `.fold-mark` | 5 | `absolute` на `.page` |
| `.panel-5 .text-block` | 3 | `relative` внутри панели |
| `.panel-6`, `.panel-1 .cover-content` | 3 | `relative` внутри панелей |
| `.crop-marks` | 10 | `absolute` на `.page` |

**Важно**: панели не имеют фона — drone strip (z:1) просвечивает снизу через прозрачные панели. Это намеренный дизайн. Не добавлять `background` на `.panel`.

`top-strip` (hospital_front.jpg) находится **внутри** `.panel-1` и абсолютно позиционирован относительно неё (не всей страницы). Это правильно.

---

## Известные баги — приоритет исправления

### 🔴 BUG 1 — Spine image в panel-4 (CSS и HTML противоречат друг другу)

В CSS есть комментарий:
```css
/* Spine image removed — panel 4 is text-only */
```
Но в HTML тег `<img class="spine-image">` **присутствует** и рендерится с:
```css
.panel-4 .spine-image {
  object-fit: contain;   /* ← белые поля по бокам, не cover */
  background: #FFFFFF;   /* ← заливает контейнер белым */
}
```
`object-fit: contain` на 100mm×80mm контейнере даёт видимые белые полосы вокруг изображения позвонка — артефакт для печати.  
**Исправить**: либо удалить `<img class="spine-image">` из HTML совсем, либо заменить `object-fit: contain` на `cover`.

---

### 🔴 BUG 2 — Семантика: `<p>` вместо `<h1>` на обложке (panel-1)

```html
<!-- ТЕКУЩЕЕ (неверно) -->
<p class="cover-title">Государственный<br>военный госпиталь</p>

<!-- ДОЛЖНО БЫТЬ -->
<h1 class="cover-title">Государственный<br>военный госпиталь</h1>
```
`cover-title` — это главный заголовок всего документа. Использование `<p>` ломает семантику, доступность и SEO (если страница индексируется). CSS стили для `.cover-title` уже правильные — тег надо поменять на `<h1>`, не трогая классы.

---

### 🟡 BUG 3 — Panel-6: дублирование flex-свойств

`.panel-6` в CSS переопределяет то, что уже задаёт `.panel`:

```css
/* .panel уже задаёт: */
.panel {
  display: flex;
  flex-direction: column;
}

/* .panel-6 повторяет и добавляет: */
.panel-6 {
  display: flex;          /* лишнее */
  flex-direction: column; /* лишнее */
  align-items: center;    /* нужное */
  justify-content: center;/* нужное */
  ...
}
```
Дублирование само по себе не ломает рендеринг, но запутывает. При правке панели-6 убрать `display: flex` и `flex-direction: column` из правила `.panel-6`.

---

### 🟡 BUG 4 — Panel-4: переполнение текста (потенциальное)

Доступная высота для текста в panel-4:
```
216mm total
 − 8mm  (padding-top .text-section)
 − 84mm (padding-bottom .text-section, резерв под spine-image)
= 124mm для текста
```
Текст panel-4 большой: h2 + method-name + 2 абзаца + silver-line + features-list (5 пунктов) + silver-line + note. При 9pt/8pt это вплотную к 124mm. Если spine-image будет удалена (см. BUG 1), `padding-bottom` на `.text-section` нужно уменьшить до `8mm`, иначе текст окажется сжат в верхней половине панели с пустым белым низом.

---

### 🟢 INFO — Архитектура images в panel-2 и panel-3

Изображения `doctors.jpg` и `needles.jpg` вырваны из нормального flex-потока через `position: absolute`. Текстовые блоки компенсируют это через `padding-bottom: 82mm` (panel-2) и `padding-top: 84mm` (panel-3). Это намеренный паттерн — **не исправлять**, если только не меняется высота изображений.

---

## Что НЕ трогать

- Размеры страниц и колонок grid (`303mm`, `216mm`, `100mm/103mm`) — они калиброваны под C-fold с bleed.
- `@page { size: 303mm 216mm; margin: 0; }` — критично для print output.
- `background: #E8E8E8` на `body` — экранный фон вне страниц, при печати подавляется медиа-запросом.
- Crop marks — не трогать позиционирование (`3mm` от краёв = grasp zone для типографии).
- Google Fonts imports — шрифты встроены через preconnect, работают online. Для финальной передачи в типографию шрифты надо векторизовать (outline) перед экспортом в PDF/X-4.

---

## Рабочие инструкции для агента

1. При правке CSS — проверять, не дублирует ли правило уже существующий селектор (особенно `.panel-N` vs `.panel`).
2. После каждого изменения layout-критичных свойств (`height`, `padding`, `position`, `z-index`) — пересчитывать вертикальный баланс затронутых панелей (сумма должна давать 216mm).
3. Единицы измерения в CSS: **только `mm` и `pt`** (не `px`, не `em`) — файл предназначен для печати.
4. Изображения в `brochure.html` ссылаются на `images/*.jpg` относительно `public/`. Пути менять только вместе с физическим перемещением файлов.
5. Тестировать вёрстку через `window.print()` (кнопка в controls) или `Ctrl+P` → PDF → без полей → фон включён.

---

## Образец исправленного panel-4 (после удаления spine-image)

```html
<!-- PANEL 4: Иглонож — ИСПРАВЛЕННЫЙ ВАРИАНТ -->
<div class="panel panel-4">
  <div class="text-section panel-4-content" style="padding-bottom: 8mm;">
    <!-- ... весь текст без изменений ... -->
  </div>
  <!-- img.spine-image — УДАЛЁН -->
</div>
```

И удалить из CSS мёртвый блок:
```css
/* УДАЛИТЬ: */
.panel-4 .spine-image { ... }
```
