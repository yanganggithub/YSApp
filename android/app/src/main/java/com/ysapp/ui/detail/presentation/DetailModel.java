package com.ysapp.ui.detail.presentation;


import com.ysapp.api.ApiService;
import com.ysapp.entity.DetailEntity;
import com.ysapp.http.JSONResult;
import com.ysapp.http.Retrofits;

import rx.Observable;

/**
 * @author dxplay120
 * @date 2016/12/17
 */
public class DetailModel implements DetailContract.Model {
    @Override
    public Observable<JSONResult<DetailEntity>> getDetail(String id) {
        return Retrofits.createApi(ApiService.class).detail(id);
    }
}
