
PreRequisites:
1) docker must be installed ( probably the latest community edition )
2) docker-compose must be installed

Run application:
1) On command line in root folder run :make dockerUp
2) visit localhost:4000 for swagger// sorry swagger not making it past auth, will fix if I have time
3) visit localhost:8888 for application pin number is 1234

Visit DB
1) On command line in root folder run :make db;
2) password = password;
3) select jsonb_pretty(document) from client;

Kill DB
1) On command line in root folder run :make killDB;
