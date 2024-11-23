FROM maven:3.8.5-openjdk-17 AS builder

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

COPY --from=builder /app/target/microservice-logging-0.0.1-SNAPSHOT.jar /app/microservice-logging.jar

EXPOSE 8086

ENTRYPOINT ["java", "-jar", "/app/microservice-logging.jar"]
