#! /bin/sh

if [ "$REACT_APP_BASEURL" = "" ]; then
	echo "Missing required parameter 'REACT_APP_BASEURL'"
	exit 3
fi

npm run build --production || exit 2

echo "Starting nginx..."

nginx -g "daemon off;"

