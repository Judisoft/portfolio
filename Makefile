IMAGE_NAME    := kum-jude-portfolio
CONTAINER_NAME := portfolio
PORT          := 3000

.PHONY: help dev install build run stop restart clean logs rebuild

help:
	@echo ""
	@echo "  Kum Jude Bama — Portfolio"
	@echo ""
	@echo "  Local development:"
	@echo "    make install   Install npm dependencies"
	@echo "    make dev       Start Vite dev server (hot-reload)"
	@echo ""
	@echo "  Docker:"
	@echo "    make build     Build Docker image"
	@echo "    make run       Run container on http://localhost:$(PORT)"
	@echo "    make stop      Stop and remove container"
	@echo "    make restart   Stop, rebuild, and run"
	@echo "    make clean     Remove container + image"
	@echo "    make logs      Follow container logs"
	@echo ""

install:
	npm install

dev:
	npm run dev

build:
	docker build -t $(IMAGE_NAME) .

run: build
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):80 \
		--restart unless-stopped \
		$(IMAGE_NAME)
	@echo ""
	@echo "  Portfolio live at http://localhost:$(PORT)"
	@echo ""

stop:
	@docker stop $(CONTAINER_NAME) 2>/dev/null && docker rm $(CONTAINER_NAME) 2>/dev/null || true
	@echo "Container stopped."

restart: stop run

clean: stop
	@docker rmi $(IMAGE_NAME) 2>/dev/null || true
	@echo "Image removed."

logs:
	docker logs -f $(CONTAINER_NAME)
