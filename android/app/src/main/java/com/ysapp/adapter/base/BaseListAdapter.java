package com.ysapp.adapter.base;

import com.zhusx.core.adapter.Lib_BaseAdapter;

import java.util.List;

/**
 * 适配器  基类
 * Author       zhusx
 * Email        327270607@qq.com
 * Created      2017/2/20 14:06
 */

public abstract class BaseListAdapter<T> extends Lib_BaseAdapter<T> {
    public BaseListAdapter() {
    }

    public BaseListAdapter(List<T> list) {
        super(list);
    }
}
