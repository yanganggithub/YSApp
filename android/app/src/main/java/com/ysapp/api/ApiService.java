package com.ysapp.api;


import com.ysapp.entity.DetailEntity;
import com.ysapp.entity.MoveAddressEntity;
import com.ysapp.entity.SearchEntity;
import com.ysapp.http.JSONResult;

import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;
import rx.Observable;

/**
 * Author       zhusx
 * Email        327270607@qq.com
 * Created      2016/12/16 13:36
 */

public interface ApiService {
    /**
     * 解析视频地址
     */

    @GET("/playm3u8")
    Observable<MoveAddressEntity> setAddress(@Query("a") String a, @Query("apikey") String key, @Query("url") String url,@Query("hd") String type);

    @POST("ysapi/v1.Search/getSearchData")
    @FormUrlEncoded
    Observable<JSONResult<SearchEntity>> getSearchList(@Field("search") String search,
                                                       @Field("page") int page,
                                                       @Field("pageSize") String pageSize);

    /**
     * 详情
     */
    @GET("seaapi/v1.Play/getPlayData")
    Observable<JSONResult<DetailEntity>> detail(@Query("id") String id);
}
