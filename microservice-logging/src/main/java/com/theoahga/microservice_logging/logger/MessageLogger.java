package com.theoahga.microservice_logging.logger;

import jakarta.jms.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Component
public class MessageLogger {

    @Value("${message.file}")
    private String LOG_FILE;

    @JmsListener(destination = ">", containerFactory = "jmsListenerContainerFactory")
    public void logMessagesFromAllQueues(String message, Message jmsMessage) {
        try {
            String destination = jmsMessage.getJMSDestination() != null ? jmsMessage.getJMSDestination().toString() : "Unknown";
            String logEntry = "Queue [" + destination + "]: " + message;
            logToFile(logEntry);
            System.out.println(logEntry);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private void logToFile(String message) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(LOG_FILE, true))) {
            System.out.println("Log file location: " + new File(LOG_FILE).getAbsolutePath());
            writer.write(message);
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
