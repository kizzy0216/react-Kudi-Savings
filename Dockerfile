# Stage 1
FROM node:10 as kudi-cashout
WORKDIR /app
COPY package.json package-lock.json
COPY . ./
RUN npm install
RUN npm install -g serve
RUN npm run build
CMD ["serve", "-s", "build","-l", "8080"]
