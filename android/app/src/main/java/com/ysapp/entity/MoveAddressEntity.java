package com.ysapp.entity;

import java.util.List;

/**
 * @author dxplay120
 * @date 2016/12/19
 */
public class MoveAddressEntity {

    /**
     * code : 200
     * source : mgtv
     * request_url : http://www.mgtv.com/b/294671/3565736.html
     * result : {"files":"http://disp.titan.mgtv.com/vod.do?fmt=4&pno=2010&fid=7E00782F454B8AF96547C71422BBC664&file=%2Fc1%2F2017%2F06%2F10_0%2F7E00782F454B8AF96547C71422BBC664_20170610_1_1_620.mp4","play_type":"h5mp4","definition":2,"definitionList":"1标清|2高清|3超清"}
     * message : 操作正常
     * contact : qq:3139714393
     * platform : PlayM3u8
     * cost : 0.033
     */

    public int code;
    public String source;
    public String request_url;
    public ResultBean result;
    public String message;
    public String contact;
    public String platform;
    public double cost;
    public List<Definition> type_list;

    public static class ResultBean {
        /**
         * files : http://disp.titan.mgtv.com/vod.do?fmt=4&pno=2010&fid=7E00782F454B8AF96547C71422BBC664&file=%2Fc1%2F2017%2F06%2F10_0%2F7E00782F454B8AF96547C71422BBC664_20170610_1_1_620.mp4
         * play_type : h5mp4
         * definition : 2
         * definitionList : 1标清|2高清|3超清
         */

        public String files;
        public List<ResultBean.ListEntity>  filelist;
        public String play_type;
        public int definition;
        public String definitionList;

        public  static  class  ListEntity{
            public  String url;
            public  String size;
            public  String seconds;
        }


    }

    public static class Definition {
        public int hd;
        public String type;
    }
}
