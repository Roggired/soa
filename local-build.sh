# build demography service
./gradlew clean bootJar

# build config server
cd services/config-server
./gradlew clean bootJar
cd ../..

# build frontend
cd frontend
./gradlew clean bootJar
cd ..

# build eurika
cd services/eureka
./gradlew clean bootJar
cd ../..

# collect built services
rm -rf ./jars 2>/dev/null
mkdir -p ./jars

cp services/config-server/build/libs/config-server.jar jars
cp services/demography/build/libs/demography.jar jars
cp services/eureka/build/libs/eureka.jar jars
cp frontend/build/libs/frontend.jar jars
