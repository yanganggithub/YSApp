package com.ysapp.widget.nativeview;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by yangang on 2018/1/16.
 */

public class CircleManager extends SimpleViewManager<CircleView> {
    /**
     * 设置js引用名
     * @return String
     */
    @Override
    public String getName() {
        return "MCircle";
    }

    /**
     * 创建UI组件实例
     * @param reactContext
     * @return CircleView
     */
    @Override
    protected CircleView createViewInstance(ThemedReactContext reactContext) {
        return new CircleView(reactContext);
    }


    /**
     * 传输背景色参数
     * @param view
     * @param color
     */
    @ReactProp(name = "color")
    public void setColor(CircleView view, Integer color) {
        view.setColor(color);
    }

    /**
     * 传输半径参数
     * @param view
     * @param radius
     */
    @ReactProp(name = "radius")
    public void setRadius(CircleView view, Integer radius) {
        view.setRadius(radius);
    }
}
