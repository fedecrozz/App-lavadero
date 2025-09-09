# Lavados Artesanales - Sistema de Solicitud de Turnos

Una aplicación web moderna y responsiva para que los clientes puedan solicitar turnos en el lavadero de autos.

## Características

### 🚗 Tipos de Vehículos Soportados
- Motos
- Autos
- SUVs
- Pickups

### 🧽 Tipos de Lavado

#### Lavado Estándar - $20.000
Lavado de mantenimiento, perfecto para mantener impecable tu vehículo luego de una buena limpieza detallada.

#### Lavado Plus - $30.000 (Más Pedido)
El lavado más pedido. Ideal cuando tu vehículo ha estado mucho tiempo sin mantener. Le devolvemos el brillo tanto por dentro como por fuera con excelente nivel de detalle.

#### Lavado Premium - $50.000
Lavado Reset. Elimina todo tipo de suciedad del interior incluyendo butacas, alfombras y un pulido con cera que deja tu pintura brillante por varios meses.

#### Lavado Personalizado
Selecciona únicamente los servicios que necesitas:
- Limpieza de butacas
- Limpieza de alfombras
- Detallado de frenos
- Pulido de ópticas
- Pulido con cera
- Limpieza de techo
- Lavado de motor

### 📱 Funcionalidades

- **Interfaz responsiva**: Funciona perfectamente en móviles, tablets y desktop
- **Validación inteligente**: Para motos solo se permite lavado estándar
- **Resumen en tiempo real**: Muestra el pedido actualizado automáticamente
- **Integración con WhatsApp**: Envía el pedido directamente por WhatsApp
- **Diseño moderno**: Interfaz atractiva con gradientes y animaciones suaves

## Estructura del Proyecto

```
App-Lavadero/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## Cómo usar

1. Abre `index.html` en cualquier navegador web
2. Completa la información del vehículo
3. Selecciona el tipo de lavado deseado
4. Revisa el resumen del pedido
5. Haz clic en "Solicitar Turno por WhatsApp"
6. Se abrirá WhatsApp con el mensaje pre-cargado

## Flujo de la aplicación

1. **Selección de vehículo**: El cliente ingresa modelo y tipo
2. **Restricción para motos**: Solo lavado estándar disponible
3. **Selección de lavado**: Plus viene pre-seleccionado y destacado
4. **Servicios personalizados**: Se habilitan solo si se selecciona "Personalizado"
5. **Resumen automático**: Se actualiza en tiempo real
6. **Envío a WhatsApp**: Genera mensaje formateado con toda la información

## Información de contacto integrada

- **WhatsApp**: 11-2595-8416
- **Instagram**: @lavados_artesanales1
- **Ubicaciones**: 
  - Los Polvorines
  - Villa de Mayo

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 con Flexbox y Grid
- JavaScript ES6+
- Font Awesome para iconos
- Google Fonts (Poppins)

## Características técnicas

- **Responsive Design**: Mobile-first approach
- **Accesibilidad**: Etiquetas semánticas y navegación por teclado
- **Performance**: CSS y JS optimizados
- **UX/UI**: Diseño intuitivo con feedback visual
- **Validación**: Validación en tiempo real del formulario

## Próximas mejoras

- [ ] Agregar precios para servicios personalizados
- [ ] Sistema de calendario para seleccionar fechas
- [ ] Galería de trabajos realizados
- [ ] Sistema de notificaciones
- [ ] Panel administrativo para gestionar turnos

## Instalación

No requiere instalación. Simplemente abre `index.html` en cualquier navegador moderno.

## Compatibilidad

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)
