# build demography service
./gradlew clean build

# build config server
cd services/config-server
./gradlew clean build
cd ../..

# collect built services
rm -rf ./services/libs 2>/dev/null
mkdir -p ./services/libs

cp services/config-server/build/libs/config-server.jar services/libs
cp services/demography/build/libs/demography.jar services/libs
