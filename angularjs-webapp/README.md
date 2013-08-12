# General info

This "Java / AngularJS" webapp uses an embedded Jetty container, as is described in
[Maven + Jetty = Quick WebService](http://www.dev-smart.com/archives/436) and
[http://www.jamesward.com/2011/08/23/war-less-java-web-apps](http://www.jamesward.com/2011/08/23/war-less-java-web-apps).

# Build

Build the project with

    $ mvn install

# Configure

You will need to set the `REPO` environment variable, so the execution wrapper script knows where to find the maven dependencies. For example:

    $ export REPO=$HOME/.m2/repository

# Run

Now you can run your webapp with:

    $ sh target/bin/webapp

(the wrapper script is not executable by default).

## Run & debug Jetty in IDEA in hot swap mode

When developing in IDEA it is very useful to make Jetty run in hot swap mode so that you instantly
see the result of source changes in the resulting web page. The setup for this is described here
[https://gist.github.com/naaman/1053217](https://gist.github.com/naaman/1053217).

## IDEA LiveEdit plugin + JetBrains IDE Support plugin for Chrome

(IDEA LiveEdit pluging)[http://plugins.jetbrains.com/plugin/?id=7007] + (JetBrains IDE Support plugin for Chrome)
[https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji] is a very
powerful combination for developing HTML/JavaScript.
