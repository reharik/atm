
PreRequisites:
1) docker must be installed ( probably the latest community edition )
2) docker-compose must be installed

Run application:
1) On command line in root folder run :make dockerUp
2) visit localhost:4000 for swagger// swagger works now
3) visit localhost:8888 for application pin number is 1234
4) there is a bit of a Heisenberg bug that is sometimes makeing the first run fail. If you get an infinite loop on the api or you get an error entering the pin, please just stop the containers and rerun make dockerUp.

Visit DB
1) On command line in root folder run :make db;
2) password = password;
3) select jsonb_pretty(document) from client;

Kill DB
1) On command line in root folder run :make killDB;
