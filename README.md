<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

___

# Ejecutar en desarrollo

1. Clonar el repositorio

2. Instalar dependencias
```
yarn install
```

3. Instalar Nest CLI
```
npm i -g @nestjs/cli
```

4. Levantar base de datos
```
docker-compose up -d
``` 

5. Renombrar el archivo ```example.env``` a ```.env```

6. Modificar variables de entorno en el archivo ```.env```

7. Ejecutar la aplicación en dev:

```
yarn start:dev
```

8. Insertar datos con la semilla
```
http://localhost:3000/api/seed
```

# Production Build

1. Crear archivo ```.env.prod```

2. Llenar variables de entorno del archivo ```.env.prod```

3. Crear nueva imagen

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


## Stack usado
* NestJs
* MongoDB