package no.kodemaker.ps.dw.eventservice;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yammer.dropwizard.config.Configuration;
import org.hibernate.validator.constraints.NotEmpty;

public class EventConfiguration extends Configuration {
    @NotEmpty
    @JsonProperty
    private String template;

    /*
    @Valid
    @NotNull
    @JsonProperty
    private DatabaseConfiguration databaseConfiguration = new DatabaseConfiguration();
    */

    @NotEmpty
    @JsonProperty
    private String defaultName = "Stranger";

    public String getTemplate() {
        return template;
    }

    public String getDefaultName() {
        return defaultName;
    }

    /*
    public DatabaseConfiguration getDatabaseConfiguration() {
        return databaseConfiguration;
    }
    */
}