# import config.
# You can change the default config with `make cnf="config_special.env" build`
cnf ?= config.env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

# import deploy config
# You can change the default deploy config with `make cnf="deploy_special.env" release`
# dpl ?= deploy.env
# include $(dpl)
# export $(shell sed 's/=.*//' $(dpl))

# grep the version from the mix file
# VERSION=$(shell ./version.sh)


# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo "Add following variables in config.env"
	@echo "FRONTEND_APP_NAME"
	@echo "FRONTEND_APP_DIRECTORY"
	@echo "BACKEND_APP_NAME"
	@echo "BACKEND_APP_DIRECTORY"
	@echo ""

.DEFAULT_GOAL := help


# DOCKER TASKS
# Build the container
build_all: ## Build the container
	docker build -t $(FRONTEND_APP_NAME) $(FRONTEND_APP_DIRECTORY)
	docker build -t $(BACKEND_APP_NAME) $(BACKEND_APP_DIRECTORY)

run_dev: ## Run Dev Server
	docker-compose up

stop_dev:
	docker-compose down