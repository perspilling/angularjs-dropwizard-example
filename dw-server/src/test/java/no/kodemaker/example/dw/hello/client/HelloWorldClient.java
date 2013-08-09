package no.kodemaker.example.dw.hello.client;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;

import java.text.DecimalFormat;

public class HelloWorldClient {
    static public void main(String[] args) {
        Client client = Client.create();
        WebResource resource = client.resource("http://eagle.local:8080/hello-world");
        int num_of_requests = 10000;
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < num_of_requests; i++) {
            String result = resource.queryParam("name", "Per").get(String.class);
            System.out.println("result=" + result);
        }
        long endTime = System.currentTimeMillis();
        float duration = endTime - startTime;
        String seconds = new DecimalFormat("#.####").format(duration/1000);
        System.out.println("Duration = " + seconds.toString());
        System.out.println("Request/sec = " + Float.toString((num_of_requests/duration)*1000));
    }
}
