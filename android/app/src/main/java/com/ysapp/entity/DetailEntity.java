package com.ysapp.entity;

import java.io.Serializable;
import java.util.List;

/**
 * @author dxplay120
 * @date 2016/12/17
 */


public class DetailEntity implements Serializable {

    public String nainfen;
    public String zhuyan;
    public String litpic;
    public String title;
    public  String id;
    public  int type;
    public List<Origin> vod_url_list;


    public static class Origin implements Serializable {
        public OriginName origin;
        public List<Play> list;


        public static class Play implements Serializable {
            public String play_name;
            public String play_url;
            public  int is_real_url;
        }

        public static class OriginName implements Serializable {
            public String name;
            public String img_url;
        }
    }

    public static class Comment implements Serializable {
        public String content;
        public String creat_at;
        public String username;
    }

    public static class Near implements Serializable {
        public String id;
        public String name;
        public String pic;
        public String title;
        public int year;
        public String area;
        public String actor;
    }

}
