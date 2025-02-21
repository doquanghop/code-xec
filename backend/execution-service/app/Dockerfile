FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    python3 \
    gcc g++ \
    openjdk-17-jdk \
    && apt-get clean

WORKDIR /app

CMD tail -f /dev/null


#docker build -t code-executor .
#docker run -d --name code-exec-container code-executor