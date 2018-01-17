package com.ysapp.widget.nativeview;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by yangang on 2018/1/16.
 */

public class ShareBtnViewManager extends SimpleViewManager<ShareBtn> {
    protected static final String REACT_CLASS = "ShareBtn";

    @Override
    public String getName() { // 返回了定义的View Module的名字
        return REACT_CLASS;
    }

    @Override
    protected ShareBtn createViewInstance(ThemedReactContext reactContext) {
        return new ShareBtn(reactContext); // 创建一个View实例供JS使用。
    }

    // 设置属性，一定需要加这个注解，不然不认识
    @ReactProp(name = "title")
    public void setTitle(ShareBtn view, String title)
    {
        view.setTitle(title);
    }

    @ReactProp(name ="titleUrl")
    public void setTitleUrl(ShareBtn view ,String titleUrl)
    {
        view.setTitleUrl(titleUrl);
    }

    @ReactProp(name ="text")
    public void setText(ShareBtn view ,String text)
    {
        view.setText(text);
    }

    @ReactProp(name ="imgPath")
    public void setImgPath(ShareBtn view ,String imgPath)
    {
        view.setImagePath(imgPath);
    }

    @ReactProp(name ="url")
    public void setUrl(ShareBtn view ,String url)
    {
        view.setUrl(url);
    }

    @ReactProp(name ="comment")
    public void setComment(ShareBtn view ,String comment)
    {
        view.setComment(comment);
    }



}
