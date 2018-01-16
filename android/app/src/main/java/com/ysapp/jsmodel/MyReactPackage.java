package com.ysapp.jsmodel;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.ysapp.widget.nativeview.CircleManager;
import com.ysapp.widget.nativeview.MyCustomViewManager;
import com.ysapp.widget.nativeview.VideoViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by yangang on 17/5/16.
 */

public class MyReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules=new ArrayList<>();
        modules.add(new VideoNativeModule(reactContext));
        modules.add(new DataBaseNativeModule(reactContext));
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new MyCustomViewManager(),
                new CircleManager(),
                new VideoViewManager()
        );
    }


}
