FROM node:20.5.0 AS builder
WORKDIR /app
COPY . .
COPY package.json package-lock.json ./
RUN npm install --force
RUN npm run build --prod
# stage 2
FROM nginx:alpine
COPY nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/security /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
