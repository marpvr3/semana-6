# Recetas Inclusivas API

API REST desarrollada con Express y MongoDB para gestionar recetas orientadas a personas con restricciones alimentarias.

## Descripción

El proyecto permite registrar usuarios, iniciar sesión, proteger rutas mediante JSON Web Token y almacenar información en MongoDB.

La API trabaja con:

- Usuarios
- Recetas
- Reseñas de recetas

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token
- dotenv

## Instalación

```bash
npm install
```

Crear el archivo `.env` a partir de `.env.example`:

```bash
cp .env.example .env
```

Ejecutar el servidor:

```bash
npm run dev
```

## Variables de entorno

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/recetas_inclusivas_api
JWT_SECRET=clavemuysecreta_cambiar_en_produccion
JWT_EXPIRES_IN=1h
```

## Endpoints

### Usuarios

| Método | Ruta | Descripción | Protegida |
|---|---|---|---|
| POST | `/api/users/register` | Registrar usuario | No |
| POST | `/api/users/login` | Iniciar sesión | No |
| GET | `/api/users` | Listar usuarios | Sí |
| GET | `/api/users/:id` | Obtener usuario por id | Sí |
| PATCH | `/api/users/:id` | Actualizar usuario | Sí |

### Recetas

| Método | Ruta | Descripción | Protegida |
|---|---|---|---|
| GET | `/api/recipes` | Listar recetas | No |
| GET | `/api/recipes/:id` | Obtener receta por id | No |
| POST | `/api/recipes` | Crear receta | Sí |

### Reseñas

| Método | Ruta | Descripción | Protegida |
|---|---|---|---|
| GET | `/api/reviews` | Listar reseñas | No |
| POST | `/api/reviews` | Crear reseña | Sí |

## Ejemplos de uso

### Registrar usuario

```json
{
  "name": "Andres",
  "email": "andres@test.com",
  "password": "123456"
}
```

### Crear receta

Enviar el token en el header:

```txt
Authorization: Bearer TU_TOKEN
```

Body:

```json
{
  "title": "Brownies sin gluten",
  "description": "Receta dulce apta para personas celíacas.",
  "category": "Postre",
  "restrictions": ["sin gluten", "sin lactosa"],
  "ingredients": ["harina de arroz", "cacao", "huevos", "azúcar"],
  "preparation": "Mezclar los ingredientes, colocar en un molde y hornear durante 25 minutos.",
  "image": "https://example.com/brownie.jpg",
  "preparationTime": 25
}
```

### Crear reseña

```json
{
  "recipe": "ID_DE_LA_RECETA",
  "userName": "Maria",
  "comment": "Muy buena receta y fácil de preparar.",
  "rating": 5
}
```

## Integrantes

- Maria Paula Valbuena Romero 
