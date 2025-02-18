// Success response function
export const success = (res, message, status) => {
    res.status(status || 200).send(message);
};


// Error response function
export const error = (res, message, status, details) => {
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    console.log('[response error] ' + (details?.message || JSON.stringify(details, getCircularReplacer())));
    
    if (res.headersSent) { // Verificar si ya se han enviado las cabeceras
        return; // Si ya se enviaron, se detiene la ejecución
    }

    // Envía la respuesta HTTP con el formato esperado
    res.status(status || 500).send({
        error: message,
        body: details || '', // Incluye el mensaje de detalles si está disponible
    });
};