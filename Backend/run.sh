#!/bin/bash

# Puerto que quieres usar (puedes cambiarlo si está ocupado)
PORT=8001

# Ejecutar Uvicorn con recarga automática
echo "Iniciando servidor FastAPI en http://127.0.0.1:$PORT ..."
uvicorn main:app --reload --port $PORT
