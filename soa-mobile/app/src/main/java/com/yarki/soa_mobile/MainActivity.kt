package com.yarki.soa_mobile

import android.app.Application
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModel
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.AndroidEntryPoint
import dagger.hilt.android.HiltAndroidApp
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import timber.log.Timber
import javax.inject.Inject

@HiltAndroidApp
class App : Application()

@HiltViewModel
class ViewModelS @Inject constructor(
    private val testApi: TestApi
) : ViewModel() {
    init {
        viewModelScope.launch {
            val result = testApi.get()
            Timber.d("onCreate: $result")
        }
    }
}

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    val a by viewModels<ViewModelS>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}