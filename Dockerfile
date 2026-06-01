# Stage 1 — minify CSS + JS
FROM node:20-alpine AS build
WORKDIR /build
RUN npm install -g clean-css-cli@5 uglify-js
COPY site/ .
RUN cleancss styles.css -o styles.css && \
    uglifyjs site.js -o site.js

# Stage 2 — serve with nginx
FROM nginx:alpine
COPY --from=build /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
