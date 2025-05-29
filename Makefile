# Variables
NODE_ENV ?= development
PORT ?= 5173

# Default target
.PHONY: all
all: install

# Install dependencies
.PHONY: install
install:
	npm install

# Development server
.PHONY: dev
dev:
	npm run dev

# Build for production
.PHONY: build
build:
	npm run build

# Run linter
.PHONY: lint
lint:
	npm run lint

# Type checking
.PHONY: type-check
type-check:
	npm run type-check

# Clean build artifacts
.PHONY: clean
clean:
	rm -rf dist
	rm -rf node_modules

# Preview production build
.PHONY: preview
preview:
	npm run preview

# Run all checks
.PHONY: check
check: lint type-check

# Development workflow
.PHONY: dev-setup
dev-setup: install dev

# Production build workflow
.PHONY: prod-build
prod-build: clean install build

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make install     - Install dependencies"
	@echo "  make dev        - Start development server"
	@echo "  make build      - Build for production"
	@echo "  make lint       - Run linter"
	@echo "  make type-check - Run type checking"
	@echo "  make clean      - Remove build artifacts"
	@echo "  make preview    - Preview production build"
	@echo "  make check      - Run all checks"
	@echo "  make dev-setup  - Install and start dev server"
	@echo "  make prod-build - Clean install and build"