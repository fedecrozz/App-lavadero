// Precios de los servicios
const PRECIOS = {
    estandar: 20000,
    plus: 30000,
    premium: 50000,
    personalizado: {
        base: 20000, // Precio base del lavado estándar incluido
        'lavado-estandar': 0, // Ya incluido en la base
        'limpieza-butacas': 0,
        'limpieza-alfombras': 0,
        'detallado-frenos': 0,
        'pulido-opticas': 0,
        'pulido-cera': 0,
        'limpieza-techo': 0,
        'lavado-motor': 0
    }
};

// Elementos del DOM
const vehicleTypeSelect = document.getElementById('vehicleType');
const vehicleModelInput = document.getElementById('vehicleModel');
const washTypeInputs = document.querySelectorAll('input[name="washType"]');
const customServicesSection = document.getElementById('customServices');
const customServiceInputs = document.querySelectorAll('input[name="customServices"]');
const contactChoiceInputs = document.querySelectorAll('input[name="contactChoice"]');
const appointmentForm = document.getElementById('appointmentForm');

// Elementos del resumen
const summaryVehicle = document.getElementById('summaryVehicle');
const summaryWashType = document.getElementById('summaryWashType');
const summaryServices = document.getElementById('summaryServices');
const summaryServicesList = document.getElementById('summaryServicesList');
const summaryTotal = document.getElementById('summaryTotal');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Event listeners
    vehicleTypeSelect.addEventListener('change', handleVehicleTypeChange);
    vehicleModelInput.addEventListener('input', updateSummary);
    
    washTypeInputs.forEach(input => {
        input.addEventListener('change', handleWashTypeChange);
    });
    
    customServiceInputs.forEach(input => {
        input.addEventListener('change', updateSummary);
    });
    
    appointmentForm.addEventListener('submit', handleFormSubmit);
    
    // Inicializar con valores por defecto
    updateSummary();
}

function handleVehicleTypeChange() {
    const vehicleType = vehicleTypeSelect.value;
    const washOptions = document.querySelectorAll('.wash-option');
    
    if (vehicleType === 'moto') {
        // Para motos, solo habilitar lavado estándar
        washOptions.forEach(option => {
            const type = option.dataset.type;
            if (type === 'estandar') {
                option.classList.remove('disabled');
                option.querySelector('input').disabled = false;
                option.querySelector('input').checked = true;
            } else {
                option.classList.add('disabled');
                option.querySelector('input').disabled = true;
                option.querySelector('input').checked = false;
            }
        });
        
        // Ocultar servicios personalizados si estaban visibles
        customServicesSection.style.display = 'none';
    } else {
        // Para otros vehículos, habilitar todas las opciones
        washOptions.forEach(option => {
            option.classList.remove('disabled');
            option.querySelector('input').disabled = false;
        });
        
        // Seleccionar lavado plus por defecto
        document.getElementById('plus').checked = true;
    }
    
    updateSummary();
}

function handleWashTypeChange() {
    const selectedWashType = document.querySelector('input[name="washType"]:checked').value;
    
    if (selectedWashType === 'personalizado') {
        customServicesSection.style.display = 'block';
        customServicesSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Asegurar que el lavado estándar esté siempre marcado y deshabilitado
        const lavadoEstandarCheckbox = document.getElementById('lavado-estandar');
        if (lavadoEstandarCheckbox) {
            lavadoEstandarCheckbox.checked = true;
            lavadoEstandarCheckbox.disabled = true;
        }
    } else {
        customServicesSection.style.display = 'none';
        // Limpiar selecciones de servicios personalizados (excepto el lavado estándar)
        customServiceInputs.forEach(input => {
            if (input.id !== 'lavado-estandar') {
                input.checked = false;
            }
        });
    }
    
    updateSummary();
}

