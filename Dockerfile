FROM node:20

WORKDIR /TODOIFY

ENV DATABASE="mongodb+srv://devkantsah43:Devmong%4043@cluster0.qeg0cnu.mongodb.net/todoify?"
ENV JWT_SECRET_KEY="JWT_SECRET_KEY"
ENV NODE_ENV="development"
ENV SESSION_SECRET="SESSION_SECRET"

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]