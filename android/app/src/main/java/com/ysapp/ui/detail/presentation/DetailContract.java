package com.ysapp.ui.detail.presentation;


import com.ysapp.base.BaseModel;
import com.ysapp.base.BasePresenter;
import com.ysapp.base.BaseView;
import com.ysapp.entity.DetailEntity;
import com.ysapp.http.JSONResult;

import rx.Observable;

/**
 * @author dxplay120
 * @date 2016/12/17
 */
public interface DetailContract {
    interface View extends BaseView {
        void getDetailSuccess(DetailEntity entity);

        void getDetailFailed(String msg);
    }

    interface Model extends BaseModel {
        Observable<JSONResult<DetailEntity>> getDetail(String id);
    }

    abstract class Presenter extends BasePresenter<View, Model> {
        public abstract void getDetail(String id);
    }
}