function updateSummary() {
    // Actualizar vehículo
    const vehicleModel = vehicleModelInput.value || '-';
    const vehicleType = vehicleTypeSelect.value;
    let vehicleDisplay = vehicleModel;
    
    if (vehicleType) {
        const typeNames = {
            'moto': 'Moto',
            'auto': 'Auto',
            'suv': 'SUV',
            'pickup': 'Pickup'
        };
        vehicleDisplay = `${vehicleModel} (${typeNames[vehicleType]})`;
    }
    
    summaryVehicle.textContent = vehicleDisplay;
    
    // Actualizar tipo de lavado
    const selectedWashType = document.querySelector('input[name="washType"]:checked');
    if (selectedWashType) {
        const washTypeNames = {
            'estandar': 'Lavado Estándar',
            'plus': 'Lavado Plus',
            'premium': 'Lavado Premium',
            'personalizado': 'Lavado Personalizado'
        };
        
        summaryWashType.textContent = washTypeNames[selectedWashType.value];
        
        // Actualizar servicios personalizados
        if (selectedWashType.value === 'personalizado') {
            const selectedServices = Array.from(customServiceInputs)
                .filter(input => input.checked)
                .map(input => input.nextElementSibling.textContent);
            
            if (selectedServices.length > 0) {
                summaryServicesList.textContent = selectedServices.join(', ');
                summaryServices.style.display = 'flex';
            } else {
                summaryServices.style.display = 'none';
            }
        } else {
            summaryServices.style.display = 'none';
        }
        
        // Calcular total
        let total = 0;
        if (selectedWashType.value === 'personalizado') {
            // Empezar con el precio base (lavado estándar)
            total = PRECIOS.personalizado.base;
            
            // Agregar servicios adicionales cuando tengan precio
            const selectedServices = Array.from(customServiceInputs)
                .filter(input => input.checked && input.id !== 'lavado-estandar');
            
            selectedServices.forEach(input => {
                total += PRECIOS.personalizado[input.value] || 0;
            });
            
            summaryTotal.textContent = `$${total.toLocaleString('es-AR')}`;
        } else {
            total = PRECIOS[selectedWashType.value];
            summaryTotal.textContent = `$${total.toLocaleString('es-AR')}`;
        }
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(appointmentForm);
    const vehicleModel = formData.get('vehicleModel');
    const vehicleType = formData.get('vehicleType');
    const washType = formData.get('washType');
    const contactChoice = formData.get('contactChoice');
    
    if (!vehicleModel || !vehicleType || !washType || !contactChoice) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
    }
    
    // Generar mensaje para WhatsApp
    const message = generateWhatsAppMessage(formData);
    
    // Obtener número de teléfono según la selección
    const phoneNumbers = {
        'franco': '1151772083',
        'walter': '1171184502',
        'fede': '1125958416'
    };
    
    const whatsappNumber = phoneNumbers[contactChoice];
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

function generateWhatsAppMessage(formData) {
    const vehicleModel = formData.get('vehicleModel');
    const vehicleType = formData.get('vehicleType');
    const washType = formData.get('washType');
    
    const washTypeNames = {
        'estandar': 'Lavado Estándar',
        'plus': 'Lavado Plus',
        'premium': 'Lavado Premium',
        'personalizado': 'Lavado Personalizado'
    };
    
    const vehicleTypeNames = {
        'moto': 'Moto',
        'auto': 'Auto',
        'suv': 'SUV',
        'pickup': 'Pickup'
    };
    
    let message = `¡Hola! Quiero solicitar un turno para realizar un ${washTypeNames[washType]}.\n\n`;
    message += `Mi vehículo es ${vehicleModel} (${vehicleTypeNames[vehicleType]}).\n\n`;
    
    // Si es personalizado, agregar servicios seleccionados
    if (washType === 'personalizado') {
        const selectedServices = formData.getAll('customServices');
        if (selectedServices.length > 0) {
            message += `Servicios solicitados:\n`;
            selectedServices.forEach(service => {
                const serviceNames = {
                    'lavado-estandar': '• Lavado Estándar (Base)',
                    'limpieza-butacas': '• Limpieza de butacas',
                    'limpieza-alfombras': '• Limpieza de alfombras',
                    'detallado-frenos': '• Detallado de frenos',
                    'pulido-opticas': '• Pulido de ópticas',
                    'pulido-cera': '• Pulido con cera',
                    'limpieza-techo': '• Limpieza de techo',
                    'lavado-motor': '• Lavado de motor'
                };
                message += `${serviceNames[service]}\n`;
            });
            message += '\n';
        }
        
        // Calcular subtotal para personalizado
        let subtotal = PRECIOS.personalizado.base;
        selectedServices.forEach(service => {
            if (service !== 'lavado-estandar') {
                subtotal += PRECIOS.personalizado[service] || 0;
            }
        });
        
        message += `Subtotal: $${subtotal.toLocaleString('es-AR')}\n\n`;
    } else {
        const subtotal = PRECIOS[washType];
        message += `Subtotal: $${subtotal.toLocaleString('es-AR')}\n\n`;
    }
    
    message += `¡Muchas gracias!`;
    
    return message;
}

// Función para solicitar información sobre servicios
function solicitarInformacion() {
    // Obtener el contacto seleccionado o usar Franco por defecto
    const selectedContact = document.querySelector('input[name="contactChoice"]:checked');
    const contactChoice = selectedContact ? selectedContact.value : 'franco';
    
    const phoneNumbers = {
        'franco': '1151772083',
        'walter': '1171184502',
        'fede': '1125958416'
    };
    
    const contactNames = {
        'franco': 'Franco',
        'walter': 'Walter',
        'fede': 'Fede'
    };
    
    const message = `¡Hola ${contactNames[contactChoice]}! Me gustaría recibir información detallada sobre sus servicios de lavado de autos.

¿Podrían contarme más sobre:
• Los diferentes tipos de lavado disponibles
• Precios actualizados de servicios personalizados
• Ubicaciones y horarios de atención
• Cualquier promoción vigente

¡Muchas gracias!`;
    
    const whatsappNumber = phoneNumbers[contactChoice];
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Funciones de utilidad
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(price);
}

// Animaciones y efectos visuales
function animateElement(element, animation = 'fadeIn') {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = `${animation} 0.5s ease forwards`;
}

// Validación en tiempo real
function validateForm() {
    const vehicleModel = vehicleModelInput.value.trim();
    const vehicleType = vehicleTypeSelect.value;
    const washType = document.querySelector('input[name="washType"]:checked');
    const contactChoice = document.querySelector('input[name="contactChoice"]:checked');
    
    const isValid = vehicleModel && vehicleType && washType && contactChoice;
    
    const submitBtn = document.querySelector('.submit-btn');
    if (isValid) {
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
    } else {
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';
    }
    
    return isValid;
}

// Agregar validación en tiempo real
vehicleModelInput.addEventListener('input', validateForm);
vehicleTypeSelect.addEventListener('change', validateForm);
washTypeInputs.forEach(input => {
    input.addEventListener('change', validateForm);
});
contactChoiceInputs.forEach(input => {
    input.addEventListener('change', validateForm);
});

// Efectos visuales adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos al cargar
    const sections = document.querySelectorAll('.form-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Validación inicial
    validateForm();
});

// Smooth scroll para navegación
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}
