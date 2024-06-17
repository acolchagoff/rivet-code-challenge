FROM node:18-bullseye-slim
WORKDIR /rivet
COPY package* /rivet/
RUN npm install
COPY . /rivet/
CMD ["npm", "start"]
EXPOSE 3000 