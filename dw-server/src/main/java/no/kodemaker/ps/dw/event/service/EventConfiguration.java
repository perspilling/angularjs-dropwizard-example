package no.kodemaker.ps.dw.event.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yammer.dropwizard.config.Configuration;
import org.hibernate.validator.constraints.NotEmpty;

public class EventConfiguration extends Configuration {
    @NotEmpty
    @JsonProperty
    private String template;

    @NotEmpty
    @JsonProperty
    private String defaultName = "Stranger";

    public String getTemplate() {
        return template;
    }

    public String getDefaultName() {
        return defaultName;
    }
}