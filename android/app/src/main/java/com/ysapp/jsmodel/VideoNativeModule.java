package com.ysapp.jsmodel;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ysapp.entity.DetailEntity;
import com.ysapp.ui.search.SearchActivity;


/**
 * Created by yangang on 17/5/16.
 */

public class VideoNativeModule extends ReactContextBaseJavaModule {
    private Context mContext;

    public VideoNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        //给上下文对象赋值
        DataBaseProvider.myContext=reactContext;
        mContext=reactContext;
    }

    @Override
    public String getName() {
        //一定要有这个名字的 在rn代码里面是需要这个名字来调用该类的方法的
        return "MyNativeModule";
    }


    //函数不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束之后只能通过回调函数或者发送消息给rn那边
    //有一个错误
    @ReactMethod
    public void rnCallNative(final String name , final String url, final String title, final String jsonString, final int originIndex, final int playIndex, final int currentPos){

            final Activity currentActivity = getCurrentActivity();
            if(null!=currentActivity) {
                currentActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {


                        Class aimActivity = null;
                        try {
                            aimActivity = Class.forName(name);
                        } catch (ClassNotFoundException e) {
                            e.printStackTrace();
                        }
                        DetailEntity entity = new DetailEntity();
                        entity = JSON.parseObject(jsonString, DetailEntity.class);

                        Intent intent = new Intent(currentActivity, aimActivity);
                        Bundle bundle = new Bundle();
                        bundle.putSerializable("data", entity);
                        intent.putExtra("data", bundle);
                        intent.putExtra("url", url);
                        intent.putExtra("title", title);
                        intent.putExtra("origin_index", originIndex);
                        intent.putExtra("play_index", playIndex);
                        intent.putExtra("time", currentPos);

                        currentActivity.startActivity(intent);
                    }

                });
            }
    }
    @ReactMethod
    public void getHistory()
    {

        new DataBaseProvider().getData();
    }


    @ReactMethod
    public void getHistoryById(String id)
    {
        //调用Test类中的原生方法。
        new DataBaseProvider().getDataById(id);

    }



    @ReactMethod
    public void goToSearch()
    {
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, SearchActivity.class);
        currentActivity.startActivity(intent);
    }





}
