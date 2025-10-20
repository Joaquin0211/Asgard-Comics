# Asgard Comics - Usuarios y Datos de Prueba

## 📋 Información General

Este documento contiene todas las credenciales y datos de prueba necesarios para probar el sistema Asgard Comics completo.

---

## 👥 Usuarios de Prueba

### 🔑 Usuario Administrador
- **Email:** `admin@asgard.com`
- **Password:** `admin123`
- **Rol:** ADMIN
- **Permisos:** 
  - Acceso al Owner Dashboard
  - Crear, editar y eliminar productos
  - Gestionar inventario
  - Ver estadísticas del sistema
  - Administrar categorías

### 👤 Usuarios Regulares

#### Usuario 1
- **Email:** `juan@email.com`
- **Password:** `user123`
- **Rol:** USER
- **Nombre:** Juan Pérez

#### Usuario 2
- **Email:** `maria@email.com`
- **Password:** `user123`
- **Rol:** USER
- **Nombre:** María García

#### Usuario 3
- **Email:** `pedro@email.com`
- **Password:** `user123`
- **Rol:** USER
- **Nombre:** Pedro López

---

## 💳 Datos de Tarjetas de Prueba

### Tarjeta de Crédito Válida
- **Número:** `4111111111111111`
- **CVV:** `123`
- **Fecha de Vencimiento:** `12/25`
- **Titular:** Cualquier nombre

### Información de Cliente de Prueba
- **Nombre:** Juan Pérez
- **Email:** juan.test@email.com
- **Teléfono:** +54 11 1234-5678
- **Dirección:** Av. Corrientes 1234, CABA, Argentina

---

## 🚀 Instrucciones de Configuración Inicial

### 1. Iniciar el Sistema
1. **Backend:** Ejecutar `AsgardComicsApplication` desde el IDE
2. **Frontend:** Ejecutar `npm run dev` en la carpeta Frontend
3. Acceder a `http://localhost:5173`

### 2. Cargar Datos de Prueba
1. En la página principal, usar el panel "🚀 Acceso Rápido"
2. Hacer clic en "📦 Crear Datos de Prueba" para cargar productos
3. Hacer clic en "👥 Crear Usuarios" para crear las cuentas de prueba

### 3. Verificación del Sistema
- **Estado esperado:** "X usuarios, 96 cómics" en el panel de estado
- **Categorías:** Comics, Mangas, Figuras, TCG y Juegos, Merchandising
- **Productos:** 96+ productos distribuidos en todas las categorías

---

## 🛍️ Flujo de Prueba Completo

### Como Usuario Regular:
1. **Registro/Login:** Usar cualquier cuenta de usuario regular
2. **Explorar productos:** Navegar por las diferentes categorías
3. **Agregar al carrito:** Seleccionar productos y agregarlos
4. **Checkout:** Completar una compra con los datos de tarjeta de prueba
5. **Verificar descuento:** Confirmar que el stock se redujo correctamente

### Como Administrador:
1. **Login:** Usar la cuenta de admin
2. **Acceder al Dashboard:** Ir a "Mi Dashboard" → Owner Dashboard
3. **Gestionar productos:** 
   - Agregar nuevos productos con categorías
   - Editar productos existentes
   - Modificar stock
4. **Verificar actualizaciones:** Los cambios deben aparecer inmediatamente para usuarios

---

## 📦 Productos de Prueba Incluidos

### Comics (Categoría: comic)
- Spider-Man #1, Batman #1, X-Men #1, The Avengers #1, Wonder Woman #1, Iron Man #1, etc.

### Mangas (Categoría: manga)
- Naruto Vol. 1, One Piece Vol. 1, Attack on Titan Vol. 1, Dragon Ball Vol. 1, Death Note Vol. 1, etc.

### Figuras (Categoría: figura)
- Figura de Spider-Man, Figura de Batman, Figura de Goku, Figura de Vegeta, etc.

### TCG y Juegos (Categoría: tcg)
- Booster Pack Pokémon TCG, Pack de Cartas Yu-Gi-Oh!, Booster Magic: The Gathering, etc.

### Merchandising (Categoría: merchandising)
- Camiseta de Batman, Taza de Spider-Man, Llavero de Iron Man, etc.

---

## 🔧 Solución de Problemas

### Si no aparecen productos:
1. Verificar que el backend esté ejecutándose
2. Usar "🗑️ Limpiar Base de Datos" seguido de "📦 Crear Datos de Prueba"

### Si el admin no tiene permisos:
1. Verificar que se usó "👥 Crear Usuarios" en lugar del registro normal
2. El rol debe ser "ADMIN" en el dropdown del usuario

### Si las categorías están vacías:
1. Verificar que se ejecutó "📦 Crear Datos de Prueba" después de agregar el campo category
2. Los productos deben tener el campo category correctamente asignado

---

## 📱 Funcionalidades Disponibles

### ✅ Sistema de Carrito
- Persistencia por usuario
- Actualización automática del contador
- Transformación de datos del carrito al checkout

### ✅ Sistema de Pagos
- Validación de tarjetas
- Descuento automático de inventario
- Registro de órdenes

### ✅ Panel de Administración
- CRUD completo de productos
- Gestión de stock en tiempo real
- Upload de imágenes
- Filtrado por categorías

### ✅ Sistema de Eventos
- Actualización automática al cambiar de usuario
- Sincronización en tiempo real de productos
- Notificaciones de cambios

---

## 🚨 Notas Importantes

1. **Base de datos:** H2 en memoria - se reinicia al reiniciar el backend
2. **Imágenes:** Algunas usan Imgur, otras placeholder - normal para desarrollo
3. **Seguridad:** Passwords en texto plano - solo para desarrollo
4. **Roles:** Verificar que el admin tenga rol "ADMIN" exactamente

---

## 📞 Contacto de Desarrollo

Para cualquier problema o consulta sobre el sistema, referirse al repositorio de GitHub o contactar al equipo de desarrollo.

**Última actualización:** Octubre 2025
**Versión del sistema:** 1.0

---

**¡Happy Testing! 🚀**