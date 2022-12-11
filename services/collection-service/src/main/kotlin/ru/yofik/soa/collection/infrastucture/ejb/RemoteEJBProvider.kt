package ru.yofik.soa.collection.infrastucture.ejb

import ru.yofik.soa.collection.ejb.domain.person.service.PersonService
import ru.yofik.soa.collection.ejb.domain.statistics.StatisticsService
import java.util.Hashtable
import javax.enterprise.context.ApplicationScoped
import javax.enterprise.inject.Produces
import javax.naming.Context
import javax.naming.InitialContext

@ApplicationScoped
class RemoteEJBProvider {
    @Produces
    fun providePersonService(): PersonService = provideRemoteEjb {
        it.lookup("ejb:/ejb-remote-server/PersonServiceEJB!ru.yofik.soa.collection.ejb.domain.person.service.PersonService") as PersonService
    }

    @Produces
    fun provideStatisticsService(): StatisticsService = provideRemoteEjb {
        it.lookup("ejb:/ejb-remote-server/StatisticsServiceEJB!ru.yofik.soa.collection.ejb.domain.statistics.StatisticsService") as StatisticsService
    }

    private fun <T> provideRemoteEjb(extractor: (Context) -> T): T {
        val jndiProperties = Hashtable<Any, Any>()
        jndiProperties[Context.INITIAL_CONTEXT_FACTORY] = "org.wildfly.naming.client.WildFlyInitialContextFactory"
        jndiProperties[Context.PROVIDER_URL] = "http-remoting://wildfly.service.consul:65100/"
        val context = InitialContext(jndiProperties)
        return extractor.invoke(context)
    }
}