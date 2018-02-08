package com.ysapp.ui.detail.presentation;


import com.ysapp.entity.DetailEntity;
import com.ysapp.http.JSONResult;

import rx.Subscriber;

/**
 * @author dxplay120
 * @date 2016/12/17
 */
public class DetailPresenter extends DetailContract.Presenter {
    @Override
    public void getDetail(String id) {
        toSubscribe(mModel.getDetail(id), new Subscriber<JSONResult<DetailEntity>>() {
            @Override
            public void onStart() {
                super.onStart();
                if (getView() != null)
                    getView().showLoading();
            }

            @Override
            public void onCompleted() {

            }

            @Override
            public void onError(Throwable e) {
                if (getView() != null){
                    getView().hideLoading();
                    getView().getDetailFailed(getErrorMsg(e));
                }

            }

            @Override
            public void onNext(JSONResult<DetailEntity> detailEntityHttpResult) {
                if (getView() != null){
                    getView().hideLoading();
                    getView().getDetailSuccess(detailEntityHttpResult.data);
                }

            }
        });
    }


    @Override
    protected DetailContract.Model createModel() {
        return new DetailModel();
    }
}
