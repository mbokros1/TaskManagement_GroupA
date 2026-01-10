COMPOSE=docker-compose

.PHONY: up build down clean restart logs-backend logs-db shell-frontend shell-backend

up:
	$(COMPOSE) up

build:
	$(COMPOSE) up --build

fresh:
	$(COMPOSE) down -v
	$(COMPOSE) up --build

down:
	$(COMPOSE) down

clean:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

logs-backend:
	$(COMPOSE) logs -f backend

logs-db:
	$(COMPOSE) logs -f db

shell-frontend:
	$(COMPOSE) exec frontend sh

shell-backend:
	$(COMPOSE) exec backend sh
