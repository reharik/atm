SHELL:=/bin/bash

dockerUp: killDB
	docker-compose -p atm up

dockerDown:
	docker-compose -p atm down --rmi local --remove-orphans

lint:
	cd api && npm run lint

db:
	psql -h localhost -d atm -U atm -p 5400

killDB:
	-docker rm -fv atm_postgres_1