FROM node:22.0.0-alpine
WORKDIR /frontend
RUN addgroup -S react && adduser -S react -G react
COPY package*.json ./
RUN ls -ltr && npm install
COPY . ./
RUN chown -R react:react /frontend && chmod -R 700 /frontend && ls -ltr
USER react
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]