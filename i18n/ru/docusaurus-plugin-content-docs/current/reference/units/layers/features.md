---
sidebar_position: 6
---

# Features

:::tip Когда использовать?
Когда в проекте становится сложно найти границы конкретных пользовательских сценариев, из-за чего страдает контролируемость и переиспользование логики

*Используйте, только если уверены, что дополнительное разделение по фичам поможет вашему приложению, а не вызовет слишком много недопонимания и скепсиса! (вместо этого, можете хранить подобную логику прямо в виджетах) ⚠️*
:::

![features-themed-bordered](/img/layers/features.png)

## Описание {#description}

Каждая фича - часть бизнес-логики, при этом обязательно имеющая смысл и ценность для конечного пользователя

- *`ProductList`, `OfficeMap` - вряд ли можно назвать фичами*
- *`WalletAddFunds`, `AddToCart` - уже больше смысла для конечного пользователя*

При этом:

- для построения логики используются нижележащие слои
  - *`shared`, `entities`*
- одна фича **не может** импортировать другую
  - *Если [возникла такая необходимость][refs-low-coupling] - зависимость нужно переносить на слой выше / ниже, либо решать через композицию через children-props*
- фичи не могут быть вложенными, но при этом могут объединяться общей папкой, т.е. структурно
  - *При этом нельзя создавать промежуточные файлы, нужные именно для конкретной группы фич*
  - *Можно использовать только файлы реэкспорты*

## Структура {#structure}

```sh
└── features/{slice}
          ├── lib/
          ├── model/
          ├── ui/
          └── index.ts
```

Таким образом, фича хранит информацию о том:

1. Какие данные нужны для её работы
1. По каким правилами происходят изменения данных
1. Какие [сущности][refs-entity] нужны для полного построения фичи
1. Как данные представлены для пользователя

## Правила {#rules}

### Одна фича = одна функциональность {#one-feature--one-functionality}

В фиче находится код, который реализует **одну** полезную функциональность для пользователя.

### Структурная группировка фич {#structural-grouping-of-features}

Часто возникает необходимость собрать вместе ряд несколько связанных по смыслу фич *(при этом они могут и должны не импортировать друг друга напрямую)*

Методология рекоммендует избегать **вложенных фич**, т.е. фич - которые сильно связаны под общей оберткой с доп. логикой

Вместо этого - методология предлагает при необходимости - **группировать по папкам** необходимые фичи *(при этом нельзя эти фичи связывать напрямую, папки нужны только для структурной группировки по смыслу)*

```diff
features/order/            Группа фич
   ├── add-to-cart         Полноценная фича
   ├── total-info          Полноценная фича
-  ├── model.ts            Общая логика для группы
-  ├── hooks.ts            Общие хуки для группы
   ├── index.ts            Публичный API с реэкспортом фич
```

### Фичи не должны зависеть друг от друга {#features-should-not-depend-on-each-other}

Данное правило не всегда получается соблюдать, но количество таких нарушений лучше свести к минимуму.

Как правило, именно из-за пренебрежения этим правилом появляется высокая связность между модулями системы и непредсказуемые сайд-эффекты при разработке.

Одним из способов для решения проблемы является использование [entity][refs-entity].

## Примеры {#examples}

*С точки зрения кода: не все изменения для пользователя — `features`, но все `features` — изменения для пользователя.*

### Смена языка интерфейса приложения {#changing-the-application-interface-language}

- `Feature` для пользователя и разработчика.

> При этом сама `i18n` логика может использоваться не только в этой фиче, но и даже в сущностях. Поэтому такое стоит скорее располагать в `shared/lib` или `shared/config`
>
> *Позже будет добавлен отдельный гайд*

### Перевод средств между счетами {#transfer-of-funds-between-accounts}

- `Feature` для пользователя и разработчика.

### Фильтр по тегам {#filter-by-tags}

- Для пользователя: `feature`.
- Для разработчика: [entity][refs-entity] `tags` позволяют реализовать фильтр по тегам внутри `feature`.

### Подсказки при заполении полей формы {#hints-when-filling-in-the-form-fields}

- Для пользователя: `feature`.
- Для разработчика: часть `form` [entity][refs-entity].

### Авторизация по телефону {#authorization-by-phone}

```tsx title=features/auth/by-phone/ui.tsx
import { viewerModel } from "entities/viewer";

export const AuthByPhone = () => {
    return (
        // для redux - дополнительно нужен dispatch
        <Form onSuccess={(user) => viewerModel.setUser(user)}>
            <Form.Input 
                type="phone"
                ...
            />
            <Form.Button
                ...
            />
        </Form>
    )
}
```

## См. также {#see-also}

- ["Гайд по избавлению от кросс-импортов"](/docs/reference/isolation)
- [Понимание потребностей пользователя и бизнес-задач](/docs/about/understanding/needs-driven)
  - Для понимания слоя `features`
- [(Тред) Про фичи и сущности наглядно](https://github.com/feature-sliced/documentation/discussions/23#discussioncomment-451017)

[refs-entity]: /docs/reference/units/layers/entities
[refs-low-coupling]: /docs/reference/isolation/coupling-cohesion
