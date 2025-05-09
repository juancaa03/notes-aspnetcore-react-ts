# Notes ASP.NET Core + React + TypeScript

Este repositorio contiene una aplicación de una prueba técnica **full-stack** de notas:

* **Backend**: ASP.NET Core Web API con EF Core InMemory.
* **Frontend**: React + TypeScript (Vite + SWC) con Tailwind CSS.

---

## Requisitos Previos

Antes de empezar, asegúrate de tener instalados en tu sistema:

* [.NET SDK 9.0 o superior](https://dotnet.microsoft.com/download)
* [Node.js LTS (>= 18.x)](https://nodejs.org)
* Git


---

## Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/notes-aspnetcore-react-ts.git
cd notes-aspnetcore-react-ts
```

---

## Backend (ASP.NET Core)

1. Entra al directorio del backend:

   ```bash
   cd backend
   ```

2. Restaura los paquetes NuGet y construye el proyecto:

   ```bash
   dotnet build
   ```

3. Ejecuta la API:

   ```bash
   dotnet run
   ```

   La API escuchará en:

   * HTTP  : `http://localhost:5080`

---

## Frontend (React + TypeScript)

1. Abre otra terminal y ve al directorio del frontend:

   ```bash
   cd frontend
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo de configuración de entorno `.env`:

   ```env
   VITE_API_URL=http://localhost:5080/api
   ```

4. Ejecuta el frontend:

   ```bash
   npm run dev
   ```

5. Abre tu navegador en la URL que indique Vite (`http://localhost:5173`).

---

## Notas Finales

* El backend usa EF Core InMemory: los datos se almacenan en memoria y se pierden al reiniciar.
* El frontend consume la API a través de la variable `VITE_API_URL`.
* Puedes personalizar orígenes y metodos de CORS en `appsettings.json` del backend.

* Aunque no había trabajado antes con .NET ni con TypeScript, he usado otras tecnologías como Node.js o React y aprendo rápido.
* En el perfil de Github tengo algunos proyectos recientes. Gracias!

