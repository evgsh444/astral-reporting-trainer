# Astral Reporting Trainer

Интерактивный онлайн-тренажёр по работе с интерфейсом 1С-Отчетность от Астрал

Данный проект представляет собой интерактивный тренажёр для обучения пользователей работе с системой 1С-Отчетность. Проект реализован в качестве практического задания с расширенным функционалом.

## 🚀 Функционал

### Основные возможности
- **Пошаговое интерактивное обучение** с подсветкой областей интерфейса (hotspot) и всплывающими подсказками (tooltip)
- **Динамическое позиционирование и анимация тултипов** с плавными переходами
- **Система последовательного показа** нескольких хотспотов в одном шаге с кнопками «Далее/Назад»
- **Сохранение прогресса** в localStorage для восстановления позиции при перезагрузке
- **Визуальный редактор хотспотов** с выделением области мышью и автоматическим выводом координат
- **Анимированный маскот** рядом с тултипами для улучшения пользовательского опыта
- **Адаптивный дизайн** для всех устройств

### Дополнительные возможности
- **Анимированный маскот** с поддержкой позиций left/right
- **Проверка границ экрана** с автоматическим перемещением маскота
- **Плавные анимации** появления и перемещения элементов
- **Адаптивные размеры** для разных экранов
- **Система навигации** с возвратом к предыдущим разделам

## 📁 Структура проекта

```
astral-reporting-trainer/
├── assets/
│   ├── icons/
│   │   ├── logo.svg
│   │   ├── exitButton.svg
│   │   ├── mascotLeft.svg
│   │   └── mascotRight.svg
│   └── scenariosimgs/
│       ├── loginToAccount/
│       ├── connectAccount/
│       ├── installFresh/
│       └── ... (другие сценарии)
├── scripts/
│   ├── main.js              # Основная логика приложения
│   ├── hotspotsrender.js    # Рендеринг хотспотов и маскота
│   ├── editor.js            # Визуальный редактор хотспотов
│   └── subsections.js       # Логика подразделов
├── styles/
│   ├── mainpagestyle.css    # Стили главной страницы
│   ├── scenariopagestyle.css # Стили страницы сценария
│   └── completescenariopage.css # Стили страницы завершения
├── index.html               # Главная страница
├── scenariopage.html        # Страница сценария
├── subsections.html         # Страница подразделов
├── completescenariopage.html # Страница завершения
├── scenarios.json           # Конфигурация сценариев
├── subsections.json         # Конфигурация подразделов
└── README.md               # Документация
```

## 🎯 Как добавить новый сценарий

### 1. Подготовка изображений
1. Создайте папку в `assets/scenariosimgs/` с названием вашего сценария
2. Добавьте SVG изображения для каждого шага

### 2. Добавление сценария в scenarios.json

```json
{
  "id": "my_scenario",
  "title": "Личный кабинет 1С-Отчетность",
  "name": "Название сценария",
  "completeText": "Теперь вы знаете, как работать с...",
  "scenarioCategory": "1cReportAccount",
  "steps": [
    {
      "step": 1,
      "image": "my-image-1.svg",
      "hotspots": [
        {
          "xPercent": 21.2,
          "yPercent": 58.3,
          "width": 24.4,
          "height": 8.9,
          "tooltipPosition": "bottom",
          "tooltipAlign": "center",
          "tooltipTitle": "Заголовок подсказки",
          "tooltipText": "Текст подсказки",
          "invisible": false,
          "mascotPosition": "left",
          "showMascot": true
        }
      ]
    }
  ]
}
```

### 3. Параметры хотспота

| Параметр | Тип | Описание | Значения |
|----------|-----|----------|----------|
| `xPercent` | number | Позиция X в процентах | 0-100 |
| `yPercent` | number | Позиция Y в процентах | 0-100 |
| `width` | number | Ширина в процентах | 0-100 |
| `height` | number | Высота в процентах | 0-100 |
| `tooltipPosition` | string | Позиция тултипа | `top`, `bottom`, `left`, `right` |
| `tooltipAlign` | string | Выравнивание тултипа | `center`, `start`, `end` |
| `tooltipTitle` | string | Заголовок тултипа | Любой текст |
| `tooltipText` | string | Текст тултипа | Любой текст |
| `invisible` | boolean | Невидимый хотспот | `true`, `false` |
| `mascotPosition` | string | Позиция маскота | `left`, `right` |
| `showMascot` | boolean | Показать маскота | `true`, `false` |

### 4. Добавление в подразделы
Отредактируйте `subsections.json`:

```json
{
  "id": "1cReportAccount",
  "title": "Личный кабинет 1С-Отчетность",
  "subsections": [
    {"title": "Ваш новый сценарий", "id": "my_scenario"}
  ]
}
```

## 🎨 Визуальный редактор хотспотов

### Включение/отключение редактора
В файле `scripts/editor.js` измените значение переменной:
```javascript
let hotspotEditorEnabled = true;  // true - включен, false - отключен
```

### Использование редактора
1. Откройте страницу сценария в браузере
2. Выделите область мышью на изображении
3. После отпускания кнопки мыши в консоли появится JSON:

```json
{
  "xPercent": 21.2,
  "yPercent": 58.3,
  "width": 24.4,
  "height": 8.9,
  "tooltipPosition": "top",
  "tooltipAlign": "center",
  "tooltipTitle": "",
  "tooltipText": "",
  "invisible": false
}
```

4. Скопируйте JSON и вставьте в массив `hotspots` нужного шага

## 🎭 Система маскота

### Конфигурация маскота
```json
{
  "tooltipText": "Нажмите на кнопку",
  "tooltipPosition": "right",
  "tooltipAlign": "center",
  "mascotPosition": "left",  // "left" или "right"
  "showMascot": true         // true/false
}
```

### Автоматическое позиционирование
- **Тултип справа** → маскот слева
- **Тултип слева** → маскот справа
- **Тултип сверху/снизу** → маскот слева (по умолчанию)

### Изображения маскота
- `mascotRight.svg` - смотрит вправо (для позиции `left`)
- `mascotLeft.svg` - смотрит влево (для позиции `right`)


## 🔧 Технические детали

### JavaScript функции
- `createMascot()` - создание маскота
- `addHotspot()` - добавление хотспота
- `positionTooltip()` - позиционирование тултипа
- `enableHotspotEditor()` - включение редактора

### Локальное хранилище
- `hotspot-step` - сохранение текущего шага и хотспота
- Автоматическое восстановление при перезагрузке

### Проверка границ экрана
- Автоматическое перемещение маскота при выходе за границы
- Динамическая смена изображения маскота

## 🚀 Запуск проекта

1. Клонируйте репозиторий
2. Откройте `index.html` в браузере
3. Начните обучение!

## 📝 Лицензия

Проект создан в качестве практического задания для обучения работе с 1С-Отчетность.

---

**Astral Reporting Trainer** - Интерактивный тренажёр для освоения системы 1С-Отчетность от Астрал
