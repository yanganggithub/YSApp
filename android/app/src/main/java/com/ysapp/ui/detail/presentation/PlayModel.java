package com.ysapp.ui.detail.presentation;



import com.ysapp.api.ApiService;
import com.ysapp.entity.MoveAddressEntity;
import com.ysapp.http.HttpResult;
import com.ysapp.http.Retrofits;

import rx.Observable;

/**
 * @author dxplay120
 * @date 2016/12/26
 */
public class PlayModel implements PlayContract.Model {
    @Override
    public Observable<MoveAddressEntity> playMove(String url, String type) {
        return Retrofits.createApi(ApiService.class).setAddress("api","e8a84d23d7958508",url, type);
    }
}
