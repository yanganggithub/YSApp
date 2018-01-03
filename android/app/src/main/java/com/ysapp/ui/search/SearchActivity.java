package com.ysapp.ui.search;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;


import com.google.gson.Gson;

import com.iflytek.cloud.ErrorCode;
import com.iflytek.cloud.InitListener;
import com.iflytek.cloud.RecognizerResult;
import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechError;
import com.iflytek.cloud.ui.RecognizerDialog;
import com.iflytek.cloud.ui.RecognizerDialogListener;
import com.squareup.picasso.Picasso;
import com.ysapp.R;
import com.ysapp.adapter.SearchAdapter;
import com.ysapp.adapter.base.BaseListAdapter;
import com.ysapp.base.BaseActivity;
import com.ysapp.entity.SearchBean;
import com.ysapp.entity.SearchEntity;
import com.ysapp.http.LoadData;
import com.ysapp.http.LoadingHelper;
import com.ysapp.utils.Constants;
import com.ysapp.utils.JsonParser;
import com.ysapp.widget.XListView;
import com.zhusx.core.interfaces.IChangeAdapter;
import com.zhusx.core.network.HttpRequest;
import com.zhusx.core.network.HttpResult;


import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;



/**
 * 作者：尚硅谷-杨光福 on 2016/7/25 15:19
 * 微信：yangguangfu520
 * QQ号：541433511
 * 作用：搜索页面
 */
public class SearchActivity extends BaseActivity  {

    private EditText etInput;
    private ImageView ivVoice;
    private TextView tvSearch;
    private XListView listview;
    private ProgressBar progressBar;
    private TextView tvNodata;
    private BaseListAdapter adapter;

    // 用HashMap存储听写结果
    private HashMap<String, String> mIatResults = new LinkedHashMap<String, String>();
    private String url;
    private List<SearchEntity.ListBean> items;
    private View contentView;
    private String text;
    private LoadData<SearchEntity> loadData;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        findViews();

