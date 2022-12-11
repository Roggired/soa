FROM openjdk:11

COPY build/libs/demography.jar /app/app.jar
COPY certs/spring-keystore.p12 /app-config/
COPY certs/spring-truststore.p12 /app-config/

CMD ["java", "-jar", "/app/app.jar"]