#!/bin/bash

set -e

IMAGE_LIST=(
  "microservice-chat:1.0,./microservice-chat"
  "microservice-game:1.0,./microservice-game"
  "microservice-logging:1.0,./microservice-logging"
  "microservice-websocket:1.0,./microservice-websocket"
)

for ITEM in "${IMAGE_LIST[@]}"; do
  IMAGE_TAG=$(echo $ITEM | cut -d, -f1)
  BUILD_PATH=$(echo $ITEM | cut -d, -f2)

  echo "Calling build.sh to build image: ${IMAGE_TAG} from path ${BUILD_PATH}"
  ./build.sh ${IMAGE_TAG} ${BUILD_PATH}
done
