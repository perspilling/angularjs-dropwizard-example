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

# Run & debug Jetty in IDEA in hot swap mode

When developing in IDEA it is very useful to make Jetty run in hot swap mode so that you instantly
see the result of source changes in the resulting web page. The setup for this is described here
[https://gist.github.com/naaman/1053217](https://gist.github.com/naaman/1053217).

# Architecture information

## Frameworks and libraries used in addition to AngularJS and Dropwizard

- [Twitter Bootstrap](http://twitter.github.io/bootstrap/) - "CSS framework"

I also plan on using the following:
- [UI Bootstrap](http://angular-ui.github.io/bootstrap/) - provides native AngularJS directives for Bootstrap

## AngularJS webapp structure

The webapp has been used for learning AngularJS, and contains slightly modified examples from egghead.io and other
sources. The application implements a sidebar menu, and structures the application into AngularJS modules and html
partials according to the recommended AngularJS practice.


