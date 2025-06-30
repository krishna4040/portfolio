# Portfolio Application Makefile

# Variables
DOCKER_COMPOSE = docker compose
DOCKER = docker
APP_NAME = portfolio-app
DB_CONTAINER = portfolio-mongo
NETWORK_NAME = portfolio-network

# Colors for output
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m # No Color

.PHONY: help install build dev start stop clean logs test docker-build docker-run docker-up docker-down docker-logs docker-clean setup-db create-admin seed-data reset-db

# Default target
help: ## Show this help message
	@echo "$(BLUE)Portfolio Application - Available Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

# Development Commands
install: ## Install dependencies for both client and server
	@echo "$(YELLOW)Installing server dependencies...$(NC)"
	npm install --legacy-peer-deps
	@echo "$(YELLOW)Installing client dependencies...$(NC)"
	cd client && npm install
	@echo "$(GREEN)Dependencies installed successfully!$(NC)"

build: ## Build the application for production
	@echo "$(YELLOW)Building application...$(NC)"
	cd client && npm run build && cp -r dist ../
	@echo "$(GREEN)Application built successfully!$(NC)"

dev: ## Start development server with hot reload
	@echo "$(YELLOW)Starting development server...$(NC)"
	npm run dev

start: ## Start production server
	@echo "$(YELLOW)Starting production server...$(NC)"
	npm start

stop: ## Stop all running processes
	@echo "$(YELLOW)Stopping all processes...$(NC)"
	pkill -f "node index.js" || true
	pkill -f "vite" || true
	@echo "$(GREEN)Processes stopped!$(NC)"

clean: ## Clean build artifacts and node_modules
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	rm -rf dist/
	rm -rf node_modules/
	rm -rf client/node_modules/
	rm -rf client/dist/
	@echo "$(GREEN)Clean completed!$(NC)"

# Docker Commands
docker-build: ## Build Docker image
	@echo "$(YELLOW)Building Docker image...$(NC)"
	$(DOCKER) build -t $(APP_NAME) .
	@echo "$(GREEN)Docker image built successfully!$(NC)"

docker-run: ## Run application in Docker container
	@echo "$(YELLOW)Running application in Docker...$(NC)"
	$(DOCKER) run -p 5000:5000 --name $(APP_NAME) $(APP_NAME)

docker-up: ## Start all services with docker-compose
	@echo "$(YELLOW)Starting services with docker-compose...$(NC)"
	$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)Services started successfully!$(NC)"
	@echo "$(BLUE)Application: http://localhost:5000$(NC)"
	@echo "$(BLUE)Admin Panel: http://localhost:5000/admin$(NC)"

docker-down: ## Stop all services
	@echo "$(YELLOW)Stopping services...$(NC)"
	$(DOCKER_COMPOSE) down
	@echo "$(GREEN)Services stopped!$(NC)"

docker-logs: ## Show logs from all services
	$(DOCKER_COMPOSE) logs -f

docker-clean: ## Clean up Docker containers and images
	@echo "$(YELLOW)Cleaning Docker containers and images...$(NC)"
	$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans
	$(DOCKER) system prune -f
	@echo "$(GREEN)Docker cleanup completed!$(NC)"

docker-rebuild: ## Rebuild and restart services
	@echo "$(YELLOW)Rebuilding and restarting services...$(NC)"
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up --build -d
	@echo "$(GREEN)Services rebuilt and restarted!$(NC)"

# Database Commands for docker
setup-db: ## Setup database with initial data
	@echo "$(YELLOW)Setting up database...$(NC)"
	$(DOCKER_COMPOSE) exec app npm run create-admin
	$(DOCKER_COMPOSE) exec app npm run seed-all
	@echo "$(GREEN)Database setup completed!$(NC)"

create-admin: ## Create admin user
	@echo "$(YELLOW)Creating admin user...$(NC)"
	$(DOCKER_COMPOSE) exec app npm run create-admin
	@echo "$(GREEN)Admin user created!$(NC)"

