package com.ysapp;

import android.app.Application;
import android.content.Context;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechUtility;
import com.microsoft.codepush.react.CodePush;
import com.mob.MobSDK;
import com.ysapp.db.DBManager;
import com.ysapp.jsmodel.MyReactPackage;
import com.zhusx.core.manager.ZsxApplicationManager;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new OrientationPackage(),
            new MyReactPackage(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    MobSDK.init(this);
    SoLoader.init(this, /* native exopackage */ false);
    initDatabase(this);
    SpeechUtility.createUtility(this, SpeechConstant.APPID +"=5a44a630");

    ZsxApplicationManager.builder(this)
            .setMonitorNet(true)
            .build();



  }



  private void initDatabase(Context context) {
    DBManager.instance(context);
  }

}
