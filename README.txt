Клод Моне — каталог картин (статический сайт)

Состав:
  index.html      — страница
  style.css       — оформление
  app.js          — поиск, фильтры, карточка картины, RU/EN
  data/monet.js   — данные о 2103 картинах (каталог Вильденштейна W1–W1983 + Wikidata + Wikipedia)
  data/monet_catalog.csv — весь каталог таблицей, с местонахождением
  data/monet_images.csv  — лучшее найденное изображение каждой картины: источник, ссылка на оригинал, размер в px

Бэкенд не нужен. Просмотрщик с глубоким зумом — OpenSeadragon (грузится с cdnjs). Сайт открывается и локально (двойной клик по index.html),
и с любого веб-сервера. Изображения грузятся с Викисклада (commons.wikimedia.org).

Размещение на 911099.xyz (nginx):
  1. Скопировать папку на сервер, например в /var/www/monet
  2. Добавить в конфиг сайта:

     location /monet/ {
         alias /var/www/monet/;
         index index.html;
         gzip on;
         gzip_types text/css application/javascript;
         expires 7d;
     }

     (или сделать отдельный server с root /var/www/monet, если нужен поддомен
      вида monet.911099.xyz)
  3. nginx -t && systemctl reload nginx

Ссылка на конкретную картину: адрес#w285 (номер по Вильденштейну).
