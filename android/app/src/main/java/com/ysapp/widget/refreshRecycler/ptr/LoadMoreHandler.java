package com.ysapp.widget.refreshRecycler.ptr;

import android.view.View;
import android.view.View.OnClickListener;

import com.ysapp.widget.refreshRecycler.loadmore.ILoadMoreViewFactory;


public interface LoadMoreHandler {

    /**
     * @param contentView
     * @param loadMoreView
     * @param onClickLoadMoreListener
     * @return 是否有 init ILoadMoreView
     */
    public boolean handleSetAdapter(View contentView, ILoadMoreViewFactory.ILoadMoreView loadMoreView, OnClickListener
            onClickLoadMoreListener);

    public void setOnScrollBottomListener(View contentView, OnScrollBottomListener onScrollBottomListener);

    void removeFooter();

    void addFooter();
}
