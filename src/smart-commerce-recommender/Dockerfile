FROM python:3.9-slim-buster

WORKDIR /app

COPY ./requirements.txt /app
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000
ENV FLASK_APP=main.py

CMD [ "flask", "run", "--host=127.0.0.1","--port=5000"]