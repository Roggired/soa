package ru.yofik.zuul

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cglib.proxy.*
import org.springframework.cloud.client.discovery.EnableDiscoveryClient

//@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
class ZuulApplication

fun main(args: Array<String>) {
    runApplication<ZuulApplication>(*args)
}


/**
 * Fix for Zuul configuration with Spring Boot 2.5.x + Zuul - "NoSuchMethodError: ErrorController.getErrorPath()":
 */
/*@Configuration
class ZuulConfiguration {
    */
/**
 * Constructs a new bean post-processor for Zuul.
 *
 * @param routeLocator    the route locator.
 * @param zuulController  the Zuul controller.
 * @param errorController the error controller.
 * @return the new bean post-processor.
 *//*
    @Bean
    fun zuulPostProcessor(
        @Autowired routeLocator: RouteLocator?,
        @Autowired zuulController: ZuulController?,
        @Autowired(required = false) errorController: ErrorController?
    ): ZuulPostProcessor {
        return ZuulPostProcessor(routeLocator, zuulController, errorController)
    }

    private enum class LookupHandlerCallbackFilter : CallbackFilter {
        INSTANCE;

        override fun accept(method: Method): Int {
            return if (METHOD == method.name) {
                0
            } else 1
        }
    }

    private enum class LookupHandlerMethodInterceptor : MethodInterceptor {
        INSTANCE;

        @Throws(Throwable::class)
        override fun intercept(target: Any, method: Method, args: Array<Any>, methodProxy: MethodProxy): Any? {
            return if (ERROR_PATH == args[0]) {
                // by entering this branch we avoid the ZuulHandlerMapping.lookupHandler method to trigger the
                // NoSuchMethodError
                null
            } else methodProxy.invokeSuper(target, args)
        }
    }

    class ZuulPostProcessor internal constructor(
        private val routeLocator: RouteLocator?,
        private val zuulController: ZuulController?,
        errorController: ErrorController?
    ) :
        BeanPostProcessor {
        private val hasErrorController: Boolean = errorController != null

        @Throws(BeansException::class)
        override fun postProcessAfterInitialization(bean: Any, beanName: String): Any? {
            if (hasErrorController && bean is ZuulHandlerMapping) {
                val enhancer = Enhancer()
                enhancer.setSuperclass(ZuulHandlerMapping::class.java)
                enhancer.setCallbackFilter(LookupHandlerCallbackFilter.INSTANCE) // only for lookupHandler
                enhancer.setCallbacks(arrayOf(LookupHandlerMethodInterceptor.INSTANCE, NoOp.INSTANCE))
                val ctor = ZuulHandlerMapping::class.java.constructors[0]
                return enhancer.create(ctor.parameterTypes, arrayOf(routeLocator, zuulController))
            }
            return bean
        }
    }

    companion object {
        */
/**
 * The path returned by ErrorController.getErrorPath() with Spring Boot < 2.5
 * (and no longer available on Spring Boot >= 2.5).
 *//*
        private const val ERROR_PATH = "/error"
        private const val METHOD = "lookupHandler"
    }
}*/
