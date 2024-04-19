package dev.aristides;

import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.jms.ConnectionFactory;
import jakarta.jms.JMSContext;

/*
 * Bean que produz a cada 5 segundos um número aleatório e envia para a queue de preços do JMS
 */
@ApplicationScoped
public class PriceProducer implements Runnable {

   @Inject
   ConnectionFactory connectionFactory; // Injeção da fábrica de conexão do JMS

   private final Random random = new Random();
   private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

   void onStart(@Observes StartupEvent ev) {
      scheduler.scheduleWithFixedDelay(this, 0L, 5L, TimeUnit.SECONDS);
   }

   void onStop(@Observes ShutdownEvent ev) {
      scheduler.shutdown();
   }

   /*
    * JSMContext é uma interface que encapsula a sessão e conexão JMS
    */
   @Override
   public void run() {
      try (JMSContext context = connectionFactory.createContext(JMSContext.AUTO_ACKNOWLEDGE)) {
         /*
          * Cria um produces para a queue de preços e envia um número aleatório
          */
         var queuePrices = context.createQueue("prices");
         context.createProducer().send(queuePrices, Integer.toString(random.nextInt(100)));
      }
   }

}
