package com.ysapp.entity;

import android.os.Parcel;
import android.os.Parcelable;

import com.zhusx.core.interfaces.IPageData;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yangang on 2018/1/1.
 */

public class SearchEntity implements IPageData<SearchEntity.ListBean>,Parcelable {

    /**
     * page : 1
     * page_total : 37
     * list : [{"id":"889","typeid":"24","typeid2":"0","sortrank":"1490607793","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"骏马奥斯温2","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ31S143.jpg","pubdate":"1490607793","senddate":"1490607793","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"890","typeid":"24","typeid2":"0","sortrank":"1490607798","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"冲浪企鹅2","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ31YM6.jpg","pubdate":"1490607798","senddate":"1490607798","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"893","typeid":"24","typeid2":"0","sortrank":"1490607799","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"后会无期（2014）","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ31c434.jpg","pubdate":"1490607799","senddate":"1490607799","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"908","typeid":"24","typeid2":"0","sortrank":"1490607802","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"剧透师全家 2017","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ3226254.jpg","pubdate":"1490607802","senddate":"1490607802","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"910","typeid":"24","typeid2":"0","sortrank":"1490607802","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"电影恋爱学 2016","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ32243T.jpg","pubdate":"1490607802","senddate":"1490607802","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"913","typeid":"24","typeid2":"0","sortrank":"1490607803","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"神偷奶爸2","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ323H26.jpg","pubdate":"1490607803","senddate":"1490607803","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"918","typeid":"24","typeid2":"0","sortrank":"1490607805","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"极地大冒险2","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ32512G.jpg","pubdate":"1490607805","senddate":"1490607805","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"930","typeid":"24","typeid2":"0","sortrank":"1490607811","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"混剪队长 2014","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ331G93.jpg","pubdate":"1490607811","senddate":"1490607811","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"946","typeid":"24","typeid2":"0","sortrank":"1490607848","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"美国队长2","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ40Y225.jpg","pubdate":"1490607848","senddate":"1490607848","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"},{"id":"952","typeid":"24","typeid2":"0","sortrank":"1490607850","flag":"p","ismake":"1","channel":"17","arcrank":"0","click":"59","money":"0","title":"里约大冒险2","shorttitle":"","color":"","writer":"admin","source":"未知","litpic":"https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ4105L5.jpg","pubdate":"1490607850","senddate":"1490607850","mid":"1","keywords":"","lastpost":"0","scores":"0","goodpost":"0","badpost":"0","voteid":"0","notpost":"0","description":"","filename":"","dutyadmin":"1","tackid":"0","mtype":"0","weight":"13"}]
     */

    public int page;
    public int page_total;
    public List<ListBean> list;

    @Override
    public int getTotalPageCount() {

        return page_total;
    }

    @Override
    public List<ListBean> getListData() {
       return  list;
    }

    public static class ListBean implements Parcelable {
        /**
         * id : 889
         * typeid : 24
         * typeid2 : 0
         * sortrank : 1490607793
         * flag : p
         * ismake : 1
         * channel : 17
         * arcrank : 0
         * click : 59
         * money : 0
         * title : 骏马奥斯温2
         * shorttitle :
         * color :
         * writer : admin
         * source : 未知
         * litpic : https://www.guaiguaiyingshi.com/uploads/allimg/170327/1_032GJ31S143.jpg
         * pubdate : 1490607793
         * senddate : 1490607793
         * mid : 1
         * keywords :
         * lastpost : 0
         * scores : 0
         * goodpost : 0
         * badpost : 0
         * voteid : 0
         * notpost : 0
         * description :
         * filename :
         * dutyadmin : 1
         * tackid : 0
         * mtype : 0
         * weight : 13
         */

        public String id;
        public String typeid;
        public String typeid2;
        public String sortrank;
        public String flag;
        public String ismake;
        public String channel;
        public String arcrank;
        public String click;
        public String money;
        public String title;
        public String shorttitle;
        public String color;
        public String writer;
        public String source;
        public String litpic;
        public String pubdate;
        public String senddate;
        public String mid;
        public String keywords;
        public String lastpost;
        public String scores;
        public String goodpost;
        public String badpost;
        public String voteid;
        public String notpost;
        public String description;
        public String filename;
        public String dutyadmin;
        public String tackid;
        public String mtype;
        public String weight;

        @Override
        public int describeContents() {
            return 0;
        }

        @Override
        public void writeToParcel(Parcel dest, int flags) {
            dest.writeString(this.id);
            dest.writeString(this.typeid);
            dest.writeString(this.typeid2);
            dest.writeString(this.sortrank);
            dest.writeString(this.flag);
            dest.writeString(this.ismake);
            dest.writeString(this.channel);
            dest.writeString(this.arcrank);
            dest.writeString(this.click);
            dest.writeString(this.money);
            dest.writeString(this.title);
            dest.writeString(this.shorttitle);
            dest.writeString(this.color);
            dest.writeString(this.writer);
            dest.writeString(this.source);
            dest.writeString(this.litpic);
            dest.writeString(this.pubdate);
            dest.writeString(this.senddate);
            dest.writeString(this.mid);
            dest.writeString(this.keywords);
            dest.writeString(this.lastpost);
            dest.writeString(this.scores);
            dest.writeString(this.goodpost);
            dest.writeString(this.badpost);
            dest.writeString(this.voteid);
            dest.writeString(this.notpost);
            dest.writeString(this.description);
            dest.writeString(this.filename);
            dest.writeString(this.dutyadmin);
            dest.writeString(this.tackid);
            dest.writeString(this.mtype);
            dest.writeString(this.weight);
        }

        public ListBean() {
        }

        protected ListBean(Parcel in) {
            this.id = in.readString();
            this.typeid = in.readString();
            this.typeid2 = in.readString();
            this.sortrank = in.readString();
            this.flag = in.readString();
            this.ismake = in.readString();
            this.channel = in.readString();
            this.arcrank = in.readString();
            this.click = in.readString();
            this.money = in.readString();
            this.title = in.readString();
            this.shorttitle = in.readString();
            this.color = in.readString();
            this.writer = in.readString();
            this.source = in.readString();
            this.litpic = in.readString();
            this.pubdate = in.readString();
            this.senddate = in.readString();
            this.mid = in.readString();
            this.keywords = in.readString();
            this.lastpost = in.readString();
            this.scores = in.readString();
            this.goodpost = in.readString();
            this.badpost = in.readString();
            this.voteid = in.readString();
            this.notpost = in.readString();
            this.description = in.readString();
            this.filename = in.readString();
            this.dutyadmin = in.readString();
            this.tackid = in.readString();
            this.mtype = in.readString();
            this.weight = in.readString();
        }

        public static final Creator<ListBean> CREATOR = new Creator<ListBean>() {
            @Override
            public ListBean createFromParcel(Parcel source) {
                return new ListBean(source);
            }

            @Override
            public ListBean[] newArray(int size) {
                return new ListBean[size];
            }
        };
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(this.page);
        dest.writeInt(this.page_total);
        dest.writeList(this.list);
    }

    public SearchEntity() {
    }

    protected SearchEntity(Parcel in) {
        this.page = in.readInt();
        this.page_total = in.readInt();
        this.list = new ArrayList<ListBean>();
        in.readList(this.list, ListBean.class.getClassLoader());
    }

    public static final Parcelable.Creator<SearchEntity> CREATOR = new Parcelable.Creator<SearchEntity>() {
        @Override
        public SearchEntity createFromParcel(Parcel source) {
            return new SearchEntity(source);
        }

        @Override
        public SearchEntity[] newArray(int size) {
            return new SearchEntity[size];
        }
    };
}
