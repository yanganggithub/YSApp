package com.ysapp.widget.nativeview;

import android.graphics.Color;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

/**
 * Created by yangang on 2018/1/16.
 */

public class MyCustomViewManager extends SimpleViewManager<MyCustomView> {

    protected static final String REACT_CLASS = "MyCustomView";

    @Override
    public String getName() { // 返回了定义的View Module的名字
        return REACT_CLASS;
    }

    @Override
    protected MyCustomView createViewInstance(ThemedReactContext reactContext) {
        return new MyCustomView(reactContext); // 创建一个View实例供JS使用。
    }


    // 设置属性，一定需要加这个注解，不然不认识
    @ReactProp(name = "color")
    public void setColor(MyCustomView view, String color) {
        view.setColor(Color.parseColor(color));
    }



    private static final int CHANGE_COLOR = 1;
    /**
     * 可以接收的JS发过来的事件，返回来的数据是一组对应了方法名以及方法对应的一个ID(这个ID需要唯一区分)的Map。
     * 这个在进入App的时候就会运行，得到相应的一组Map。
     */
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("changeColor", CHANGE_COLOR);
    }

    /**
     * 接收JS事件以后的处理。JS会通过一些发送发送相应的指令过来，Native会由receiveCommand来处理。
     * 事件过来时才会执行。
     */
    @Override
    public void receiveCommand(MyCustomView root, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case CHANGE_COLOR:
                root.changeColor();
                break;
        }
    }

    /**
     * 暴露了在JS中定义的方法，例如下面的"onChangeColor"是定义在JS中的方法。
     * 这个在进入App的时候就会运行
     *
     * Returned map should be of the form:
     * {
     *   "onTwirl": {
     *     "registrationName": "onTwirl"
     *   }
     * }
     */
    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("changeColor", MapBuilder.of("registrationName", "onChangeColor"))
                .build();
    }

    /**
     * 发射入口，相当于将Native的一些事件也注册给JS。
     *
     * 这个在进入App的时候就会运行。
     */
//    @Override
//    protected void addEventEmitters(final ThemedReactContext reactContext, final MyCustomView view) {
//        super.addEventEmitters(reactContext, view);
//        view.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                // 调用了JS相应的方法。
//                reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher()
//                        .dispatchEvent(new ClickEvent(view.getId()));
//            }
//        });
//    }


}
