## SOA Lab2

Егошин Алексей и Кулинич Ярослав

### Dev окружение

1. `mkdir deployments`  
2. `docker-compose build && docker-compose up`  
3. `./deploy.sh`  

### Prod окружение

1. Скачать Wildfly версии 26.1.2.Final и залить на сервер  
2. Подложить в `standalone/configuration` файл `wildfly-config/standalone.xml`  
3. Создать директорию `certs`  
4. Скопировать в `certs` скрипт `generate-certs-v2.sh`  
5. Перейти в `certs` и запустить скрипт `./generate-certs-v2.sh mycooldomain.home`  
6. Ответить на вопросы скрипта для генерации самоподписного сертификата для фейкового центра сертификации  
7. Итоговый файл `Server-keystore.p12` залить на сервер в `$JBOSS_HOME/standalone/configuration`  
8. Выполнить в корне проекта `./deploy.sh`  
9. war-архивы из `deployments` залить на сервер в `$JBOSS_HOME/standalone/deployments`  
10. Запустить Wildfly на сервере `$JBOSS_HOME/bin/standalone.sh &`  
11. Для остановки сервера использовать `$JBOSS_HOME/bin/jboss-cli.sh --connect --controller=remote+http://localhost:65102 --command=:shutdown`  
12. Отредактировать файл `/etc/hosts`, добавить туда строчку `127.0.0.1   mycooldomain.home`  
13. Открыть свой любимый браузер, зайти в его настройки и найти там кнопку "импорт" для сертифкатов доверенных центров сертификации  
14. Импортировать сертификат `$PROJECT_ROOT/certs/rootCA.pem`  
15. Можно пользоваться по адресу `https://yofik.soa.home:65101/collection/`  
