FROM nginx:1.17-alpine
ENV REACT_APP_BASEURL=""
RUN apk --no-cache --virtual build-dependencies add nodejs npm python make g++ pixman cairo-dev pango-dev pkgconfig jpeg-dev giflib-dev librsvg-dev && \
    mkdir /app
WORKDIR /app
COPY package.json package-lock.json jsconfig.json ./
COPY public/ public/
COPY src/ src/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN npm ci --silent
RUN npm run build --production --silent
COPY README.md start.sh ./
RUN rm -rf /usr/share/nginx/html && \
    ln -s /app/build /usr/share/nginx/html
CMD ["/bin/sh", "start.sh"]