seed-data: ## Seed sample data
	@echo "$(YELLOW)Seeding sample data...$(NC)"
	$(DOCKER_COMPOSE) exec app npm run seed-all
	@echo "$(GREEN)Sample data seeded!$(NC)"

reset-db: ## Reset database (WARNING: This will delete all data)
	@echo "$(RED)WARNING: This will delete all data!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(YELLOW)Resetting database...$(NC)"; \
		$(DOCKER_COMPOSE) down -v; \
		$(DOCKER_COMPOSE) up -d mongo; \
		sleep 5; \
		$(DOCKER_COMPOSE) up -d app; \
		sleep 10; \
		make setup-db; \
		echo "$(GREEN)Database reset completed!$(NC)"; \
	else \
		echo "$(BLUE)Database reset cancelled.$(NC)"; \
	fi

# MongoDB Commands for docker
mongo-shell: ## Connect to MongoDB shell
	@echo "$(YELLOW)Connecting to MongoDB shell...$(NC)"
	$(DOCKER_COMPOSE) exec mongo mongosh portfolio

mongo-backup: ## Backup MongoDB data
	@echo "$(YELLOW)Creating MongoDB backup...$(NC)"
	mkdir -p backups
	$(DOCKER_COMPOSE) exec mongo mongodump --db portfolio --out /data/backup
	$(DOCKER) cp $$($(DOCKER_COMPOSE) ps -q mongo):/data/backup ./backups/
	@echo "$(GREEN)Backup created in ./backups/$(NC)"

mongo-restore: ## Restore MongoDB data from backup
	@echo "$(YELLOW)Restoring MongoDB data...$(NC)"
	$(DOCKER) cp ./backups/backup $$($(DOCKER_COMPOSE) ps -q mongo):/data/
	$(DOCKER_COMPOSE) exec mongo mongorestore /data/backup
	@echo "$(GREEN)Data restored successfully!$(NC)"

# Testing Commands
test: ## Run tests
	@echo "$(YELLOW)Running tests...$(NC)"
	npm test
	cd client && npm test

lint: ## Run linting
	@echo "$(YELLOW)Running linter...$(NC)"
	npm run lint

lint-fix:
	npm run lint:fix

# Utility Commands
status: ## Show status of all services
	@echo "$(BLUE)Service Status:$(NC)"
	$(DOCKER_COMPOSE) ps

health-check: ## Check application health
	@echo "$(YELLOW)Checking application health...$(NC)"
	@curl -f http://localhost:5000/api/projects > /dev/null 2>&1 && \
		echo "$(GREEN)✓ Application is healthy$(NC)" || \
		echo "$(RED)✗ Application is not responding$(NC)"

logs-tail: ## Tail logs from all services
	$(DOCKER_COMPOSE) logs -f --tail=100

# Quick Start Commands
quick-start: ## Quick start for development (install + dev)
	make install
	make dev

quick-deploy: ## Quick deploy with Docker (build + up + setup)
	make docker-rebuild
	sleep 15
	make setup-db
	@echo "$(GREEN)🚀 Application deployed successfully!$(NC)"
	@echo "$(BLUE)Application: http://localhost:5000$(NC)"
	@echo "$(BLUE)Admin Panel: http://localhost:5000/admin$(NC)"
	@echo "$(YELLOW)Admin Credentials: admin / admin123$(NC)"

# Production Commands
prod-deploy: ## Deploy to production
	@echo "$(YELLOW)Deploying to production...$(NC)"
	make build
	make docker-build
	@echo "$(GREEN)Production deployment ready!$(NC)"

# Development with Docker
dev-docker: ## Start development environment with Docker
	@echo "$(YELLOW)Starting development environment with Docker...$(NC)"
	$(DOCKER_COMPOSE) -f docker-compose.dev.yml up -d
	@echo "$(GREEN)Development environment started!$(NC)"
