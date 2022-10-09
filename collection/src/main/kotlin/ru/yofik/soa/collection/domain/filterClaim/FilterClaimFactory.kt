package ru.yofik.soa.collection.domain.filterClaim

import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import java.lang.NumberFormatException
import java.lang.reflect.Type
import java.nio.charset.StandardCharsets
import java.util.Base64
import javax.ejb.Stateless

class FilterClaimGsonDeserializer: JsonDeserializer<FilterClaim> {
    override fun deserialize(json: JsonElement?, typeOfT: Type?, context: JsonDeserializationContext?): FilterClaim {
        val filterClaimObject = json?.asJsonObject ?: throw FilterClaimFormatException("FilterClaim's object is null")

        val propertyString = filterClaimObject.get("property").asString
        val sortString = filterClaimObject.get("sort").asString

        if (propertyString == null) {
            throw FilterClaimFormatException("FilterClaim's property field cannot be null")
        }

        if (sortString == null) {
            throw FilterClaimFormatException("FilterClaim's sort field cannot be null")
        }

        return FilterClaim(
            property = parseProperty(propertyString),
            filter = parseFilter(filterClaimObject),
            sort = parseSort(sortString)
        )
    }

    private fun parseProperty(propertyString: String): FilterableProperties {
        try {
            return FilterableProperties.valueOf(propertyString)
        } catch (e: IllegalArgumentException) {
            throw FilterClaimFormatException("FilterClaim's filed property has illegal value")
        }
    }

    private fun parseSort(sortString: String): SortOrder {
        try {
            return SortOrder.valueOf(sortString)
        } catch (e: IllegalArgumentException) {
            throw FilterClaimFormatException("FilterClaim's sort field can be one of ASC, DES, NO")
        }
    }

    private fun parseFilter(filterJsonObject: JsonObject): Any? {
        val filterObject = filterJsonObject.get("filter") ?: return null

        if (!filterObject.isJsonPrimitive) {
            throw FilterClaimFormatException("FilterClaim's filter field must be of following types: Int, Long, Double, Float, String, Boolean")
        }
        val filterAsPrimitive = filterObject.asJsonPrimitive

        if (filterAsPrimitive.isString) {
            return filterAsPrimitive.asString
        } else if (filterAsPrimitive.isBoolean) {
            return filterAsPrimitive.asBoolean
        } else if (filterAsPrimitive.isNumber) {
            try {
                return filterAsPrimitive.asLong
            } catch (_: NumberFormatException) { }

            return filterAsPrimitive.asDouble
        }

        throw FilterClaimFormatException("Unsupported type of FilterClaim's filter field")
    }
}

@Stateless
class FilterClaimFactory {
    private val gson = GsonBuilder()
        .registerTypeAdapter(FilterClaim::class.java, FilterClaimGsonDeserializer())
        .create()

    fun createFromBase64(filters: List<String>): List<FilterClaim> {
        return filters.map {
            String(Base64.getDecoder().decode(it), StandardCharsets.UTF_8)
        }.map {
            gson.fromJson(it, FilterClaim::class.java)
        }
    }
}