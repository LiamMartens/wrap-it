#!/bin/bash
docker run -p 9229:9229 -w /app -itv $(pwd):/app --user=$(id -u):$(id -u) node:alpine $@