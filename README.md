# 🌟 GMIEF  - Gestor de Ministerios de la Iglesia Evangélica Filadelfia

Bienvenido a **GMIEF App**, una aplicación diseñada para gestionar de manera eficiente los ministerios, zonas, subzonas e iglesias de la Iglesia Evangélica Filadelfia. Este proyecto está construido con las últimas tecnologías para ofrecer una experiencia moderna, rápida y fácil de usar. 🚀

---

## 🛠️ Tecnologías Utilizadas

- **[Next.js](https://nextjs.org/)**: Framework de React para aplicaciones web modernas.
- **React 19**: Biblioteca para construir interfaces de usuario.
- **Styled Components**: Estilización dinámica y basada en componentes.
- **Zustand**: Manejo de estado global simple y escalable.
- **MySQL**: Base de datos relacional para almacenar la información.
- **Node.js**: Backend para manejar las APIs y la conexión con la base de datos.

---

## 🚀 Características Principales

- **Gestión de Zonas y Subzonas**: Selección dinámica de zonas y subzonas con datos obtenidos desde una base de datos MySQL.
- **Interfaz Moderna**: Uso de `styled-components` para una experiencia visual atractiva y consistente.
- **Estado Global**: Manejo de estado con `Zustand` para una gestión eficiente de datos entre componentes.
- **APIs Dinámicas**: Endpoints creados con Next.js para interactuar con la base de datos.
- **Cargadores y Mensajes de Error**: Indicadores visuales para mejorar la experiencia del usuario.

---

## 📦 Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/gmief-app.git
cd gmief-app
```

---

## 📂 Estructura del Proyecto

```markdown
gmief-app/
├── app/ # Directorio principal de la aplicación
│ ├── components/ # Componentes reutilizables
│ ├── api/ # Endpoints API
│ ├── globals.css # Estilos globales
│ ├── layout.js # Layout principal
│ ├── page.js # Página principal
├── lib/ # Librerías auxiliares
│ └── db.js # Conexión a la base de datos
├── store.js # Estado global con Zustand
├── next.config.mjs # Configuración de Next.js
├── package.json # Dependencias y scripts
├── jsconfig.json # Configuración de paths
└── README.md # Documentación del proyecto
```