        listview.setOnItemClickListener(new MyOnItemClickListener());
        listview.setPullLoadEnable(true);
        listview.setXListViewListener(new MyIXListViewListener());

    }

    class MyOnItemClickListener implements AdapterView.OnItemClickListener {

        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {




        }
    }

    class MyIXListViewListener implements XListView.IXListViewListener {
        @Override
        public void onRefresh() {

            getDataFromNet(text);
        }

        @Override
        public void onLoadMore() {

            getMoreDataFromNet();
        }
    }

    private void getMoreDataFromNet(){
        if (loadData.hasMoreData()) {
            loadData._reLoadData(false);
        }
    }

    private  void initData(SearchEntity data)
    {
       processData(data);

    }



    /**
     * Find the Views in the layout<br />
     * <br />
     * Auto-created on 2016-07-25 15:28:45 by Android Layout Finder
     * (http://www.buzzingandroid.com/tools/android-layout-finder)
     */
    private void findViews() {
        contentView = findViewById(R.id.layout_content);
        etInput = (EditText) findViewById(R.id.et_input);
        ivVoice = (ImageView) findViewById(R.id.iv_voice);
        tvSearch = (TextView) findViewById(R.id.tv_search);
        listview = (XListView) findViewById(R.id.listview);
        progressBar = (ProgressBar) findViewById(R.id.progressBar);
        tvNodata = (TextView) findViewById(R.id.tv_nodata);
        MyOnClickListener myOnClickListener = new MyOnClickListener();
        ivVoice.setOnClickListener(myOnClickListener);
        tvSearch.setOnClickListener(myOnClickListener);
    }

    class MyOnClickListener implements View.OnClickListener {

        @Override
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.iv_voice:
                    //语音输入
                    showDialog();
                    break;
                case R.id.tv_search:
                    //搜索
                    searchText();
                    break;
            }
        }
    }


    private void searchText() {
          text = etInput.getText().toString().trim();
        if (!TextUtils.isEmpty(text)) {

            if(items != null && items.size() >0){
                items.clear();
            }

            try {
                text = URLEncoder.encode(text, "UTF-8");
                getDataFromNet(text);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
    }

    private void getDataFromNet(String text) {

        if (loadData == null)
        {
            loadData = new LoadData<SearchEntity>(LoadData.Api.Search, this);
            loadData._setOnLoadingListener(new LoadingHelper<SearchEntity>(contentView, loadData) {

                @Override
                public void __onComplete(HttpRequest<Object> httpRequest, HttpResult<SearchEntity> data) {


                    if (httpRequest.isRefresh) {
                        initData(data.getData());
                    }else{
                        if (adapter != null) {
                            adapter._addItemToUpdate(data.getData().getListData());
                        }
                        onLoad();
                    }

                }
            });
            loadData._refreshData(text,10);

        }else
        {
            loadData._reLoadData(true);
        }


    }

    private void processData(SearchEntity searchBean) {

        items =  searchBean.list;

        showData();
    }

    private void showData() {
        if(items != null && items.size() >0){
            //设置适配器

            adapter = new BaseListAdapter<SearchEntity.ListBean>(items) {
                @Override
                public View getView(LayoutInflater layoutInflater, SearchEntity.ListBean listBean, int i, View view, ViewGroup viewGroup) {
                    ViewHolder viewHolder = _getViewHolder(view, viewGroup, R.layout.item_netvideo_pager);

                    viewHolder.setText(R.id.tv_name,listBean.title);
                    viewHolder.setText(R.id.tv_desc,listBean.description);

                    //3.使用Picasso 请求图片
                    Picasso.with(SearchActivity.this).load(listBean.litpic)
//                .diskCacheStrategy(DiskCacheStrategy.ALL)
                            .placeholder(R.drawable.video_default)
                            .error(R.drawable.video_default)
                            .into((ImageView) viewHolder.getView(R.id.iv_icon));
                    return viewHolder.rootView;
                }
            };
            listview.setAdapter((ListAdapter) adapter);

            tvNodata.setVisibility(View.GONE);
            onLoad();
        }else{
            tvNodata.setVisibility(View.VISIBLE);
            adapter.notifyDataSetChanged();
        }

    }

    private void onLoad() {
        listview.stopRefresh();
        listview.stopLoadMore();
        listview.setRefreshTime("更新时间:"+getSysteTime());
    }

    /**
     * 得到系统时间
     *
     * @return
     */
    public String getSysteTime() {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
        return format.format(new Date());
    }
    /**
    /**
     * 解析json数据
     * @param result
     * @return
     */
    private SearchBean parsedJson(String result) {
        return new Gson().fromJson(result, SearchBean.class);
    }




    private void showDialog() {
        //1.创建RecognizerDialog对象
        RecognizerDialog mDialog = new RecognizerDialog(this, new MyInitListener());
        //2.设置accent、 language等参数
        mDialog.setParameter(SpeechConstant.LANGUAGE, "zh_cn");//中文
        mDialog.setParameter(SpeechConstant.ACCENT, "mandarin");//普通话
        //若要将UI控件用于语义理解，必须添加以下参数设置，设置之后onResult回调返回将是语义理解
        //结果
        // mDialog.setParameter("asr_sch", "1");
        // mDialog.setParameter("nlp_version", "2.0");
        //3.设置回调接口
        mDialog.setListener(new MyRecognizerDialogListener());
        //4.显示dialog，接收语音输入
        mDialog.show();
    }

    class MyRecognizerDialogListener implements RecognizerDialogListener {

        /**
         * @param recognizerResult
         * @param b                是否说话结束
         */
        @Override
        public void onResult(RecognizerResult recognizerResult, boolean b) {
            String result = recognizerResult.getResultString();
            Log.e("MainActivity", "result ==" + result);
            String text = JsonParser.parseIatResult(result);
            //解析好的
            Log.e("MainActivity", "text ==" + text);

            String sn = null;
            // 读取json结果中的sn字段
            try {
                JSONObject resultJson = new JSONObject(recognizerResult.getResultString());
                sn = resultJson.optString("sn");
            } catch (JSONException e) {
                e.printStackTrace();
            }

            mIatResults.put(sn, text);

            StringBuffer resultBuffer = new StringBuffer();//拼成一句
            for (String key : mIatResults.keySet()) {
                resultBuffer.append(mIatResults.get(key));
            }

            etInput.setText(resultBuffer.toString());
            etInput.setSelection(etInput.length());

        }

        /**
         * 出错了
         *
         * @param speechError
         */
        @Override
        public void onError(SpeechError speechError) {
            Log.e("MainActivity", "onError ==" + speechError.getMessage());

        }
    }


    class MyInitListener implements InitListener {
        @Override
        public void onInit(int i) {
            if (i != ErrorCode.SUCCESS) {
                Toast.makeText(SearchActivity.this, "初始化失败", Toast.LENGTH_SHORT).show();
            }
        }
    }


}
