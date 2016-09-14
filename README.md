# QMCHAM - ¿Qué m#$%&! comemos hoy al mediodía?

La idea detrás de esta avanzada pieza de software es ayudar a un grupo de programadores a decidir qué comer al mediodía.

Dada una serie de condiciones, busca dentro de un listado de lugares a donde comprar comida para determinar cuál debería ser la próxima elección.

Aún está en un fase alpha.

## Antes de usar
1. Tenés que tener instalado mongodb, NodeJS y npm.
2. Corré `npm install` para traer las dependencias.
3. Tenés que tener seteadas las siguientes variables de entorno: `MONGOPORT="PUERTO_DONDE_ESCUCHA_MONGO"`, `EMAILSENDER="EMAIL_QUE_SE_USA_PARA_ENVIAR"` y `EMAILPASSWORD="PASSWORD_DEL_MAIL"`
4. Si usás gmal, tenés que tener configurada esa cuenta de salida para que se puedan enviar mails desde aplicaciones de terceros (Google it! :)).

## Roadmap
* MODULARIZAR!!
* Parametrizar algunas decisiones (si quiero o no quiero lujo, de que servicio quiero sacar el gif, etc.)
* Sugerir plaza según el clima
* Incluir en la base la lista de destinatarios del mail
* Agrandar el modelo de lugares con propiedades como tipo de comida, si es solo para llevar, etc
