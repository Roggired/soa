cd frontend-for-dummies
npm run build:dev
cd ..
cp -R frontend-for-dummies/build/* collection/src/main/webapp/

./gradlew build
cp collection/build/libs/*.war deployments/
cp demography/build/libs/*.war deployments/

# natuionality
# date