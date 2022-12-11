FROM quay.io/wildfly/wildfly

COPY wildfly-config/standalone.xml /opt/jboss/wildfly/standalone/configuration/
COPY certs/wildfly.service.consul-keystore.p12 /opt/jboss/wildfly/standalone/configuration/wildfly-keystore.p12

USER root
RUN chmod 777 /opt/jboss/wildfly/standalone/configuration/wildfly-keystore.p12

RUN /opt/jboss/wildfly/bin/add-user.sh admin admin --silent
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]