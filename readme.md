# Database

Command used to create mysql container

```BASH
docker run --hostname=23857217275c --mac-address=02:42:ac:11:00:02 --env=GOSU_VERSION=1.17 --env=MYSQL_MAJOR=innovation --env=MYSQL_ROOT_PASSWORD=ventouxdev --env=MYSQL_DATABASE=ventoux_idler --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=MYSQL_VERSION=9.2.0-1.el9 --env=MYSQL_SHELL_VERSION=9.2.0-1.el9 --env=MYSQL_USER=ventoux_dev --env=MYSQL_PASSWORD=ventouxdev --volume=/var/lib/mysql --network=bridge --workdir=/ -p 3306:3306 -p 33060:33060 --restart=no --runtime=runc -d mysql:latest
```
