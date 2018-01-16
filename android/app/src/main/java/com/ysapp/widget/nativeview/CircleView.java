package com.ysapp.widget.nativeview;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.util.Log;
import android.view.View;

import com.facebook.react.uimanager.PixelUtil;

/**
 * Created by yangang on 2018/1/16.
 */

/**
 * 圆形组件组件基础类
 */
public class CircleView extends View {
    private final String TAG = "CircleView";
    private Paint mPaint; // 画笔
    private float mRadius;  // 圆的半径
    public CircleView(Context context) {
        super(context);
        mPaint = new Paint();
    }

    /**
     * 设置圆的背景色
     * @param color
     */
    public void setColor(Integer color) {
        mPaint.setColor(color); // 设置画笔颜色
        invalidate();   // 更新画板
    }

    /**
     * 设置圆的半径
     * @param radius
     */
    public void setRadius(Integer radius) {
        /**
         * 由于JS传过的数字是dip单位,需要转换为实际像素
         * 使用com.facebook.react.uimanager包中的PixelUtil,进行转换
         */
        mRadius = PixelUtil.toPixelFromDIP(radius);
        invalidate();
    }


    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawCircle(mRadius, mRadius, mRadius, mPaint); // 画一个半径为100px的圆
        Log.d(TAG, "绘图");
    }

}
