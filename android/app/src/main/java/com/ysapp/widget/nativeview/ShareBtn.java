package com.ysapp.widget.nativeview;

import android.util.AttributeSet;
import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.ysapp.R;

import cn.sharesdk.onekeyshare.OnekeyShare;

/**
 * Created by yangang on 2018/1/16.
 */

public class ShareBtn extends android.support.v7.widget.AppCompatButton {
    private  String mTitle;
    private  String mtitleUrl;
    private  String mText;
    private  String mImgPath;
    private  String mUrl;
    private  String mComment;

    public ShareBtn(ReactContext context) {
        this(context,null);
    }

    public ShareBtn(ReactContext context,AttributeSet attributeSet) {
        super(context, attributeSet);


        this.setBackground(getResources().getDrawable(R.drawable.nav_share));
        this.setOnClickListener(new OnClickListener(){
            @Override
            public void onClick(View v) {
                OnekeyShare oks = new OnekeyShare();
                //关闭sso授权
                oks.disableSSOWhenAuthorize();

                // title标题，微信、QQ和QQ空间等平台使用
                oks.setTitle(mTitle);
                // titleUrl QQ和QQ空间跳转链接
                oks.setTitleUrl(mtitleUrl);
                // text是分享文本，所有平台都需要这个字段
                oks.setText(mText);
                // imagePath是图片的本地路径，Linked-In以外的平台都支持此参数
                oks.setImagePath(mImgPath);//确保SDcard下面存在此张图片
                // url在微信、微博，Facebook等平台中使用
                oks.setUrl(mUrl);
                // comment是我对这条分享的评论，仅在人人网使用
                oks.setComment(mComment);
                // 启动分享GUI
                oks.show(v.getContext());
            }
        });
    }

    public void setTitle(String title)
    {
        mTitle = title;

    }
    public void setTitleUrl(String url)
    {

        mtitleUrl = url;
    }

    public void setText(String text)
    {
        mText = text;
    }

    public  void setImagePath(String path)
    {
        mImgPath = path;
    }

    public  void setUrl(String url)
    {
        mUrl = url;
    }


    public  void setComment(String comment)
    {
        mComment = comment;
    }





}
