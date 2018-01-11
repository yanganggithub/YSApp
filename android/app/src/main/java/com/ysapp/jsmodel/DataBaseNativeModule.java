package com.ysapp.jsmodel;

import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;
import com.ysapp.entity.DetailEntity;

/**
 * Created by yangang on 2018/1/10.
 */

public class DataBaseNativeModule extends ReactContextBaseJavaModule {



    private Context mContext;

    public DataBaseNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext=reactContext;
    }

    @Override
    public String getName() {
        //一定要有这个名字的 在rn代码里面是需要这个名字来调用该类的方法的
        return "DataBaseNativeModule";
    }

    @ReactMethod
    public void getCallBackHistory(Callback successCallback, Callback errorCallback) {

        String dataString = new DataBaseProvider().getCallBackData();
        successCallback.invoke(dataString);

    }

    @ReactMethod
    public  void savaFavourite(String data, Callback successCallback, Callback errorCallback )
    {

        DetailEntity entity = new Gson().fromJson(data ,DetailEntity.class);
        boolean isSuccess = new DataBaseProvider().saveFavouriteData(entity);
       if (isSuccess)
       {
           successCallback.invoke(isSuccess);
       }else
       {
           errorCallback.invoke(isSuccess);
       }


    }

}
