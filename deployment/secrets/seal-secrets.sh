#!/bin/bash

usage() {
  echo "USAGE: ./seal-secrets.sh <SERVICE_NAME> <ENVIRONMENT>"
  echo ""
  echo "ARGS:"
  echo "Example:
  ./seal-secrets.sh node-svc dev
  ./seal-secrets.sh node-svc staging
  ./seal-secrets.sh node-svc production
  "
  exit 0
}

if [ "${#@}" -lt "2" ] || [ "${#@}" -gt "3" ]; then
  usage
fi

SERVICE_NAME=${1}
ENVIRONMENT=${2}

if [[ "$ENVIRONMENT" == "dev" ]] || [[ "$ENVIRONMENT" == "development" ]]; then
	NAMESPACE="dev"
elif [[ "$ENVIRONMENT" == "stage" ]] || [[ "$ENVIRONMENT" == "staging" ]]; then
	NAMESPACE="staging"
elif [[ "$ENVIRONMENT" == "prod" ]] || [[ "$ENVIRONMENT" == "production" ]]; then
	NAMESPACE="production"
fi


kubectl create secret generic ${SERVICE_NAME}-secrets -n ${NAMESPACE} --dry-run --from-env-file=./.${ENVIRONMENT}.env -o json | kubeseal --format json > ./${ENVIRONMENT}.secrets.json
