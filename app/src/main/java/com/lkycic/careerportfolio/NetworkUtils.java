package com.lkycic.careerportfolio;

import android.util.Log;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import okhttp3.Credentials;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class NetworkUtils implements Interceptor {

    private static final String TAG = "NetworkUtils";
    private final String credentials;

    public NetworkUtils(String user, String password) {
        this.credentials = Credentials.basic(user, password, StandardCharsets.UTF_8);
    }

    @NotNull
    @Override
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        Request authenticatedRequest = request.newBuilder()
                .header("Authorization", credentials)
                .header("Accept", "application/json").build();
        Log.d(TAG, "intercept: " + authenticatedRequest.toString());
        return chain.proceed(authenticatedRequest);
    }

}
