# Definimos una imagen base de node y su versión para nuestro contenedor
FROM node:20

# Definimos el directorio de trabajo dentro del contenedor 
WORKDIR /app

# Copiamos el archivo package.json a la carpeta de trabajo
COPY package.json .

# Instalamos las dependencias del proyecto
RUN npm config set strict-ssl false
RUN npm install
RUN npm install bcryptjs
# Copiamos el resto de los archivos a la carpeta de trabajo
COPY . .

# Exponemos el puerto 8080
EXPOSE 8080

# Definimos el comando para correr nuestra aplicación
CMD ["npm", "start"]

# Luego de crear el Dockerfile, debemos construir la imagen de nuestro contenedor
# Para esto, debemos ejecutar el siguiente comando en la terminal:
# docker build -t nombre-de-la-imagen . (reemplazar nombre-de-la-imagen por el nombre que quieras darle a tu imagen)

# Una vez que la imagen se haya construido, podemos correr un contenedor a partir de ella
# Para esto, debemos ejecutar el siguiente comando en la terminal:
# docker run -p 8080:8080 nombre-de-la-imagen (reemplazar nombre-de-la-imagen por el nombre que le diste a tu imagen)

# Loguearse con la cuenta de docker desde la consola
# docker login

# Crear el tag de la imagen
# docker tag <nombre_imagen> <nombre_usuario_dockerhub>/<nombre_repositorio>:<tag>

# Subir la imagen a dockerhub
# docker push <nombre_usuario_dockerhub>/<nombre_repositorio>:<tag>

# Descargar la imagen
# docker pull <nombre_usuario_dockerhub>/<nombre_repositorio>:<tag>

# Descargar de manera publica la imagen
# docker pull <nombre_repositorio>:<tag>