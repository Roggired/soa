package ru.yofik.services.demography.infrastracture.integration

import org.springframework.stereotype.Service
import retrofit2.Response
import ru.yofik.soa.common.InvalidDataException
import ru.yofik.soa.common.domain.filterClaim.FilterClaim
import ru.yofik.soa.common.domain.filterClaim.FilterableProperties
import ru.yofik.soa.common.domain.filterClaim.SortOrder
import ru.yofik.soa.common.domain.filterClaim.createFromFilterClaims
import ru.yofik.soa.common.domain.person.model.Color

@Service
class DemographyService(
    private val collectionApi: CollectionApi
) {
    fun getPercentageOfPersonsByHairColorOfSpecifiedNationality(
        nationality: String,
        hairColor: Color
    ): Double {
        val totalPersonsByNationality = requestForTotalPersonsBy(
            listOf(
                FilterClaim(
                    property = FilterableProperties.PERSON_NATIONALITY,
                    filter = nationality,
                    sort = SortOrder.NO,
                )
            )
        )
        val totalPersonsByNationalityAndHairColor = requestForTotalPersonsBy(
            listOf(
                FilterClaim(
                    property = FilterableProperties.PERSON_NATIONALITY,
                    filter = nationality,
                    sort = SortOrder.NO,
                ),
                FilterClaim(
                    property = FilterableProperties.PERSON_HAIR_COLOR,
                    filter = hairColor,
                    sort = SortOrder.NO,
                )
            )
        )

        if (totalPersonsByNationality == 0) {
            throw InvalidDataException("No persons of such nationality")
        }

        return totalPersonsByNationalityAndHairColor.toDouble() / totalPersonsByNationality.toDouble() * 100
    }

    fun getAmountOfPersonsByHairColor(
        hairColor: Color
    ): Int {
        return requestForTotalPersonsBy(
            listOf(
                FilterClaim(
                    property = FilterableProperties.PERSON_HAIR_COLOR,
                    filter = hairColor,
                    sort = SortOrder.NO
                )
            )
        )
    }

    private fun requestForTotalPersonsBy(filters: List<FilterClaim>): Int {
        val totalPersonsResponse = collectionApi.getPersons(
            pageSize = 1,
            pageIndex = 0,
            filters = createFromFilterClaims(filters)
        ).execute()

        handleUnsuccessfulCollectionServiceResponse(totalPersonsResponse)
        val responseBody = totalPersonsResponse.body()
        return responseBody!!.payload!!.elementsTotal
    }

    private fun <T> handleUnsuccessfulCollectionServiceResponse(response: Response<T>) {
        if (!response.isSuccessful) {
            if (response.code() in 500..599) {
                throw RuntimeException("Collection service internal error or service is unavailable")
            }

            if (response.code() == 400) {
                throw InvalidDataException("Invalid nationality")
            }

            throw RuntimeException("Collection service 4xx error")
        }
    }
}