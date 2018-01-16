package com.ysapp.widget.nativeview;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.view.View;

import com.facebook.react.bridge.ReactContext;

/**
 * Created by yangang on 2018/1/16.
 */

public class MyCustomView extends View {
    private Paint mPaint;

    public MyCustomView(ReactContext context) {
        super(context);
        mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mPaint.setColor(0xffff0000);
    }

    // 这里相当于可以改变color属性
    public void setColor(int color){
        mPaint.setColor(color);
        invalidate();
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        // 测试代码，onMeasure中设置的值通过getWidth()/getHeight()拿到的不一样，问题没找到
        setMeasuredDimension(300, 300);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawRect(0, 0, getWidth(), getHeight(), mPaint);
    }

    public void changeColor() {
    }
}
