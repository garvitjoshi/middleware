SERVICE_NAME=opsmiddleware
# $sha is provided by jenkins
BUILDER_TAG?=$(or $(sha),$(SERVICE_NAME)-builder)
IMAGE_TAG=$(SERVICE_NAME)-img
BUILD_DOCKERFILE_NAME=Dockerfile.build.mt
LOCALIZATION_SCRIPT=./localization_connector/localization.sh

default: ci

login:
ifeq ($(ARTIFACTORY_USER), )
	@echo "make sure that ARTIFACTORY_USER is set appropriately in your environment"
	exit 1
endif
ifeq ($(ARTIFACTORY_API_TOKEN), )
	@echo "make sure that ARTIFACTORY_API_TOKEN is set appropriately in your environment"
	exit 1
endif
	@echo docker login -u ARTIFACTORY_USER -p ARTIFACTORY_API_TOKEN docker-asr-release.dr.corp.adobe.com
	@docker login -u $(ARTIFACTORY_USER) -p $(ARTIFACTORY_API_TOKEN) docker-asr-release.dr.corp.adobe.com

# The image tag for ci will be different with BYOJ, see https://jira.corp.adobe.com/browse/EON-4685
ci: IMAGE_TAG := $(if $(sha),$(IMAGE_TAG)-ci-$(sha),$(IMAGE_TAG))
ci: build
	echo "Success"

pre-deploy-build:
	echo "Nothing is defined in pre-deploy-build step"

porter: login
	docker build -t $(BUILDER_TAG) -f $(BUILD_DOCKERFILE_NAME) .
	docker run $(BUILDER_TAG) | docker build --tag $(IMAGE_TAG) -
	echo "Success"

localization:
# Reference: https://wiki.corp.adobe.com/display/DMaG11n/Localization_connector
# - The localization script is only present if you onboard additional locales, beyond just en-US.
# - Script handles Aladdin server calls, to post latest English strings to be translated,
# - and retrieve's latest translations.
ifeq ($(wildcard ${LOCALIZATION_SCRIPT}),)
	@echo "Localization script not present (${LOCALIZATION_SCRIPT}). This is correct if the project is en-US only."
else
	bash ${LOCALIZATION_SCRIPT} command=put-sync
	bash ${LOCALIZATION_SCRIPT} command=get
endif

build: localization login
	docker build -t $(BUILDER_TAG) -f $(BUILD_DOCKERFILE_NAME) .
	@docker run -e TESSA2_API_KEY=$(TESSA2_API_KEY) -v `pwd`:/build -e ARTIFACTORY_USER -e ARTIFACTORY_API_TOKEN $(BUILDER_TAG)
	docker build -t $(IMAGE_TAG) .

post-deploy-build:
	echo "Nothing is defined in post-deploy-build step"

clean-room:
	# Docker Clean Room setup - https://wiki.corp.adobe.com/x/khu5TQ
	sh clean-room.sh
