package com.ysapp.widget.refreshRecycler;

import android.graphics.Rect;
import android.support.v7.widget.RecyclerView;

/**
 *
 */
public class ItemMarginDecoration extends RecyclerView.ItemDecoration {

    private int margin = 0;
    private int leftMargin = 0;

    public ItemMarginDecoration(int margin) {
        this.margin = margin;
        this.leftMargin = margin;
    }

    public ItemMarginDecoration(int margin, int leftMargin) {
        this.margin = margin;
        this.leftMargin = leftMargin;
    }

    @Override
    public void getItemOffsets(Rect outRect, int itemPosition, RecyclerView parent) {
        outRect.set(leftMargin, margin, leftMargin, margin);
        if (itemPosition == 0) {
            outRect.set(leftMargin, margin, leftMargin, margin);
        } else {
            outRect.set(leftMargin, 0, leftMargin, margin);
        }
    }
}