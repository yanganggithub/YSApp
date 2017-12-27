package com.ysapp.ui.detail.presentation;



import com.ysapp.base.BaseModel;
import com.ysapp.base.BasePresenter;
import com.ysapp.base.BaseView;
import com.ysapp.entity.MoveAddressEntity;
import com.ysapp.http.HttpResult;

import rx.Observable;

/**
 * @author dxplay120
 * @date 2016/12/26
 */
public interface PlayContract {
    interface View extends BaseView {
        void playMoveSuccess(MoveAddressEntity entity, String title);
        void playWebMoveSuccess(String msg);
        void playMoveFailed(String msg);
    }

    interface Model extends BaseModel {
        Observable<MoveAddressEntity> playMove(String url, String type);
    }

    abstract class Presenter extends BasePresenter<View, Model> {
        public abstract void playMove(String url, String type, String title);
    }
}
