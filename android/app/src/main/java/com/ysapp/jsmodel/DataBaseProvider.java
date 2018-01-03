package com.ysapp.jsmodel;

import com.alibaba.fastjson.JSONObject;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.ysapp.db.DBManager;
import com.ysapp.entity.HistoryEntity;


import net.minidev.json.JSONArray;

import java.lang.annotation.ElementType;
import java.util.List;

/**
 * Created by yangang on 2017/12/27.
 */

public class DataBaseProvider {

    //定义上下文对象
    public static ReactContext myContext;

    //定义发送事件的函数
    public  void sendEvent(ReactContext reactContext, String eventName,  String params)
    {
        System.out.println("reactContext="+reactContext);

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,params);
    }

    public  void getData()
    {

        //发送事件,事件名为EventName
        List<HistoryEntity> data= DBManager.getHistory();

        String dataString = new Gson().toJson(data);
        sendEvent(myContext,"ReceiveData",dataString);

    }

    public void getDataById(String id)
    {
        HistoryEntity data = DBManager.getHistory(id);
        String dataString = new Gson().toJson(data);
        sendEvent(myContext,"ReceiveDataById",dataString);
    }



}
