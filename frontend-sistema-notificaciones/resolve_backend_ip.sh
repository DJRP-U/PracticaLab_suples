#!/bin/sh
BACKEND_IP=$(getent hosts backend | awk '{ print $1 }')
echo "NEXT_PUBLIC_API_HOST=$BACKEND_IP" > .env