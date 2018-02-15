ENVIRONMENT = prod

SERVERLESS  = node_modules/.bin/serverless

node_modules: package.json
	npm install

$(SERVERLESS): node_modules

deploy: $(SERVERLESS)
	$(SERVERLESS) deploy --stage $(ENVIRONMENT)

.PHONY: deploy
