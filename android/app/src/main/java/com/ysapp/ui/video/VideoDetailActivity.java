package com.ysapp.ui.video;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.ysapp.entity.SearchEntity;

/**
 * Created by yangang on 2018/1/12.
 */

public class VideoDetailActivity  extends ReactActivity {

    private static final String DATA = "data";

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "VideoDetailJS";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new MyReactDelegate(this,getMainComponentName());
    }

    //自定义MyReactDelegate
    class  MyReactDelegate extends ReactActivityDelegate {

        public MyReactDelegate(Activity activity, @javax.annotation.Nullable String mainComponentName) {
            super(activity, mainComponentName);
        }

        @javax.annotation.Nullable
        @Override
        protected Bundle getLaunchOptions() {

            Intent intent = getIntent();

            SearchEntity.ListBean listBean = (SearchEntity.ListBean) intent.getBundleExtra("data").getSerializable("data");

            Bundle  bundle = new Bundle();
            bundle.putString("id",listBean.id);
            return bundle;
        }


    }

}

