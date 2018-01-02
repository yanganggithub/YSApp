package com.ysapp.ui.detail.presentation;



import com.ysapp.entity.MoveAddressEntity;


import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import rx.Subscriber;

/**
 * @author dxplay120
 * @date 2016/12/26
 */
public class PlayPresenter extends PlayContract.Presenter {
    @Override
    public void playMove(final String url, String type, final String title) {
        toSubscribe(mModel.playMove(url, type), new Subscriber<MoveAddressEntity>() {

            @Override
            public void onStart() {
                if (getView() != null)
                    getView().showLoading();
            }

            @Override
            public void onCompleted() {

            }

            @Override
            public void onError(Throwable e) {
                if (getView() != null)
                    getView().playMoveFailed(getErrorMsg(e));
            }

            @Override
            public void onNext(MoveAddressEntity moveAddressEntityHttpResult) {
                if (getView() != null){


                    StringTokenizer st = new StringTokenizer(moveAddressEntityHttpResult.result.definitionList,"|");//把"|"作为分割标志，然后把分割好的字符赋予StringTokenizer对象。
                    String[] strArray = new String[st.countTokens()];//通过StringTokenizer 类的countTokens方法计算在生成异常之前可以调用此 tokenizer 的 nextToken 方法的次数。
                    int i=0;
                    List<MoveAddressEntity.Definition> list= new ArrayList<>();
                    while(st.hasMoreTokens()){//看看此 tokenizer 的字符串中是否还有更多的可用标记。
                        strArray[i] = st.nextToken();//返回此 string tokenizer 的下一个标记。
                        MoveAddressEntity.Definition defintion = new MoveAddressEntity.Definition();
                        defintion.hd = Integer.parseInt(((String)strArray[i] ).substring(0,1));
                        defintion.type  =((String) strArray[i]).substring(1,strArray[i].length());
                        i++;
                        list.add(defintion);
                    }

                   moveAddressEntityHttpResult.type_list = list;

                    getView().playMoveSuccess(moveAddressEntityHttpResult, title);
                }

            }
        });

    }

    @Override
    protected PlayContract.Model createModel() {
        return new PlayModel();
    }
}
