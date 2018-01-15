package com.ysapp.entity;

import com.zhusx.core.interfaces.IPageData;

import java.io.Serializable;
import java.util.List;

/**
 * Created by yangang on 2018/1/1.
 */

public class SearchEntity implements IPageData<SearchEntity.ListBean>,Serializable {


    /**
     * page : 1
     * page_total : 42
     * list : [{"id":"889","title":"骏马奥斯温2","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ31S143.jpg","description":""},{"id":"890","title":"冲浪企鹅2","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ31YM6.jpg","description":""},{"id":"893","title":"后会无期（2014）","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ31c434.jpg","description":""},{"id":"908","title":"剧透师全家 2017","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ3226254.jpg","description":""},{"id":"910","title":"电影恋爱学 2016","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ32243T.jpg","description":""},{"id":"913","title":"神偷奶爸2","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ323H26.jpg","description":""},{"id":"918","title":"极地大冒险2","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ32512G.jpg","description":""},{"id":"930","title":"混剪队长 2014","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ331G93.jpg","description":""},{"id":"946","title":"美国队长2","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ40Y225.jpg","description":""},{"id":"952","title":"里约大冒险2","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ4105L5.jpg","description":""}]
     * count : 415
     */

    public int page;
    public int page_total;
    public int count;
    public List<ListBean> list;



    @Override
    public int getTotalPageCount() {
        return page_total;
    }

    @Override
    public List<ListBean> getListData() {
        return list;
    }

    public static class ListBean implements  Serializable  {
        /**
         * id : 889
         * title : 骏马奥斯温2
         * litpic : https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ31S143.jpg
         * description :
         */

        public String id;
        public String title;
        public String litpic;
        public String description;









    }
}
