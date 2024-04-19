# demo-jms-quarkus

This project illustrates how you can use the AMQP JMS client from Apache Qpid to interact with AMQP 1.0 servers in a Quarkus application using the Quarkus Qpid JMS extension.

## AMQP server
Necessário subir um servidor AMPQ para testar.<br>
Foi utilizado o Apache ActiveMQ Artemis Server
```shell script
docker run -it --rm -p 8161:8161 -p 61616:61616 -p 5672:5672 -e AMQ_USER=quarkus -e AMQ_PASSWORD=quarkus quay.io/artemiscloud/activemq-artemis-broker:1.0.25
```   

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```shell script
./mvnw compile quarkus:dev
```
