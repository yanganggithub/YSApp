package com.ysapp.jsmodel;

import android.app.Activity;
import android.content.Context;
import android.content.Entity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
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
    public void rnCallNative(String name ,String url,String title,String jsonString,int originIndex,int playIndex,int currentPos){

        try{
            Activity currentActivity = getCurrentActivity();
            if(null!=currentActivity){

                Class aimActivity = Class.forName(name);
                DetailEntity entity = new DetailEntity();
                entity = JSON.parseObject(jsonString, DetailEntity.class);

                Intent intent = new Intent(currentActivity,aimActivity);
                Bundle bundle = new Bundle();
                bundle.putSerializable("data",entity);
                intent.putExtra("data", bundle);
                intent.putExtra("url",url);
                intent.putExtra("title",title);
                intent.putExtra("origin_index",originIndex);
                intent.putExtra("play_index",playIndex);
                intent.putExtra("time",currentPos);

                currentActivity.startActivity(intent);
            }
        }catch(Exception e){

            throw new JSApplicationIllegalArgumentException(
                    "Could not open the activity : "+e.getMessage());

        }
    }
    @ReactMethod
    public void getHistory()
    {

        //调用Test类中的原生方法。
        new DataBaseProvider().getData();
    }

    @ReactMethod
    public void goToSearch()
    {
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, SearchActivity.class);
        currentActivity.startActivity(intent);
    }


    @ReactMethod
    public void getHistoryById(String id)
    {
        //调用Test类中的原生方法。
        new DataBaseProvider().getDataById(id);

    }


}
