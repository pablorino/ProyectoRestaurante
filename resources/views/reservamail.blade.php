<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por reservar - RinosZone Restaurante</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            max-width: 600px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .logo {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
        }

        h1 {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 10px;
        }

        p {
            font-size: 1.2rem;
            color: #666666;
            margin-bottom: 20px;
        }

        .footer {
            font-size: 0.8rem;
            color: #999999;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>RinosZone</h1>
        <p>¡Gracias por reservar en nuestro restaurante!</p>
        <p>Detalles de la reserva:</p>
        <p>Fecha de inicio: {{$start}}</p>
        <p>Título del evento: {{$title}} </p>
        <p>Número de personas: {{$numPersonas}}</p>
        <p>Esperamos que disfrutes de tu experiencia en nuestro restaurante. Estamos comprometidos a brindarte un servicio excepcional y una deliciosa comida.</p>
        <p class="footer">© 2024 RinosZone Restaurante. Todos los derechos reservados.</p>
    </div>
</body>
</html>